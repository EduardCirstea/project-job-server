const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Job = require('../models/jobModel')

//@desc    Get user jobs
//@route   Get /api/jobs
//@access  Private
const getJobs = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const jobs = await Job.find({ user: req.user.id })

  res.status(200).json(jobs)
})

const getAllJobs = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const jobs = await Job.find({ user: req.user.id })

  res.status(200).json(jobs)
})

//@desc    Get user job
//@route   Get /api/jobs/:id
//@access  Private
const getJob = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(404)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(job)
})

//@desc    Create new job
//@route   POST /api/jobs
//@access  Private
const createJob = asyncHandler(async (req, res) => {
  const {
    numeAngajator,
    emailAngajator,
    numeFirma,
    numeJob,
    tipJob,
    locatie,
    remote,
    anExperienta,
    description,
  } = req.body
  if (
    !numeAngajator ||
    !emailAngajator ||
    !numeFirma ||
    !numeJob ||
    !locatie ||
    !remote ||
    !anExperienta ||
    !tipJob
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const job = await Job.create({
    numeAngajator,
    emailAngajator,
    numeFirma,
    numeJob,
    tipJob,
    locatie,
    remote,
    anExperienta,
    description,
    user: req.user.id,
  })

  res.status(201).json(job)
})

//@desc    Delete job
//@route   Delete /api/jobs/:id
//@access  Private
const deleteJob = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(404)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await job.remove()

  res.status(200).json({ success: true })
})

//@desc    Update job
//@route   PUT /api/jobs/:id
//@access  Private
const updateJob = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(404)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedJob)
})

module.exports = {
  createJob,
  getJobs,
  getJob,
  deleteJob,
  updateJob,
}
