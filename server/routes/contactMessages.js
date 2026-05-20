const express = require("express");
const router = express.Router();

const contactMessagesModel = require("../models/contactMessages");

router.post("/submit", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required!",
            });
        }

        const contactMessage = await contactMessagesModel.create({
            name,
            email,
            phone: phone || null,
            subject: subject || null,
            message,
        });

        res.status(201).json({
            message: "Your message has been submitted successfully!",
            contactMessage,
        });
    } catch (error) {
        console.error("Contact submit error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/admin/all", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const status = req.query.status;

        const query = {};

        if (status && status !== "all") {
            query.status = status;
        }

        const messages = await contactMessagesModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalMessages = await contactMessagesModel.countDocuments(query);

        res.status(200).json({
            message: "Contact messages fetched",
            messages,
            totalMessages,
        });
    } catch (error) {
        console.error("Admin contact messages error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/admin/single/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const contactMessage = await contactMessagesModel.findById(id);

        if (!contactMessage) {
            return res.status(404).json({ message: "Contact message not found!" });
        }

        res.status(200).json({
            message: "Contact message fetched",
            contactMessage,
        });
    } catch (error) {
        console.error("Single contact message error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.patch("/admin/review/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { adminNotes } = req.body;

        const contactMessage = await contactMessagesModel.findByIdAndUpdate(
            id,
            {
                status: "reviewed",
                adminNotes: adminNotes || null,
                reviewedAt: new Date(),
            },
            { new: true }
        );

        if (!contactMessage) {
            return res.status(404).json({ message: "Contact message not found!" });
        }

        res.status(202).json({
            message: "Contact message marked as reviewed!",
            contactMessage,
        });
    } catch (error) {
        console.error("Review contact message error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.delete("/admin/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await contactMessagesModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Contact message not found!" });
        }

        res.status(203).json({
            message: "Contact message deleted successfully!",
        });
    } catch (error) {
        console.error("Delete contact message error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;