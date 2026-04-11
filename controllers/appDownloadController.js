const AppDownloadSettings = require('../models/AppDownloadSettings');

exports.getSettings = async (req, res) => {
    try {
        let s = await AppDownloadSettings.findOne();
        if (!s) s = await AppDownloadSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await AppDownloadSettings.findOne();
        if (!s) s = await AppDownloadSettings.create(req.body);
        else s = await AppDownloadSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json({ message: 'Updated', settings: s });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
