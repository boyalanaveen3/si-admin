"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
AdminSchema.methods.comparePassword = async function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
exports.default = (0, mongoose_1.model)('Admin', AdminSchema);
