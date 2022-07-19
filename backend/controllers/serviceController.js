/* This file contains the logic for handling requests and communicating with the data models*/

import Service from '../models/serviceModel.js' //import service data model

/*
  Request type: GET
  Endpoint: /api/services
  Description: This endpoint returns all services
*/
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.status(200).json({
      status: 'success',
      data: services,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

/*
  Request type: GET
  Endpoint: /api/services/:id
  Description: This endpoint returns service with :id
*/
export const getService = async (req, res) => { 
  try {
    const service = await Service.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: service,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

/*
  Request type: POST
  Endpoint: /api/services
  Description: This endpoint creates a new service
*/
export const createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body)
    res.status(201).json({
      status: 'success',
      data: newService,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}


