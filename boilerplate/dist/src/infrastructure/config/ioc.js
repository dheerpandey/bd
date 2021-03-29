"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
exports.autoProvide = inversify_binding_decorators_1.autoProvide;
exports.provide = inversify_binding_decorators_1.provide;
const inversify_1 = require("inversify");
exports.inject = inversify_1.inject;
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
const provideNamed = (identifier, name) => inversify_binding_decorators_1.fluentProvide(identifier)
    .whenTargetNamed(name)
    .done(true);
exports.provideNamed = provideNamed;
const provideSingleton = (identifier) => inversify_binding_decorators_1.fluentProvide(identifier)
    .inSingletonScope()
    .done(true);
exports.provideSingleton = provideSingleton;
//# sourceMappingURL=ioc.js.map