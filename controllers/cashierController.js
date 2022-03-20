const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cashier = mongoose.model('Cashier');

router.get('/',(req,res) => {
  res.render('cashier/addOrEdit', {
    viewTitle : 'Insert Cashier'
  });
});

router.post('/',(req,res) => {
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req,res) {
  var cashier = new Cashier();
  cashier.fullName = req.body.fullName;
  cashier.salary = req.body.salary;
  cashier.age = req.body.age;
  cashier.email = req.body.email;
  cashier.mobile = req.body.mobile;
  cashier.save((err, doc) => {
    if (!err) {
      res.redirect('cashier/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('cashier/addOrEdit', {
          viewTitle : 'Insert Cashier',
          cashier: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Cashier.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('cashier/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("cashier/addOrEdit", {
          viewTitle: "Update Cashier",
          cashier: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Cashier.find((err, docs) => {
        if (!err) {
            res.render("cashier/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err,body) {
  for(field in err.errors){
    switch (err.errors[field].path) {
      case 'fullName':
          body['fullNameError'] = err.errors[field].message;
          break;
      case 'salary':
          body['salaryError'] = err.errors[field].message;
          break;
      case 'age':
          body['ageError'] = err.errors[field].message;
          break;
      case 'email':
          body['emailError'] = err.errors[field].message;
          break;
      case 'mobile':
          body['mobileError'] = err.errors[field].message;
          break;
      default:

    }
  }
}

router.get('/:id',(req,res) => {
  Cashier.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("cashier/addOrEdit", {
        viewTitle: "Update Cashier",
        cashier: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Cashier.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/cashier/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
