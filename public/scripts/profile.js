let profile = document.getElementById("profile");
let change_password = document.getElementById("change_password");
let profileClass = document.getElementsByClassName("profile");
let chagePassWordClass = document.getElementsByClassName("change_password");
let pagesProfile = document.getElementById("profile-pages");
let pagesChangePassWord = document.getElementById("change_password-pages");
let uploadImages = document.getElementById("upload_images");


let isChange = false;

function changeProfile() {
  if (isChange == true) {
    change_password.classList.remove("change_password");
    profile.classList.add("profile");
    pagesChangePassWord.style.display = "none";
    pagesProfile.style.display = "block";
    isChange = !isChange;
  }
}
function changePassword() {
  if (isChange == false) {
    change_password.classList.add("change_password");
    profile.classList.remove("profile");
    pagesChangePassWord.style.display = "block";
    pagesProfile.style.display = "none";
    isChange = !isChange;
  }
}

async function changeImages() {
  const { value: file } = await Swal.fire({
    title: "Select image",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
  });
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      Swal.fire({
        title: "Your uploaded picture",
        imageUrl: e.target.result,
        imageAlt: "The uploaded picture",
        imageHeight: 300,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const accessToken = localStorage.getItem("accessToken");
            const axiosInstance = axios.create({
              baseURL: "https://pops-backend.onrender.com",
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
              },
            });
            await axiosInstance
              .post("/users/upload-avatar", {
                image: file,
              }).then(async (response) => {
                await axios.post("https://pops.onrender.com/upload-avatar", {
                  avatar: response.data.avatar_url,
                }).then((response) => {
                  Swal.fire({
                    title: "Upload success!",
                    text: response.data.message,
                    icon: "success",
                  }).then((result) => {
                    window.location.reload()
                  })
                });
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Upload error!",
              text: error.response.data.message,
              icon: "error",
            });
          }
        }
      });
    };
    reader.readAsDataURL(file);
  }
}
