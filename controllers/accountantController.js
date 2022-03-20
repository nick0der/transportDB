const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Accountant = mongoose.model('Accountant');

router.get('/',(req,res) => {
  res.render('accountant/addOrEdit', {
    viewTitle : 'Insert Accountant'
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
  var accountant = new Accountant();
  accountant.fullName = req.body.fullName;
  accountant.salary = req.body.salary;
  accountant.age = req.body.age;
  accountant.email = req.body.email;
  accountant.mobile = req.body.mobile;
  accountant.save((err, doc) => {
    if (!err) {
      res.redirect('accountant/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('accountant/addOrEdit', {
          viewTitle : 'Insert Accountant',
          accountant: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Accountant.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('accountant/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("accountant/addOrEdit", {
          viewTitle: "Update Accountant",
          accountant: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Accountant.find((err, docs) => {
        if (!err) {
            res.render("accountant/list", {
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
  Accountant.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("accountant/addOrEdit", {
        viewTitle: "Update Accountant",
        accountant: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Accountant.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/accountant/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
