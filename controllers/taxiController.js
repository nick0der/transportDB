const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Taxi = mongoose.model('Taxi');

router.get('/',(req,res) => {
  res.render('taxi/addOrEdit', {
    viewTitle : 'Insert Taxi'
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
  var taxi = new Taxi();
  taxi.model = req.body.model;
  taxi.color = req.body.color;
  taxi.seats = req.body.seats;
  taxi.trackNumber = req.body.trackNumber;

  taxi.save((err, doc) => {
    if (!err) {
      res.redirect('taxi/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('taxi/addOrEdit', {
          viewTitle : 'Insert Taxi',
          taxi: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Taxi.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('taxi/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("taxi/addOrEdit", {
          viewTitle: "Update Taxi",
          taxi: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Taxi.find((err, docs) => {
        if (!err) {
            res.render("taxi/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving taxi list :' + err);
        }
    });
});

function handleValidationError(err,body) {
  for(field in err.errors){
    switch (err.errors[field].path) {
      case 'model':
          body['modelError'] = err.errors[field].message;
          break;
      case 'color':
          body['colorError'] = err.errors[field].message;
          break;
      case 'seats':
          body['seatsError'] = err.errors[field].message;
          break;
      case 'trackNumber':
          body['trackNumberError'] = err.errors[field].message;
          break;
      default:

    }
  }
}

router.get('/:id',(req,res) => {
  Taxi.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("taxi/addOrEdit", {
        viewTitle: "Update Taxi",
        taxi: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Taxi.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/taxi/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
