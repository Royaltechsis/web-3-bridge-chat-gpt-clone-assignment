"use strict";

const open = document.querySelector("#open");
const close = document.querySelector("#close");
const box = document.querySelectorAll(".box");
const biggestFont = document.querySelector(".BiggestFont h3");
const sendIcon = document.querySelector(".sendIcon");
const search = document.querySelector("#search");
const mother = document.querySelector(".mother");
const chatContainer = document.querySelector(".chatContainer");
const inputTextArea = document.querySelector(".inputs textarea");
const chatPalace = document.querySelector(".chatPalace");
const chat = document.querySelector(".chatGpt-chats");
const backGroundColor = () => {
  document.body.style.backgroundColor = "white";
  box.forEach((box) => {
    box.style.backgroundColor = "rgb(64, 62, 62)";
    box.style.borderColor = "red";
  });
  biggestFont.style.color = "rgb(64, 62, 62)";
  open.style.display = "none";
  close.style.display = "block";
  inputTextArea.style.color = "black";
  const userMessage = document.querySelector(".chatPalace .user-message p");
  userMessage.style.color = "black";
  chatPalace.style.backgroundColor = "whiteSmoke";
};

const textArea = () => {
  const inputValue = search.value.trim();
  inputTextArea.value = "";
  mother.classList.add("hidden");
  chatContainer.classList.remove("hidden");

  const userChatCreate = document.createElement("div");
  userChatCreate.classList.add("userChat");

  const userImageCreate = document.createElement("div");
  userImageCreate.classList.add("user-Image");
  const image = document.createElement("img");
  image.src = "image/avatar-angela-gray.webp";

  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");

  const pcreation = document.createElement("p");
  pcreation.textContent = inputValue;

  userImageCreate.appendChild(image);
  userChatCreate.appendChild(userImageCreate);
  userChatCreate.appendChild(userMessage);
  userMessage.appendChild(pcreation);
  chatPalace.appendChild(userChatCreate);
  ChatGPT();
  aPI_url();
};

open.addEventListener("click", backGroundColor);
sendIcon.addEventListener("click", textArea);

const animationPalace = document.querySelector(".animation-palace");
function Animation() {
  setTimeout(() => {
    const chatGptAnimation = document.createElement("div");
    chatGptAnimation.classList.add("chatGpt-animation");
    chatGptAnimation.innerHTML = `<div class="chat-icon">
            <i class="fa fa-diamond" aria-hidden="true"></i>
          </div>

          <div class="dotFlex">
            <div class="dot" style="animation-delay: 0.2s"></div>
            <div class="dot" style="animation-delay: 0.3s"></div>
            <div class="dot" style="animation-delay: 0.4s"></div>
          </div>`;

    animationPalace.appendChild(chatGptAnimation);
  }, 1000);
}
Animation();
function ChatGPT() {
  if (chat.classList.contains("boss")) {
    chat.style.display = "none";
  }
}

let userText = null;
const API_KEY =
  "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";
async function aPI_url() {
  const realFetch = "https://api.openai.com/v1/completions";

  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: userText,
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
    }),
  };

  try {
    const response = await fetch(realFetch, requestOption);
    console.log(response);
    const convert = await response.json();
    console.log(convert);
  } catch (error) {
    console.error("Error:", error);
  }
}
aPI_url();
