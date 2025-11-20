import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { isValidEmail, isValidPassword } from "../utils/validators.js";
import sendEmail from "../services/mailer.js";

const UserController = {
  // ---------------- USER CONTROLLERS ----------------

  /**
   * @desc    Register a new user
   * @route   POST /api/users/register
   * @access  Public
   */
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ status: "failed", message: "Please enter all fields" });
      }

      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ status: "failed", message: "Please enter a valid email" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          status: "failed",
          message:
            "Password must be at least 8 characters long and contain letters, numbers, and special characters",
        });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ status: "failed", message: "User already exists" });
      }

      const createUser = await User.create({
        name,
        email,
        passwordHash: password, // hashed automatically in model
      });

      // Send welcome email
      try {
        await sendEmail({
          to: createUser.email,
          subject: "Welcome to Sherin Shop!",
          templateName: "registerTemplate",
          templateData: [createUser.name], // pass dynamic data
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // We won't fail registration if email fails
      }

      return res.status(201).json({
        id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
        token: generateToken(createUser._id, createUser.role),
      });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Authenticate user & get token
   * @route   POST /api/users/login
   * @access  Public
   */
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ status: "failed", message: "Please enter all fields" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid email or password" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid email or password" });
      }

      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Get logged-in user profile
   * @route   GET /api/users/profile
   * @access  Private
   */
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        return res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not Found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Update logged-in user profile
   * @route   PUT /api/users/profile
   * @access  Private
   */
  updateUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not Found" });
      }
      if (req.body.email) {
        return res
          .status(404)
          .json({ status: "failed", message: "You cannot update your email" });
      }
      // Update fields only if provided
      user.name = req.body.name || user.name;
      if (req.body.password) user.passwordHash = req.body.password; // hashed in model
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.address) user.address = req.body.address; // expect array of addresses

      const updatedUser = await user.save();

      return res.status(200).json({
        id: updatedUser._id,
        name: updatedUser.name,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
      });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  // ---------------- ADMIN CONTROLLERS ----------------

  /**
   * @desc    Get all users
   * @route   GET /api/users
   * @access  Private/Admin
   */
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({ status: "success", data: users });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Get user by ID
   * @route   GET /api/users/:id
   * @access  Private/Admin
   */
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-passwordHash");
      if (user) {
        return res.status(200).json({ status: "success", data: user });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not Found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Update user by ID
   * @route   PUT /api/users/:id
   * @access  Private/Admin
   */
  updateUserProfileById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not Found" });
      }

      // Update fields only if provided
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.passwordHash = req.body.password;
      user.role = req.body.role || user.role;
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.address) user.address = req.body.address; // expect array of addresses

      const updatedUser = await user.save();

      return res.status(200).json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
      });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },

  /**
   * @desc    Delete user by ID
   * @route   DELETE /api/users/:id
   * @access  Private/Admin
   */
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await User.deleteOne({ _id: req.params.id });
        return res
          .status(200)
          .json({ status: "success", message: "User Removed" });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not Found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  },
};

export default UserController;
