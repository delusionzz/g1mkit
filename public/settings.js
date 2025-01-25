const settingsDialog = document.querySelector("#settings");
const settingsSelect = document.querySelector("#pselect");
const settingsCSelect = document.querySelector("#cselect");
const settingsSave = document.querySelector("#settingsSave");
const settingsClose = document.querySelector("#settingsClose");
// default settings

let settings = JSON.parse(localStorage.getItem("settings"));
const settingsBtn = document.querySelector("#settingsBtn");
if (!settings || !settings.c || !settings.p) {
  settings = {
    p: "uv",
    c: true,
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}

if (settings.p === "sj") {
  document.querySelector("option[value='sj']").selected = true;
} else {
  document.querySelector("option[value='uv']").selected = true;
}

if (settings.c === "enabled") {
  document.querySelector("option[value='enabled']").selected = true;
} else {
  document.querySelector("option[value='disabled']").selected = true;
}

settingsBtn.addEventListener("click", () => {
  document.querySelector(`option[value='${settings.p}']`).selected = true;
  settingsDialog.showModal();
});

settingsSave.addEventListener("click", () => {
  const p = settingsSelect.value;
  const c = settingsCSelect.value;
  settings.p = p;
  settings.c = c;

  if (c === "enabled" && window.top === window) {
    const win = window.open("about:blank", "_blank");

    win.document.write(
      `
           <style>
              body, html {
                margin: 0;
                padding: 0;
              }  
            </style>
            <iframe
              src="/instance"
              style="width: 100%; height: 100vh; border: none;"
            ></iframe>
          `.trim()
    );
    window.location.href = "https://www.gimkit.com/join";
  }

  localStorage.setItem("settings", JSON.stringify(settings));
  console.log(settings);
  settingsDialog.close();
});

settingsClose.addEventListener("close", () => {
  settingsDialog.close();
});
