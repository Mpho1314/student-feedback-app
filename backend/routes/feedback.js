import express from 'express'
import Feedback from '../models/Feedback.js'

const router = express.Router()

// GET all feedback
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all feedback...');
    const feedbacks = await Feedback.getAll()
    console.log(`Found ${feedbacks.length} feedback entries`);
    res.json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedback:', error.message)
    res.status(500).json({ 
      error: 'Failed to fetch feedback',
      details: error.message 
    })
  }
})

// POST new feedback
router.post('/', async (req, res) => {
  try {
    console.log('Creating new feedback:', req.body);
    const { studentName, courseCode, courseName, comments, rating } = req.body

    // Validation
    if (!studentName || !courseCode || !courseName || !comments || !rating) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      })
    }

    const newFeedback = await Feedback.create({
      studentName,
      courseCode,
      courseName,
      comments,
      rating
    })

    console.log('Feedback created successfully:', newFeedback.id);
    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      id: newFeedback.id 
    })
  } catch (error) {
    console.error('Error creating feedback:', error.message)
    res.status(500).json({ 
      error: 'Failed to create feedback',
      details: error.message 
    })
  }
})

// DELETE feedback
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('Deleting feedback ID:', id);
    await Feedback.delete(id)
    res.json({ 
      message: 'Feedback deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting feedback:', error.message)
    res.status(500).json({ 
      error: 'Failed to delete feedback',
      details: error.message 
    })
  }
})

export default router
