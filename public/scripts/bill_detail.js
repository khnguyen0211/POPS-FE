let addProducts = document.querySelector(".add-products"); //css animatio
let btnAddProducts = document.getElementById("addProducts"); //show model
let modalContentProduct = document.querySelector(".modal-content-product");
let removeAddProducts = document.getElementById("turnOffAddProduct");
//display add product
btnAddProducts.addEventListener("click", function () {
  const cashCustomer = document.getElementById("payment").value;
  const customer_input = document.getElementById('form-FindCustomer').value
  if (!customer_input) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select customer for this order",
    });
    return;
  }
  if (customerExists == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Customer is not exists",
    });
    return;
  }
  if (!product_list || product_list.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select at least 1 product for your cart",
    });
    return;
  }

  else {
    // console.log(object
    addProducts.style.display = "block";
  }
});

//Hidden add product
removeAddProducts.addEventListener("click", () => {
  performAnimationAndHide1();
  // console.log("123")
});

async function performAnimationAndHide1() {
  // Sử dụng `await` để đợi kết thúc animation
  await new Promise((resolve) => {
    modalContentProduct.style.animation = "hidden-modal 0.6s ease";
    modalContentProduct.addEventListener("animationend", resolve);
  });

  // Sau khi animation hoàn thành, chạy câu lệnh `addProducts.style.display`
  
  addProducts.style.display = "none";
  modalContentProduct.style.animation = "appear-modal 1s ease";
}

//============================QR-Cash====================

const cash = document.querySelector(".sale-payment-body");
const QR = document.querySelector(".sale-payment img");
const aQR = document.querySelector(".sale-payment a");

let isCheck = false;
function appearCash() {
  if (isCheck == true) {
    cash.style.display = "block";
    QR.style.display = "none";
    aQR.style.display = "none";
    isCheck = !isCheck;
  }
}

async function callQR() {
  // const customer_id = "654c8d08049ae263a8e688a6";
  // const cashCustomer = document.getElementById("payment").value;
  const cart_product = product_list.map((p) => {
    return {
      product_id: p.product_id,
      quantity: p.quantity,
    };
  });
  if (idCustomer[0] == null) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui long nhap ten khach hang",
    });
  } else {
    try {
      const qR = document.getElementById("QRcode");
      const aQR = document.getElementById("aQRcode");
      const accessToken = localStorage.getItem("accessToken");
      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await axiosInstance.post("/payments/pay-by-paypal", {
        customer_id: idCustomer[0],
        product_list: cart_product,
        voucher: voucher_code ? voucher_code : "",
      });
      //
      qR.src = response.data.qr_code;
      aQR.href = response.data.paypal;
      // aQR.addEventListener("click", () => {
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 3000)
      // })
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  }
}

function appearQR() {
  if (isCheck == false) {
    cash.style.display = "none";
    QR.style.display = "block";
    aQR.style.display = "flex";
    isCheck = !isCheck;
  }
  //===call API======
  callQR();
}

//==================Print Billl===============
function printBill() {
  let bill = document.getElementById("sale-detail");
  let bill1 = bill.innerHTML;
  var printWindow = window.open("", "PRINT", "height=1000,width=1000");
  printWindow.document.write(
    "<html><head><title>Print Bill</title></head><body>"
  );
  printWindow.document.write(
    "<style>#contentToPrint{background-color:#d3d3d3;padding:20px}@media print{body{margin:0;text-align:center}#contentToPrint{background-color:#fff;padding:10px}img{display:block;width:150px;height:150px;object-fit:cover;position:relative;transform:translateX(-50%);left:50%}.text-center{display:flex;flex-direction:column}.table-detail table{line-height:1.5;width:100%;text-align:center}}</style>"
  );
  printWindow.document.write(bill1);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
  return true;
}

/// ============tinh tien thua ===========
const formPayment = document.querySelector(".form-payment");
const paymentDue = document.getElementById("cart-payment-due");
formPayment.addEventListener("input", () => {
  const value = document.getElementById("payment").value;
  const total = document.getElementById('cart-payment-total2');
  // console.log(value)
  // console.log(total.innerHTML.slice(0, 2))
  let totalDue = parseInt(value) - parseInt(total.innerHTML);
  if (Number.isNaN(totalDue)) {
    totalDue = 0;
  }
  paymentDue.innerHTML = `${totalDue} $`;
  // val
});

const date = document.getElementById('date');
date.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss');
