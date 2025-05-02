const mongoose = require('mongoose');

const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Making sure each combination of tour and user is unique. So that
// reviews must be unique.
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// If you want to populate multiple fields then you need to call
// populate function for same number of times. However, populate function
// is computational heavy. So, calling this multiple time will result
// with more time in query execution.
// If the populated field is empty then it won't be shown.
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  // Populating only the user not tours (Creates chaining)
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// Calculates and updates averageRatings and numberOfRatings when a new
// review is given.
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// findByIdAndUpdate and findByIdAndDelete only have access to query middleware.
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // Creating a new property on the current object to access this inside post hook.
  this.currentDocumentId = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // this.findOne(); Won't work here because the query is already executed.
  await this.currentDocumentId.constructor.calcAverageRatings(
    this.currentDocumentId.tour,
  );
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
