import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IAdmin extends Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<IAdmin>('Admin', AdminSchema);