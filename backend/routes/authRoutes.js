const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

//Auth Routes
router.post("/register", upload.single("profileImage"), registerUser); //Register User
router.post("/login", loginUser); // Login User
router.get("/profile",protect,getUserProfile); // GetUser Profile
router.put("/profile",protect,updateUserProfile);

router.post("/upload-image",upload.single("image"),(req,res) => {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
});

module.exports = router;

