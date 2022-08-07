/* This file contains the data modelling and data tier functionalities for Businesses */

import mongoose from 'mongoose'
import validator from 'validator'

//Create a Business schema
const businessShcema = new mongoose.Schema(
    {
        businessOwnerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
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

        businessPhone: {
            type: String,
            trim: true,
            required: [true, 'Phone Number is Required'],
            default: '',
            validate: {
                validator: function(phn)
                {
                    if(phn!==''){
                        return((phn.length=== 11 || phn.length===15) && validator.isNumeric)
                    }
                    else{
                        return true
                    }
                },
                message: 'Phone Number should contain 11 or 15 digits & can contain only numerics & + sign'
            } 
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

        businessTIN:{
            type: String,
            required: [true, 'TIN Number is Required'],
            unique: true,
        },

        businessLicense: {
            type: String,
            required: [true, 'License Number is Required'],
            unique: true,
        },
    }
)


//Create Business Model
const Business = mongoose.model('Business', businessShcema)

export default Business