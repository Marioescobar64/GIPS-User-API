import Progress from './reposteHoursmodel.js';

export const getProgressRecords = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      estudiante
    } = req.query;

    const filter = {};

    if (estudiante) {
      filter.estudiante = estudiante;
    }

    const progress = await Progress.find(filter)
      .populate('estudiante')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Progress.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: progress,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting progress records',
      error: error.message
    });
  }
};

export const getProgressById = async (req, res) => {
  try {
    const { id } = req.params;
    const progress = await Progress.findById(id).populate('estudiante');
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting progress record',
      error: error.message
    });
  }
};
