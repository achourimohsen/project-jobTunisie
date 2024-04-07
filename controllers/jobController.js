const Job = require('../models/jobModel');
const ErrorResponse = require('../utils/errorResponse');

//create job
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job ////////////////////////////
        })
    } catch (error) {
        next(error);
    }
}

//update job by id 
//feha populate 
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}



// show joooobs
// show 1
exports.showJobs1 = async (req, res, next) => {
    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({}).estimatedDocumentCount();
    const pages = Math.ceil(count / pageSize)
    try {
        const jobs = await Job.find().skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            count,
            pages,
        })
    } catch (error) {
        next(error);
    }
}

// show 2
exports.showJobs2 = async (req, res, next) => {
    // enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}

    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword }).countDocuments();
    const pages = Math.ceil(count / pageSize)

    try {
        const jobs = await Job.find({ ...keyword }).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages,
            count
        })
    } catch (error) {
        next(error);
    }
}


const JobType = require('../models/jobTypeModel');
// show 3
exports.showJobs3 = async (req, res, next) => {
    // enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}

    // filter jobs by category ids
    let ids= []
    const JobsCategory = await JobType.find({}, {_id:1})

    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword }).countDocuments();


    try {
        const jobs = await Job.find({ ...keyword }).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            JobsCategory
        })
    } catch (error) {
        next(error);
    }
}

// show 4
exports.showJobs4 = async (req, res, next) => {
    // enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}

    // filter jobs by category ids
    let ids= []
    const jobTypeGategory = await JobType.find({}, {_id:1})
    jobTypeGategory.forEach(cat => {
        ids.push(cat._id)
    })


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword }).countDocuments();


    try {
        const jobs = await Job.find({ ...keyword }).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            ids
        })
    } catch (error) {
        next(error);
    }
}

// show 5
exports.showJobs5 = async (req, res, next) => {
    // enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}

    // filter jobs by category ids
    let ids= []
    const jobTypeGategory = await JobType.find({}, {_id:1})
    jobTypeGategory.forEach(cat => {
        ids.push(cat._id)
    })

    let cat = req.query.cat
    let categ = cat !== '' ? cat : ids

    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword, jobType: categ }).countDocuments();


    try {
        const jobs = await Job.find({ ...keyword }).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
        })
    } catch (error) {
        next(error);
    }
}

// show 6
exports.showJobs6 = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('jobType', 'jobTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation

        })
    } catch (error) {
        next(error);
    }
}






