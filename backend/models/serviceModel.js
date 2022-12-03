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

//create accomodation Schema
const accomodationSchema = new mongoose.Schema({
  address: {
    house: {
      type: String,
      default: '',
      trim: true,
    },
    street: {
      type: String,
      default: '',
      trim: true,
    },
    area: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      default: '',
      trim: true,
    },
  },
  ownerContact: {
    type: String,
    default: '',
    required: [true, 'Accomodation must have an owner contact'],
    validate: {
      validator: function (val) {
        if (val !== '') {
          return validator.isNumeric(val)
        } else {
          return true
        }
      },
      message:
        'Owner contact number can only have numeric values and country codes',
    },
  },
  ownerName: {
    type: String,
    default: '',
    required: [true, 'Accomodation must have an owner name'],
    trim: true,
  },
  ownerNid: {
    type: String,
    required: [true, 'Accomodation must have an owner NID'],
    default: '',
    trim: true,
    validate: {
      validator: function (val) {
        if (val === '') return true
        return (val.length === 10 || val.length === 17) && validator.isNumeric
      },
      message: 'nid number needs to be of 10 or 17 digits',
    },
  },
  rooms: {
    type: Number,
    default: 1,
    min: 1,
    max: 10,
    required: [true, 'Accomodation must have a number of rooms'],
  },
  checkinDate: {
    type: Date,
    default: Date.now(),
    required: [true, 'Accomodation must have a rent start date'],
  },
  checkoutDate: {
    type: Date,
    default: Date.now(),
    required: [true, 'Accomodation must have a rent end date'],
  },
  maxGuests: {
    type: Number,
    default: 1,
    min: 1,
    max: 10,
  },
})

//create transport Schema
const transportSchema = new mongoose.Schema({
  transportType: {
    type: String,
    default: 'car',
    enum: {
      values: ['bus', 'car'],
      message: 'Transport type must be car or bus',
    },
  },
  departFrom: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'Ticket from is required for bus',
    ],
  },
  departTo: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'Ticket to is required for bus',
    ],
  },
  departDate: {
    type: Date,
    default: Date.now(),
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'There needs to be a departureDate for bus',
    ],
  },
  departTime: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'There needs to be a departureTime for bus',
    ],
  },
  arrivalDate: {
    type: Date,
    default: Date.now(),
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'There needs to be a arrivalDate for bus',
    ],
  },
  arrivalTime: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'bus'
      },
      'There needs to be a arrivalTime for bus',
    ],
  },
  returnDate: {
    type: Date,
    default: null,
  },

  returnTime: {
    type: String,
    default: '',
  },

  busType: {
    type: String,
    default: 'AC',
    enum: {
      values: ['AC', 'Non-AC'],
      message: 'Bus type must be AC or Non-AC',
    },
  },

  pickUpFrom: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a pickupFrom for car',
    ],
  },
  dropTo: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a dropTo for car',
    ],
  },
  rentDuration: {
    type: Number,
    default: 0,
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a rentDuration for car',
    ],
  },
  pickUpDate: {
    type: Date,
    default: Date.now(),
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a rentStartDate for car',
    ],
  },
  dropOffDate: {
    type: Date,
    default: Date.now(),
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a rentEndDate for car',
    ],
  },
  pickUpTime: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a rentStartTime for car',
    ],
  },
  dropOffTime: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a rentEndTime for car',
    ],
  },
  driverName: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a driverName for car',
    ],
  },
  driverContact: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a driverContact for car',
    ],
    validate: {
      validator: function (val) {
        if (val !== '') {
          return validator.isNumeric(val)
        } else {
          return true
        }
      },
      message:
        'Owner contact number can only have numeric values and country codes',
    },
  },
  driverLicense: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a driverLicense for car',
    ],
  },
  carRegistration: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a carRegistration for car',
    ],
  },
  carRegistrationImage: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a carRegistrationImage for car',
    ],
  },
  carModel: {
    type: String,
    default: '',
    required: [
      function () {
        return this.transportType === 'car'
      },
      'There needs to be a carModel for car',
    ],
  },
})

//create tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: [true, 'Tour must have a name'],
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have a duration'],
    min: 1,
    max: 10,
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a maximum group size'],
  },
  startLocation: {
    type: String,
    default: '',
    required: [true, 'Tour must have a start location'],
  },
  locations: [
    {
      type: String,
      default: '',
      required: [true, 'Tour must have a location'],
    },
  ],
  guideNames: [
    {
      type: String,
      default: '',
      required: [true, 'Tour must have a guide name'],
    },
  ],
  leadGuideName: {
    type: String,
    default: '',
    required: [true, 'Tour must have a lead guide name'],
  },
  leadGuideNid: {
    type: String,
    default: '',
    required: [true, 'Tour must have a lead guide NID'],
    trim: true,
    validate: {
      validator: function (val) {
        if (val === '') return true
        return (val.length === 10 || val.length === 17) && validator.isNumeric
      },
      message: 'nid number needs to be of 10 or 17 digits',
    },
  },
  leadGuideContact: {
    type: String,
    default: '',
    required: [true, 'Tour must have a lead guide contact'],
    trim: true,
    validate: {
      validator: function (val) {
        if (val === '') return true
        return validator.isNumeric(val)
      },
    },
  },
})

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
        'A service must have a cover image',
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
        values: ['accomodation', 'transportation', 'tours'],
        message:
          'Service type needs to be accomodation, transportation or tours',
      },
    },

    transportInfo: {
      type: transportSchema,
      default: function () {
        return this.serviceType === 'transportation' ? {} : undefined
      },
      required: [
        function () {
          return this.serviceType === 'transportation'
        },
        'There needs to be a transportInfo for transportation',
      ],
    },

    accomodationInfo: {
      type: accomodationSchema,
      default: function () {
        return this.serviceType === 'accomodation' ? {} : undefined
      },
      required: [
        function () {
          return this.serviceType === 'accomodation'
        },
        'There needs to be a accomodationInfo for accomodation',
      ],
    },

    tourInfo: {
      type: tourSchema,
      default: function () {
        return this.serviceType === 'tours' ? {} : undefined
      },
      required: [
        function () {
          return this.serviceType === 'tours'
        },
        'There needs to be a toursInfo for tours',
      ],
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
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    numOfRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

//creating virtual fields
// serviceSchema.virtual('averageRating').get(function () {
//   if (this.reviews.length === 0) return 4.5
//   const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0)
//   return sum / this.reviews.length
// })

// serviceSchema.virtual('numOfRatings').get(function () {
//   return this.reviews.length
// })

//populating rating before save
serviceSchema.pre('save', function (next) {
  if (this.reviews.length === 0) {
    this.rating = 4.5
    this.numOfRatings = 0
  } else {
    const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0)
    this.rating = sum / this.reviews.length
    this.numOfRatings = this.reviews.length
  }
  next()
})

//populating rating before update
serviceSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update.reviews) {
    next()
  }
  if (this._update.reviews.length === 0) {
    this._update.rating = 4.5
    this._update.numOfRatings = 0
  } else {
    const sum = this._update.reviews.reduce((acc, curr) => acc + curr.rating, 0)
    this._update.rating = sum / this._update.reviews.length
    this._update.numOfRatings = this._update.reviews.length
  }
  next()
})

//populating schema for specific id request
serviceSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'userName image',
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
