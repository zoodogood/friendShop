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

  (async () => {
    const articleParagraph = document.querySelector("#article__description .article__paragraph");
    while (true){
      await delay(4000 + random(10000));

      const from = [...new Array(4)].map( () => random(1072, 1203) ).map(String.fromCharCode);
      const glitch = new GlitchText(from, "Атом", { step: 2 });

      for (const content of glitch){
        await delay(15);
        articleParagraph.textContent = content;
      }
    }
  })()
})();



const blocks = document.querySelectorAll("#servise__blocks .servise__block");
blocks.forEach(node => node.addEventListener("click", clickEvent => {
  const level = node.getAttribute("data-level");
  window.location.href = `path/store.html?level=${ level }`;
}));
