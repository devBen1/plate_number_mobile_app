declare abstract class Routers {
    abstract initRouters(): any;
    router: import("express-serve-static-core").Router;
}
export default Routers;
