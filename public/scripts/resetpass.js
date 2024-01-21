const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  const access_token = document.getElementById("access_token").innerHTML;

  e.preventDefault();
  try {
    
    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const response = await axiosInstance.post("/staffs/create-password", {
      password,
      confirm_password,
    });
    Swal.fire({
      icon: "success",
      title: "Create Success!.",
      text: `${response.data.message}`,
      timer: 1500,
    });
    setTimeout(()=>{
        window.location.href = "/logout";
    }, 1700)
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
});
