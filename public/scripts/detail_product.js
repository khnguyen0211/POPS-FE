// ============= update product =================

const btnUpDateproduct = document.getElementById("update_product");

btnUpDateproduct.addEventListener("submit", async (e) => {
  e.preventDefault();
  const product_name = document.getElementById("product_name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const import_price = document.getElementById("import_price").value;
  const desired_profit = document.getElementById("desired_profit").value;
  const category = document.getElementById("category").value;
  const quantity = document.getElementById("quantity").value;
  const barcode = document.getElementById("barcode").value;
  
  let id = document.getElementById("idProduct");
  id = id.innerText.toString();
    console.log(id)

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
    baseURL: "https://pops-backend.onrender.com",
  });
 

  await axiosInstance
    .post(`/products/update-product/${id}`, data)
    .then((response) => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Upload Success",
        // text: `${response.data.mess}`,
      })
      .then(()=>{
        window.location.href = `/products/${id}`
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
