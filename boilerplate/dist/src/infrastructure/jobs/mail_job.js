"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_1 = require("../config/ioc");
const logger_service_1 = require("../services/logger_service");
var MailJobType;
(function (MailJobType) {
    MailJobType[MailJobType["SEND_WELCOME_MAIL"] = 0] = "SEND_WELCOME_MAIL";
})(MailJobType = exports.MailJobType || (exports.MailJobType = {}));
class MailJob {
    sendWelcomeEmail(job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const logger = ioc_1.iocContainer.get(logger_service_1.LoggerService);
            // const mailService = iocContainer.get<IMailService>(TYPES.MailService);
            try {
                const { email, firstName } = job.attrs.data;
                // Send email
                // await mailService.sendWelcomeEmail(
                //     email,
                //     "Welcome to MyApp",
                //     `Hello ${firstName}.\nWelcome to MyApp`
                // );
                logger.info(`✔️  Email sent to ${email}/${firstName}`);
                done();
            }
            catch (e) {
                logger.error("❌  Error with Email Sequence Job: ", e);
                done(e);
            }
        });
    }
}
exports.MailJob = MailJob;
//# sourceMappingURL=mail_job.js.map