"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.getProducts = exports.getCustomerById = exports.getCustomers = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const Product_1 = __importDefault(require("../models/Product"));
const getCustomers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const customers = await Customer_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Customer_1.default.countDocuments();
        res.json({
            customers,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getCustomers = getCustomers;
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer_1.default.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getCustomerById = getCustomerById;
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getProducts = getProducts;
const getDashboardStats = async (req, res) => {
    try {
        const totalCustomers = await Customer_1.default.countDocuments();
        const totalProducts = await Product_1.default.countDocuments();
        const recentCustomers = await Customer_1.default.find().sort({ createdAt: -1 }).limit(5);
        res.json({
            stats: {
                totalCustomers,
                totalProducts,
                recentSubmissions: recentCustomers.length
            },
            recentCustomers
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDashboardStats = getDashboardStats;
