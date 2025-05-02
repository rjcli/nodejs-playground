const mongoose = require('mongoose');

// Import this for EMBEDDING, not needed for CHILD REFERENCING
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or, equal than 40 characters',
      ],
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either: easy, medium, or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      // round function makes float values to integer.
      // So, first multiplying by 10 and then dividing by 10 makes sure
      // the ratingsAverage till one decimal place.
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      valdate: {
        validator: function (val) {
          // This only points to the current document on new document creation.
          return val < this.price;
        },
        // ({VALUE}) - MongoDB Syntax
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // guides: Array,  // For EMBEDDING
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexing to improve the read performance
// 1 denotes, we are sorting the data in increasing order
// -1 denotes, we are sorting the data in decreasing order

// Individual Indexing
// tourSchema.index({ price: 1 });

// Compound Indexing
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.pre('save', function (next) {
//   console.log('Will run before saving the document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log('Will run after saving the document...');
//   next();
// });

// EMBEDDING
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);

//   next();
// });

// CHILD REFERENCING
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

/**
 * Virtual populate configuration for the `reviews` field.
 * This allows you to establish a virtual relationship between the `Tour` model
 * and the `Review` model without embedding or referencing directly in the schema.
 *
 * @property {string} ref - The name of the model to reference. In this case, it is `'Review'`.
 *                          This tells Mongoose which model to look for when populating the virtual field.
 * @property {string} foreignField - The name of the field in the referenced model (`Review`)
 *                                   that corresponds to the local field in the current model (`Tour`).
 *                                   Here, it is `'tour'`, which means the `tour` field in the `Review` model
 *                                   will be used to match with the `_id` of the `Tour` model.
 * @property {string} localField - The name of the field in the current model (`Tour`) that will be matched
 *                                 with the `foreignField` in the referenced model (`Review`).
 *                                 Here, it is `_id`, which is the unique identifier for each tour.
 */
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
