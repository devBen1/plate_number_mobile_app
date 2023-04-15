/// <reference types="node" />
import express from 'express';
import Routers from "./core/routers";
import { Application } from "express";
import http from "http";
declare class App {
    readonly app: express.Application;
    private server;
    port: number;
    private routers;
    private readonly routersCB;
    whitelist: string[];
    get getApp(): Application;
    get getServer(): http.Server;
    constructor(callback: (app: App) => Routers[], port: number);
    init(): Promise<void>;
    private initRouters;
    close(): Promise<void>;
    listen(): Promise<express.Application>;
}
export default App;
