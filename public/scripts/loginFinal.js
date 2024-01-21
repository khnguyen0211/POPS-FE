const form = document.querySelector(".form");
const URL = "http://localhost:4000";
const API = "http://localhost:3000";
let accessToken = "";
let refreshToken = "";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Tạo đối tượng dữ liệu
  const data = {
    username: document.querySelector("input[name='username']").value,
    password: document.querySelector("input[name='password']").value,
  };

  // Thực hiện yêu cầu POST đến API
  try {
    const response = await axios.post(`${URL}/users/login`, data);

    // Xử lý phản hồi
    if (response.status === 200) {
      // console.log(response.data.tokens)
      const accessToken = response.data.tokens.access_token;
      const refreshToken = response.data.tokens.refresh_token;
      const avatar = response.data.avatar;

      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("avatar", avatar);

      setCookie('accessToken', accessToken, 1);

      const axiosInstance = axios.create({
        baseURL: API,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await axiosInstance.post("/dashboards", {
        // Dữ liệu cần gửi
        accessToken: accessToken,
        refreshToken: refreshToken,
        avatar: avatar,
      });
      // Chuyển đến trang thành công
      window.location.href = "/contacts";
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
  }
});

const querystring = location.search;
if (querystring) {
  const access_token = querystring
    .substring(1, querystring.length)
    .split("&")[0]
    .split("=")[1];
  const refresh_token = querystring
    .substring(1, querystring.length)
    .split("&")[1]
    .split("=")[1];
  const avatar = querystring
    .substring(1, querystring.length)
    .split("&")[2]
    .split("=")[1];
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("refreshToken", refresh_token);

  const axiosInstance = axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = axiosInstance.post("/dashboards", {
    // Dữ liệu cần gửi
    accessToken: access_token,
    refreshToken: refresh_token,
    avatar: avatar,
  });
  // Chuyển đến trang thành công
  // Chuyển đến trang thành công
  result.then(() => {
    window.location.href = "/dashboards";
  });
}

// window.alert = function (message) {
//   const alert = document.createElement("div");
//   const alertButton = document.createElement("button");
//   alertButton.innerText = "OK";
//   alert.classList.add("alert");
//   alert.setAttribute(
//     "style",
//     `
//     background-image: linear-gradient(to right bottom, rgba(253, 214, 205, 0.986), rgb(193, 135, 171));
//     width: 250px;
//     height: 70px;
//     position: absolute;
//     z-index: 5;
//     top: 100px;
//     left: 50%;
//     transform: translateX(-50%);
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 10px 5px #00000044;
//     display: flex;
//     font-size: 15px;
//     justify-content: space-between;
//     flex-direction: column;
//     align-items: center;
//   `
//   );
//   alertButton.setAttribute(
//     "style",
//     `
//     width: 50px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//   `
//   );
//   alert.innerHTML = `<span>${message}</span>`;
//   alert.appendChild(alertButton);
//   alertButton.addEventListener("click", (e) => {
//     alert.remove();
//   });
//   document.body.appendChild(alert);
// };

const base_url = "https://accounts.google.com/o/oauth2/v2/auth";

const query = {
  client_id:
    "851921911617-n07b8va3mj79k1i4du5eo9t8nkt1mgcp.apps.googleusercontent.com",
  redirect_uri: "http://localhost:4000/users/oauth/google",

  response_type: "code",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" "),

  prompt: "consent",
};
// const query_string = new URLSearchParams(query).toString();

// const final_url = `${base_url}?${query_string}`;

// const aTagLoginGoogle = document.getElementById("login-with-google");
// aTagLoginGoogle.href = final_url;
