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

// Export the router
module.exports = router;