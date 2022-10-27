const Cart = require("../model/cart");
const Product = require("../model/product");

module.exports.getCart = async (req, res) => {
  const userId = req.user._id.toString();

  try {
    const foundCart = await Cart.findOne({ userId });
    if(!foundCart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    return res.status(200).json(foundCart);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

module.exports.addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.query;

  try {
    const foundCart = await Cart.findOne({
      userId: req.user._id.toString()
    });
    if(!foundCart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    const foundProduct = await Product.findById(productId);
    if(!foundProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    const existingCartProductIndex = 
    foundCart.products.findIndex(product => product.productId === productId);

    if(existingCartProductIndex === -1) {
      let updatedCartProducts = [];

      const newCartProduct = {
        productId: foundProduct._id,
        name: foundProduct.name,
        price: foundProduct.price,
        quantity: parseInt(quantity)
      };

      const updatedTotalPrice = 
        foundCart.totalPrice + (parseInt(quantity) * foundProduct.price);
      const updatedTotalQuantity = 
        foundCart.totalQuantity + parseInt(quantity);

      updatedCartProducts = foundCart.products;
      updatedCartProducts.push(newCartProduct);

      const updatedCart  = {
        products: updatedCartProducts,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity
      };

      await Cart.findOneAndUpdate({
        userId: req.user._id.toString()
      }, updatedCart);

      return res.status(200).json(updatedCart);

    } else {
      let existingCartProduct = foundCart.products[existingCartProductIndex];
      existingCartProduct.quantity += parseInt(quantity);

      const updatedTotalPrice = 
        foundCart.totalPrice + (existingCartProduct.price * parseInt(quantity));
      const updatedTotalQuantity = 
        foundCart.totalQuantity + parseInt(quantity);
      const updatedCartProducts = [...foundCart.products];
      
      updatedCartProducts[existingCartProductIndex] = existingCartProduct;
      foundCart.totalPrice = updatedTotalPrice;
      foundCart.totalQuantity = updatedTotalQuantity;

      const updatedCart = {
        products: updatedCartProducts,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity
      };

      await Cart.findOneAndUpdate({
        userId: req.user._id.toString()
      }, updatedCart);

      return res.status(200).json(updatedCart);
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

module.exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.query;

  console.log(productId);
  console.log(quantity);

  try {
    const foundProduct = await Product.findById(productId);
    if(!foundProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    const foundCart = await Cart.findOne({ userId: req.user._id.toString() });
    if(!foundCart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    const existingCartProductIndex = foundCart.products
      .findIndex(product => product.productId === productId);
    
    // if(existingCartProductIndex === -1) {
    //   return res.status(200).json(foundCart);
    // }
    if(existingCartProductIndex > -1) {
      const existingCartProduct = foundCart.products[existingCartProductIndex];
      if(existingCartProduct.quantity <= parseInt(quantity)) {
        const updatedTotalQuantity = 
          foundCart.totalQuantity - existingCartProduct.quantity;
        const updatedTotalPrice = 
          foundCart.totalPrice - (existingCartProduct.price * existingCartProduct.quantity);
        const updatedCartProducts = 
          foundCart.products.filter(product => product.productId !== productId);
        
        const updatedCart = {
          products: updatedCartProducts,
          totalPrice: updatedTotalPrice,
          totalQuantity: updatedTotalQuantity
        };

        const resData = await Cart.findOneAndUpdate({ 
          userId: req.user._id.toString() 
        }, updatedCart, { new: true });

        return res.status(200).json(resData);
      } else {
        const updatedTotalQuantity = 
          foundCart.totalQuantity - parseInt(quantity);
        const updatedTotalPrice = 
          foundCart.totalPrice - (existingCartProduct.price * parseInt(quantity));
        const updatedProduct = {
          productId: existingCartProduct.productId,
          name: existingCartProduct.name,
          price: existingCartProduct.price,
          quantity: existingCartProduct.quantity - parseInt(quantity)
        };
        const updatedCartProducts = [...foundCart.products];
        updatedCartProducts[existingCartProductIndex] = updatedProduct;
        
        const updatedCart = {
          products: updatedCartProducts,
          totalPrice: updatedTotalPrice,
          totalQuantity: updatedTotalQuantity
        };

        const resData = await Cart.findOneAndUpdate({ 
          userId: req.user._id.toString() 
        }, updatedCart, { new: true });

        return res.status(200).json(resData);
      }
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
}
