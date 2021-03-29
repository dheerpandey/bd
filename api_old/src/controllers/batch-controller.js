 const { processor } = require('../core/batch-processor');
 const { fork } = require('child_process');

 const compute = fork('./compute.js');
   
exports.takeNewRequest = async (req, res, next) => {
  try {
    await processor.takeNewRequest({
        batchSize: req.body.batchSize,
        numbersPerBatch: req.body.numbersPerBatch
    });
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

exports.currentProcessingstate = async (req, res, next) => {
    try {
      console.log('controller called');
      res.sendStatus(200)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
  }
exports.compute = async (req, res, next) => {
    try {
      compute.send('start');
      compute.on('message', result => {
        res.end(`Long computation result: ${result}`)
      });
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
  }

 