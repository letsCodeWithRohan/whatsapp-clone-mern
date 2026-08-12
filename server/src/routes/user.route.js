const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

const {
    getAllUsers,
    updateFullname,
    updateBio,
    updateProfilePicture
} = require('../controllers/user.controller');


router.get(
    '/users',
    authMiddleware,
    getAllUsers
);

router.post(
    '/update-fullname',
    authMiddleware,
    updateFullname
);

router.post(
    '/update-bio',
    authMiddleware,
    updateBio
);

router.post(
    '/update-profile-picture',
    authMiddleware,
    upload.single("profilePicture"),
    updateProfilePicture
);

module.exports = router;