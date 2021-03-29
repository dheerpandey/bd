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
const config_1 = require("../../config");
const mail_job_1 = require("../../jobs/mail_job");
function sendWelcomeEmail(agenda) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailJob = new mail_job_1.MailJob();
        const jobType = mail_job_1.MailJobType[mail_job_1.MailJobType.SEND_WELCOME_MAIL];
        agenda.define(jobType, { priority: "high", concurrency: config_1.config.agenda.concurrency }, emailJob.sendWelcomeEmail);
        yield agenda.start();
    });
}
exports.Jobs = [sendWelcomeEmail];
//# sourceMappingURL=jobs.js.map