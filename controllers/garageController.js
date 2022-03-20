const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Garage = mongoose.model('Garage');

router.get('/',(req,res) => {
  res.render('garage/addOrEdit', {
    viewTitle : 'Insert Garage'
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
  var garage = new Garage();
  garage.number = req.body.number;
  garage.address = req.body.address;
  garage.area = req.body.area;

  garage.save((err, doc) => {
    if (!err) {
      res.redirect('garage/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('garage/addOrEdit', {
          viewTitle : 'Insert Garage',
          garage: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Garage.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('garage/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("garage/addOrEdit", {
          viewTitle: "Update Garage",
          garage: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Garage.find((err, docs) => {
        if (!err) {
            res.render("garage/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving garage list :' + err);
        }
    });
});

function handleValidationError(err,body) {
  for(field in err.errors){
    switch (err.errors[field].path) {
      case 'number':
          body['numberError'] = err.errors[field].message;
          break;
      case 'address':
          body['addressError'] = err.errors[field].message;
          break;
      case 'area':
          body['areaError'] = err.errors[field].message;
          break;
      default:
    }
  }
}

router.get('/:id',(req,res) => {
  Garage.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("garage/addOrEdit", {
        viewTitle: "Update Garage",
        garage: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Garage.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/garage/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
