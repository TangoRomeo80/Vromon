/* This file contains the data modelling and data tier functionalities for destinations */

import mongoose from 'mongoose' //import mongoose

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
      default: 1,
      min: 1,
      max: 5,
      required: [true, 'Review must have a rating'],
    },
  },
  {
    timestamps: true,
  }
)

//create destinations schema
const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Destination Name is Required'],
      maxlength: [50, 'Destination Name cannot be more than 50 characters'],
    },
    district: {
      type: String,
      trim: true,
      required: [true, 'District Name is Required'],
      maxlength: [30, 'District Name cannot be more than 30 characters'],
    },
    division: {
      type: String,
      trim: true,
      required: [true, 'Division Name is Required'],
      maxlength: [30, 'Division Name cannot be more than 30 characters'],
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Address is Required for a destination'],
      maxlength: [200, 'Address cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: 'No description for this destination',
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    coverImg: {
      type: String,
      default: '',
      required: [
        function () {
          return this.coverImg != ''
        },
        'A destination must have a cover image',
      ],
    },
    images: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    numOfRatings: {
      type: Number,
      default: 0,
    },
    mapEmbed: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

// //creating virtual fields
// destinationSchema.virtual('averageRating').get(function () {
//   if (this.reviews.length === 0) return 4.5
//   const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0)
//   return sum / this.reviews.length
// })

// destinationSchema.virtual('numOfRatings').get(function () {
//   return this.reviews.length
// })

//populating rating before save
destinationSchema.pre('save', function (next) {
  if (this.reviews.length === 0) {
    this.rating = 1
    this.numOfRatings = 0
  } else {
    const sum = this.reviews.reduce((acc, curr) => acc + curr.rating, 0)
    this.rating = sum / this.reviews.length
    this.numOfRatings = this.reviews.length
  }
  next()
})

//populating rating before update
destinationSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update.reviews) {
    next()
  }
  if (this._update.reviews.length === 0) {
    this._update.rating = 1
    this._update.numOfRatings = 0
  } else {
    const sum = this._update.reviews.reduce((acc, curr) => acc + curr.rating, 0)
    this._update.rating = sum / this._update.reviews.length
    this._update.numOfRatings = this._update.reviews.length
  }
  next()
})

//populating schema for specific id request
destinationSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'userName image',
      },
    },
  ])
  next()
})

//Create Destination Model
const Destination = mongoose.model('Destination', destinationSchema)

export default Destination
