/* This file contains the data modelling and data tier functionalities for users */

import mongoose from 'mongoose' //import mongoose from
import validator from 'validator' //imprt validator functionalities

//create a user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, 'user name is required'],
      maxlength: [50, 'user name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'User must provide an email'],
      validate: [validator.isEmail, 'The email needs to be in valid format'],
      unique: true,
    },
    loginType: {
      type: String,
      required: [true, 'there must be a login type for users'],
      enum: {
        values: ['local', 'google', 'facebook'],
        message: 'User type needs to be local, google or facebook',
      },
    },
    mobile: {
      type: String,
      default: '',
      validate: {
        validator: function (val) {
          if (val !== '') {
            return (
              (val.length === 11 || val.length === 15) && validator.isNumeric
            )
          } else {
            return true
          }
        },
        message:
          'Mobile number needs to be of 11 or 15 digits and can only contain numerics or + sign',
      },
    },
    userType: {
      type: String,
      required: true,
      default: 'tourist',
      enum: {
        values: ['admin', 'businessowner', 'tourist'],
        message: 'User type needs to be tourist, businessowner or admin',
      },
    },
  },
  {
    timestamps: true,
  }
)
