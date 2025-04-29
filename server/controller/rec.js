const dataTables = require('../model/rec.js')

const getRecs = function (req, res) {
    dataTables.rec.find({})
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((error) => { 
        res.status(500).send(error);
      });  
  };
  //returns an array
  const getRec = async (req, res) => {
    try {
      const { id } = req.params;
      const rec = await dataTables.rec.findById(id).lean(); 
      res.status(200).json(rec);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const addRec = function (req, res) {
    dataTables.rec.insertMany(
      {
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        message: req.body.message,
        

      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  }
  const deleteRec = (req, res) => {
  dataTables.rec.findByIdAndDelete(req.params._id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
    
}
  module.exports = { getRecs, addRec , getRec,deleteRec};
