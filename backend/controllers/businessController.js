/* This file contains the logic for handling requests and communicating with the Business data model*/

import Business from '../models/businessModel.js'

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js' //import generic handler

/* 
Request type: POST
Endpoint: /api/businesses/
Description: This endpoint creates new business
*/

export const createBusiness = createOne(Business)

/*  
Request type: PATCH
Endpoint: /api/businesses/:id
Description: This endpoint updates specific business
*/

export const updateBusiness = updateOne(Business)

/*
Request type: DELETE
Endpoint: /api/businesses/:id
Description: This endpoint deletes a specific business
*/
export const deleteBusiness = deleteOne(Business)

/*
Request type: GET
Endpoint: /api/businesses/
Description: This endpoint returns all Businesses
*/

export const getAllBusinesses = getAll(Business)

/*
Request type: GET
Endpoint: /api/businesses/:id
Description: This endpoint returns a businesses with :id
*/

export const getBusiness = getOne(Business)
