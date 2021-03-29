"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FunctionQuery {
    and(...operands) {
        return { $and: operands };
    }
    or(...operands) {
        return { $or: operands };
    }
    ne(operand) {
        return { $ne: operand };
    }
    lt(operand) {
        return { $lt: operand };
    }
    lte(operand) {
        return { $lte: operand };
    }
    gt(operand) {
        return { $gt: operand };
    }
    gte(operand) {
        return { $gte: operand };
    }
    in(...operands) {
        return { $in: operands };
    }
    inc(data) {
        return { $inc: data };
    }
    mul(data) {
        return { $mul: data };
    }
    set(data) {
        return { $set: data };
    }
    unset(data) {
        return { $unset: data };
    }
}
exports.FunctionQuery = FunctionQuery;
//# sourceMappingURL=function_query.js.map