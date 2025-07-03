import express from 'express'
import { adminLogin } from '../controllers/AdminController/login.controller.js'
import { deleteGalleryImage, galleryUpload, getAllGalleryImages, getGalleryImageById } from '../controllers/AdminController/gallery.controller.js';
import upload from '../middlewares/upload.js';
import { verifyAdminToken } from '../middlewares/authMiddleware.js';
import { allApplications } from '../controllers/AdminController/Application.controller.js';
import { allEnquiries } from '../controllers/AdminController/Enquiry.controller.js';
import { allVisits } from '../controllers/AdminController/visit.controller.js';
import { allTeacherApplications } from '../controllers/AdminController/TeacherTraining.controller.js';
import { addEvent, deleteEvent, fetchAllEvents, updateEvent } from '../controllers/AdminController/Event.controller.js';
import { getDashboardCounts } from '../controllers/AdminController/Dashboard.controller.js';
const router = express.Router()

router.post('/login', adminLogin)
router.use(verifyAdminToken)

//gallery
router.post('/upload', upload.array('images', 10), galleryUpload);
router.get('/all-images', getAllGalleryImages);
router.delete('/delete-image/:id', deleteGalleryImage);
router.get('/get-image-by-id/:id', getGalleryImageById);

//admissions
router.get('/all-applications', allApplications)

//enquiry
router.get('/all-enquiries', allEnquiries)

//visits
router.get('/all-visits', allVisits)

//teacher Applications
router.get('/all-teacher-applications', allTeacherApplications)

//events
router.post('/add-event', upload.single('image'), addEvent);
router.get('/all-events', fetchAllEvents);
router.put('/update-event/:id', upload.single('image'), updateEvent);
router.delete('/delete-event/:id', deleteEvent);

//dashboard
router.get('/dashboard-counts', getDashboardCounts)


export default router