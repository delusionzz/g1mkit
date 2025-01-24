const settingsDialog = document.querySelector("#settings");
const settingsSelect = document.querySelector("#pselect");
const settingsSave = document.querySelector("#settingsSave");
const settingsClose = document.querySelector("#settingsClose");
// default settings

let settings = JSON.parse(localStorage.getItem("settings"));
const settingsBtn = document.querySelector("#settingsBtn");
if (!settings) {
  settings = {
    p: "uv",
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}

if (settings.p === "sj") {
  document.querySelector("option[value='sj']").selected = true;
} else {
  document.querySelector("option[value='uv']").selected = true;
}

settingsBtn.addEventListener("click", () => {
  document.querySelector(`option[value='${settings.p}']`).selected = true;
  settingsDialog.showModal();
});

settingsSave.addEventListener("click", () => {
  const p = settingsSelect.value;
  settings.p = p;
  localStorage.setItem("settings", JSON.stringify(settings));
  console.log(settings);
  settingsDialog.close();
});

settingsClose.addEventListener("close", () => {
  settingsDialog.close();
});
