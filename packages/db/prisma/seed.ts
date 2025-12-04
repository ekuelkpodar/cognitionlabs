import { PrismaClient, PlanTier, MembershipRole, DataSourceType, ModelType, ModelVersionStatus, EndpointType, WorkflowStatus, ProviderName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: "atlas" },
    update: {},
    create: {
      name: "Atlas Robotics",
      slug: "atlas",
      planTier: PlanTier.PRO
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "founder@atlas.ai" },
    update: {},
    create: {
      email: "founder@atlas.ai",
      name: "Uma Engineer",
      passwordHash: "demo-hash"
    }
  });

  await prisma.organizationMembership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: org.id
      }
    },
    update: {},
    create: {
      userId: user.id,
      organizationId: org.id,
      role: MembershipRole.OWNER
    }
  });

  const ds = await prisma.dataSource.create({
    data: {
      organizationId: org.id,
      name: "Supply Chain Warehouse",
      type: DataSourceType.POSTGRES,
      config: { host: "demo.db", db: "ops", user: "readonly" }
    }
  });

  const dataset = await prisma.dataset.create({
    data: {
      organizationId: org.id,
      dataSourceId: ds.id,
      name: "orders_daily",
      description: "Daily order aggregates for forecasting",
      schema: { columns: [{ name: "date", type: "date" }, { name: "orders", type: "int" }] }
    }
  });

  const featureTable = await prisma.featureTable.create({
    data: {
      organizationId: org.id,
      name: "customer_features",
      primaryKeyColumns: { keys: ["customer_id"] },
      schema: { features: [{ name: "lifetime_value", type: "float" }] }
    }
  });

  const vectorStore = await prisma.vectorStore.create({
    data: {
      organizationId: org.id,
      name: "atlas-pgvector",
      backendType: "PGVECTOR",
      config: { schema: "public" }
    }
  });

  const collection = await prisma.vectorCollection.create({
    data: {
      vectorStoreId: vectorStore.id,
      name: "kb_docs",
      dimension: 1536
    }
  });

  const kb = await prisma.knowledgeBase.create({
    data: {
      organizationId: org.id,
      name: "Operations KB",
      vectorCollectionId: collection.id,
      description: "Product docs and SOPs"
    }
  });

  const provider = await prisma.llmProviderConfig.create({
    data: {
      organizationId: org.id,
      providerName: ProviderName.OPENAI,
      apiKeyRef: "openai-demo-key",
      defaultModelName: "gpt-4o-mini"
    }
  });

  const agent = await prisma.llmAgent.create({
    data: {
      organizationId: org.id,
      name: "Ops Copilot",
      description: "Answers ops questions over KB and live data",
      systemPrompt: "You are a concise operator assistant.",
      config: { temperature: 0.2, model: provider.defaultModelName },
      knowledgeBaseId: kb.id
    }
  });

  const model = await prisma.model.create({
    data: {
      organizationId: org.id,
      name: "demand-forecast",
      type: ModelType.FORECASTING,
      taskDescription: "Predict next 7d demand"
    }
  });

  const version = await prisma.modelVersion.create({
    data: {
      modelId: model.id,
      versionNumber: 1,
      status: ModelVersionStatus.PRODUCTION,
      trainingConfig: { algo: "xgboost" },
      metrics: { rmse: 0.21 },
      artifactLocation: "s3://artifacts/demo/model-v1"
    }
  });

  const endpoint = await prisma.endpoint.create({
    data: {
      organizationId: org.id,
      name: "forecast-api",
      type: EndpointType.ML_MODEL,
      publicSlug: "forecast-api",
      trafficConfig: { strategy: "champion" }
    }
  });

  await prisma.endpointModelBinding.create({
    data: {
      endpointId: endpoint.id,
      modelVersionId: version.id,
      trafficPercentage: 100
    }
  });

  await prisma.workflow.create({
    data: {
      organizationId: org.id,
      name: "daily-refresh",
      description: "Refresh features, retrain weekly, redeploy",
      nodes: {
        create: [
          { type: "IngestData", name: "Ingest", config: { datasetId: dataset.id }, orderIndex: 1 },
          { type: "TrainModel", name: "Train", config: { modelId: model.id }, orderIndex: 2 },
          { type: "DeployModel", name: "Deploy", config: { endpointId: endpoint.id }, orderIndex: 3 }
        ]
      }
    }
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
