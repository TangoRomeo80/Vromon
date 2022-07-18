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
