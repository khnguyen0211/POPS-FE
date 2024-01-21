const btnAddCustomer = document.getElementById("add-customer");
const addCustomer1 = document.querySelector(".div-customer");
const divCustomer = document.querySelector(".customer");
let removeAddCustomer = document.getElementById("turnOffAddCustomer");

btnAddCustomer.addEventListener("click", () => {
  addCustomer1.style.display = "block";
});

//Hidden add product
removeAddCustomer.addEventListener("click", () => {
  performAnimationAndHide();
});

async function performAnimationAndHide() {
  // Sử dụng `await` để đợi kết thúc animation
  await new Promise((resolve) => {
    divCustomer.style.animation = "hidden-modal 0.6s ease";
    divCustomer.addEventListener("animationend", resolve);
  });

  // Sau khi animation hoàn thành, chạy câu lệnh `addProducts.style.display`
  addCustomer1.style.display = "none";
  divCustomer.style.animation = "appear-modal 1s ease";
}

// ============ submit  customer ============

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    full_name: document.querySelector("input[name='name']").value,
    phone_number: document.querySelector("input[name='phonenumber']").value,
    address: document.querySelector("input[name='address']").value,
  };
  const accessToken = localStorage.getItem("accessToken");

  console.log(data);
  try {
    const axiosInstance = await axios.create({
      baseURL: "https://pops-backend.onrender.com",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    axiosInstance
      .post("/customers/add-customer", data)
      .then(function (response) {
        console.log(response);

        customerExists = true;
        idCustomer.push(response.data._id);

        const newCustomer = document.getElementById("form-FindCustomer");
        const customerName = document.querySelector("#customer_name");

        newCustomer.value = `Name: ${response.data.full_name}, Phone: ${response.data.phone_number}`;
        customerName.innerHTML = `<small>Customer: ${response.data.full_name}</small>`;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The client was created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          performAnimationAndHide();
        }, 1600);
      });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
});

//=============== search product ==================

async function searchProduct(event) {
  const product = document.getElementById("form-SearchProduct").value;
  const listCard = document.querySelector(".list-card");
  const listNews = document.querySelector(".list-new");
  const showProduct = document.querySelector(".show-product");
  console.log(product);
  if (product === '' && listNews) {
    console.log("null")
    listNews.remove();
    listCard.style.display = 'grid';
  }
  if (event.key === "Enter") {
    const data = {
      text: product,
    };
    try {
      const axiosInstance = await axios.create({
        baseURL: "https://pops-backend.onrender.com",
        headers: {
          "Content-Type": "application/json",
        },
      });
      axiosInstance
        .post("/search/product-searching", data)
        .then(function (response) {
          console.log(response);
          const values = Object.values(response.data);
          console.log(values.length);
          if (values.length == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Product Not Found !",
            });
          } else {
            if (listNews) {
              listNews.remove();
            }
            const ul = document.createElement("ul");
            ul.classList.add("list-new");
            showProduct.appendChild(ul);
            listCard.style.display = "none";
            response.data.forEach((item) => {
              const li = document.createElement("li");
              const a = document.createElement("a");
              const p = document.createElement("p");
              const img = document.createElement("img");
              const h4 = document.createElement("h4");
              const strong = document.createElement("strong");
              const br = document.createElement("br");
              const span = document.createElement("span");

              li.classList.add("list-card-item");

              a.classList.add(`${item._id}`);
              a.id = "add_product";

              p.innerHTML = item._id;
              p.id = "product_id";

              img.src = item.image_urls[0];

              h4.id = "product_name";
              h4.innerHTML = item.product_name;

              strong.id = "retail_price";
              strong.innerHTML = item.retail_price;

              span.id = item.quantity.toLocaleString();
              span.innerHTML = `${item.quantity}available`;

              a.append(p, img, h4, strong, br, span);
              li.append(a);
              ul.append(li);
            });
            clickProduct();
          }
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }
}