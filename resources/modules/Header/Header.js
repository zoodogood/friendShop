new FileLoader("resources/modules/Header").loadAsync("/header.css", { type: "css", parent: "head" })

class Header {
  constructor(){
    this.node = document.createElement("header");
    document.body.prepend(this.node);

    this.node.className = "header";
    this.node.innerHTML = "<a class = 'header__discord-link' href = 'https://discord.gg/SEca4SC4Pb'><span class = 'icon'></span></a>";
    this.#setHandlers();
  }

  #setHandlers(){
    this.scrollPosition = window.scrollY;
    document.addEventListener("scroll", () => {
      if (window.scrollY === 0)
        this.node.classList.add("header--hide");

      if (this.scrollPosition > window.scrollY)
        this.node.classList.remove("header--hide");

      if (this.scrollPosition < window.scrollY)
        this.node.classList.add("header--hide");

      this.scrollPosition = window.scrollY;
    });
  }
}
