var router =   require('express').Router();
var Category = require('../models/category');
var async = require('async');
var Product = require('../models/product');
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

router.post('/add-list-item', (req, res, next) => {

  async.waterfall([
    (callback) => {
      Category.findOne({name: req.body.categoryName}, (err, category) => {
        if(err) return next(err);
        callback(null, category);
      });
    },

    (category, callback) => {
            var product = new Product();
            product.category = category._id;
            product.name = req.body.productName;
            product.price = req.body.productPrice;
            product.image = req.body.productImage;
            product.save();
    }
  ]);

    return res.json({message: 'Success'});

});

module.exports = router;
