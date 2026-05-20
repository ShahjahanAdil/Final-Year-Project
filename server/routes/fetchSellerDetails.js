const express = require("express");
const router = express.Router();

const settingsModel = require("../models/settings");

router.get("/get", async (req, res) => {
    try {
        const { brandSlug, domain } = req.query;

        if (domain && domain.startsWith("www.")) {
            domain = domain.replace(/^www\./, "");
        }

        let settings;

        if (domain) {
            settings = await settingsModel.findOne({ domain });
        }
        else if (brandSlug) {
            settings = await settingsModel.findOne({ brandSlug });
        }

        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json({ message: 'Settings fetched', settings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;