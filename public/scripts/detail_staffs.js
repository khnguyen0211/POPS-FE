const chartStaff = document.getElementById("chartStaff");
const chartStaff2D = chartStaff.getContext("2d");

const url = window.location.href;
const pathnameParts = url.split("/");
let id = pathnameParts[pathnameParts.length - 1];

id.trim();
console.log(id);

let data_days = [];
let data_revenues = [];
const getDataStaffInfo = async () => {
  const axiosInstance = axios.create({
    baseURL: "https://pops-backend.onrender.com",
  });
  const result = await axiosInstance.get(`/managers/staff-info/${id}`);
  return result.data;
};

getDataStaffInfo().then((data) => {
  data_days = data.days;
  data_revenues = data.revenue_list;
  data_total_orders = data.total_order_list;
  data_total_product = data.product_quantity_list;

  const chart_data = {
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

  const config = {
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
        console.log(index);
        console.log(data_days[index]);
      },
    },
  };
  const new_chart = new Chart(chartStaff2D, config);
  const table = document.querySelector("table");

  //   console.log(table);
  console.log(data.orderList);
  // const customer_name = document.getElementById("customer_name");
  // const created_by = document.getElementById("created_by");
  // const created_at = document.getElementById("created_at");

  // const total = document.getElementById("total");
  // const row = document.createElement("tr");

  for (const product of data.orderList) {
    // console.log(data.orderList);
    // console.log(product.length == 1);
    if (product.length != 0) {
      for (const data of product) {
        console.log(data);
        const row = document.createElement("tr");
        // console.log(table);
        // // Thêm cột tên sản phẩm
        console.log(data.invoice_code);
        const product_code_cell = document.createElement("td");
        product_code_cell.innerHTML = data.invoice_code;
        row.appendChild(product_code_cell);

        const product_total_cell = document.createElement("td");
        product_total_cell.innerHTML = data.total;
        row.appendChild(product_total_cell);

        const product_customer_cell = document.createElement("td");
        product_customer_cell.innerHTML = data.customer.full_name;
        row.appendChild(product_customer_cell);

        const product_method_cell = document.createElement("td");
        product_method_cell.innerHTML = data.payment_method;
        row.appendChild(product_method_cell);

        const product_discount_cell = document.createElement("td");
        product_discount_cell.innerHTML = data.discount;
        row.appendChild(product_discount_cell);

        const product_create_cell = document.createElement("td");
        product_create_cell.innerHTML = moment(data.created_at).format(
          "DD/MM/YYYY - HH:mm:ss"
        );
        row.appendChild(product_create_cell);

        table.appendChild(row);
      }
    }

    // if (product) {
    //   const row = document.createElement("tr");
    //   // console.log(table);
    //   // // Thêm cột tên sản phẩm
    //   console.log(product.invoice_code);
    //   const product_code_cell = document.createElement("td");
    //   product_code_cell.innerHTML = product.invoice_code;
    //   row.appendChild(product_code_cell);
    // }

    // // Thêm cột số lượng
    // const quantity_cell = document.createElement("td");
    // quantity_cell.innerHTML = product.quantity;
    // row.appendChild(quantity_cell);

    // // Thêm cột giá
    // const price_cell = document.createElement("td");
    // price_cell.innerHTML = product.price;
    // row.appendChild(price_cell);
  }
});

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};
