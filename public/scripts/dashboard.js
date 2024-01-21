let myChart = document.getElementById("myChart");
let myChart2D = myChart.getContext("2d");

let daterange = document.getElementById("daterange");
daterange.value = `${moment()
  .subtract(7, "days")
  .calendar()} - ${moment().format("L")}`;

let from = "";
let to = "";
let data_from_to = {
  from,
  to,
};

let data_days = [];
let data_revenues = [];
let data_total_orders = [];
let data_total_product = [];

let chart_data = {};
let config = {};

let my_chart;

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const getDataRevenue = async () => {
  const axiosInstance = axios.create({
    baseURL: "https://pops-backend.onrender.com",
  });
  const result = await axiosInstance.post("/revenue/revenue");
  return result.data;
};

async function getData() {
  await getDataRevenue().then((data) => {
    // console.log(data)
    data_days = data.days;
    data_revenues = data.revenue_list;
    data_total_orders = data.total_order_list;
    data_total_product = data.product_quantity_list;
    chart_data = {
      labels: data_days,
      datasets: [
        {
          label: "Revenues",
          data: data_revenues,
          borderColor: CHART_COLORS.red,
          backgroundColor: ["rgba(255, 99, 132, 0.5)"],
          stack: "combined",
          type: "bar",
          yAxisID: "y",
        },
        {
          label: "Orders",
          data: data_total_orders,
          borderColor: CHART_COLORS.blue,
          backgroundColor: ["rgba(54, 162, 235, 0.5)"],
          stack: "combined",
          yAxisID: "y1",
        },
      ],
    };
    config = {
      type: "line",
      data: chart_data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Chart.js Stacked Line/Bar Chart",
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",

            // grid line settings
            grid: {
              drawOnChartArea: true, // only want the grid lines for one axis to show up
            },
          },
        },
        onClick: (e, indexList) => {
          const index = indexList[0].index;
        },
      },
    };
    my_chart = new Chart(myChart2D, config);
  });
  return config;
}
getData();

//============== calender ==============
function addData(chart, label, data_revenues, data_total_orders) {
  console.log(label);
  chart.data.labels = label;

  // console.log(chart.data.datasets)

  chart.data.datasets[0] = { ...chart.data.datasets[0], data: data_revenues };
  chart.data.datasets[1] = {
    ...chart.data.datasets[1],
    data: data_total_orders,
  };

  chart.update();
}

$(function () {
  var start = moment().subtract(29, "days");
  var end = moment();

  function cb(start, end) {
    $("#reportrange span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  }

  $("#reportrange").daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    cb
  );

  cb(start, end);
});
$(document).ready(function () {
  $('input[name="daterange"]').daterangepicker();

  // Console.log mã nguồn của DateRangePicker
  // console.log($.fn.daterangepicker);
});
$(function () {
  $('input[name="datefilter"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear",
    },
  });

  $('input[name="datefilter"]').on(
    "apply.daterangepicker",
    function (ev, picker, start, end, label) {
      $(this).val(
        picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
      );
      from = start.format("YYYY-MM-DD");
      to = end.format("YYYY-MM-DD");
      data_from_to = {
        from,
        to,
      };
      console.log(data_from_to);
      ////=============
      setTimeout(() => {
        getDataList1(data_from_to).then((data12) => {
          console.log(data12);
        });
      }, 5000);
    }
  );

  $('input[name="datefilter"]').on(
    "cancel.daterangepicker",
    function (ev, picker) {
      $(this).val("");
    }
  );
});
$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "rights",
    },
    function (start, end, label) {
      from = start.format("YYYY-MM-DD");
      to = end.format("YYYY-MM-DD");
      data_from_to = {
        from: from,
        to: to,
      };

      getDataList1(data_from_to).then((result) => {
        console.log(result.data);
        my_chart.data.labels = result.data.days.reverse();

        my_chart.data.datasets[0] = {
          ...my_chart.data.datasets[0],
          data: result.data.revenue_list.reverse(),
        };
        my_chart.data.datasets[1] = {
          ...my_chart.data.datasets[1],
          data: result.data.total_order_list.reverse(),
        };

        my_chart.update();
      });
      getOrderList(data_from_to).then((result) => {
        upDateTable(result.data);
        console.log(result.data);
      });
    }
  );
});

const getDataList1 = async (data_from_to) => {
  const axiosInstance = axios.create({
    baseURL: "https://pops-backend.onrender.com",
  });

  const result = await axiosInstance.post("/revenue/revenue", data_from_to);
  return result;
};

function removeData(chart) {
  chart.data.labels.pop();
  chart.update();
}

// ============= list =====================
const getDataList = async (id) => {
  const axiosInstance = axios.create({
    baseURL: "https://pops-backend.onrender.com",
  });
  const result = await axiosInstance.get(`/revenue/invoice/${id}`);
  return result.data;
};

const getOrderList = async (data) => {
  const axiosInstance = axios.create({
    baseURL: "https://pops-backend.onrender.com",
  });
  console.log(data);
  const result = await axiosInstance.post(`/revenue/order-list`, data);
  return result;
};
//

