let buttonExport = document.querySelector("#ButtonExport");

const input = document.getElementById("image-product"); //Uplod miages
const addProduct = document.getElementById("add_product");

const form = document.querySelector(".form"); //fetch Form

// product_name: "4444455454",
//   description: "",
//   brand: "ss",
//   import_price: 123,
//   desired_profit: 456,
//   category: "123",
//   quantity: 10,
//   barcode: "88888888",
//   image_urls: imagesURL,

// export tabe Product
// buttonExport.addEventListener("click", function () {
//   // Export dữ liệu từ table
//   let tableData = document.getElementById("tableProduct").innerHTML;
//   let table2excel = new Table2Excel();
//   table2excel.export(tableData);
//   let fileName = "table.xlsx";

//   // Export dữ liệu
//   table2excel.export(tableData, fileName);
// });

let imagesURL = [];

function sendImage(file) {
  Swal.fire({
    title: "Upload Images product!",
    html: "Updating",
    didOpen: () => {
      Swal.showLoading();
      const formData = new FormData();
      formData.append("image", file);
      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000",
      });
      axiosInstance
        .post("/products/upload-product-image", formData)
        .then((response) => {
          imagesURL.push(response.data.urls);
          if (response) {
            Swal.hideLoading();
            Swal.fire({
              title: "Upload success!",
              text: response.data.message,
              icon: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
}

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    sendImage(file);
  }
});

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const product_name = document.getElementById("product_name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const import_price = document.getElementById("import_price").value;
  const desired_profit = document.getElementById("desired_profit").value;
  const category = document.getElementById("category").value;
  const quantity = document.getElementById("quantity").value;
  const barcode = document.getElementById("barcode").value;
  console.log(product_name);

  const data = {
    product_name: product_name,
    description: description,
    brand: brand,
    import_price: import_price,
    desired_profit: desired_profit,
    category: category,
    quantity: quantity,
    barcode: barcode,
    image_urls: imagesURL,
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
  });
  axiosInstance
    .patch("/products/add-product", data)
    .then((response) => {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Upload Success",
        // text: `${response.data.mess}`,
      }).then(() => {
        window.location.href = "/products";
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    });
});

