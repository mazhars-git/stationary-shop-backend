import bcrypt from 'bcrypt';
import { Model, model, Schema } from 'mongoose';
import config from '../../config';
import { userStatus } from './user.constant';
import { IUser } from './user.interface';

interface IUserModel extends Model<IUser> {
    checkUserExistByEmailId(email: string): Promise<IUser | null>;
  }

const userSchema = new Schema<IUser>(
  {
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
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: userStatus,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// find user by using email
userSchema.statics.checkUserExistByEmailId = async function (
    email: string
  ): Promise<IUser | null> {
    return this.findOne({ email });
  };

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser, IUserModel>('User', userSchema);
