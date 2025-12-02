import { Request, Response } from 'express';
import Customer from '../models/Customer';
import Product from '../models/Product';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Customer.countDocuments();

    res.json({
      customers,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalProducts = await Product.countDocuments();
    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalCustomers,
        totalProducts,
        recentSubmissions: recentCustomers.length
      },
      recentCustomers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};