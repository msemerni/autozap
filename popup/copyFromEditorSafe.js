
// const zone = document.getElementById('zone');
// alert(zone);
// let oblast = document.querySelector('[placeholder="Виберіть Oblast"]');
// let rayon = document.querySelector('[placeholder="Виберіть Rayon"]');
// let hromada = document.querySelector('[placeholder="Виберіть Hromada"]');
// let settlement = document.querySelector('[placeholder="Виберіть Settlement"]');
function copyFromEditorSafe(zoneValue) {
  alert(zoneValue);
}
// alert(zone);



// try {





//   const currentURL = window.location.href;
//   const workVEURL = "http://venues.placer.team:8080/";
//   const venueObject = {};
//   const oId = "oid:pl";
//   const name = "name";
//   const addrCity = "addr:city";
//   const addrPostcode = "addr:postcode";
//   const addrState = "addr:state";
//   const addrStreet = "addr:street";
//   const category = "category:pl";
//   const openingHours = "opening_hours:pl";
//   const manuallyReviewedStatus = "manually_reviewed_status:pl";
//   const analyticsUrl = "analytics:url:pl";

//   //// copy tags from Venues Editor to venueObject
//   if (currentURL.indexOf(workVEURL) === 0) {

//     const venueObjKey = document.querySelectorAll(".tag-list .key-wrap>input");
//     const venueObjValue = document.querySelectorAll(".tag-list .value-wrap>input");

//     for (let i = 0; i < venueObjKey.length; i++) {
//       venueObject[venueObjKey[i].value] = venueObjValue[i].value;

//       //// highlight empty value of required tags in Venues Editor
//       if (!venueObjValue[i].value) {
//         venueObjValue[i].style.cssText = `
//         background: #ff000080;
//         `;
//         venueObjValue[i].addEventListener("click", () => {
//           venueObjValue[i].style.cssText = `
//           background: #fff;
//           `;
//         });
//       }
//       //// end highlight empty value of required tags in Venues Editor
//     };

//     const zoomToSelectionBtn = document.querySelector(".zoom-to-selection-control>.disabled");

//     if (!venueObject[oId] || zoomToSelectionBtn) {
//       copyToClipboard({});
//       throw new Error("Pick a point first\n");
//     }

//     //// check required tags in venueObject
//     let missingTagsValues = "";
//     let missingTags = "";
//     let indexOfTag = 1;

//     for (const prop in venueObject) {
//       if ((prop === name || prop === addrCity || prop === addrPostcode || prop === addrState
//         || prop === addrStreet || prop === category || prop === openingHours
//         || prop === manuallyReviewedStatus || prop === analyticsUrl)
//         && (!venueObject[prop])) {
//         missingTagsValues += `${indexOfTag++}. ${prop}\n`;
//       }
//     }

//     if (missingTagsValues) {
//       copyToClipboard({});
//       throw new Error(`Check value for required tags:\n\n${missingTagsValues}`);
//     }

//     if (!venueObject.hasOwnProperty(name)) { missingTags += `${indexOfTag++}. ${name}\n`; }
//     if (!venueObject.hasOwnProperty(addrCity)) { missingTags += `${indexOfTag++}. ${addrCity}\n`; }
//     if (!venueObject.hasOwnProperty(addrPostcode)) { missingTags += `${indexOfTag++}. ${addrPostcode}\n`; }
//     if (!venueObject.hasOwnProperty(addrState)) { missingTags += `${indexOfTag++}. ${addrState}\n`; }
//     if (!venueObject.hasOwnProperty(addrStreet)) { missingTags += `${indexOfTag++}. ${addrStreet}\n`; }
//     if (!venueObject.hasOwnProperty(category)) { missingTags += `${indexOfTag++}. ${category}\n`; }
//     if (!venueObject.hasOwnProperty(openingHours)) { missingTags += `${indexOfTag++}. ${openingHours}\n`; }
//     if (!venueObject.hasOwnProperty(manuallyReviewedStatus)) { missingTags += `${indexOfTag++}. ${manuallyReviewedStatus}\n`; }
//     if (!venueObject.hasOwnProperty(analyticsUrl)) { missingTags += `${indexOfTag++}. ${analyticsUrl}\n`; }

//     if (missingTags) {
//       copyToClipboard({});
//       throw new Error(`Missing required tags:\n\n${missingTags}`);
//     }
//     //// end check required tags in Venues Editor

//     venueObject.fullAddress = `${venueObject[addrStreet]}, ${venueObject[addrCity]}, ${venueObject[addrState]} ${venueObject[addrPostcode]}`;
//     venueObject.analyticsUrlCutted = venueObject[analyticsUrl].substring(0, venueObject[analyticsUrl].indexOf("?"));
//     venueObject.venueURL = currentURL;

//   } else {
//     throw new Error(`Switch to Venues Editor\n(${workVEURL}\n`);
//   }

//   copyToClipboard(venueObject);

// } catch (error) {
//   alert(`${error}\nCopy failed!`);
// }

// //// Copy venueObject to Clipboard
// function copyToClipboard(venueObject) {
//   const bufferDivCopy = document.createElement("textarea");
//   bufferDivCopy.id = "bufferDivCopy";
//   bufferDivCopy.style.cssText = `
//     position: absolute;
//     top: -99999px;
//     left: -99999px;
//     z-index: -99999;
//     opacity: 0;
//     `;
//   bufferDivCopy.innerHTML = JSON.stringify(venueObject);
//   document.body.append(bufferDivCopy);
//   bufferDivCopy.select();
//   document.execCommand("copy");
//   bufferDivCopy.remove();
// }
