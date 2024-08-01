// const myApiToken = '4a974f5125e355b0178c9f1c92696d4a';
// const donorFormID = "ck5wpx2lxn84lsmqi9";

// async function getFormRecordsFromAI(apiToken, formID) {
//   const url = `https://www.activityinfo.org/resources/form/${formID}/query`;

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Basic ' + btoa('anything:' + apiToken),
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok ' + response.statusText);
//   }

//   const dataRecords = await response.json();
//   return dataRecords;
// }


// async function addItemsToSelect() {
//   const selectElement = document.getElementById('donorSelect');
//   let allDonors = await getFormRecordsFromAI(myApiToken, donorFormID);
//   console.log("allDonors", allDonors);
//   console.log("selectElement", selectElement);
//   // Clear any existing options
//   selectElement.innerHTML = '';

//   const emptyDonorOption = document.createElement('option');
//   emptyDonorOption.value = '';
//   emptyDonorOption.textContent = '';
//   emptyDonorOption.disabled = true;
//   emptyDonorOption.selected = true;
//   selectElement.appendChild(emptyDonorOption);

//   // Add new options
//   allDonors.forEach(item => {
//     console.log("item", item);
//     if (item.is_active == "Да") {
//       const option = document.createElement('option');
//       option.value = item.donor;
//       option.textContent = item.donor;
//       selectElement.appendChild(option);
//       console.log("option", option);
//     }
//   });

// }

// addItemsToSelect();



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

const date = document.getElementById("date");
const donor = document.getElementById("donor");
const oblast = document.getElementById("oblast");
const rayon = document.getElementById("rayon");
const hromada = document.getElementById("hromada");
const settlement = document.getElementById("settlement");

let storageLocation = localStorage.getItem("myLocation");

if (storageLocation) {
  let storageLocationObj = JSON.parse(storageLocation);

  date.value = storageLocationObj.date;
  donor.value = storageLocationObj.donor;
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
     https://www.activityinfo.org/app?locale=uk#form/c2hrlf6lxn84lsmqd4/table
  2. Go to Activityinfo database
  3. Click "New" button
  4. Click the slider if you want to add a default selection (Gender: Female; Age group: 60+)
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
