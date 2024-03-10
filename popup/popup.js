const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");
const helpButton = document.getElementById("helpButton");

const myLocation = JSON.parse(localStorage.getItem("myLocation")) || {};

const textInputs = document.querySelectorAll("input");
textInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    myLocation[this.id] = this.value;
    localStorage.setItem("myLocation", JSON.stringify(myLocation));
  });
});

const zone = document.getElementById("zone");
const oblast = document.getElementById("oblast");
const rayon = document.getElementById("rayon");
const hromada = document.getElementById("hromada");
const settlement = document.getElementById("settlement");

let storageLocation = localStorage.getItem("myLocation");

if (storageLocation) {
  let storageLocationObj = JSON.parse(storageLocation);

  console.log("storageLocationObj:", storageLocationObj);

  zone.value = storageLocationObj.zone;
  oblast.value = storageLocationObj.oblast;
  rayon.value = storageLocationObj.rayon;
  hromada.value = storageLocationObj.hromada;
  settlement.value = storageLocationObj.settlement;
}

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
  1. Paste correct values to input fields from
     https://www.activityinfo.org/app#form/ck21bf1l6qikskj2/table
  2. Click "Copy" button
  3. Click "Add record" at ActivityInfo
  4. Click "Paste" button
  `);
});

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

function showCompleteMark () {
  const tick = document.createElement('div');
  tick.classList.add('tick');
  document.body.appendChild(tick);
  tick.style.color = 'green';
  tick.style.opacity = '0.7';
  tick.innerText = '✔';
  setTimeout(function() {
      tick.style.display = 'none';
  }, 300);
}
