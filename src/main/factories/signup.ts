import { SignUpController } from "../../presentation/controllers/signup/signuo";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMySqlRepository } from "../../infra/db/mysql/account-repository/account";
import { Controller } from "../../presentation/protocols";
import { LogMySQLRepository } from "../../infra/db/mysql/log-repository/log";

import { LogControllerDecorator } from "../decorators/log";

export const makeSignUpController = (): Controller =>  {
    const salt = 12
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMySqlRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
    const logMySQLRepository = new LogMySQLRepository()
    return new LogControllerDecorator(signUpController, logMySQLRepository)
}
