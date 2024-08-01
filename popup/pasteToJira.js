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
            const myLocationObject = JSON.parse(textInClipboard);

            addLocation(myLocationObject);

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
  const { date, donor, oblast, rayon, hromada, settlement, isAddDefaults } = locationObj;

  const { dateInput, donorInput, oblastInput, rayonInput, hromadaInput, settlementInput } = selectLocationInputs();

  await copyToClipboard(date);
  await pasteFromClipboardToInput(dateInput);

  await copyToClipboard(donor);
  await pasteFromClipboardToInput(donorInput);
  selectValue(donor);

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

  if (isAddDefaults === true) {
    fillDefaultFields()
  }

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
      div.click();
    }
  });
}

function selectLocationInputs() {
  let h4Elements = document.querySelectorAll('h4');
  let locationsDiv = null;
  let dateDiv = null;
  let donorDiv = null;
  
  h4Elements.forEach((h4) => {
      let bdiElement = h4.querySelector('bdi');

      console.log("bdiElement: ", bdiElement);

      if (
        bdiElement && 
        (bdiElement.textContent.trim() === 'Локация' 
        || bdiElement.textContent.trim() === 'Локація' 
        || bdiElement.textContent.trim() === 'Location')
      ) {
          let nextElement = h4.nextElementSibling;
          while (nextElement) {
              if (nextElement.classList.contains('forminput__lookup')) {
                  locationsDiv = nextElement;
                  break;
              }
              nextElement = nextElement.nextElementSibling;
          }
      }
  });
  
  let dateInput = document.querySelector("#formfield-csapm2ilz6z3w795");
  let donorInput = document.querySelector("body > div:nth-child(6) > div > div.page.page--fullwidth > div.page__body > div > div.forminput__inner > form > div:nth-child(4) > div.forminput__field > div.field.field--text > div.field__border > div.field__wrap > input[type=text]");
  let oblastInput = locationsDiv.querySelector("label:nth-child(1) > div > div.field__border > div.field__wrap > input[type=text]");
  let rayonInput = locationsDiv.querySelector("label:nth-child(2) > div > div.field__border > div.field__wrap > input[type=text]");
  let hromadaInput = locationsDiv.querySelector("label:nth-child(3) > div > div.field__border > div.field__wrap > input[type=text]");
  let settlementInput = locationsDiv.querySelector("label:nth-child(4) > div > div.field__border > div.field__wrap > input[type=text]");

console.log("donorInput: ", donorInput);

  return { dateInput, donorInput, oblastInput, rayonInput, hromadaInput, settlementInput };
}

function fillDefaultFields() {
  let sexButton = document.querySelector("#formfield-cui5vz2lz6z3w7hf > div:nth-child(1) > label > input[type=radio]");
  sexButton.click();

  let ageButton = document.querySelector("#formfield-cbphhirlz6z3w7hj > div:nth-child(5) > label > input[type=radio]");
  ageButton.click();
};
