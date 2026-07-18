'use strict'

import Review from './reviewmodel.js'

export const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, practica, supervisor, fecha } = req.query

    const filter = {}

    if (practica) {
      filter.practica = practica
    }

    if (supervisor) {
      filter.supervisor = supervisor
    }

    if (fecha) {
      filter.fecha = fecha
    }

    const reviews = await Review.find(filter)
      .populate('practica')
      .populate('supervisor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await Review.countDocuments(filter)

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit)
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting reviews',
      error: error.message
    })
  }
}

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params

    const review = await Review.findById(id)
      .populate('practica')
      .populate('supervisor')

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      })
    }

    res.status(200).json({
      success: true,
      data: review
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting review',
      error: error.message
    })
  }
}
