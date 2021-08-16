export interface IConfig {
  dbFileName: string;
  isProduction: boolean;
  port: number;
}

const config: IConfig = {
  dbFileName: process.env.DB_FILENAME || ":memory:",
  isProduction: process.env.NODE_ENV === "production",
  port: +process.env.PORT || 8010,
};

export default config;
