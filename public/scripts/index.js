// async function init() {

//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");
//   const avatar = localStorage.getItem("avatar");
//   // Tạo đối tượng dữ liệu
//   const data = {
//     accessToken,
//     refreshToken,
//     avatar,
//   };
//   console.log(data);

//   // Thực hiện yêu cầu POST đến API
//   try {
//     const axiosInstance = axios.create({
//       baseURL: API,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     // Thực hiện yêu cầu POST đến server http://localhost:3000
//     await axiosInstance.post("/dashboards", {
//       // Dữ liệu cần gửi
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//       avatar: avatar,
//     });
//     // Chuyển đến trang thành công
//     window.location.href = "/dashboards";
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: `${error.response.data.message}`,
//     });
//   }
// }

// init();
