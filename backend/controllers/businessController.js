/* This file contains the logic for handling requests and communicating with the Business data model*/

import Business from "../models/businessModel";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Request type: POST
// Endpoint: /api/businesses/
// Description: This endpoint creates new business
export const createBusiness = catchAsync(async (req, res, next) => {

  //method using mongoose create
  const newBusiness = await Business.create(req.body);

  if (!newBusiness) {
    return next(new AppError("Business cannot be Created", 429));
  }

  res.status(201).json({
    status: "success",
    data: newBusiness,
  });
});


//   Request type: PATCH
//   Endpoint: /api/businesses/:id
//   Description: This endpoint updates specific business
export const updateBusiness = catchAsync(async (req, res, next) => {
    const updatedBusiness = await Business.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if(!updatedBusiness){
        return next(new AppError('No Business is Found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: updatedBusiness
    })
})


//   Request type: DELETE
//   Endpoint: /api/businesses/:id
//   Description: This endpoint deletes a specific business
export const deleteBusiness = catchAsync(async (req, res, next) => {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id)

    if(!deletedBusiness)
    {
        return next(new AppError('No Business Found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})


// Request type: GET
// Endpoint: /api/businesses/
// Description: This endpoint returns all Businesses
export const getAllBusinesses = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Business.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const businesses = await features.query

    if(businesses.length < 1)
    {
        return next(new AppError('No Businesses Found', 404))
    }

    res.status(200).json({
        status: 'success',
        result: businesses.length,
        data: businesses
    })
})


// Request type: GET
// Endpoint: /api/businesses/:id
// Description: This endpoint returns a businesses with :id
export const getBusiness = catchAsync(async (req, res, next) => {
    const business = await Business.findById(req.params.id) //method using mongoose findById

    if(!business)
    {
        return next(new AppError('No Business Found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: business
    })
})
