const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    // To allow for nested GET reviews on tour
    let filter = {};

    if (req.params.tourId) {
      filter = {
        tour: req.params.tourId,
      };
    }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsyncError(async (req, res, next) => {
    // findById: It is a shorthand for findOne({ _id: req.params.id }).

    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      // Add 'return' to return the error and then exit from the function
      return next(
        new AppError(`No document found with ID '${req.params.id}'`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No document found with ID '${req.params.id}'`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No document found with ID '${req.params.id}'`, 404),
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
