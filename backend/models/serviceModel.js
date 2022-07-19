/* This file contains the data modelling and data tier functionalities for services */

import mongoose from 'mongoose' //import mongoose from

//create a services schema
const serviceSchema = new mongoose.Schema(
  {
    destinationID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'service destination ID is required'],
    },
    serviceName: {
      type: String,
      trim: true,
      required: [true, 'Service name is required'],
    },
    coverImage: {
      type: String,
      required: [true, 'Service cover image is required'],
    },

    images: [String],

    summary: {
      type: String,
      trim: true,
      required: [true, 'Service summary is required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Service description is required'],
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'service business ID is required'],
    },
    serviceMobileNumber: {
      type: String,
      required: [true, 'service mobile number is required'],
    },
    serviceType: {
      type: String,
      required: [true, 'service type is required'],
    },
    price: {
      type: Number,
      required: [true, 'service price is required'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Service = mongoose.model('Service', serviceSchema) //create a model

export default Service //export the model
