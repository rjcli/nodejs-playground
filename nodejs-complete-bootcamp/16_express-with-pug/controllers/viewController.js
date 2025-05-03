exports.getOverview = (req, res) => {
  // 1) Get tour data from the collection
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All tours',
  });
};

exports.getTour = (req, res) => {
  // res.status(200).render('tour');

  // Passing object (called locals)
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
