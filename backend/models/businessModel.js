/* This file contains the data modelling and data tier functionalities for Businesses */

import mongoose from 'mongoose'
import validator from 'validator'

//Create a Business schema
const businessSchema = new mongoose.Schema(
  {
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Business Owner ID is required'],
    },

    businessName: {
      type: String,
      trim: true,
      required: [true, 'Business Name is Required'],
      maxlength: [50, 'Business Name cannot be more than 50 characters'],
    },

    businessAddress: {
      type: String,
      trim: true,
      required: [true, 'Business Address is Required'],
      maxlength: [50, 'Address Cannot be More Than 50 Characters'],
    },

    businessPhone: {
      type: String,
      trim: true,
      required: [true, 'Phone Number is Required'],
      default: '',
      validate: {
        validator: function (phn) {
          if (phn !== '') {
            return (
              (phn.length === 11 || phn.length === 14) && validator.isNumeric
            )
          } else {
            return true
          }
        },
        message:
          'Phone Number should contain 11 or 14 digits & can contain only numerics & + sign',
      },
    },

    businessEmail: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is Required'],
      validate: [validator.isEmail, 'Email needs to be in valid format'],
    },

    businessWebsite: {
      type: String,
      trim: true,
    },

    businessTIN: {
      type: String,
      required: [true, 'TIN Number is Required'],
      unique: true,
      validate: {
        validator: function (phn) {
          if (phn !== '') {
            return phn.length === 12 && validator.isNumeric
          } else {
            return true
          }
        },
        message:
          'TIN Number should contain 12 digits & can contain only numerics',
      },
    },

    businessLicense: {
      type: String,
      required: [true, 'License Number is Required'],
      unique: true,
      validate: {
        validator: function (phn) {
          if (phn !== '') {
            return phn.length === 13 && validator.isNumeric
          } else {
            return true
          }
        },
        message:
          'BIN Number should contain 13 digits & can contain only numerics',
      },
    },

    businessDescription: {
      type: String,
      trim: true,
      required: [true, 'Business Description is Required'],
      maxlength: [
        500,
        'Business Description cannot be more than 500 characters',
      ],
    },

    recievedPaymentAmount: {
      type: Number,
      default: 0,
    },

    duePaymentAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

businessSchema.pre('save', async function (next) {
  this.duePaymentAmount = this.recievedPaymentAmount * 0.15
  next()
})

businessSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.recievedPaymentAmount) {
    next()
  }
  this._update.duePaymentAmount = this._update.recievedPaymentAmount * 0.15
  next()
})

businessSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'businessOwner',
    select: '-password',
  })
  next()
})

//Create Business Model
const Business = mongoose.model('Business', businessSchema)

export default Business
