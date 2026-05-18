const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET /api/jobs - List all jobs with optional filters
router.get('/', async (req, res, next) => {
    try {
        const { category, status } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
});

// GET /api/jobs/:id - Fetch a single job
router.get('/:id', async (req, res, next) => {
    try {
        const job = await JobRequest.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
        next(error);
    }
});

// POST /api/jobs - Create a new job
router.post('/', async (req, res, next) => {
    try {
        const newJob = new JobRequest(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        next(error);
    }
});

// PATCH /api/jobs/:id - Update status
router.patch('/:id', async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ error: 'Status is required' });

        const updatedJob = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(updatedJob);
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
        next(error);
    }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
        next(error);
    }
});

module.exports = router;