function showModal() {
  const showModal = document.querySelectorAll("#show-modal");
  const data = document.querySelectorAll("#data");

  //=======================
  let addProducts = document.querySelector(".add-products"); //css animatio
  let btnAddProducts = document.getElementById("addProducts"); //show model
  let modalContentProduct = document.querySelector(".modal-dashboard-product");
  let removeAddProducts = document.getElementById("turnOffAddProduct");
  //display add product
  for (const button of showModal) {
    button.addEventListener("click", () => {
      addProducts.style.display = "block";
      let productId = button.querySelector("#product_id").textContent;
      // console.log(productId);
      getDataList(productId).then((data) => {
        // console.log(data);
        // console.log(data.customer.full_name)
        const customer_name = document.getElementById("customer_name");
        const created_by = document.getElementById("created_by");
        const created_at = document.getElementById("created_at");
        const table = document.querySelector("table");
        const total = document.getElementById("total");
        // console.log(table);
        for (const product of data.product_list) {
          const row = document.createElement("tr");
          row.setAttribute('id', 'new_product_detail')

          // Thêm cột tên sản phẩm
          const product_name_cell = document.createElement("td");
          product_name_cell.innerHTML = product.product_name;
          row.appendChild(product_name_cell);

          // Thêm cột số lượng
          const quantity_cell = document.createElement("td");
          quantity_cell.innerHTML = product.quantity;
          row.appendChild(quantity_cell);

          // Thêm cột giá
          const price_cell = document.createElement("td");
          price_cell.innerHTML = product.price;
          row.appendChild(price_cell);

          table.appendChild(row);
        }

        customer_name.innerHTML = `Customer: ${data.customer.full_name}`;
        created_by.innerHTML = `Sold By: ${data.created_by.full_name}`;
        created_at.innerText = moment(data.created_at).format(
          "DD/MM/YYYY - HH:mm:ss"
        );
        total.innerHTML = `${data.total} $`;
      });
    });
  }
  //Hidden add product
  removeAddProducts.addEventListener("click", () => {
    console.log('123')
    const table = document.querySelector("table");
    const item = document.getElementById('new_product_detail')
    table.removeChild(item);
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
}

function upDateTable(data) {
  const chartList = document.querySelector(".chart-list-product");
  const table = document.querySelector(".table-list-product.table");
  chartList.removeChild(table);
  const newTable = document.createElement("table");
  newTable.classList.add("table-list-product");
  newTable.classList.add("table");
  newTable.createTBody();
  // newTable.append(tbody);
  const th_lable = [
    "Code",
    "Total",
    "Customer",
    "Methods",
    "Discount ",
    "Cash",
    "Due",
    "Created_at",
    "Created_by",
  ];
  const thead_table = document.createElement("tr");
  th_lable.forEach((element) => {
    const th_table = document.createElement("th");
    th_table.append(element);
    thead_table.append(th_table);
  });

  newTable.append(thead_table);
  chartList.append(newTable);
  console.log(data);

  data.forEach((element) => {
    element.forEach((item) => {
      const tr = document.createElement("tr");

      const td_Code = document.createElement("td");
      const a = document.createElement("a");
      const p = document.createElement("p");

      const td_Total = document.createElement('td');
      const td_Customer = document.createElement('td');
      const td_Methods = document.createElement('td');
      const td_Discount = document.createElement('td');
      const td_Cash = document.createElement('td');
      const td_Due = document.createElement('td');
      const td_Created_at = document.createElement('td');
      const td_Created_by = document.createElement('td');
      const a_Created_by = document.createElement('a');
      const span_Created_by = document.createElement('span');


      tr.setAttribute("id", `data`);
      a.setAttribute("id", "show-modal");
      a.textContent = item.invoice_code;
      p.setAttribute("id", "product_id");
      p.textContent = item._id;

      td_Total.textContent = `${item.subtotal} $`;
      td_Customer.textContent = item.customer.full_name;
      td_Methods.textContent = item.payment_method
      td_Discount.textContent = `${item.discount} $`;
      td_Cash.textContent = item.payment_method == 'Paypal' ? '-' : `${item.money_given}$`
      td_Due.textContent = item.payment_method == 'Paypal' ? '-' : `${item.money_back}$`
      td_Created_at.textContent = item.created_at.split('T')[0]

      a.append(p);
      td_Code.append(a);

      a_Created_by.setAttribute('href', `contacts/staffs/${item.created_by._id}`)
      span_Created_by.textContent = item.created_by.full_name

      a_Created_by.append(span_Created_by)
      td_Created_by.append(a_Created_by)

      // vong for tr append td
      tdUpdate = [
        td_Code,
        td_Total,
        td_Customer,
        td_Methods,
        td_Discount,
        td_Cash,
        td_Due,
        td_Created_at,
        td_Created_by,
      ]
      tdUpdate.forEach(item => {
        tr.append(item)
      });
      newTable.append(tr);
    });
  });
  showModal();
}

showModal();
