"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingAdmin = await Admin_1.default.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const admin = new Admin_1.default({ username, password });
        await admin.save();
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            message: 'Admin registered successfully',
            token,
            admin: { id: admin._id, username: admin.username }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin_1.default.findOne({ username });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, username: admin.username }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
