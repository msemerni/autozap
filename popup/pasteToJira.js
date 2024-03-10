// const { dir } = require("console");

try {
  const currentURL = window.location.href;
  const workJiraURL = "https://www.activityinfo.org/";

  if (currentURL.indexOf(workJiraURL) === 0) {
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

          // alert(venueObject.zone);
          console.log("venueObject:: ", venueObject);

          /////////////////////////////////////

          const addLocation = (locationObj) => {
            const { zone, oblast, rayon, hromada, settlement } = locationObj;

            let zoneBtn = document.querySelector(
              "div.forminput__lookup > label:nth-child(1) > div > div.field__border > div.field__wrap > button"
            );

            zoneBtn.click();

            let zoneList = document.querySelectorAll(".listpicker")[0];

            zoneList
              .querySelectorAll(".listpicker__item")
              .forEach(function (div) {
                if (div.textContent.trim() === zone) {
                  div.click();
                }
              });

            let oblastBtn = document.querySelector(
              "div.forminput__lookup > label:nth-child(2) > div > div.field__border > div.field__wrap > button"
            );

            oblastBtn.click();

            let oblastList = document.querySelectorAll(".listpicker")[0];

            oblastList
              .querySelectorAll(".listpicker__item")
              .forEach(function (div) {
                if (div.textContent.trim() === oblast) {
                  div.click();
                }
              });

            let rayonBtn = document.querySelector(
              "div.forminput__lookup > label:nth-child(3) > div > div.field__border > div.field__wrap > button"
            );

            rayonBtn.click();

            let rayonList = document.querySelectorAll(".listpicker")[0];

            rayonList
              .querySelectorAll(".listpicker__item")
              .forEach(function (div) {
                if (div.textContent.trim() === rayon) {
                  div.click();
                }
              });

            let hromadaBtn = document.querySelector(
              "div.forminput__lookup > label:nth-child(4) > div > div.field__border > div.field__wrap > button"
            );

            hromadaBtn.click();

            // setTimeout(() => {
            let hromadaList = document.querySelectorAll(".listpicker")[0];

            hromadaList
              .querySelectorAll(".listpicker__item")
              .forEach(function (div) {
                if (div.textContent.trim() === hromada) {
                  div.click();
                }
              });
            // }, 100);

            let settlementBtn = document.querySelector(
              "div.forminput__lookup > label:nth-child(5) > div > div.field__border > div.field__wrap > button"
            );

            settlementBtn.click();

            setTimeout(() => {
              let settlementList = document.querySelectorAll(".listpicker")[0];

              settlementList
                .querySelectorAll(".listpicker__item")
                .forEach(function (div) {
                  if (div.textContent.trim() === settlement) {
                    div.click();
                  }
                });
            }, 200);

            setTimeout(() => {
              let sexButton = document.querySelector("#formfield-cr4ebz3kz2ymc1rm > div:nth-child(2) > label > input[type=radio]");
              console.log("sexButton:", sexButton);
              sexButton.click();

              let ageButton = document.querySelector("#formfield-clrvlwfkz2yo9zct > div:nth-child(3) > label > input[type=radio]");
              ageButton.click();
            }, 300);
          };

          addLocation(venueObject);

          /////////////////////////////////////
        } else {
          throw new Error(`Not an object in clipboard\n`);
        }
      })
      .catch((error) => {
        alert(`${error}\nPaste failed`);
      });
  } else {
    throw new Error(`Switch to Jira\n(${workJiraURL})\n`);
  }
} catch (error) {
  alert(`${error}\nPaste failed!`);
}
