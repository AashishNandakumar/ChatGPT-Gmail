console.log("yo im the gpt script - i will send u the answers");

chrome.runtime.onMessage.addListener(function (
  emailContent,
  sender,
  sendResponse
) {
  //* Select textarea in chat GPT website
  const textArea = document.querySelector("textarea");
  //* Fill the textarea with queries
  textArea.value =
    "Respond to the most recent email in a professional tone and sign off with my name (Aashish Nandakumar) at the end:\n" +
    emailContent;
  //* find button, which is the sibling of the text area in the website
  const button = textArea.nextElementSibling;
  //* after filling the textarea with queries click the button
  button.click();

  const callback = function (mutationList, observer) {
    //* Check the status of mutation of the arrow button in the GPT text field
    for (const mutation of mutationList) {
      //* when the arrow button is back to the original self perform the following
      if (mutation.attributeName === "disabled") {
        if (button.disabled === false) {
          //* select the div which holds ur responses by selecting the parent div
          const responses = document.querySelector(
            "#__next > div > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.flex-1.overflow-hidden > div > div > div"
          ).childNodes;
          //* select the last - 2(excluding the textarea)
          const lastResponse = responses[responses.length - 2];
          //* select the text inside the div
          const lastResponseText = lastResponse.innerText;
          //* send the text back to the background server
          sendResponse(lastResponseText);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(button, { attributes: true });
  return true;
});
