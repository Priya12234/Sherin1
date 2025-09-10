import Product from "../models/Product.js";

const ProductController = {
  // ------------------- ADMIN CONTROLLERS -------------------

  /**
   * @desc    Create a new product
   * @route   POST /api/products
   * @access  Private/Admin
   */
  createProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        subCategory,
        price,
        discount,
        images,
        stock,
        sizes,
        colors,
        tags,
      } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({
          status: "failed",
          message: "Name, category, and price are required",
        });
      }

      const product = await Product.create({
        name,
        description,
        category,
        subCategory,
        price,
        discount: discount || 0,
        images: images || [],
        stock: stock || 0,
        sizes: sizes || [],
        colors: colors || [],
        tags: tags || [],
      });

      return res.status(201).json({ status: "success", data: product });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Get all products with optional filters
   * @route   GET /api/products
   * @access  Public
   */
  getProducts: async (req, res) => {
    try {
      const { category, subCategory, tags, minPrice, maxPrice } = req.query;
      let filter = {};

      if (category) filter.category = category;
      if (subCategory) filter.subCategory = subCategory;
      if (tags) filter.tags = { $in: tags.split(",") };
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      const products = await Product.find(filter);
      return res.status(200).json({ status: "success", data: products });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Get product by ID
   * @route   GET /api/products/:id
   * @access  Public
   */
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ status: "failed", message: "Product Not Found" });

      return res.status(200).json({ status: "success", data: product });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Update product by ID
   * @route   PUT /api/products/:id
   * @access  Private/Admin
   */
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ status: "failed", message: "Product Not Found" });

      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });

      const updatedProduct = await product.save();
      return res.status(200).json({ status: "success", data: updatedProduct });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Delete product by ID
   * @route   DELETE /api/products/:id
   * @access  Private/Admin
   */
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ status: "failed", message: "Product Not Found" });

      await Product.deleteOne({ _id: req.params.id });
      return res
        .status(200)
        .json({ status: "success", message: "Product removed" });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },
};

export default ProductController;
