// form.addEventListener("submit", async (e) => {
//   console.log(typeof(password.value))
//   e.preventDefault();
// try {
//   const res = await fetch(`http://localhost:4000/users/login`, {
//     // mode: 'no-cors',
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username: username.value,
//       password: password.value,
//     }),
//   });

//   const data = await res.json();

//   const asyncTask = new Promise((resolve, reject) => {

//     if (res.status === 200) {
//       // Chuyển đến trang thành công (ví dụ: trang sau khi đăng nhập thành công)
//       // Tiếp tục xử lý sau khi ngăn chặn mặc định đã được gọi

//       window.location.href = "/dashboards";

//     } else if (res.status === 400) {
//       // Hiển thị thông báo lỗi nếu status code là 400
//       alert(data.message);
//       console.log(data.message);
//       // Ví dụ: Hiển thị lỗi trên một phần tử HTML có id là "error-message"
//       const errorMessageElement = document.getElementById("error-message");
//       errorMessageElement.textContent = data.message;
//     } else {
//       // Xử lý các trường hợp khác ở đây
//       console.error(`Mã lỗi HTTP: ${res.status} ${res.statusText}`);
//       alert(data.message);
//     }
//   });
//   asyncTask.then(() => {
//     // Tiếp tục xử lý sau khi ngăn chặn mặc định đã được gọi và công việc bất đồng bộ hoàn thành
//   });
// } catch (error) {
//   console.error("Lỗi:", error);
// }
// });

// Hàm đăng nhập

// function login() {

//   console.log(username, password)
//   // Gửi yêu cầu POST đến API đăng nhập
//   // const response = axios.post(
//   //   `${URL}/users/login`,
//   //   [{
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   },
//   //   {
//   //     username,
//   //     password,
//   //   }]
//   // );
//   axios.post(`${URL}/users/login`, {
//     username = username.value,
//     password,
//   })
//   .then(function (response) {
//     console.log(response);
//     if (response.status === 200) {
//       // Lưu trữ access token và refresh token
//       // accessToken = response.data.access_token;
//       // refreshToken = response.data.refresh_token;

//       // Thêm access token và refresh token vào localStorage
//       // localStorage.setItem("accessToken", accessToken);
//       // localStorage.setItem("refreshToken", refreshToken);

//       // Chuyển đến trang thành công
//       window.location.href = "/dashboards";
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//   // Nếu yêu cầu thành công
//   if (response.status === 200) {
//     // Lưu trữ access token và refresh token
//     // accessToken = response.data.access_token;
//     // refreshToken = response.data.refresh_token;

//     // Thêm access token và refresh token vào localStorage
//     // localStorage.setItem("accessToken", accessToken);
//     // localStorage.setItem("refreshToken", refreshToken);

//     // Chuyển đến trang thành công
//     window.location.href = "/dashboards";
//   }
// }

// Hàm refresh token
// async function refreshToken() {
//   // Gửi yêu cầu POST đến API refresh token
//   const response = await Axios.post(`http://localhost:4000/users/refresh-token`, {
//     refreshToken,
//   });

//   // Nếu yêu cầu thành công
//   if (response.status === 200) {
//     // Lưu trữ access token mới
//     accessToken = response.data.accessToken;

//     // Thêm access token mới vào localStorage
//     localStorage.setItem("accessToken", accessToken);

//     // Đặt lại token cho các request tiếp theo
//     Axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
// }

// Hàm xử lý response từ API
// Axios.interceptors.response.use(
//   (response) => {
//     // Nếu response có mã lỗi 401
//     if (response.status === 401) {
//       // Refresh token
//       await refreshToken();

//       // Gửi lại yêu cầu với access token mới
//       const newResponse = await Axios.request(response.config);

//       // Trả về response mới
//       return newResponse;
//     }

//     // Trả về response bình thường
//     return response;
//   },
//   (error) => {
//     // Xử lý lỗi
//     console.error("Lỗi:", error);
//   },
// );