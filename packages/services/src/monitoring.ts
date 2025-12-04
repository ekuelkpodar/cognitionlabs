export interface MonitoringService {
  logEvent(eventType: string, payload: Record<string, any>): Promise<void>;
  incrementCounter(name: string, labels?: Record<string, string>): Promise<void>;
  observeLatency(name: string, durationMs: number, labels?: Record<string, string>): Promise<void>;
}

// Stub implementation using console / DB hooks. Replace with Prometheus/Otel exporters.
export class ConsoleMonitoringService implements MonitoringService {
  async logEvent(eventType: string, payload: Record<string, any>) {
    console.log("[event]", eventType, payload);
  }
  async incrementCounter(name: string, labels?: Record<string, string>) {
    console.log("[counter]", name, labels);
  }
  async observeLatency(name: string, durationMs: number, labels?: Record<string, string>) {
    console.log("[latency]", name, durationMs, labels);
  }
}
