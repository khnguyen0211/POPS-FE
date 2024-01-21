const express = require("express");
const axios = require("axios");
const router = express.Router();
const formatTime = require("date-format");
const chatRouter = require("../controllers/ChatController");

const settingRouter = require('../controllers/SettingController');

// router.get('/setting', settingRouter.index);

router.get(
  "/chat",
  async (req, res, next) => {
    const accessToken  = req.data;
    console.log(accessToken)
    let user_id = req.query.idChat;
    console.log(user_id)
    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000",
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const [user_list, my_user, your_account, messages] = await Promise.all([
      axiosInstance.get("/chat/recently-friends"),
      axiosInstance.post("/users/my-profile"),
      axiosInstance.get(`users/get-friend/${user_id}`),
      axiosInstance.get(`chat/conversation/${user_id}`),
    ]);
    const format_messages = messages.data.map((obj) => {
      const newObj = {
        ...obj,
        created_at: formatTime(
          "dd/MM/yyyy - hh:mm:ss",
          new Date(obj.created_at)
        ),
      };
      return newObj;
    });
    const currently_format = user_list.data.map((u) => {
      return {
        ...u,
        message: u.isSender == true ? 'Me: ' + u.message : 'Friend: ' + u.message,
        time: formatTime(
          "dd/MM/yyyy - hh:mm:ss",
          new Date(u.time)
        ),
      }
    })
    const conversationUsers = {
      users: currently_format,
      from_user: my_user.data,
      to_user: your_account.data,
      conversation: format_messages,
    };
    req.conversationUsers = conversationUsers;
    return next();
  },
  chatRouter.index
);


module.exports = router;
