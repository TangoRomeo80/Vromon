/* This file contains the logic for handling requests and communicating with the destination data model*/

import Destination from '../models/destinationModel.js' //import

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js' //import generic handler

/*
Request type: POST
Endpoint: /api/destinations/
Description: This endpoint creates new destination
*/

export const createDestination = createOne(Destination)

/*
Request type: PATCH
Endpoint: /api/destinations/:id
Description: This endpoint updates specific destination
*/

export const updateDestination = updateOne(Destination)

/*
Request type: DELETE
Endpoint: /api/destinations/:id
Description: This endpoint deletes a specific destination
*/

export const deleteDestination = deleteOne(Destination)

/*
Request type: GET
Endpoint: /api/destinations/
Description: This endpoint returns all destinations
*/

export const getAllDestinations = getAll(Destination)

/*
Request type: GET
Endpoint: /api/destinations/:id
Description: This endpoint returns a destination with :id
*/

export const getDestination = getOne(Destination)
