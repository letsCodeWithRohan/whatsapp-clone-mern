const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");
const redis = require("../config/redis");

const router = require("express").Router();

router.get("/status", (req, res) => res.status(200).json({
  message: "API is working",
  success: true
}))

router.get("/users", async (req,res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(
            users
        );
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User fetch error",
            err: error.message
        })
    }
})

router.get("/messages", async (req,res) => {
    try {
        const msgs = await messageModel.find();
        res.status(200).json(
            msgs
        );
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Messages fetch error",
            err: error.message
        })
    }
})

router.get("/check-redis", async (req,res) => {
    try {
        if (!redis) {
            return res.status(200).json({
                ping: "Redis not available",
                connected: false
            });
        }
        const pong = await redis?.ping();
        res.status(200).json({
            ping: pong,
            connected: true
        });
    }catch (error) {
        res.status(200).json({
            success: false, 
            message: "Redis check error",
            err: error.message,
            connected: false
        })
    }
})

module.exports = router;