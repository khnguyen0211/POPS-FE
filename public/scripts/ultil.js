function checkBrand(brand) {
  if (brand == 1) {
    return "a";
  }
  return "b";
}
// window.alert = function (message) {
//   const alert = document.createElement("div");
//   const alertButton = document.createElement("button");
//   alertButton.innerText = "OK";
//   alert.classList.add("alert");
//   alert.setAttribute(
//     "style",
//     `
//     background-image: linear-gradient(to right bottom, rgba(253, 214, 205, 0.986), rgb(193, 135, 171));
//     width: 250px;
//     height: 70px;
//     position: absolute;
//     z-index: 5;
//     top: 100px;
//     left: 50%;
//     transform: translateX(-50%);
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 10px 5px #00000044;
//     display: flex;
//     font-size: 15px;
//     justify-content: space-between;
//     flex-direction: column;
//     align-items: center;
//   `
//   );
//   alertButton.setAttribute(
//     "style",
//     `
//     width: 50px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//   `
//   );
//   alert.innerHTML = `<span>${message}</span>`;
//   alert.appendChild(alertButton);
//   alertButton.addEventListener("click", (e) => {
//     alert.remove();
//   });
//   document.body.appendChild(alert);
// };