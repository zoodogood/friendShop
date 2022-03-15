(async () => {
await new FileLoader("resources/modules")
  .loadAsync("/index/style.css", { type: "css", parent: "head" })
  .loadSync("/util.js", {})
  .loadSync("/EventEmitter.js", {})
  .loadSync("/GlitchText.js", {})

  .loadSync("/Header/Header.js", {})
  .loadSync("/ScrollUp/ScrollUp.js", {})
  .whenQueueEnd;

  new Header();
  new ScrollUp();
})();
