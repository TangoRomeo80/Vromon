import express from 'express'
import { upload, deleteFile } from '../controllers/uploadController.js'

const router = express.Router()

router.post('/:filePath', upload.single('image'), (req, res) => {
  const filePath = `uploads/${req.params.filePath}`
  deleteFile(filePath)
  res.send(`/${req.file.path}`)
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})



export default router
