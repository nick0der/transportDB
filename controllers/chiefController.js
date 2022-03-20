const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Chief = mongoose.model('Chief');

router.get('/',(req,res) => {
  res.render('chief/addOrEdit', {
    viewTitle : 'Insert Chief'
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
  var chief = new Chief();
  chief.fullName = req.body.fullName;
  chief.salary = req.body.salary;
  chief.age = req.body.age;
  chief.email = req.body.email;
  chief.mobile = req.body.mobile;
  chief.save((err, doc) => {
    if (!err) {
      res.redirect('chief/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('chief/addOrEdit', {
          viewTitle : 'Insert Chief',
          chief: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Chief.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('chief/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("chief/addOrEdit", {
          viewTitle: "Update Chief",
          chief: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Chief.find((err, docs) => {
        if (!err) {
            res.render("chief/list", {
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
  Chief.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("chief/addOrEdit", {
        viewTitle: "Update Chief",
        chief: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Chief.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/chief/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
