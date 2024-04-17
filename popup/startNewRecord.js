setTimeout(() => {
  try {
    const currentURL = window.location.href;
    const activityInfoURL = "https://www.activityinfo.org/";

    if (currentURL.indexOf(activityInfoURL) === 0) {

      startNewRecord();

    } else {
      throw new Error(`Switch to ActivityInfo\n(${activityInfoURL})\n`);
    }
  } catch (error) {
    alert(`${error}\nSomething went wrong!`);
  }
}, 100);

async function startNewRecord() {
  let newRecordBtn = document.querySelector("body > div:nth-child(6) > div > div.page.page--fullwidth > div.page__body > div > div > div > div.formtable__body > div.toolbar > div:nth-child(1) > a.button.button--primary");
  newRecordBtn.click();
}
