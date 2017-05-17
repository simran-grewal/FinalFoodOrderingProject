var router =   require('express').Router();
var Category = require('../models/category');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/add-category',  (req, res, next) => {
  console.log(req.user);
  if(!req.user || req.user.email != 'manjit@gmail.com'){
    res.redirect('/');
  }
  else{
  res.render('admin/add-category', {
    message: req.flash('success')
  });
}
});


router.post('/add-category', (req, res, next) => {
  var category = new  Category();
  category.name = req.body.name;

  category.save((err) => {
    if(err) return next(err);
    req.flash('success', 'Successfully added a category');
    return res.redirect('/add-category');
  });
});


router.get('/add-list-item', (req, res, next) => {
  if(!req.user || req.user.email != 'manjit@gmail.com'){
    res.redirect('/');
  } else{
      res.render('admin/addListItem',{
      message: req.flash('success')
    });
  }

})

router.post('/add-list-item', upload.single(),(req, res, next) => {
  res.send(req.files);
});

module.exports = router;
