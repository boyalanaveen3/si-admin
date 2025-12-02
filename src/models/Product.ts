import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  id: string;
  title: string;
  description: string;
  category?: string;
  icon?: string;
}

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  icon: { type: String }
});

export default model<IProduct>('Products', ProductSchema);