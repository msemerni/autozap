// let isSafeCopyStorageValue = localStorage.getItem("isSafeCopyStorage");
// if (isSafeCopyStorageValue === null) {
//   localStorage.setItem("isSafeCopyStorage", "safe");
// }

const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");
const helpButton = document.getElementById("helpButton");
// const isSafeCopy = document.getElementById("isSafeCopy");
// isSafeCopy.checked = Boolean(localStorage.getItem("isSafeCopyStorage"));

copyBtn.addEventListener("click", async () => {
  // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const zoneValue = document.getElementById('zone').value;
  alert(zoneValue);
  chrome.scripting.executeScript({
    // target: { tabId: tab.id },
    files: ['/popup/copyFromEditorSafe.js'],
    // function: copyFromEditorSafe,
    args: [zoneValue]
    // function: copyFromEditor
  });

  // window.close();
});

pasteBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startScriptPaste
    // files: ['/popup/pasteToJira.js']
  });

  window.close();
});

helpButton.addEventListener("click", () => {
  alert(`
  1. Здесь
     будет
  2. инструкция
  `);
});

// isSafeCopy.addEventListener("click", () => {
//   if (isSafeCopy.checked) {
//     localStorage.setItem("isSafeCopyStorage", "safe");
//   } else {
//     localStorage.setItem("isSafeCopyStorage", "");
//   }

//   window.close();
// });

const startScriptPaste = () => {
  const contextScript = document.createElement('script');
  contextScript.src = chrome.runtime.getURL('/popup/pasteToJira.js');
  contextScript.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).append(contextScript);
};
