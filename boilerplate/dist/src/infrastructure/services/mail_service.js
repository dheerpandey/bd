"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const types_1 = require("../../core/domain/constants/types");
const config_1 = require("../config");
const ioc_1 = require("../config/ioc");
const mail_job_1 = require("../jobs/mail_job");
let MailService = MailService_1 = class MailService {
    constructor() {
        this._mailgun = mailgun_js_1.default({
            apiKey: config_1.config.emails.apiKey,
            domain: config_1.config.emails.domain
        });
    }
    sendWelcomeEmail(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * @TODO Call Mailchimp/Sendgrid or whatever
             */
            // Added example for sending mail from mailgun
            const resp = yield this._mailgun
                .messages()
                .send({ from: config_1.config.emails.from, to, subject, text });
            return resp != null;
        });
    }
    startEmailSequence(sequenceType, data) {
        const agenda = ioc_1.iocContainer.get(types_1.TYPES.Agenda);
        switch (sequenceType) {
            case mail_job_1.MailJobType.SEND_WELCOME_MAIL:
                agenda.schedule("in 2 minutes", mail_job_1.MailJobType[mail_job_1.MailJobType.SEND_WELCOME_MAIL], data);
                break;
            default:
                break;
        }
    }
};
MailService = MailService_1 = __decorate([
    ioc_1.provideSingleton(MailService_1)
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail_service.js.map