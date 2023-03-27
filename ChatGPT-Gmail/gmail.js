//* wait untill gmail window opens
window.onload = function () {
  //* wait until the hash starts with #inbox
  window.onhashchange = () => {
    if (window.location.hash.startsWith("#inbox/")) {
      const spans = document.querySelectorAll("span");

      for (const span of spans) {
        //* wait until the reply button is pressed
        if (span.innerText === "Reply") {
          span.addEventListener("click", function () {
            //* fetch the email u want to send
            const email = document.querySelector(".adn.ads");
            (async function () {
              //* get the response from gpt via background service worker
              const gptResponse = await chrome.runtime.sendMessage(
                email.textContent
              );
              //* set the response into the gmail textfield
              const gmailTextbox = document.querySelector("[role=textbox]");
              gmailTextbox.innerText = gptResponse;
            })();
          });
        }
      }
    }
  };
};
