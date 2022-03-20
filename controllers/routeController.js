const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Route = mongoose.model('Route');

router.get('/',(req,res) => {
  res.render('route/addOrEdit', {
    viewTitle : 'Insert Route'
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
  var route = new Route();
  route.start = req.body.start;
  route.finish = req.body.finish;
  route.distance = req.body.distance;

  route.save((err, doc) => {
    if (!err) {
      res.redirect('route/list');
    } else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('route/addOrEdit', {
          viewTitle : 'Insert Route',
          route: req.body
        });
      } else {
          console.log('Error during record instertion : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Route.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('route/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err. req.body);
        res.render("route/addOrEdit", {
          viewTitle: "Update Route",
          route: req.body
        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });

}

router.get('/list', (req, res) => {
    Route.find((err, docs) => {
        if (!err) {
            res.render("route/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving route list :' + err);
        }
    });
});

function handleValidationError(err,body) {
  for(field in err.errors){
    switch (err.errors[field].path) {
      case 'start':
          body['startError'] = err.errors[field].message;
          break;
      case 'finish':
          body['finishError'] = err.errors[field].message;
          break;
      case 'distance':
          body['distanceError'] = err.errors[field].message;
          break;
      default:
    }
  }
}

router.get('/:id',(req,res) => {
  Route.findById(req.params.id, (err, doc) => {
    if (!err){
      res.render("route/addOrEdit", {
        viewTitle: "Update Route",
        route: doc
      })
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Route.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/route/list');
    } else {
      console.log('Error during record delete : ' + err);
    }
  })
});

module.exports = router;
