new FileLoader("resources/modules/ScrollUp").loadAsync("/scroll-up.css", { type: "css", parent: "head" })

class ScrollUp {
  constructor(){
    this.node = document.createElement("button");
    document.body.prepend(this.node);

    this.node.className = "scroll-up scroll-up--hide";
    this.node.textContent = "";
    this.#setHandlers();
  }

  #setHandlers(){
    document.addEventListener("scroll", () => {
      if (window.scrollY > 50)
        this.node.classList.remove("scroll-up--hide");

      if (window.scrollY <= 50)
        this.node.classList.add("scroll-up--hide");

    });

    this.node.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
}
