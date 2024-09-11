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
  chatPalace.style.backgroundColor = "whiteSmoke";
};

// Create a function to handle sending the user's message
const textArea = async () => {
  const inputValue = search.value.trim();
  if (inputValue === "") return; // Don't send empty messages

  // Clear input and toggle visibility of elements
  inputTextArea.value = "";
  mother.classList.add("hidden");
  chatContainer.classList.remove("hidden");

  // Create user chat bubble
  const userChatCreate = document.createElement("div");
  userChatCreate.classList.add("userChat");

  const userImageCreate = document.createElement("div");
  userImageCreate.classList.add("user-Image");
  const image = document.createElement("img");
  image.src = "image/avatar-angela-gray.webp"; // Ensure the path to the image is correct

  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");

  const pcreation = document.createElement("p");
  pcreation.textContent = inputValue;

  // Append elements to chat
  userImageCreate.appendChild(image);
  userChatCreate.appendChild(userImageCreate);
  userChatCreate.appendChild(userMessage);
  userMessage.appendChild(pcreation);
  chatPalace.appendChild(userChatCreate);

  // Call the OpenAI API to get ChatGPT's response
  await getChatResponse(inputValue);
};

open.addEventListener("click", backGroundColor);
sendIcon.addEventListener("click", textArea);

const animationPalace = document.querySelector(".animation-palace");

function Animation() {
  setTimeout(() => {
    const chatGptAnimation = document.createElement("div");
    chatGptAnimation.classList.add("chatGpt-animation");
    chatGptAnimation.innerHTML = `
      <div class="chat-icon">
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

async function getChatResponse(userInput) {
  const API_KEY = "sk-svcacct-21ZdsqKHTgr6yHtu2SI1aVcdlU91MrznVlJ2O5PANJRDOF3WHzFpgvLlUmFyQnT3BlbkFJiZeXNPYtFOc4AtD-5amioJSLofNT_OneS27I6xz1YWhzriF8QKa8wX3t0gagYA=j "; // Replace with your actual OpenAI API key
  const API_URL = "https://api.openai.com/v1/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // Model used in the video
      prompt: userInput,
      max_tokens: 512,
      temperature: 0.2,
      n: 1,
    }),
  };

  try {
    // Fetch response from OpenAI API
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();

    // Display the response in the chat
    const gptResponse = document.createElement("div");
    gptResponse.classList.add("chatGpt-response");
    gptResponse.textContent = data.choices[0].text.trim();
    chatPalace.appendChild(gptResponse);
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
  }
}
