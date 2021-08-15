export interface IConfig {
  port: number;
  isProduction: boolean;
  dbFileName: string;
}

const config: IConfig = {
  port: +process.env.PORT || 8010,
  isProduction: process.env.NODE_ENV === "production",
  dbFileName: process.env.DB_FILENAME || ":memory:"
};

export default config;
