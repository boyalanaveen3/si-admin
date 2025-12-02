import { Schema, model, Document } from 'mongoose';

interface ICustomer extends Document {
  name: string;
  phone: number;
  email: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export default model<ICustomer>('CustomerSubmitform', CustomerSchema);