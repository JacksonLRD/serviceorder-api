import { model, Schema } from 'mongoose';
import { v4 } from 'uuid';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  active?: boolean;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'TECHNICIAN'],
      default: 'TECHNICIAN',
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
