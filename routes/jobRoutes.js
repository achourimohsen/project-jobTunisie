const express = require('express');
const router = express.Router();
const { 
    createJob, singleJob, updateJob, 
    showJobs1, showJobs2, showJobs3, showJobs4, showJobs5, showJobs6
} = require('../controllers/jobController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//jobs routes
// /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// /api/jobs/show
router.get('/jobs/show1', showJobs1);
router.get('/jobs/show2', showJobs2);
router.get('/jobs/show3', showJobs3);
router.get('/jobs/show4', showJobs4);
router.get('/jobs/show5', showJobs5);
router.get('/jobs/show6', showJobs6);



module.exports = router;