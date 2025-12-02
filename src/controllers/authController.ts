import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({ username, password });
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    
    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    
    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};