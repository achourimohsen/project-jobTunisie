const express = require('express')
const router = express.Router()
const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../controllers/jobTypeController')
const { isAuthenticated, isAdmin } = require('../middleware/auth')



//job type routes

// /api/type/create
router.post('/job-type/create', isAuthenticated, createJobType)
// /api/type/jobs
router.get('/job-type/jobs', allJobsType)
// /api/type/update/type_id
router.put("/type/update/:type_id", isAuthenticated, isAdmin, updateJobType)
// /api/type/delete/type_id
router.delete("/type/delete/:type_id", isAuthenticated, isAdmin, deleteJobType)





module.exports = router