const formSpan = document.getElementById("from_id");
const from_id = formSpan.textContent.trim();

const toSpan = document.getElementById("to_id");
const to_id = toSpan.textContent.trim();
const socket = new io("http://localhost:4000");
const sendButton = document.getElementById("button");
const callVideoButton = document.getElementById("from_call_start");
const stopVideoButton = document.getElementById("from_call_stop");

const openStream = () => {
  const config = { audio: false, video: true };
  return navigator.mediaDevices.getUserMedia(config);
};

const playStream = (idVideoTag, stream) => {
  const video = document.getElementById(idVideoTag);
  video.srcObject = stream;
  video.play();
};

socket.auth = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

socket.on("disconnect", (reason) => {
  console.log(reason); // undefined
});

socket.on("receive_message", (data) => {
  console.log(data); // undefined
  outputMessage(data.content, false);
});

const peer = new Peer();
peer.on("open", (id) => {
  document.getElementById("from_peer_id").textContent = id;
});

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("msg");
  const message = messageInput.value;
  console.log(message);
  messageInput.value = "";

  socket.emit("send_message", {
    from: from_id,
    content: message,
    to: to_id, //another client
  });

  outputMessage(message, true);
  scrollToBottom();
});
function submitMessage(event) {
  if (event.key === "Enter") {
    const messageInput = document.getElementById("msg");
    const message = messageInput.value;
    console.log(message);
    messageInput.value = "";

    socket.emit("send_message", {
      from: from_id,
      content: message,
      to: to_id, //another client
    });

    outputMessage(message, true);
    scrollToBottom();
  }
}

callVideoButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("starting calling");
  const peerId = document.getElementById("from_peer_id").textContent;
  // printCallVideo();
  socket.emit("video_call_request", {
    from: from_id,
    content: peerId,
    to: to_id, //another client
  });
});

socket.on("user_calling", (data) => {
  let text = `${data.sender_id} is calling you!\nEither OK or Cancel.`;

  if (confirm(text) == true) {
    document.getElementById("to_peer_id").textContent = data.content;
    socket.emit("video_call_accepted", {
      from: data.receiver_id,
      content: document.getElementById("from_peer_id").textContent,
      to: data.sender_id,
    });
  } else {
    text = "You canceled!";
  }
});

socket.on("user_offline", (data) => {
  console.log("user offline");
});

socket.on("video_calling", (data) => {
  console.log("video calling");
  document.getElementById("to_peer_id").textContent = data.content;

  openStream().then((stream) => {
    playStream("from_video", stream);
    const call = peer.call(data.content, stream);
    call.on("stream", (toStream) => playStream("to_video", toStream));
  });
  console.log(data);
  socket.emit("sender_is_calling", data);
});

socket.on("receiver_is_calling", () => {
  console.log("receiver is calling");
  peer.on("call", (call) => {
    openStream().then((stream) => {
      call.answer(stream);
      playStream("from_video", stream);
      call.on("stream", (toStream) => playStream("to_video", toStream));
    });
  });
});

//caller
openStream().then((stream) => {
  playStream("from_video", stream);
  const call = peer.call(to_peer_id, stream);
  call.on("stream", (toStream) => playStream("to_video", toStream));
});

//callee
peer.on("call", (call) => {
  openStream().then((stream) => {
    call.answer(stream);
    playStream("from_video", stream);
    call.on("stream", (toStream) => playStream("to_video", toStream));
  });
});

// add messenger

