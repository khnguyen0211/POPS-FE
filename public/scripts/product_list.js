// let btnAddProducts = document.getElementById("addProducts");
// let removeAddProducts = document.getElementById("turnOffAddProduct");
let addProducts = document.querySelector(".add-products"); //css animatio
let btnAddProducts = document.getElementById("addProducts"); //show model
let modalContentProduct = document.querySelector(".modal-content-product");
let removeAddProducts = document.getElementById("turnOffAddProduct");

btnAddProducts.addEventListener("click", function () {
  addProducts.style.display = "block";
});

//Hidden add product
removeAddProducts.addEventListener("click", () => {
  performAnimationAndHide();
});

async function performAnimationAndHide() {
  // Sử dụng `await` để đợi kết thúc animation
  await new Promise((resolve) => {
    modalContentProduct.style.animation = "hidden-modal 0.6s ease";
    modalContentProduct.addEventListener("animationend", resolve);
  });

  // Sau khi animation hoàn thành, chạy câu lệnh `addProducts.style.display`
  addProducts.style.display = "none";
  modalContentProduct.style.animation = "appear-modal 1s ease";
}

const trashIcon = document.querySelectorAll("#trashIcon");
for (const trash of trashIcon) {
  trash.addEventListener("click", () => {
    const id = trash.textContent.trim();
    const accessToken = localStorage.getItem("accessToken");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete this products?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const axiosInstance = await axios.create({
            baseURL: "https://pops-backend.onrender.com",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          axiosInstance
            .delete(`/products/delete-product/${id}`)
            .then(function (response) {
              Swal.fire({
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                window.location.href = "/products";
              }, 1600)
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
}
