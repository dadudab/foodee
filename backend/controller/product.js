const Product = require('../model/product');


module.exports.getProducts = async(req, res) => {
   try {
      const products = await Product.find().populate('productCategory');

      return res.status(200).json(products);
   } catch (error) {
      return res.status(500).json({
         message: 'Something went wrong'
      });
   }
};

module.exports.getProduct = async (req, res) => {
   const { productId } = req.params;
   
   try {
      const foundProduct = await Product.findById(productId).populate('productCategory');
      if(!foundProduct) {
         return res.status(404).json({
            message: 'Product not found'
         });
      }
      
      return res.status(200).json(foundProduct);
   } catch (error) {
      return res.status(500).json({
         message: 'Something went wrong'
      });
   }
}

module.exports.createProduct = async (req, res) => {
   const { name, price, basicIngredients, productCategory } = req.body;
   
   try {
      const newProduct = new Product({
         name,
         price,
         basicIngredients,
         productCategory
      });
      await newProduct.save();

      const newProductPopulated = await (await Product.findById(newProduct._id))
         .populate('productCategory');

      return res.status(200).json(newProductPopulated);
   } catch (error) {
      return res.status(500).json({
         message: 'Something went wrong'
      });
   }
};

module.exports.updateProduct = async (req, res) => {
   const { productId } = req.params;
   const { name, price, basicIngredients, productCategory } = req.body;
   
   try {
      const foundProduct = await Product.findById(productId).populate('productCategory');
      if(!foundProduct) {
         return res.status(404).json({
            message: 'Product not found'
         });
      };

      const updatedProduct = {
         _id: productId,
         name,
         price,
         basicIngredients,
         productCategory
      };
      console.log(updatedProduct);
      const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
         new: true,
      }).populate('productCategory');

      return res.status(200).json(product);
   } catch (error) {
      return res.status(500).json({
         message: 'Someting went rong'
      })
   }
}

module.exports.deleteProduct = async (req, res) => {
   const { productId } = req.params;

   try {
      await Product.findByIdAndDelete(productId);

      return res.status(200).json();
   } catch (error) {
      return res.status(500).json({
         message: 'Something went wrong'
      });
   }
}
