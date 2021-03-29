"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const user_1 = require("../../core/domain/models/user");
const ioc_1 = require("../../infrastructure/config/ioc");
const mail_job_1 = require("../../infrastructure/jobs/mail_job");
const logger_service_1 = require("../../infrastructure/services/logger_service");
const mail_service_1 = require("../../infrastructure/services/mail_service");
const events_1 = require("./events");
let UserSubscriber = class UserSubscriber {
    constructor() {
        this._logger = ioc_1.iocContainer.get(logger_service_1.LoggerService);
        this._mailService = ioc_1.iocContainer.get(mail_service_1.MailService);
    }
    /**
     * A great example of an event that you want to handle
     * save the last time a user sign-in, your boss will be pleased.
     *
     * Although it works in this tiny toy API, please don't do this for a production product
     * just spamming insert/update to mongo will kill it eventually
     *
     * Use another approach like emit events to a queue (rabbitmq/aws sqs),
     * then save the latest in Redis/Memcache or something similar
     */
    onUserSignIn({ id }) {
        try {
            const UserModel = ioc_1.iocContainer.get("UserModel");
            UserModel.update({ id }, { $set: { lastLogin: new Date() } });
        }
        catch (e) {
            this._logger.error(`❌  Error on event ${events_1.events.user.signIn}: `, e);
            // Throw the error so the process dies (check src/app.ts)
            throw new Error(e);
        }
    }
    onUserSignUp({ firstName, email }) {
        try {
            // Start your email sequence or whatever
            this._mailService.startEmailSequence(mail_job_1.MailJobType.SEND_WELCOME_MAIL, {
                firstName,
                email
            });
        }
        catch (e) {
            this._logger.error(`❌  Error on event ${events_1.events.user.signUp}: `, e);
            // Throw the error so the process dies (check src/app.ts)
            throw e;
        }
    }
};
__decorate([
    event_dispatch_1.On(events_1.events.user.signIn),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserSubscriber.prototype, "onUserSignIn", null);
__decorate([
    event_dispatch_1.On(events_1.events.user.signUp),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", void 0)
], UserSubscriber.prototype, "onUserSignUp", null);
UserSubscriber = __decorate([
    event_dispatch_1.EventSubscriber()
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
//# sourceMappingURL=user.js.map