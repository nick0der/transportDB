const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

router.get('/',(req,res) => {
  res.render('driver/addOrEdit', {
    viewTitle : 'Insert Driver'
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
  var driver = new Driver();
  driver.fullName = req.body.fullName;
  driver.salary = req.body.salary;
  driver.age = req.body.age;
  driver.email = req.body.email;
  driver.mobile = req.body.mobile;
  driver.save((err, doc) => {
    if (!err) {
      res.redirect('driver/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('driver/addOrEdit', {
          viewTitle : 'Insert Driver',
          driver: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Driver.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('driver/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("driver/addOrEdit", {
          viewTitle: "Update Driver",
          driver: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Driver.find((err, docs) => {
        if (!err) {
            res.render("driver/list", {
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
  Driver.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("driver/addOrEdit", {
        viewTitle: "Update Driver",
        driver: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Driver.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/driver/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
