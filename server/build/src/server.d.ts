import App from './app';
export default class Server {
    private static app;
    static port: number;
    static getApp(): App;
    static close(): Promise<void>;
    static init(): Promise<App>;
}
