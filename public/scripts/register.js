const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirm_password = document.querySelector("#password_confirmation");
const date_of_birth = document.querySelector("#date_of_birth");

window.alert = function (message) {
  const alert = document.createElement("div");
  const alertButton = document.createElement("button");
  alertButton.innerText = 'OK';
  alert.classList.add("alert");
  alert.setAttribute("style", `
    background-image: linear-gradient(to right bottom, rgba(253, 214, 205, 0.986), rgb(193, 135, 171));
    width: 250px;
    height: 70px;
    position: absolute;
    z-index: 5;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 5px #00000044;
    display: flex;
    font-size: 15px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  `)
  alertButton.setAttribute("style", `
    width: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
  `)
  alert.innerHTML = `<span>${message}</span>`
  alert.appendChild(alertButton)
  alertButton.addEventListener('click', (e) => {
    alert.remove();
  })
  document.body.appendChild(alert);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:2002/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
        date_of_birth: date_of_birth.value
      }),
    });

    const data = await res.json();
    // console.log(data.message);

    // localStorage.setItem('result', result.accessToken);

    const asyncTask = new Promise((resolve, reject) => {
      // Thực hiện công việc bất đồng bộ ở đây
      if (res.status === 200) {
        // Chuyển đến trang thành công (ví dụ: trang sau khi đăng nhập thành công)
        // Tiếp tục xử lý sau khi ngăn chặn mặc định đã được gọi

        window.location.href = "/";

      } else if (res.status === 400) {
        // Hiển thị thông báo lỗi nếu status code là 400
        alert(data.message);
        console.log(data.message);
        // Ví dụ: Hiển thị lỗi trên một phần tử HTML có id là "error-message"
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = data.message;
      } else {
        // Xử lý các trường hợp khác ở đây
        console.error(`Mã lỗi HTTP: ${res.status} ${res.statusText}`);
        alert(data.message);
      }
    });
    asyncTask.then(() => {
      // Tiếp tục xử lý sau khi ngăn chặn mặc định đã được gọi và công việc bất đồng bộ hoàn thành
    });
  } catch (error) {
    // Xử lý lỗi trong trường hợp fetch thất bại hoặc mã lỗi HTTP không ổn định
    console.error("Lỗi:", error);
  }

});

