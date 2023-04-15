import { Options } from "sequelize";
interface ConfigTs {
    development: Options;
    test: Options;
    production: Options;
}
declare const configDB: ConfigTs;
export default configDB;
