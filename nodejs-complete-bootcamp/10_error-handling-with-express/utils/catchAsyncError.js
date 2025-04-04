module.exports = (fn) => {
  return (req, res, next) => {
    // Both line produces the same result.
    // fn(req, res, next).catch((err) => next(err));
    fn(req, res, next).catch(next);
  };
};
