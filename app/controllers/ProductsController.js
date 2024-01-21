class ProductController {
  //GET[] / index
  index(req, res) {
    let data = req.data;
    let dataImages = {
      persion: data.persion,
    };
    let newData = data.map((product) => {
      let a = product;
      a.brand = checkBrand(a.brand);
      a.category = checkCategory(a.category);
      return a;
    });
    const newObject = Object.assign(newData, dataImages);
    if (data.role == 1) {
      res.render("../public/views/pages/products", { reqData: newObject });
    } else {
      res.render("../public/views/pages/products_staff", { reqData: newObject });
    }
    // res.render("../public/views/pages/products", { reqData: newObject });
  }

  detail(req, res) {
    let data = req.data;
    data.brand = checkBrand(data.brand);
    data.category = checkCategory(data.category);
    console.log(data)
    if (data.role == 1) {
      res.render("../public/views/pages/detail_product", { reqData: data });
    } else {
      res.render("../public/views/pages/detail_product_staff", { reqData: data });
    }
    // res.render("../public/views/pages/detail_product", { reqData: reqData });
  }
}

const checkBrand = (brandIndex) => {
  const brandArray = [
    "iPhone",
    "Oppo",
    "Samsung",
    "XiaoMi",
    "Honor",
    "Realme",
    "Vivo",
    "Asus",
    "Nokia",
    "",
  ];
  const n = brandArray.length;
  for (let i = 0; i < n; i++) {
    if (i == brandIndex) {
      return brandArray[i];
    }
  }
  return brandArray[n - 1];
};

const checkCategory = (cateIndex) => {
  const categoryArray = ["Phone", "Laptop", "Accessories", "Unknown"];
  const n = categoryArray.length;
  if (cateIndex >= 0 && cateIndex < n) {
    return categoryArray[cateIndex];
  }
  return categoryArray[n - 1];
};

const checkUserStatus = (statusIndex) => {
  const statuses = ["Unverified", "Verified", "Blocked", "Unknown"];
  const n = statuses.length;
  if (statusIndex >= 0 && statusIndex < n) {
    return statuses[statusIndex];
  }
  return statuses[n - 1];
};

module.exports = new ProductController();
