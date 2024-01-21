require("dotenv").config();

const newRouter = require("./Site.js");
const newLogin = require("./Login.js");
const newRegister = require("./Register.js");
const newForgot = require("./Forgot.js");
const newDashboards = require("./Dashboards.js");
const newProducts = require("./Products.js");
const newContacts = require("./Contacts.js");
const newSales = require("./Sales.js");
const newProfile = require("./Profile.js");
const newSetting = require("./Setting.js");
const newCustomers = require("./Customers.js");
const newVerifi = require("./Verifi.js");
const newResetpass = require("./Resetpass.js");
const newPayment = require("./Payment.js");
const newChat = require("./Chat.js");
const axios = require("axios");

const middleware = require("../middlewares/getProduct.js");

function route(app) {
  let accessToken = "";
  let avatar = [];
  let role = "";
  // app.use((req, res, next)=>{
  //   accessToken = req.cookies
  // })

  app.get(
    "/chat",
    (req, res, next) => {
      req.data = accessToken;
      return next();
    },
    newChat
  );

  app.post("/upload-avatar", function (req, res, next) {
    avatar = {
      persion: req.body.avatar,
    };
    console.log(avatar);
    res.status(200).json({ message: "Upload avatar was successfully" });
  });

  app.post("/dashboards", function (req, res, next) {
    accessToken = req.headers.authorization;
    avatar = {
      role: req.body.role,
      persion: req.body.avatar,
    };
    // role = req.body.role;
    // console.log(avatar)
    next();
  });

  app.get(
    "/dashboards",
    // function (req, res, next) {
    //   // req.data = avatar.persion;
    //   !accessToken ? res.redirect("/") : next();
    // },
    async (req, res, next) => {
      try {
        const axiosInstance = await axios.create({
          baseURL: `https://pops-backend.onrender.com`,
        });
        axiosInstance.post("/revenue/order-list").then(function (response) {
          const data = [...response.data];
          const newObject = Object.assign(data, avatar);
          req.data = newObject;
          return next();
        });
      } catch (error) {
        console.log(error);
      }
    },
    newDashboards
  );

  app.use("/logout", function (req, res, next) {
    accessToken = null;
    res.redirect("/");
  });

  app.get(
    "/profile",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      try {
        const axiosInstance = await axios.create({
          baseURL: `https://pops-backend.onrender.com`,
          headers: {
            Authorization: accessToken,
          },
        });
        axiosInstance.post("/users/my-profile").then(function (response) {
          req.data = response.data;
          return next();
        });
      } catch (error) {
        console.log(error);
      }
    },
    newProfile
  );

  app.get(
    "/sales",
    async (req, res, next) => {
      try {
        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/products/product-list`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        // console.log(apiResponse);
        const data = [...apiResponse.data];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        // Xử lý lỗi nếu có.
        res.redirect("/");
      }
    },
    newSales
  );

  app.get(
    "/contacts",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      // console.log(role)
      try {
        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/managers/staff-list`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        // req.data = ;
        const data = [...apiResponse.data.staffList];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        const data = error.response.data;
        if (error.response.status == 403) {
          req.data = data;
          res.render("../public/views/pages/error", { data });
        } else {
          res.redirect("/dashboards");
        }
      }
    },
    newContacts
  );
  app.get("/contacts/create-staffs", newContacts);

  app.get(
    "/contacts/staffs/:id",
    // function (req, res, next) {
    //   req.data = avatar.persion;
    //   !accessToken ? res.redirect("/") : next();
    // },
    async (req, res, next) => {
      const staffsId = req.params.id;
      staffsId.toString();
      // console.log(`http://${process.env.HOST}:${process.env.API}/managers/staff-info/${staffsId}`)

      try {
        // Thực hiện cuộc gọi API bằng Axios ở đây.
        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/managers/staff-info/${staffsId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        let data = apiResponse.data;
        let dataUser = data.user;
        let newObject = Object.assign(dataUser, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        console.log(error);
      }
    },
    newContacts
  );

  app.get(
    "/products",
    async (req, res, next) => {
      try {
        // Thực hiện cuộc gọi API bằng Axios ở đây.
        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/products/product-list`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        const data = [...apiResponse.data];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        // Xử lý lỗi nếu có.
        res.redirect("/");
      }
    },
    newProducts
  );

  app.get(
    "/products/products-detail",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      try {
        const productId = req.query.idProduct;
        productId.toString().trim();
        // console.log(typeof(productId))

        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/products/product-detail/${productId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        // req.data = apiResponse.data;
        // console.log(apiResponse);
        const data1 = apiResponse.data;
        const newObject = Object.assign(data1, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        console.log(error);
      }
    },
    newProducts
  );

  app.get(
    "/customers",
    async (req, res, next) => {
      try {
        // Thực hiện cuộc gọi API bằng Axios ở đây.
        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/customers/customer-list`
        );
        const data = [...apiResponse.data];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        // console.log(newObject);
        return next();
      } catch (error) {
        // Xử lý lỗi nếu có.
        res.redirect("/");
      }
    },
    newCustomers
  );

  app.get(
    "/customers/customers-detail/:id",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      try {
        const customerId = req.params.id;
        customerId.toString();
        // const productId = req.query.idProduct;
        // productId.toString().trim();
        // console.log(typeof(productId))

        const apiResponse = await axios.get(
          `https://pops-backend.onrender.com/customers/detail/${customerId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        // req.data = apiResponse.data;
        // console.log(apiResponse);
        const data1 = apiResponse.data;
        const newObject = Object.assign(data1, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        console.log(error);
      }
    },
    newCustomers
  );

  app.get("/forgot", newForgot);

  app.get("/setting", newSetting);

  app.get("/register", newRegister);

  app.get(
    "/email-verifications/:verify_email",
    async (req, res, next) => {
      const verifyEmail = req.params.verify_email;
      try {
        const data = { verify_token: verifyEmail };
        const axiosInstance = axios.create({
          baseURL: `https://pops-backend.onrender.com`,
        });
        const response = await axiosInstance.post(
          "/staffs/check-verify-token",
          data
        );
        if ((response.status = 202)) {
          res.redirect(`/resetpass/${response.data.tokens.access_token}`);
        }
      } catch (error) {
        res.redirect("/payments/error");
      }
    },
    newResetpass
  );

  app.get("/verify/success", newVerifi);

  app.get("/verify/error", newVerifi);

  app.get("/resetpass/:access_token", newResetpass);

  app.get("/payments/paypal-success/:order_id", newPayment);

  app.get("/payments/paypal-failed/:order_id", newPayment);

  app.get("/login/oauth", newLogin);

  app.use("/", newRouter);

  // app.use(checkToken)

  // function checkToken (req, res, next) {
  //   req.data = avatar.persion;
  //   !accessToken ? res.redirect("/") : next();
  // }
}

module.exports = route;
