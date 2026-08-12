const router = require('express').Router();
const authMiddleware = require("../middlewares/auth")
const { signup, login,logout } = require('../controllers/auth.controller');
const upload = require("../config/multer")

// Register route
router.post('/signup', signup);
// Login route
router.post('/login', login);

router.post('/logout',authMiddleware,logout)

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!`, user: req.user });
});

router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ 
    message: 'Authenticated',
    user: req.user
 });
});

// Test Route For Multer
router.post("/file", upload.single("profile") ,(req,res) => {
  if(!req.file){
    return res.status(500).json({
      message : "File not Found"
    })
  }
  return res.status(200).json(req.file);
})

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Here you would typically generate an OTP and send it to the user's email.
  // For demonstration purposes, we'll just return a success message.

  if(!email){
    return res.status(400).json({ message: "Email is required" });
  }
  res.status(200).json({ message: `OTP sent to ${email}` });
});

// Export the router
module.exports = router;