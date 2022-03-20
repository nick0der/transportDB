const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bus = mongoose.model('Bus');

router.get('/',(req,res) => {
  res.render('bus/addOrEdit', {
    viewTitle : 'Insert Bus'
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
  var bus = new Bus();
  bus.model = req.body.model;
  bus.color = req.body.color;
  bus.seats = req.body.seats;
  bus.trackNumber = req.body.trackNumber;

  bus.save((err, doc) => {
    if (!err) {
      res.redirect('bus/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('bus/addOrEdit', {
          viewTitle : 'Insert Bus',
          bus: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Bus.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('bus/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("bus/addOrEdit", {
          viewTitle: "Update Bus",
          bus: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Bus.find((err, docs) => {
        if (!err) {
            res.render("bus/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving bus list :' + err);
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
  Bus.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("bus/addOrEdit", {
        viewTitle: "Update Bus",
        bus: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Bus.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/bus/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
