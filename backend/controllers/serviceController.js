/* This file contains the logic for handling requests and communicating with the service data model*/

import Service from '../models/serviceModel.js' //import service data model
import APIFeatures from '../utils/apiFeatures.js' //import API feature utility
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

/*
 Alias middleware for getting most popular services
*/

export const getMostPopularServices = async (req, res, next) => {
  req.query.limit = '10'
  req.query.sort = '-rating'
  next()
}

/*
  Request type: GET
  Endpoint: /api/services/
  Description: This endpoint returns all services
*/
export const getAllServices = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Service.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const services = await features.query

  if (services.length < 1) {
    return next(new AppError('No services found', 404))
  }

  res.status(200).json({
    status: 'success',
    results: services.length,
    data: services,
  })
})

/*
  Request type: GET
  Endpoint: /api/services/:id
  Description: This endpoint returns service with :id
*/
export const getService = catchAsync(async (req, res, next) => {
  // Service.findOne({ _id: req.params.id }) //method using mongodb findOne
  const service = await Service.findById(req.params.id) //method using mongoose findById

  if (!service) {
    return next(new AppError('No service found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: service,
  })
})

/*
  Request type: POST
  Endpoint: /api/services/
  Description: This endpoint creates a new service
*/
export const createService = catchAsync(async (req, res, next) => {
  // const newService = new Service({})
  // newService.save() // method using mongodb save
  const newService = await Service.create(req.body) //method using mongoose create

  if (!newService) {
    return next(new AppError('No service could be created', 429))
  }

  res.status(201).json({
    status: 'success',
    data: newService,
  })
})

/*
  Request type: PATCH
  Endpoint: /api/services/:id
  Description: This endpoint updates a specific service
*/
export const updateService = catchAsync(async (req, res, next) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!updatedService) {
    return next(new AppError('No service found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: updatedService,
  })
})

/*
  Request type: DELETE
  Endpoint: /api/services/:id
  Description: This endpoint deletes a specific service
*/
export const deleteService = catchAsync(async (req, res, next) => {
  const deletedService = await Service.findByIdAndDelete(req.params.id)

  if (!deletedService) {
    return next(new AppError('No service found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
