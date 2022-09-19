/* This file contains the data modelling and data tier functionalities for users */

import mongoose from 'mongoose' //import mongoose from
import bcrypt from 'bcryptjs' //import bcrypt for password hashing
import validator from 'validator' //imprt validator functionalities

//Create Business Owners Schema
const businessOwnerSchema = new mongoose.Schema(
  {
    NID: {
      type: String,
      default: '',
      unique: true,
      trim: true,
    },

    passport: {
      type: String,
      unique: true,
      trim: true,
    },

    paymentStatus: {
      type: String,
      default: 'Due',
      trim: true,
    },

    paymentAmount: {
      type: Number,
      required: [true, 'Payment Amount is Required'],
      default: 0,
      trim: true,
    },

    paymentDate: {
      type: Date,
    },

    paymentDueAmount: {
      type: Number,
      // required: [true, 'Due Amount is Required'], //Should be Automatically Filled
    },

    paymentDueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Create tourists Schema
const touristSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      unique: true,
      trim: true,
    },

    NID: {
      type: String,
      default: '',
      unique: true,
      trim: true,
    },

    passport: {
      type: String,
      unique: true,
      trim: true,
    },

    subscription: {
      type: Boolean,
      default: false,
    },

    subscriptionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

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
        values: ['local', 'google'],
        message: 'User type needs to be local or google',
      },
    },
    googleID: {
      type: String,
      required: [
        function () {
          return this.loginType === 'google'
        },
        'google ID is required',
      ],
    },
    // facebookID: {
    //   type: String,
    //   required: [
    //     function () {
    //       return this.loginType === 'facebook'
    //     },
    //     'google ID is required',
    //   ],
    // },
    mobile: {
      type: String,
      default: '',
      validate: {
        validator: function (val) {
          if (val !== '') {
            return (
              (val.length === 11 || val.length === 14) && validator.isNumeric //May need to change validator.isNumeric
            )
          } else {
            return true
          }
        },
        message:
          'Mobile number needs to be of 11 or 14 digits and can only contain numerics or + sign',
      },
    },
    password: {
      type: String,
      required: [
        function () {
          return this.loginType === 'local'
        },
        'There needs to be a password for the user',
      ],
      minLength: 6,
    },
    imageURL: {
      type: String,
      default: '',
    },
    userType: {
      type: String,
      default: 'tourist',
      enum: {
        values: ['admin', 'businessowner', 'tourist'],
        message: 'User type needs to be tourist, businessowner or admin',
      },
    },
    touristInfo: {
      type: touristSchema,
    },
    businessOwnerInfo: {
      type: businessOwnerSchema,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS * 1)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema) //create a model

export default User //export the model
