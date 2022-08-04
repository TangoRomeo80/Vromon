/* This file contains the data modelling and data tier functionalities for destinations */

import mongoose from 'mongoose' //import mongoose

//create destinations schema
const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Destination Name is Required'],
            maxlength: [50, 'Destination Name cannot be more than 50 characters'],
        },
        district: {
            type: String,
            trim: true,
            // required: [true, 'District Name is Required'],
            maxlength: [30, 'District Name cannot be more than 30 characters'],
        },
        division: {
            type: String,
            trim: true,
            required: [true, 'Division Name is Required'],
            maxlength: [30, 'Division Name cannot be more than 30 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [150, 'Description cannot be more than 150 characters']
        },
        lat: {
            type: String,
            trim: true,
            maxlength:[12, 'Latitude cannot be more than 12 characters'],
            default: ''
        },
        long: {
            type: String,
            trim: true,
            maxlength: [13, 'Longitude cannot be more than 13 characters'],
            default: ''
        },
        destinationImg: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
)

//Create Destination Model
const Destination = mongoose.model('Destination', destinationSchema)

export default Destination