import express from 'express'
import { admission } from '../controllers/UserController/Admission.controller.js'
import { BookAVisit } from '../controllers/UserController/BookAVisit.controller.js'
import { contact } from '../controllers/UserController/contact.controller.js'
const router = express.Router()

router.post('/admission', admission)
router.post('/book-a-visit', BookAVisit)
router.post('/contact', contact)



export default router;