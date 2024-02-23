// let zone = document.querySelector('[placeholder="Виберіть Zone"]');
// zone.value = "GCA";
// let oblast = document.querySelector('[placeholder="Виберіть Oblast"]');
// oblast.value = "Kharkivska";
// let rayon = document.querySelector('[placeholder="Виберіть Rayon"]');
// rayon.value = "Bohodukhivskyi";
// let hromada = document.querySelector('[placeholder="Виберіть Hromada"]');
// hromada.value = "Bohodukhivska";
// let settlement = document.querySelector('[placeholder="Виберіть Settlement"]');
// settlement.value = "Viktorivka";



// let sett = document.querySelectorAll('.field__dropdown')[0].value;

// //_____________

// let forminput__lookup = document.querySelector('.forminput__lookup').children[0]>button;

// //+++++++++++++++++++++++++++++++++++

// let zoneBtn = document.querySelector("body > div:nth-child(6) > div > div.page.page--fullwidth > div.page__body > div > div > form > div.forminput__field__subreference > div.forminput__field > div.forminput__lookup > label:nth-child(1) > div > div.field__border > div.field__wrap > button")

// zoneBtn.click();

// let zoneList = document.querySelectorAll('.listpicker')[0];

// // Selecting the div with text content "GCA/NGCA" within the container
// let targetDiv;

// zoneList.querySelectorAll('.listpicker__item').forEach(function (div) {
//   if (div.textContent.trim() === 'GCA/NGCA') {
//   	div.click();
//   }
// });

// targetDiv.click();

// ++++++++++


// // Checking if the element is found
// if (targetDiv) {
//   // Do something with the selected element
//   targetDiv.style.backgroundColor = 'red'; // For example, changing the background color
// } else {
//   console.error('Element not found');
// }



// %%%%%%%%%%%%%%%%%%%%%%%%%%%

const myLocation = {
  zone: 'GCA',
  oblast: 'Kharkivska',
  rayon: 'Bohodukhivskyi',
  hromada: 'Bohodukhivska',
  settlement: 'Viktorivka',
}



const addLocation = (locationObj) => {

  const {zone, oblast, rayon, hromada, settlement} = locationObj;

  let zoneBtn = document.querySelector("div.forminput__lookup > label:nth-child(1) > div > div.field__border > div.field__wrap > button");

  zoneBtn.click();

  let zoneList = document.querySelectorAll('.listpicker')[0];

  zoneList.querySelectorAll('.listpicker__item').forEach(function (div) {
    if (div.textContent.trim() === zone) {
      div.click();
    }
  });


  let oblastBtn = document.querySelector("div.forminput__lookup > label:nth-child(2) > div > div.field__border > div.field__wrap > button");

  oblastBtn.click();

  let oblastList = document.querySelectorAll('.listpicker')[0];

  oblastList.querySelectorAll('.listpicker__item').forEach(function (div) {
    if (div.textContent.trim() === oblast) {
      div.click();
    }
  });


  let rayonBtn = document.querySelector("div.forminput__lookup > label:nth-child(3) > div > div.field__border > div.field__wrap > button");

  rayonBtn.click();

  let rayonList = document.querySelectorAll('.listpicker')[0];

  rayonList.querySelectorAll('.listpicker__item').forEach(function (div) {
    if (div.textContent.trim() === rayon) {
      div.click();
    }
  });


  let hromadaBtn = document.querySelector("div.forminput__lookup > label:nth-child(4) > div > div.field__border > div.field__wrap > button");

  hromadaBtn.click();

  let hromadaList = document.querySelectorAll('.listpicker')[0];

  hromadaList.querySelectorAll('.listpicker__item').forEach(function (div) {
    if (div.textContent.trim() === hromada) {
      div.click();
    }
  });


  let settlementBtn = document.querySelector("div.forminput__lookup > label:nth-child(5) > div > div.field__border > div.field__wrap > button");

  settlementBtn.click();


  setTimeout(() =>
    {
      let settlementList = document.querySelectorAll('.listpicker')[0];

      settlementList.querySelectorAll('.listpicker__item').forEach(function (div) {
        if (div.textContent.trim() === settlement) {
          div.click();
        }
      });
    }, 200);
};



addLocation(myLocation);


