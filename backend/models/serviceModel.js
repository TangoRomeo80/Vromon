import mongoose from 'mongoose' //import mongoose from

//create a services schema
const serviceSchema = new mongoose.Schema(
  {
    destinationID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    serviceName: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    serviceMobileNumber: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    ratingQuantity: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Service = mongoose.model('Service', serviceSchema) //create a model

export default Service //export the model
