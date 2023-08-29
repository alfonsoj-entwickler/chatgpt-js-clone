// no deploy this API key
const API_KEY = "sk-epFAjx3VBySPNc1CPl9YT4BlbkJODMjVum8e5wpSPEAPaV7";
const SUBMIT_BUTTON = document.getElementById("submit");
const OUTPUT_MESSAGES = document.getElementById("output_text");
const INPUT_MESSAGES = document.getElementById("input_text");
const HISTORY = document.querySelector(".history");
const BUTTON_RESET = document.getElementById("reset-chat");

function changeInput(value) {
  const INPUT_MESSAGES = document.getElementById("input_text");
  INPUT_MESSAGES.value = value;
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: INPUT_MESSAGES.value }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    //console.log(data);
    OUTPUT_MESSAGES.textContent = data.choices[0].message.content;
    // OUTPUT_MESSAGES.textContent = data.error.message;

    if (data.choices[0].message.content && INPUT_MESSAGES.value) {
      const pElement = document.createElement("p");
      pElement.classList.add("pointer")
      pElement.textContent = INPUT_MESSAGES.value;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      HISTORY.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
}

function clearInput() {
  OUTPUT_MESSAGES.value = "";
  // console.log('reset!')
}

SUBMIT_BUTTON.addEventListener("click", getMessage);
BUTTON_RESET.addEventListener("click", clearInput);
