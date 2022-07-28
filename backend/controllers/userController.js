/* This file contains the logic for handling requests and communicating with the user data model*/

import User from '../models/userModel.js' //import service data model
import APIFeatures from '../utils/apiFeatures.js' //import API feature utility
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'