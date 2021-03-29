"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const method_override_1 = __importDefault(require("method-override"));
const interceptor_middleware_1 = require("../../../ui/api/middleware/interceptor_middleware");
exports.expressLoader = (app) => {
    app.get("/status", (_req, res) => {
        res.status(200).end();
    });
    app.head("/status", (_req, res) => {
        res.status(200).end();
    });
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable("trust proxy");
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors_1.default());
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(method_override_1.default());
    // Disable default cache
    app.set("etag", false);
    // Configure requests body parsing
    app.use(body_parser_1.default.urlencoded({
        extended: true
    }));
    app.use(body_parser_1.default.json());
    // Adds some security defaults
    app.use(helmet_1.default());
    // Log all requests that hit the server
    app.use(new interceptor_middleware_1.RequestMiddleware().handler);
};
//# sourceMappingURL=express.js.map