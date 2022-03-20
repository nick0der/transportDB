const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Mechanic = mongoose.model('Mechanic');

router.get('/',(req,res) => {
  res.render('mechanic/addOrEdit', {
    viewTitle : 'Insert Mechanic'
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
  var mechanic = new Mechanic();
  mechanic.fullName = req.body.fullName;
  mechanic.salary = req.body.salary;
  mechanic.age = req.body.age;
  mechanic.email = req.body.email;
  mechanic.mobile = req.body.mobile;
  mechanic.save((err, doc) => {
    if (!err) {
      res.redirect('mechanic/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('mechanic/addOrEdit', {
          viewTitle : 'Insert Mechanic',
          mechanic: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Mechanic.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('mechanic/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("mechanic/addOrEdit", {
          viewTitle: "Update Mechanic",
          mechanic: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Mechanic.find((err, docs) => {
        if (!err) {
            res.render("mechanic/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving mechanic list :' + err);
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
  Mechanic.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("mechanic/addOrEdit", {
        viewTitle: "Update Mechanic",
        mechanic: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Mechanic.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/mechanic/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
