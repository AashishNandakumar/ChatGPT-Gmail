console.log("Hello world");

chrome.runtime.onMessage.addListener(function (
  emailContent,
  sender,
  sendResponse
) {
  console.log(emailContent);
  (async function () {
    //* pass the query to chatgpt
    const tabs = await chrome.tabs.query({ url: "https://chat.openai.com/*" });
    const tab = tabs[0];
    //* get the result from chatgpt
    const gptResponse = await chrome.tabs.sendMessage(tab.id, emailContent);
    //* send the result/response back to gmail
    sendResponse(gptResponse);
  })();
  return true;
});
