// controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Combo from "../models/Combo.js";

const cartController = {
  // ========================= Customer Controllers =========================

  /**
   * @desc    Get user's cart
   * @route   GET /api/cart
   * @access  Private (Customer)
   */
  getUserCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user._id }).populate(
        "items.productId",
        "name price images"
      );
      if (!cart) {
        return res
          .status(404)
          .json({ status: "error", message: "Cart not found" });
      }
      return res.status(200).json({ status: "success", result: cart });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  /**
   * @desc    Add item to cart
   * @route   POST /api/cart/add
   * @access  Private (Customer)
   */
  // addToCart: async (req, res) => {
  //   try {
  //     const { productId, quantity } = req.body;
  //     let cart = await Cart.findOne({ userId: req.user._id });

  //     const product = await Product.findById(productId);
  //     if (!product) {
  //       return res
  //         .status(404)
  //         .json({ status: "error", message: "Product not found" });
  //     }

  //     if (!cart) {
  //       cart = new Cart({
  //         userId: req.user._id,
  //         items: [{ productId, quantity }],
  //         total: product.price * quantity,
  //       });
  //     } else {
  //       const existingItem = cart.items.find(
  //         (item) => item.productId.toString() === productId
  //       );
  //       if (existingItem) {
  //         existingItem.quantity += quantity;
  //       } else {
  //         cart.items.push({ productId, quantity });
  //       }

  //       // recalc total
  //       cart.total = await cart.items.reduce(async (accP, item) => {
  //         const acc = await accP;
  //         const prod = await Product.findById(item.productId);
  //         return acc + prod.price * item.quantity;
  //       }, Promise.resolve(0));
  //     }

  //     const updatedCart = await cart.save();
  //     return res.status(201).json({ status: "success", result: updatedCart });
  //   } catch (error) {
  //     return res.status(500).json({ status: "error", message: error.message });
  //   }
  // },

  addToCart: async (req, res) => {
    try {
      const { productId, comboId, quantity } = req.body;

      if (!productId && !comboId) {
        return res
          .status(400)
          .json({ status: "error", message: "Provide productId or comboId" });
      }

      let cart = await Cart.findOne({ userId: req.user._id });

      if (!cart) {
        cart = new Cart({
          userId: req.user._id,
          items: [],
          total: 0,
        });
      }

      let price;
      let type;

      // ================= PRODUCT =================
      if (productId) {
        const product = await Product.findById(productId);
        if (!product) {
          return res
            .status(404)
            .json({ status: "error", message: "Product not found" });
        }

        type = "product";
        price = product.price;

        // Check if already in cart
        const existing = cart.items.find(
          (i) => i.type === "product" && i.productId.toString() === productId
        );

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.items.push({
            type,
            productId,
            comboId: null,
            quantity,
          });
        }
      }

      // ================= COMBO =================
      if (comboId) {
        const combo = await Combo.findById(comboId);
        if (!combo) {
          return res
            .status(404)
            .json({ status: "error", message: "Combo not found" });
        }

        type = "combo";
        price = combo.price - combo.discount;

        // Check if already in cart
        const existing = cart.items.find(
          (i) => i.type === "combo" && i.comboId.toString() === comboId
        );

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.items.push({
            type,
            productId: null,
            comboId,
            quantity,
          });
        }
      }

      // ================= RECALCULATE TOTAL =================
      cart.total = 0;

      for (let item of cart.items) {
        if (item.type === "product") {
          const prod = await Product.findById(item.productId);
          cart.total += prod.price * item.quantity;
        } else if (item.type === "combo") {
          const cmb = await Combo.findById(item.comboId);
          cart.total += (cmb.price - cmb.discount) * item.quantity;
        }
      }

      const saved = await cart.save();

      return res.status(201).json({ status: "success", result: saved });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  /**
   * @desc    Remove item from cart
   * @route   DELETE /api/cart/remove/:productId
   * @access  Private (Customer)
   */
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.params;
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) {
        return res
          .status(404)
          .json({ status: "error", message: "Cart not found" });
      }

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );

      // recalc total
      cart.total = await cart.items.reduce(async (accP, item) => {
        const acc = await accP;
        const prod = await Product.findById(item.productId);
        return acc + prod.price * item.quantity;
      }, Promise.resolve(0));

      const updatedCart = await cart.save();
      return res.status(200).json({ status: "success", result: updatedCart });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  /**
   * @desc    Clear cart
   * @route   DELETE /api/cart/clear
   * @access  Private (Customer)
   */
  clearCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) {
        return res
          .status(404)
          .json({ status: "error", message: "Cart not found" });
      }
      cart.items = [];
      cart.total = 0;
      await cart.save();
      return res
        .status(200)
        .json({ status: "success", message: "Cart cleared" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // ========================= Admin Controllers =========================

  /**
   * @desc    Get all carts
   * @route   GET /api/cart/admin
   * @access  Private/Admin
   */
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find()
        .populate("userId", "name email")
        .populate("items.productId", "name price");
      return res.status(200).json({ status: "success", result: carts });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  /**
   * @desc    Get cart by user ID
   * @route   GET /api/cart/admin/:userId
   * @access  Private/Admin
   */
  getCartByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId })
        .populate("userId", "name email")
        .populate("items.productId", "name price");
      if (!cart) {
        return res
          .status(404)
          .json({ status: "error", message: "Cart not found" });
      }
      return res.status(200).json({ status: "success", result: cart });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export default cartController;
