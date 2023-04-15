import Router from "../../core/routers";
import App from "../../app";
import AuthenticationController from './authentication.controller';
import ValidatorMiddleware from "../../middlewares/validator";

class AuthenticationRoutes extends Router {
  public path = '/auth';
  public controller = new AuthenticationController();
  public validatorMiddleware = new ValidatorMiddleware();
  private _app;

  constructor(app: App) {
    super();
    this._app = app;
    this.initRouters();
  }
 
  public initRouters() {
    this.router.post(this.path.concat('/login'),
      [this.validatorMiddleware.validateInputs],
      this.controller.Login.bind(this));
    
    this.router.get(this.path.concat('/refresh'),
      this.controller.RefreshToken.bind(this));
    
    this.router.get(this.path.concat('/logout'),
      this.controller.Logout.bind(this));
    
    this.router.put(this.path.concat('/update/account'),
      [this.validatorMiddleware.validateInputs],
      this.controller.UpdateInfo.bind(this));
  }
}

export default AuthenticationRoutes;
