export const LoggerInjectSymbol = Symbol();

export interface AuthLoggerRepository {
  createRecord(userId: number): Promise<void>;
}
