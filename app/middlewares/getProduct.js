// middleware.js

// const express = require("express");
const axios = require("axios");

module.exports = (app) => {
  app.use(async (req, res, next) => {
    // lấy accessToken
    const accessToken = localStorage.getItem("accessToken");

    // thêm accessToken vào header
    req.setHeader("Authorization", "Bearer " + accessToken);

    console.log("hi")
    // xử lý kết quả API
    // if (response.status === 200) {
    //   // chuyển hướng trang
    //   res.redirect("/home");
    // } else {
    //   // hiển thị lỗi
    //   res.send("Có lỗi xảy ra");
    // }
  });
};
