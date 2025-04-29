const dataTables = require('../model/models.js')

const getProducts = function (req, res) {
  dataTables.Product.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((error) => { 
      res.status(500).send(error);
    });  
};
//returns an array
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await dataTables.Product.findById(id).lean(); 
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = function (req, res) {
  dataTables.Product.insertMany(
    {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      quantity:req.body.quantity

    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}
//returns the new object in an array


const deleteProduct = (req, res) => {
  dataTables.Product.findByIdAndDelete(req.params._id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}
//returns the deleted object


const updateProduct = (req, res) => {
  dataTables.Product.findByIdAndUpdate(
    req.params._id, 
    {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity
    }, 
    { new: true }  // This option returns the updated Product (if false traja3 l product l9dim)
  )
    .then((result) => {
      res.status(200).send(result); //result is an object (mch array)
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { getProducts, addProduct , updateProduct , deleteProduct , getProduct};
