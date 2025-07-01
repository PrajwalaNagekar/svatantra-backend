import express from 'express'
import { admission } from '../controllers/UserController/Admission.controller.js'
import { BookAVisit } from '../controllers/UserController/BookAVisit.controller.js'
import { contact } from '../controllers/UserController/contact.controller.js'
import { submitTrainingApplication } from '../controllers/UserController/TeacherTraining.controller.js'
const router = express.Router()

router.post('/admission', admission)
router.post('/book-a-visit', BookAVisit)
router.post('/contact', contact)
router.post('/teacher-training', submitTrainingApplication)



export default router;