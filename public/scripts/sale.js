//==========Bang trong model thanh toan==========
//===================Sot rac=====================
//====== Thay doi gia tri quantity trong model=====
//===================Voucher====================256
//============search  Customer==============293
//==================payment==================

//===========Voucher=============

const voucher = document.getElementById("voucher");
let Voucher = "";
let voucher_code = "";
voucher.addEventListener("submit", async (e) => {
  e.preventDefault();
  const voucherValue = document.getElementById("voucher_value").value;
  Voucher = voucherValue;
  const voucherSpan = document.getElementById("span_voucher");
  // console.log(voucherValue);
  try {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000",
      //
    });
    const response = await axiosInstance.post(
      "/payments/get-discount-by-voucher",
      {
        code: voucherValue ? voucherValue : "",
      }
    );
    Swal.fire({
      icon: "success",
      title: "success",
      text: `Voucher ${response.data.message} $`,
    }).then(() => {
      checkVoucher(Voucher);
      checkVoucherTotal3(Voucher);
    });
    Voucher = parseInt(response.data.message);
    voucher_code = voucherValue;
    voucherSpan.innerHTML = response.data.message + " $";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
});

var customer_id = "";
var quantity = 1;
var product_list = [];
var product_list_bill = [];

function clickProduct() {
  const cartWarp = document.querySelector(".cart-warp");
  const addProductButtons = document.querySelectorAll("#add_product");
  let customerExists = false;
  for (const button of addProductButtons) {
    button.addEventListener("click", () => {
      let productId = button.querySelector("#product_id").textContent;
      let productPrice = button.querySelector("#retail_price").textContent;
      let productName = button.querySelector("#product_name").textContent;

      const index = product_list.findIndex((p) => p.product_id === productId);
      const index_bill = product_list_bill.findIndex(
        (p) => p.product_id === productId
      );
      if (index == -1) {
        // Nếu sản phẩm chưa tồn tại, thêm nó vào mảng
        product_list.push({
          product_name: productName,
          product_id: productId,
          quantity: quantity,
          retail_price: productPrice,
        });
        product_list_bill.push({
          product_name: productName,
          product_id: productId,
          quantity: quantity,
          retail_price: productPrice,
        });

        // Tạo thẻ chứa giá trị product_name
        const productNameElement = document.createElement("h4");
        productNameElement.textContent = productName;

        // Tạo thẻ chứa giá trị retail_price
        const productPriceElement = document.createElement("span");
        productPriceElement.textContent = productPrice;

        //Create tag i
        const productTrashElement = document.createElement("i");
        const iconCaretDown = document.createElement("i");
        const iconCaretUp = document.createElement("i");

        //Create span quality
        const qualityIconElement = document.createElement("span");

        qualityIconElement.setAttribute("id", `${productId}`);
        qualityIconElement.innerText = quantity;

        const newCartItem = document.createElement("div");
        const newSetPrice = document.createElement("div");
        const newSetName = document.createElement("div");
        const newSetitem = document.createElement("div");
        const newLine = document.createElement("div");

        newLine.classList.add("line");
        cartWarp.append(newCartItem, newLine);

        newCartItem.classList.add("cart-item");
        newCartItem.append(newSetName, newSetitem, newSetPrice);

        newSetName.classList.add("set-name");
        newSetName.append(productNameElement);

        newSetitem.classList.add("set-item");
        newSetitem.append(iconCaretDown, qualityIconElement, iconCaretUp);

        iconCaretDown.classList.add("fa-solid", "fa-square-caret-down");
        iconCaretDown.addEventListener("click", () => {
          // console.log("down new");
          const new_product_index = product_list.findIndex(
            (p) => p.product_id === productId
          );
          product_list[new_product_index].product_id
            ? product_list[new_product_index].product_id
            : 0;
          const p_id = product_list[new_product_index].product_id;
          const p_id_bill =
            product_list_bill[new_product_index].product_id + "_bill";

          const span_quantity = document.getElementById(p_id);
          const td_quantity = document.getElementById(p_id_bill);

          let count = product_list[new_product_index].quantity - 1;
          let countBill = product_list_bill[new_product_index].quantity - 1;

          if (count <= 0) {
            cartWarp.removeChild(newCartItem);
            tbody.removeChild(newCartItemTr);
            product_list.splice(new_product_index, 1);
            product_list_bill.splice(new_product_index, 1);
          }

          product_list[new_product_index] = {
            ...product_list[new_product_index],
            quantity: count,
          };
          product_list_bill[new_product_index] = {
            ...product_list_bill[new_product_index],
            quantity: countBill,
          };

          span_quantity.innerHTML = product_list[new_product_index].quantity;
          product_list_bill[new_product_index].quantity
            ? product_list_bill[new_product_index].quantity
            : 0;
          td_quantity.innerText = product_list_bill[new_product_index].quantity;
          if (product_list[new_product_index].quantity == 0) {
            product_list.splice(new_product_index, 1);
          }
          // giam gio hang
          // console.log(product_list);
          const total_money = product_list.reduce(
            (sum, p) => sum + parseInt(p.quantity) * parseInt(p.retail_price),
            0
          );
          // console.log(total_money);
          document.getElementById(
            "cart-payment-total"
          ).innerHTML = `${total_money} $`;
          document.getElementById(
            "cart-payment-total2"
          ).innerText = `${calculateVoucher(Voucher, total_money)}`;
          document.getElementById(
            "cart-payment-total3"
          ).innerText = `${calculateVoucher(Voucher, total_money)} $`;
        });

        iconCaretUp.classList.add("fa-solid", "fa-square-caret-up");
        iconCaretUp.addEventListener("click", () => {
          const new_product_index = product_list.findIndex(
            (p) => p.product_id === productId
          );
          const p_id = product_list[new_product_index].product_id;
          const p_id_bill =
            product_list_bill[new_product_index].product_id + "_bill";

          const span_quantity = document.getElementById(p_id);
          const td_quantity = document.getElementById(p_id_bill);

          let count = product_list[new_product_index].quantity + 1;
          let countBill = product_list_bill[new_product_index].quantity + 1;

          product_list[new_product_index] = {
            ...product_list[new_product_index],
            quantity: count,
          };
          product_list_bill[new_product_index] = {
            ...product_list_bill[new_product_index],
            quantity: countBill,
          };

          span_quantity.innerHTML = product_list[new_product_index].quantity;
          td_quantity.innerHTML = product_list_bill[new_product_index].quantity;

          //tinh tong trong gio hang

          const total_money = product_list.reduce(
            (sum, p) => sum + parseInt(p.quantity) * parseInt(p.retail_price),
            0
          );
          // console.log(total_money);
          document.getElementById(
            "cart-payment-total"
          ).innerHTML = `${total_money} $`;
          document.getElementById(
            "cart-payment-total2"
          ).innerText = `${calculateVoucher(Voucher, total_money)}`;
          document.getElementById(
            "cart-payment-total3"
          ).innerText = `${calculateVoucher(Voucher, total_money)} $`;
        });

        //==========Bang trong model thanh toan==========

        //Query table
        const tbody = document.querySelector("tbody");

        //tao hang
        const newCartItemTr = document.createElement("tr");
        tbody.append(newCartItemTr);

        //tao cot ten
        const productNameTd = document.createElement("td");
        newCartItemTr.append(productNameTd);
        productNameTd.textContent = productName;

        //tao cot Quantity
        const productQuantity = document.createElement("td");

        newCartItemTr.append(productQuantity);
        // productQuantity.textContent = "1";
        productQuantity.setAttribute("id", `${productId}_bill`);
        productQuantity.innerText = quantity;

        //tao cot Price
        const productPriceTd = document.createElement("td");
        newCartItemTr.append(productPriceTd);
        productPriceTd.textContent = productPrice;

        //tao cot Total
        const productTotal = document.createElement("td");
        productTotal.setAttribute("id", `Total_${productId}_bill`);
        newCartItemTr.append(productTotal);
        productTotal.innerText = productPrice;

        //========================= Sot rac=========================
        newSetPrice.classList.add("set-price");
        newSetPrice.append(productPriceElement, productTrashElement);
        productTrashElement.classList.add(
          "fa-regular",
          "fa-trash-can",
          "icon-trash"
        );

        // sot rac new
        productTrashElement.addEventListener("click", () => {
          const new_product_index = product_list.findIndex(
            (p) => p.product_id === productId
          );
          // console.log("sot rac new");

          cartWarp.removeChild(newCartItem);
          tbody.removeChild(newCartItemTr);

          product_list.splice(new_product_index, 1);
          product_list_bill.splice(new_product_index, 1);

          const total_money = product_list.reduce(
            (sum, p) => sum + parseInt(p.quantity) * parseInt(p.retail_price),
            0
          );
          // console.log(total_money);
          document.getElementById(
            "cart-payment-total"
          ).innerHTML = `${total_money} $`;
          document.getElementById(
            "cart-payment-total2"
          ).innerText = `${calculateVoucher(Voucher, total_money)}`;
          document.getElementById(
            "cart-payment-total3"
          ).innerText = `${calculateVoucher(Voucher, total_money)} $`;
        });
      } else {
        let productQuality = document.getElementById(
          `${product_list[index].product_id}`
        );
        let count = product_list[index].quantity + 1;

        product_list[index] = { ...product_list[index], quantity: count };
        productQuality.innerHTML = count;

        //========== Thay doi gia tri quantity trong model===========
        let productQualityBill = document.getElementById(
          `${product_list_bill[index_bill].product_id}_bill`
        );

        let countBill = product_list_bill[index_bill].quantity + 1;
        product_list_bill[index_bill] = {
          ...product_list_bill[index_bill],
          quantity: countBill,
        };
        productQualityBill.innerText = countBill;

        let productTotalBill = document.getElementById(
          `Total_${product_list_bill[index_bill].product_id}_bill`
        );

        let retailPrice =
          parseInt(product_list_bill[index_bill].retail_price) *
          parseInt(countBill);
        productTotalBill.innerText = `${retailPrice} $`;
      }
      const total_money = product_list.reduce(
        (sum, p) => sum + parseInt(p.quantity) * parseInt(p.retail_price),
        0
      );
      // console.log(total_money);
      document.getElementById(
        "cart-payment-total"
      ).innerHTML = `${total_money} $`;
      document.getElementById(
        "cart-payment-total2"
      ).innerText = `${calculateVoucher(Voucher, total_money)}`;
      document.getElementById(
        "cart-payment-total3"
      ).innerText = `${calculateVoucher(Voucher, total_money)} $`;
    });
  }
}
clickProduct();

