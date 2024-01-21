const form = document.querySelector('form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const accessToken = localStorage.getItem("accessToken");
    const axiosInstance = axios.create({
      baseURL: "https://pops-backend.onrender.com",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = {
      full_name: document.querySelector("input[name='full_name']").value,
      email: document.querySelector("input[name='email']").value,
    };
    console.log(data)

    const response = await axiosInstance.post("/managers/create-staff-account", data);
    Swal.fire({
      icon: "success",
      title: "Create Success!.",
      text: `${response.data.message}`,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "/contacts";
    }, 1700)
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }

})