// This is the sh!ttiest pr0x y ive ever made

const sj = new ScramjetController({
  files: {
    wasm: "/sj/scramjet.wasm.js",
    worker: "/sj/scramjet.worker.js",
    client: "/sj/scramjet.client.js",
    shared: "/sj/scramjet.shared.js",
    sync: "/sj/scramjet.sync.js",
  },
  siteFlags: {
    "https://worker-playground.glitch.me/.*": {
      serviceworkers: true,
    },
  },
});

sj.init();
navigator.serviceWorker.register("./sw.js");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
connection.setTransport("/ep/index.mjs", [{ wisp: "ws://localhost:4000" }]);

const main = document.querySelector("#main");
const nav = document.querySelector("nav");
const pmain = document.querySelector("#pmain");
const input = document.querySelector("#pinput");
const ppinput = document.querySelector("#ppinput");
const search = document.querySelector("#psearch");
const ppsearch = document.querySelector("#ppsearch");
const home = document.querySelector("#ph");
const pframe = document.querySelector("#p");
const frame = sj.createFrame(pframe);
let isDone = false;

const draggable = new Draggabilly(nav, {
  handle: ".handle",
  containment: "body",
});

search.addEventListener("click", () => {
  console.log("SEARCH");
  const settings = JSON.parse(localStorage.getItem("settings"));

  let url = input.value;
  main.classList.add("hidden");
  pmain.classList.remove("hidden");
  pmain.classList.add("flex");
  if (canParse(url)) {
    go(url, settings.p);
  } else {
    go(`https://duckduckgo.com/?q=${url}`, settings.p);
  }
  input.value = "";
});

ppsearch.addEventListener("click", () => {
  let url = ppinput.value;
  const settings = JSON.parse(localStorage.getItem("settings"));

  if (!isDone) {
    main.classList.add("hidden");
    pmain.classList.remove("hidden");
    pmain.classList.add("flex");
  }
  if (canParse(url)) {
    go(url, settings.p);
  } else {
    go(`https://duckduckgo.com/?q=${url}`, settings.p);
  }
  ppinput.value = "";
});

home.addEventListener("click", () => {
  main.classList.remove("hidden");
  pmain.classList.add("hidden");
  pmain.classList.remove("flex");

  ppinput.value = "";
  input.value = "";
});

/**
 *
 * @param {string} val
 * @returns {boolean}
 */
function canParse(val) {
  val = val.trim();
  return (
    /^http(s?):\/\//.test(val) || (val.includes(".") && !val.startsWith(" "))
  );
}

function go(u, p) {
  if (p === "sj") {
    frame.go(u);
  } else {
    pframe.src = `/~/uv/${encodeURIComponent(u)}`;
  }
}
