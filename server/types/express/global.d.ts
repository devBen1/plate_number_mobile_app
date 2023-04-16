export { };
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: any;
      DB_DATABASE: string;
      DB_HOST: string;
      DB_DIALECT: string;
      DB_SSL_REQUIRE: any;
      ACCESS_TOKEN_SECRET?: any;
      REFRESH_TOKEN_SECRET?: any;
      ACCESS_TOKEN_EXPIRATION_TIME?: any;
      REFRESH_TOKEN_EXPIRATION_TIME?: any;
    }
  }
}
export { }