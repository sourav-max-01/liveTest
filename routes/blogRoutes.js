const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');

// Create a new blog
router.post('/blogs', async (req, res) => {
    try {
        const blog = new blogModel(req.body);
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read a single blog by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a blog by ID
router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a blog by ID
router.patch('/blogs/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'short_des', 'des', 'img'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }

        updates.forEach((update) => (blog[update] = req.body[update]));
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
