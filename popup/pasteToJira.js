// const { dir } = require("console");

try {
  const currentURL = window.location.href;
  const workJiraURL = "https://placer.atlassian.net/";
  https://www.activityinfo.org/
  if (currentURL.indexOf(workJiraURL) === 0) {

    const permission = navigator.permissions.query({ name: 'clipboard-read' });

    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.\n");
    } else if (permission.state === 'prompt') {
      throw new Error("Allow permission for clipboard.\n");
    }

    navigator.clipboard.readText()
      .then(textInClipboard => {
        if (textInClipboard.indexOf("{") === 0 && textInClipboard.lastIndexOf("}") === textInClipboard.length - 1
          && textInClipboard.length > 2) {

          const venueObject = JSON.parse(textInClipboard);

          // keys from venueObject
          const venueEditorLink = "venueURL";
          const analyticsLink = "analyticsUrlCutted";
          const entityID = "oid:pl";
          const entityName = "name";
          const category = "category:pl";
          const address = "fullAddress";

          // paste values to Jira fields
          // const jiraFields = document.querySelectorAll(".gbXyYv");
          // const jiraFields = document.querySelectorAll(".cEMour");
          const jiraFields = document.querySelectorAll("._otyr7vkz");
          console.dir("jiraFields: ", jiraFields);
          if (!jiraFields) {
            throw new Error(`CSS class for "jiraFields" not found\n`);
          }

          for (let i = 0; i < jiraFields.length; i++) {
            if (jiraFields[i].innerText.indexOf("Venue Editor Link") === 0) {
              const tagValue = venueObject[venueEditorLink];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Analytics Link") === 0) {
              const tagValue = venueObject[analyticsLink];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Entity ID") === 0) {
              const tagValue = venueObject[entityID];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Entity Name") === 0) {
              const tagValue = venueObject[entityName];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Category") === 0) {
              const tagValue = venueObject[category];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Address") === 0) {
              const tagValue = venueObject[address];
              pasteValuesToJiraFields(tagValue, i);
            }
          }

          function pasteValuesToJiraFields(tagValue, jiraFieldindex) {
            const eventForOnChange = {
              target: {
                value: tagValue,
                // validationMessage: "invalid..."
              }
            };

            let jiraFieldValueDiv;
            jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".kLiHRY");
            if (!jiraFieldValueDiv) {
              jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".HsCdE");
            }
            if (!jiraFieldValueDiv) {
              jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".cwFpGL");
            }
            if (!jiraFieldValueDiv) {
              jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector("._1e0c1txw");
            }
            if (!jiraFieldValueDiv) {
              throw new Error(`CSS class for "jiraFieldValueDiv" not found\n`);
            }
            // console.log("__jiraFieldValueDiv__");
            // console.log(jiraFieldValueDiv);
            // console.log("__jiraFieldValueDiv__");

            jiraFieldValueDiv.click();

            let jiraFieldValueInput;
            // jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
            if (!jiraFieldValueInput) {
              // jiraFieldValueInput = document.querySelector(".cwFpGL>.cKJphd");
              jiraFieldValueInput = document.querySelector(".css-wxvfrp");
            }
            if (!jiraFieldValueInput) {
              throw new Error(`CSS class for "jiraFieldValueInput" not found\n`);
            }
            // console.log("++jiraFieldValueInput++");
            // console.dir(jiraFieldValueInput);
            // // console.log(jiraFieldValueInput[0]);
            // console.log("++jiraFieldValueInput++");
            jiraFieldValueInput.click();


            const inputKeys = Object.keys(jiraFieldValueInput);
            // console.log("!!inputKeys");
            // console.log(inputKeys);
            // console.log("!!inputKeys");

            const reactEventHandler = inputKeys.find(prop => prop.indexOf("__reactEventHandlers") === 0);
            // console.log("==reactEventHandler");
            // console.log(reactEventHandler);
            // console.log("==reactEventHandler");

            // console.log("$$jiraFieldValueInput.reactEventHandler");
            // console.dir(jiraFieldValueInput);
            // console.log("$$jiraFieldValueInput.reactEventHandler");
            // console.log("@@@reactEventHandler");
            // console.log(reactEventHandler);
            // console.log("@@@reactEventHandler");
            if (reactEventHandler) {

              jiraFieldValueInput[reactEventHandler].onChange(eventForOnChange);
            } else {
              throw new Error(`__reactEventHandlers not found\n`);
            }

            let shlyapa;
            shlyapa = document.querySelector(".iNYbiH");
            if (!shlyapa) {
              shlyapa = document.querySelector(".css-l21pj7");
            }
            if (!shlyapa) {
              shlyapa = document.querySelector(".css-46zqrd");
            }
            if (!shlyapa) {
              shlyapa = document.querySelector(".css-1ysy1r4");
            }
            if (!shlyapa) {
              throw new Error(`CSS class for "shlyapa" not found\n`);
            }
            shlyapa.click();
          }

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
