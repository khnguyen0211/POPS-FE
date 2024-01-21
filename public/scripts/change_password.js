let formChangePassword = document.querySelector(".formChangePassword");

formChangePassword.addEventListener("submit", async (e) => {
  let accessToken = localStorage.getItem("accessToken");
  let old_password = document.querySelector("input[name='old_password']").value;
  let new_password = document.querySelector("input[name='new_password']").value;
  let confirm_password = document.querySelector(
    "input[name='confirm_password']"
  ).value;

  e.preventDefault();

  const axiosInstance = await axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  axiosInstance
    .post("/users/change-password", {
      old_password: old_password,
      password: new_password,
      confirm_password: confirm_password,
    })
    .then(function (message) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${message.data.message}`,
        showConfirmButton: false,
        timer: 1300
      });
      setTimeout(function () {
        window.location.href = "/";
      }, 1500);
    })
    .catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${e.response.data.message}`,
      });
    });
});
