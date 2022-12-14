/* This file contains the logic for handling requests and communicating with the service data model*/

import Service from '../models/serviceModel.js' //import service data model

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js' //import generic handler

/*
 Alias middleware for getting most popular services
*/

export const getMostPopularServices = async (req, res, next) => {
  req.query.limit = '4'
  req.query.sort = '-rating'
  next()
}

/*
  Alias middleware for getting cheapest tours
*/
export const getCheapestTours = async (req, res, next) => {
  req.query.limit = '8'
  req.query.sort = 'price'
  req.query.serviceType = 'tours'
  next()
}

/*
  Request type: GET
  Endpoint: /api/services/
  Description: This endpoint returns all services
*/

export const getAllServices = getAll(Service)

/*
  Request type: GET
  Endpoint: /api/services/:id
  Description: This endpoint returns service with :id
*/

export const getService = getOne(Service)

/*
  Request type: POST
  Endpoint: /api/services/
  Description: This endpoint creates a new service
*/

export const createService = createOne(Service)

/*
  Request type: PATCH
  Endpoint: /api/services/:id
  Description: This endpoint updates a specific service
*/

export const updateService = updateOne(Service)

/*
  Request type: DELETE
  Endpoint: /api/services/:id
  Description: This endpoint deletes a specific service
*/

export const deleteService = deleteOne(Service)
