const database = require('../models');

class NotificationController {
    static async create(req, res) {
        try {
            let notificationForm = req.body;
            notificationForm.fromUserId = req.userId;

            const notification = await database.Notification.create(notificationForm);

            return res.status(201).json(notification);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async read(req, res) {
        try {
            // userId by auth
            const userId = req.userId;
            if (!userId) return res.sendStatus(401);

            const notifications = await database.Notification.findAll({
                where: {
                    toUserId: userId
                }
              });


            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = NotificationController;