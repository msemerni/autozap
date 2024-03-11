//// const { dir } = require("console");

// document.addEventListener("DOMContentLoaded" , function() {
// });
setTimeout(() => {
  try {
    const currentURL = window.location.href;
    const activityInfoURL = "https://www.activityinfo.org/";
  
    if (currentURL.indexOf(activityInfoURL) === 0) {
      const permission = navigator.permissions.query({ name: "clipboard-read" });
  
      if (permission.state === "denied") {
        throw new Error("Not allowed to read clipboard.\n");
      } else if (permission.state === "prompt") {
        throw new Error("Allow permission for clipboard.\n");
      }
  
      navigator.clipboard
        .readText()
        .then((textInClipboard) => {
          if (
            textInClipboard.indexOf("{") === 0 &&
            textInClipboard.lastIndexOf("}") === textInClipboard.length - 1 &&
            textInClipboard.length > 2
          ) {
            const venueObject = JSON.parse(textInClipboard);
  
            addLocation(venueObject);
  
          } else {
            throw new Error(`Not an object in clipboard\n`);
          }
        })
        .catch((error) => {
          alert(`${error}\nPaste failed`);
        });
    } else {
      throw new Error(`Switch to ActivityInfo\n(${activityInfoURL})\n`);
    }
  } catch (error) {
    alert(`${error}\nPaste failed!`);
  }
}, 2000);






async function addLocation(locationObj) {
  const { zone, oblast, rayon, hromada, settlement } = locationObj;

  const {zoneInput, oblastInput, rayonInput, hromadaInput, settlementInput} = selectElements();

  await copyToClipboard(zone);
  await pasteFromClipboardToInput(zoneInput);
  selectValue(zone);

  await copyToClipboard(oblast);
  await pasteFromClipboardToInput(oblastInput);
  selectValue(oblast);

  await copyToClipboard(rayon);
  await pasteFromClipboardToInput(rayonInput);
  selectValue(rayon);

  await copyToClipboard(hromada);
  await pasteFromClipboardToInput(hromadaInput);
  selectValue(hromada);

  await copyToClipboard(settlement);
  await pasteFromClipboardToInput(settlementInput);
  selectValue(settlement);

  addSexAndAge();


  await copyToClipboard(JSON.stringify(locationObj));
}

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Error when copying to clipboard:", error);
  }
}

async function pasteFromClipboardToInput(htmlElement) {
  try {
    let clipboardText = await navigator.clipboard.readText();

    let inputEvent = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
    });

    htmlElement.value = clipboardText;

    htmlElement.dispatchEvent(inputEvent);
  } catch (error) {
    console.error("Error when pasting from clipboard:", error);
  }
}

function selectValue(value) {
  let list = document.querySelectorAll(".listpicker")[0];

  let listItems = list.querySelectorAll(".listpicker__item");

  listItems.forEach(function (div) {
    if (div.textContent === value) {
      console.log("div.textContent: ", div.textContent);
      div.click();
    }
  });
}


function selectElements() {
  let zoneInput = document.querySelector("div:nth-child(9) label:nth-child(1) input");
  let oblastInput = document.querySelector("div:nth-child(9) label:nth-child(2) input");
  let rayonInput = document.querySelector("div:nth-child(9) label:nth-child(3) input");
  let hromadaInput = document.querySelector("div:nth-child(9) label:nth-child(4) input");
  let settlementInput = document.querySelector("div:nth-child(9) label:nth-child(5) input");

  return {zoneInput, oblastInput, rayonInput, hromadaInput, settlementInput};
}


function addSexAndAge() {
  let sexButton = document.querySelector("#formfield-cr4ebz3kz2ymc1rm > div:nth-child(2) > label > input[type=radio]");
  sexButton.click();

  let ageButton = document.querySelector("#formfield-clrvlwfkz2yo9zct > div:nth-child(3) > label > input[type=radio]");
  ageButton.click();
};
