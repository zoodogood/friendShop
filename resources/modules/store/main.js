(async () => {
await new FileLoader("resources/modules")
  .loadAsync("/index/style.css", { type: "css", parent: "head" })
  .loadSync("/util.js", {})
  .loadSync("/EventEmitter.js", {})
  .loadSync("/GlitchText.js", {})

  .loadSync("/Header/Header.js", {})
  .loadSync("/ScrollUp/ScrollUp.js", {})
  .loadSync("/store/form.js", {})
  .loadAsync("/store/form.css", { type: "css", parent: "head" })
  .whenQueueEnd;

  new Header();
  new ScrollUp();

  globalThis.level = window.location.href.match(/(?<=level=)\d+/)?.at(0) ?? "?";
  document.title = `Услуга #${ globalThis.level }`;
})();
