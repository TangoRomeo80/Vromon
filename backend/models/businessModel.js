/* This file contains the data modelling and data tier functionalities for Businesses */

import mongoose from 'mongoose'

//Create a Business schema
const businessShcema = new mongoose.Schema(
    {
        businessOwnerID:{
            type: mongoose.Schema.Types.ObjectId,
            // ref: ,
            required: [true, 'Business Owner ID is required'],
        },

        businessName:{
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
        
    }
)


//Create Business Model
const Business = mongoose.model('Business',)

export default Business