function calculateTotalRetailPrice(products) {
  let totalRetailPrice = 0;
  for (const product of products) {
    totalRetailPrice +=
      parseInt(product.retail_price) * parseInt(product.quantity);
  }
  return totalRetailPrice;
}
function calculateVoucher(voucher, price) {
  price = price - voucher;
  if (price <= 0) {
    return 0;
  }
  return price;
}
function checkVoucher(voucher) {
  const money = parseInt(
    document.getElementById("cart-payment-total2").textContent
  );
  if (money != 0) {
    // console.log(money)
    return (document.getElementById(
      "cart-payment-total2"
    ).innerText = `${calculateVoucher(voucher, money)} $`);
  }
}
function checkVoucherTotal3(voucher) {
  const money = parseInt(
    document.getElementById("cart-payment-total3").textContent
  );
  if (money != 0) {
    // console.log(money)
    return (document.getElementById(
      "cart-payment-total3"
    ).innerText = `${calculateVoucher(voucher, money)} $`);
  }
}

//=====================search  Customer===========

let customer_list = [];
let idCustomer = [];

const div = document.querySelector(".list-FindCustomer");
const myDiv = document.querySelector(".cart-warp");
const ID = document.querySelector(".cart");
const formInputForcus = document.getElementById("form-FindCustomer");