function outputMessage(message, checkSender) {
  console.log(message);
  let classDiv = [];
  let avt = "";
  let fullname = "";
  let time = "";
  let abc = "";
  let divTextWaper;
  if (checkSender == true) {
    avt = document.getElementById("from_avt").src;
    fullname = document.getElementById("from_fullname").textContent;
    time = document.getElementById("from_time").textContent;
    classDiv = ["d-flex", "flex-row", "justify-content-end", "message"];
    nameStyle = "text-align: right; margin-right: 10px";
    pTextStyle = "background-color: #f5f6f7; display: inline-block; with: 100%";
    divTextWaper = "text-align: right";
  } else {
    avt = document.getElementById("to_avt").src;
    fullname = document.getElementById("to_fullname").textContent;
    time = document.getElementById("to_time").textContent;
    classDiv = ["d-flex", "flex-row", "justify-content-start", "message"];
    nameStyle = "text-align: left; margin-left: 20px";
    pTextStyle = "background-color: #f5f6f7; display: inline-block; with: 100%";
    divTextWaper = "text-align: left";
  }
  const div = document.createElement("div");

  for (const p of classDiv) {
    div.classList.add(p);
  }
  // div.classList.add(classDiv);
  const pText = document.createElement("p");
  const classP = ["small", "p-2", "ms-3", "mb-1", "rounded-3"];
  for (const abc of classP) {
    pText.classList.add(abc);
  }

  //===============
  // pText.style = "background-color: #f5f6f7; display: inline-block; with: 100%"
  pText.style = pTextStyle;

  const timer = document.createElement("p");
  const timeClass = [
    "small",
    "ms-3",
    "mb-3",
    "rounded-3",
    "text-muted",
    "float-end",
  ];
  for (const index of timeClass) {
    timer.classList.add(index);
  }

  const name = document.createElement("p");
  // const nameClass = ["small", "p-2", "ms-3", "mb-1", "rounded-3"];
  // for (const abc of nameClass) {
  //   name.classList.add(abc);
  // }

  name.style = nameStyle;

  const avatar = document.createElement("img");
  avatar.src = avt;
  avatar.alt = "avatar 1";
  avatar.style =
    "height: 3rem; width: 3rem; border-radius: 50%; object-fit: cover;";

  const DivWaper = document.createElement("div");
  const DivText = document.createElement("div");

  DivText.style = divTextWaper;
  DivText.append(pText);

  const buttonIcon = document.createElement("button");

  abc = document.createElement("i");
  abc.classList.add("fa-solid");
  abc.classList.add("fa-ellipsis");

  // abc.innerText = "Button";

  buttonIcon.append(abc);

  // const timep = document.createElement('p');
  const span_name = document.createElement("span");
  const span_time = document.createElement("span");
  name.append(span_name);
  span_name.innerText = fullname;

  timer.append(span_time);
  span_time.innerText = time;

  DivWaper.appendChild(name);
  // DivWaper.appendChild(buttonIcon);
  DivWaper.appendChild(DivText);
  DivWaper.appendChild(timer);

  if (checkSender == true) {
    div.appendChild(DivWaper);
    div.appendChild(avatar);
    // div.appendChild(buttonIcon)
  } else {
    div.appendChild(avatar);
    div.appendChild(DivWaper);
  }

  // p.innerText = message.username;
  pText.innerText = message;
  document.querySelector(".chat-messages").appendChild(div);
}

// ============ video call

function printCallVideo() {
  let from_video = document.getElementById("from_video_id");
  from_video = from_video.innerHTML;

  var callWindow = window.open(URL, "_blank", "height=1000,width=1200");

  // let link = "../../scripts/chat.js"

  callWindow.document.write(
    `<html><head><title>Video Call</title></head><body>`
  );
  callWindow.document.write(
    "<style>.from_video {width: 100%;height: 100vh;position: relative;background-color: rgb(83, 85, 97);}.to_video {width: 35%;height: 35vh;position: absolute;background-color: rgb(208, 2, 28);bottom: 20px;right: 10px;border: 8px;}.to_video video {border: 8px;}</style>"
  );

  callWindow.document.write(from_video);

  callWindow.document.write("</body></html>");

  callWindow.document.body.append(
    '<script src=""./scripts/chat.js""></script>'
  );

  callWindow.document.close();
  // callWindow.print();

  return true;
}
function scrollToBottom() {
  document.getElementById("chat-form-Id").scrollTo(0, 10000);
}

window.onload = scrollToBottom;

const friendIds = document.querySelectorAll("span#friend_id");
const friendIdList = [];

for (const friendId of friendIds) {
  friendIdList.push(friendId.textContent.trim());
}

socket.emit("check_friend_list_status", friendIdList);
socket.on("result_status_friends_list", (result) => {
  for (const friendId of friendIdList) {
    for (const res of result) {
      if (res.id == friendId) {
        let div = document.getElementById(`${friendId}001`);
        if (res.status == "Offline") {
          div.style.backgroundColor = "red";
        } else {
          div.style.backgroundColor = "green";
        }
      }
    }
  }

  let ppp = document.getElementById(`${to_id}-status`);
  4;
  let status002 = document.getElementById(`${to_id}002`);
  console.log(document.getElementById(`${to_id}001`).style.backgroundColor);
  if (document.getElementById(`${to_id}001`).style.backgroundColor == "red") {
    ppp.innerHTML = "Offline";
    status002.style.backgroundColor = "red";
  } else if (
    document.getElementById(`${to_id}001`).style.backgroundColor == "green"
  ) {
    status002.style.backgroundColor = "green";
    ppp.innerHTML = "Online";
  }
});
