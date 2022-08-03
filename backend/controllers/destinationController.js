/* This file contains the logic for handling requests and communicating with the destination data model*/

import Destination from '../models/destinationModel.js' //import
import apiFeatures from '../utils/apiFeatures'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'


// Request type: POST
// Endpoint: /api/destinations/
// Description: This endpoint creates new destination
export const createDestination = catchAsync(async (req, res, next) => {
    
    const newDestination = await Destination.create(req.body) //method using mongoose create
  
    if (!newDestination) {
      return next(new AppError('Destination Cannot be Created', 429))
    }
  
    res.status(201).json({
      status: 'success',
      data: newDestination,
    })
  })


//   Request type: PATCH
//   Endpoint: /api/destinations/:id
//   Description: This endpoint updates specific destination

  export const updateDestination = catchAsync(async (req, res, next) => {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
  
    if (!updatedDestination) {
      return next(new AppError('No Destination is found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: updatedDestination,
    })
  })



//   Request type: DELETE
//   Endpoint: /api/destinations/:id
//   Description: This endpoint deletes a specific destination

export const deleteDestination = catchAsync(async (req, res, next) => {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id)
  
    if (!deletedDestination) {
      return next(new AppError('No Destination is found with that ID', 404))
    }
  
    res.status(204).json({
      status: 'success',
      data: null,
    })
  })