import Practice from './practicemodel.js';

export const getPractices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      estudiante,
      empresa,
      estado,
      fecha
    } = req.query;

    const filter = {};

    if (estudiante) {
      filter.estudiante = estudiante;
    }
    if (empresa) {
      filter.empresa = empresa;
    }
    if (estado) {
      filter.estado = estado;
    }
    if (fecha) {
      filter.fecha = fecha;
    }

    const practices = await Practice.find(filter)
      .populate('estudiante')
      .populate('empresa')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Practice.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: practices,
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
      message: 'Error getting practices',
      error: error.message
    });
  }
};

export const getPracticeById = async (req, res) => {
  try {
    const { id } = req.params;

    const practice = await Practice.findById(id)
      .populate('estudiante')
      .populate('empresa');

    if (!practice) {
      return res.status(404).json({
        success: false,
        message: 'Practice not found'
      });
    }

    res.status(200).json({
      success: true,
      data: practice
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting practice',
      error: error.message
    });
  }
};
