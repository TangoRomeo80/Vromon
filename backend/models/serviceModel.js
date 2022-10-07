/* This file contains the data modelling and data tier functionalities for services */

import mongoose from 'mongoose' //import mongoose
import validator from 'validator' //imprt validator functionalities

//create review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
      required: [true, 'Review must have a description'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
      required: [true, 'Review must have a rating'],
    },
  },
  {
    timestamps: true,
  }
)

//create a services schema
const serviceSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination', //like foreign key
      required: [true, 'service destination ID is required'],
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business', //like foreign key
      required: [true, 'service business ID is required'],
    },
    serviceName: {
      type: String,
      trim: true,
      required: [true, 'Service name is required'],
      maxlength: [50, 'Service name cannot be more than 50 characters'],
    },
    coverImg: {
      type: String,
      required: [
        function () {
          return this.coverImg != ''
        },
        'A destination must have a cover image',
      ],
    },

    images: [String],

    description: {
      type: String,
      trim: true,
      required: [true, 'Service description is required'],
    },

    serviceMobileNumber: {
      type: String,
      default: '',
      required: [
        function () {
          return this.serviceMobileNumber != ''
        },
        'Service mobile number is required',
      ],
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
    serviceType: {
      type: String,
      required: [true, 'service type is required'],
      enum: {
        values: [
          'accomodation',
          'transportation',
          'food',
          'tourGuide',
          'others',
        ],
        message:
          'Service type needs to be accomodation, transportation, food, tourGuide or others',
      },
    },

    price: {
      type: Number,
      required: [true, 'service price is required'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      max: [100, 'Service price discount cannot be more than 100%'],
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

//creating virtual fields
serviceSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) return 4.5
  const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0)
  return sum / this.reviews.length
})

serviceSchema.virtual('numOfRatings').get(function () {
  return this.reviews.length
})

//populating schema for specific id request
serviceSchema.pre('findOne', function (next) {
  this.populate([
    {
      path: 'reviews',
      populate: {
        path: 'user',
        select: '-password',
      },
    },
    {
      path: 'destination',
    },
    {
      path: 'business',
    },
  ])
  next()
})

const Service = mongoose.model('Service', serviceSchema) //create a model

export default Service //export the model
