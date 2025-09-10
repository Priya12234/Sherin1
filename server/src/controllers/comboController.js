import Combo from "../models/Combo.js";

const comboController = {
  // ========================= Admin Controllers =========================

  // @desc Create a new combo
  // @route POST /api/combos/admin/create
  // @access Private/Admin
  createNewCombo: async (req, res) => {
    try {
      const { title, products, price, discount, images } = req.body;

      // check if combo already exists
      const existingCombo = await Combo.findOne({ title });
      if (existingCombo) {
        return res
          .status(400)
          .json({ status: "error", message: "Combo already exists" });
      }

      const newCombo = new Combo({ title, products, price, discount, images });
      await newCombo.save();

      return res.status(201).json({ status: "success", result: newCombo });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // @desc Update a combo by ID
  // @route PUT /api/combos/admin/update/:id
  // @access Private/Admin
  updateCombo: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCombo = await Combo.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedCombo) {
        return res
          .status(404)
          .json({ status: "error", message: "Combo not found" });
      }

      return res.status(200).json({ status: "success", result: updatedCombo });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // @desc Delete a combo by ID
  // @route DELETE /api/combos/admin/delete/:id
  // @access Private/Admin
  deleteCombo: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCombo = await Combo.findByIdAndDelete(id);

      if (!deletedCombo) {
        return res
          .status(404)
          .json({ status: "error", message: "Combo not found" });
      }

      return res
        .status(200)
        .json({ status: "success", message: "Combo deleted successfully" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // @desc Get all combos (Admin view with full product data)
  // @route GET /api/combos/admin/all
  // @access Private/Admin
  getAllCombosAdmin: async (req, res) => {
    try {
      const combos = await Combo.find().populate("products.productId");
      return res.status(200).json({ status: "success", result: combos });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // ========================= Customer Controllers =========================

  // @desc Get all combos (Customer view)
  // @route GET /api/combos
  // @access Public
  getAllCombosCustomer: async (req, res) => {
    try {
      const combos = await Combo.find().populate(
        "products.productId",
        "name images price"
      );
      return res.status(200).json({ status: "success", result: combos });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  // @desc Get a single combo by ID (Customer view)
  // @route GET /api/combos/:id
  // @access Public
  getSingleComboCustomer: async (req, res) => {
    try {
      const combo = await Combo.findById(req.params.id).populate(
        "products.productId",
        "name images price"
      );

      if (!combo) {
        return res
          .status(404)
          .json({ status: "error", message: "Combo not found" });
      }

      return res.status(200).json({ status: "success", result: combo });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export default comboController;
