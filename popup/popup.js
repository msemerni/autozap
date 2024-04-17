let isAddDefaultStorageValue = localStorage.getItem("isAddDefaultStorage");
if (isAddDefaultStorageValue === null) {
  localStorage.setItem("isAddDefaultStorage", "");
}

const newRecordBtn = document.getElementById("newRecordButton");
const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");
const helpButton = document.getElementById("helpButton");
const isAddDefault = document.getElementById("isAddDefault");

isAddDefault.checked = Boolean(localStorage.getItem("isAddDefaultStorage"));

const myLocation = JSON.parse(localStorage.getItem("myLocation")) || {};

const textInputs = document.querySelectorAll(".input input");

textInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    myLocation[this.id] = this.value.trim();
    localStorage.setItem("myLocation", JSON.stringify(myLocation));
  });
});

myLocation.isAddDefaults = Boolean(localStorage.getItem("isAddDefaultStorage"));
localStorage.setItem("myLocation", JSON.stringify(myLocation));

const zone = document.getElementById("zone");
const oblast = document.getElementById("oblast");
const rayon = document.getElementById("rayon");
const hromada = document.getElementById("hromada");
const settlement = document.getElementById("settlement");

let storageLocation = localStorage.getItem("myLocation");

if (storageLocation) {
  let storageLocationObj = JSON.parse(storageLocation);

  zone.value = storageLocationObj.zone;
  oblast.value = storageLocationObj.oblast;
  rayon.value = storageLocationObj.rayon;
  hromada.value = storageLocationObj.hromada;
  settlement.value = storageLocationObj.settlement;
}

newRecordBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startNewRecord,
  });
  // window.close();
});

copyBtn.addEventListener("click", async () => {
  const myLocation = JSON.parse(localStorage.getItem("myLocation"));
  copyToClipboard(myLocation);
  showCompleteMark();
  // window.close();
});

pasteBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startScriptPaste,
  });

  window.close();
});

helpButton.addEventListener("click", () => {
  alert(`
  1. Paste the correct values into the input fields in the extension's pop-up window from
     https://www.activityinfo.org/app#form/ck21bf1l6qikskj2/table
  2. Go to Activityinfo database
  3. Click "New" button
  4. Click the slider if you want to add a default selection
  4. Click "Copy" button
  5. Click "Paste" button
  `);
});

isAddDefault.addEventListener("click", () => {
  let storageLocation = JSON.parse(localStorage.getItem("myLocation"));

  if (isAddDefault.checked) {
    localStorage.setItem("isAddDefaultStorage", "yes");
    storageLocation.isAddDefaults = true;
  } else {
    localStorage.setItem("isAddDefaultStorage", "");
    storageLocation.isAddDefaults = false;
  }

  localStorage.setItem("myLocation", JSON.stringify(storageLocation));

  // window.close();
});

const startNewRecord = () => {
  const contextScript = document.createElement("script");
  contextScript.src = chrome.runtime.getURL("/popup/startNewRecord.js");
  contextScript.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).append(contextScript);
};


const startScriptPaste = () => {
  const contextScript = document.createElement("script");
  contextScript.src = chrome.runtime.getURL("/popup/pasteToJira.js");
  contextScript.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).append(contextScript);
};

function copyToClipboard(location) {
  const bufferDivCopy = document.createElement("textarea");
  bufferDivCopy.id = "bufferDivCopy";
  bufferDivCopy.style.cssText = `
      position: absolute;
      top: -99999px;
      left: -99999px;
      z-index: -99999;
      opacity: 0;
      `;
  bufferDivCopy.innerHTML = JSON.stringify(location);
  document.body.append(bufferDivCopy);
  bufferDivCopy.select();
  document.execCommand("copy");
  bufferDivCopy.remove();
}

function showCompleteMark() {
  const tick = document.createElement('div');
  tick.classList.add('tick');
  document.body.appendChild(tick);
  tick.style.color = 'green';
  tick.style.opacity = '0.7';
  tick.innerText = '✔';
  setTimeout(function () {
    tick.style.display = 'none';
  }, 300);
}
