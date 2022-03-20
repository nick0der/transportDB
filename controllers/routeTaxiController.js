const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const RouteTaxi = mongoose.model('RouteTaxi');

router.get('/',(req,res) => {
  res.render('routeTaxi/addOrEdit', {
    viewTitle : 'Insert Route Taxi'
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
  var routeTaxi = new RouteTaxi();
  routeTaxi.model = req.body.model;
  routeTaxi.color = req.body.color;
  routeTaxi.seats = req.body.seats;
  routeTaxi.trackNumber = req.body.trackNumber;

  routeTaxi.save((err, doc) => {
    if (!err) {
      res.redirect('routeTaxi/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('routeTaxi/addOrEdit', {
          viewTitle : 'Insert Route Taxi',
          routeTaxi: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  RouteTaxi.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('routeTaxi/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("routeTaxi/addOrEdit", {
          viewTitle: "Update Route Taxi",
          routeTaxi: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    RouteTaxi.find((err, docs) => {
        if (!err) {
            res.render("routeTaxi/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving routeTaxi list :' + err);
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
  RouteTaxi.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("routeTaxi/addOrEdit", {
        viewTitle: "Update Route Taxi",
        routeTaxi: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  RouteTaxi.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/routeTaxi/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
