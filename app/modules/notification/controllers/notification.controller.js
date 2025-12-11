const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const mongoose = require('mongoose');

const DealRepo = require('../../deal/repositories/deal.repository');
const notificationRepo = require('../repositories/notification.repository');
const userRepo = require('../../user/repositories/user.repository');
const notificationHelper = require('../../../helper/notifications');

class NotificationController {
  async compose(req, res) {
    try {
      const deals = await DealRepo.getAllByField({ status: 'Approved', isDeleted: false });

      res.render('notification/views/send', {
        page_name: 'notification-management',
        page_title: 'Send Notification',
        user: req.user,
        deals,
      });
    } catch (error) {
      throw error;
    }
  }

  async broadcast(req, res) {
    try {
      const { deal_id: dealId, title, message } = req.body;

      if (!dealId || !title || !message) {
        req.flash('error', 'Deal, title and message are required.');
        return res.redirect(namedRouter.urlFor('admin.notification.compose'));
      }

      const deal = await DealRepo.getByField({ _id: new mongoose.Types.ObjectId(dealId), isDeleted: false, status: 'Approved' });

      if (!deal) {
        req.flash('error', 'Selected deal not found or inactive.');
        return res.redirect(namedRouter.urlFor('admin.notification.compose'));
      }

      const dealImages = await DealRepo.getAllByFieldImages({ deal_id: deal._id });
      const notificationImage = dealImages?.[0]?.image || '';

      const users = await userRepo.getAllByField({ isDeleted: false, status: 'Active' });

      if (!users || !users.length) {
        req.flash('error', 'No users found to notify.');
        return res.redirect(namedRouter.urlFor('admin.notification.compose'));
      }

      for (const targetUser of users) {
        const notificationData = {
          reference_user_id: deal._id,
          target_user_id: targetUser._id,
          notification_title: title,
          notification_message: message,
          notification_description: `Deal: ${deal.deal_title}`,
          notification_image: notificationImage,
          isWeb: true,
        };

        await notificationRepo.save(notificationData);

        if (targetUser.device_token && targetUser.notifications === true) {
          const pushPayload = {
            token: targetUser.device_token,
            notification: {
              title,
              body: message,
              image: notificationImage,
            },
            data: {
              dealId: String(deal._id),
            },
          };

          await notificationHelper.pushNotification(pushPayload);
        }
      }

      req.flash('success', 'Notification sent successfully.');
      res.redirect(namedRouter.urlFor('admin.notification.compose'));
    } catch (error) {
      req.flash('error', 'Unable to send notification. Please try again.');
      res.redirect(namedRouter.urlFor('admin.notification.compose'));
    }
  }
}

module.exports = new NotificationController();
