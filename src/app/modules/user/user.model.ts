import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';

const userSchema = new Schema(
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true
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

  // set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
export const User = model('User', userSchema);