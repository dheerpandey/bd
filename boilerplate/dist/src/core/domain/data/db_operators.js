"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_1 = require("../../../infrastructure/config/ioc");
const types_1 = require("../constants/types");
exports.and = (...operands) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.and(...operands);
};
exports.or = (...operands) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.or(...operands);
};
exports.ne = (operand) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.ne(operand);
};
exports.lt = (operand) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.lt(operand);
};
exports.lte = (operand) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.lte(operand);
};
exports.gt = (operand) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.lt(operand);
};
exports.gte = (operand) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.gte(operand);
};
exports.isIn = (...operands) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.in(...operands);
};
exports.inc = (data) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.inc(data);
};
exports.mul = (data) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.mul(data);
};
exports.set = (data) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.set(data);
};
exports.unset = (data) => {
    const functionQuery = ioc_1.iocContainer.get(types_1.TYPES.FunctionQuery);
    return functionQuery.unset(data);
};
//# sourceMappingURL=db_operators.js.map