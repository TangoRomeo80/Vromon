/* This file contains the data modelling and data tier functionalities for destinations */

import mongoose from 'mongoose' //import mongoose

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
    imgCover: {
      type: String,
      default: '',
      required: [
        function () {
          return this.imgCover != ''
        },
        'A destination must have a cover image',
      ],
    },
    images: [String],
  },
  {
    timestamps: true,
  }
)

//Create Destination Model
const Destination = mongoose.model('Destination', destinationSchema)

export default Destination