myDiv.addEventListener("click", () => {
  div.style.display = "none";
});
const myCart = document.querySelector(".show-product");
myCart.addEventListener("click", () => {
  div.style.display = "none";
});

async function searchCustomer(event) {
  const customer = document.getElementById("form-FindCustomer").value;
  if (event.key === "Enter") {
    div.style.display = "block";
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000",
      });
      const response = await axiosInstance.post("/search/customer-searching", {
        text: customer,
      });
      let div = document.querySelector(".list-FindCustomer");
      let ulList = document.querySelector(".list-FindCustomer-select");
      let liList = document.querySelector(".list-FindCustomer-item");

      if (liList) {
        ulList.remove(liList);
        let newliList = document.createElement("ul");
        newliList.classList.add("list-FindCustomer-select");
        div.appendChild(newliList);
      }
      if (response.data.length == 0) {
        let newUlList = document.querySelector(".list-FindCustomer-select");
        let liList = document.createElement("li");
        liList.classList.add("list-FindCustomer-item");
        newUlList.append(liList);
        liList.textContent = "Not found";
        return;
      }
      customer_list = [...response.data];

      customer_list.forEach((item) => {
        let newUlList = document.querySelector(".list-FindCustomer-select");
        let liList = document.createElement("li");

        liList.classList.add("list-FindCustomer-item");
        liList.setAttribute("id", `${item._id}`);
        newUlList.append(liList);
        //show customer list
        liList.textContent = `Name: ${item.full_name} , Phone: ${item.phone_number}`;
      });
      customer_list = [];

      const div1 = document.querySelector(".list-FindCustomer");
      const formInputForcus = document.getElementById("form-FindCustomer");

      const listItems = document.querySelectorAll(
        ".list-FindCustomer-select .list-FindCustomer-item"
      );

      const customerName = document.querySelector("#customer_name");

      listItems.forEach((item) => {
        item.addEventListener("click", function () {
          // console.log(item)
          formInputForcus.value = item.innerText;
          idCustomer.push(item.id);
          ///=================gan id customer========
          customerName.innerHTML = `<small>Customer: ${item.innerText}</small>`;
          div1.style.display = "none";
          customerExists = true;
        });

        item.addEventListener("blur", function () {
          div1.style.display = "none";
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  }
}

//=========search product ==============
// const div1 = document.querySelector(".list-FindCustomer");
// const myDiv1 = document.querySelector(".cart-warp");
// const ID1 = document.querySelector(".cart");
// const formFindCustomer = document.getElementById("form-FindCustomer");

// async function searchProduct(event) {
//   const customer = document.getElementById("form-FindCustomer").value;
//   if (event.key === "Enter") {
//     div.style.display = "block";
//     try {
//       const axiosInstance = axios.create({
//         baseURL: "http://localhost:4000",
//       });
//       const response = await axiosInstance.post("/search/customer-searching", {
//         text: customer,
//       });
//       let div = document.querySelector(".list-FindCustomer");
//       let ulList = document.querySelector(".list-FindCustomer-select");
//       let liList = document.querySelector(".list-FindCustomer-item");

//       if (liList) {
//         ulList.remove(liList);
//         let newliList = document.createElement("ul");
//         newliList.classList.add("list-FindCustomer-select");
//         div.appendChild(newliList);
//       }
//       if (response.data.length == 0) {
//         let newUlList = document.querySelector(".list-FindCustomer-select");
//         let liList = document.createElement("li");
//         liList.classList.add("list-FindCustomer-item");
//         newUlList.append(liList);
//         liList.textContent = "Not found";
//         return;
//       }
//       customer_list = [...response.data];

//       customer_list.forEach((item) => {
//         let newUlList = document.querySelector(".list-FindCustomer-select");
//         let liList = document.createElement("li");

//         liList.classList.add("list-FindCustomer-item");
//         liList.setAttribute("id", `${item._id}`);
//         newUlList.append(liList);
//         //show customer list
//         liList.textContent = `Name: ${item.full_name} , Phone: ${item.phone_number}`;
//       });
//       customer_list = [];

//       const div1 = document.querySelector(".list-FindCustomer");
//       const formInputForcus = document.getElementById("form-FindCustomer");

//       const listItems = document.querySelectorAll(
//         ".list-FindCustomer-select .list-FindCustomer-item"
//       );

//       const customerName = document.querySelector("#customer_name");

//       listItems.forEach((item) => {
//         item.addEventListener("click", function () {
//           console.log(item);
//           formInputForcus.value = item.innerText;
//           idCustomer.push(item.id);
//           ///=================gan id customer========
//           customerName.innerHTML = `<small>Customer: ${item.innerText}</small>`;
//           div1.style.display = "none";
//           customerExists = true;
//         });

//         item.addEventListener("blur", function () {
//           div1.style.display = "none";
//         });
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: `${error}`,
//       });
//     }
//   }
// }

//=======payment======
const addPament = document.getElementById("payMent");
let textCash = "";

addPament.addEventListener("click", async () => {
  // const customer_id = "654c8d08049ae263a8e688a6";
  const cashCustomer = document.getElementById("payment").value;
  textCash = cashCustomer;
  const cart_product = product_list.map((p) => {
    return {
      product_id: p.product_id,
      quantity: p.quantity,
    };
  });
  if (cashCustomer) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await axiosInstance.post("/payments/pay-by-cash", {
        customer_id: idCustomer[0],
        product_list: cart_product,
        voucher: voucher_code ? voucher_code : "",
        money_given: parseInt(cashCustomer),
      });
      if (response.status == 200) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Payment success",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          performAnimationAndHide();
          setTimeout(() => {
            location.reload();
          }, 500);
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Cash is not enough",
    });
  }
});

const addCustomer = document.getElementById("addCustomer");
addCustomer.addEventListener("click", async () => {
  const { value: formValues } = await Swal.fire({
    title: "Add customer",
    html: `
      <label>Name</label>
      <input id="swal-input1" class="swal2-input">
      <label>Phone</label>
      <input id="swal-input2" class="swal2-input">
      <label>Address</label>
      <input id="swal-input2" class="swal2-input">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });
});