import Router from "../../core/routers";
import App from "../../app";
import UserController from './users.controller';
import ValidatorMiddleware from "../../middlewares/validator";
import AuthMiddleware from "../../middlewares/auth";

class FinanceRoutes extends Router {
  public path = '/user';
  public controller = new UserController();
  public validatorMiddleware = new ValidatorMiddleware();
  public authMiddleware = new AuthMiddleware();
  private _app;

  constructor(app: App) {
    super();
    this._app = app;
    this.initRouters();
  }
 
  public initRouters() {
    this.router.get(this.path.concat('/list'),
      [
        this.authMiddleware.checkToken,
        this.authMiddleware.verifyAuth,
        this.validatorMiddleware.validateInputs
      ],
      this.controller.SendMoney.bind(this));

    this.router.post(this.path.concat('/add'),
      [
        this.authMiddleware.checkToken,
        this.authMiddleware.verifyAuth,
        this.validatorMiddleware.validateInputs
      ],
      this.controller.SendMoney.bind(this));

    this.router.put(this.path.concat('/edit:id'),
      [
        this.authMiddleware.checkToken,
        this.authMiddleware.verifyAuth,
        this.validatorMiddleware.validateInputs
      ],
      this.controller.SendMoney.bind(this));


    this.router.delete(this.path.concat('/delete:id'),
      [
        this.authMiddleware.checkToken,
        this.authMiddleware.verifyAuth,
        this.validatorMiddleware.validateInputs
      ],
      this.controller.SendMoney.bind(this));
  }
}

export default FinanceRoutes;
