/* This file contains the generic factory method templates for CRUD operations */

import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import APIFeatures from '../utils/apiFeatures.js'

//Get all instances
export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const doc = await features.query

    if (doc.length < 1) {
      return next(
        new AppError(`No ${Model.collection.collectionName} found`, 404)
      )
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    })
  })

//Get one instance
export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (populateOptions) query = query.populate(populateOptions)
    const doc = await query

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with that ID`,
          404
        )
      )
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

//function to create new instance
export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} could be created`,
          429
        )
      )
    }

    res.status(201).json({
      status: 'success',
      data: doc,
    })
  })

//fnction to update instance
export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with that ID`,
          404
        )
      )
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

//function to delete instance
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with that ID`,
          404
        )
      )
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })
