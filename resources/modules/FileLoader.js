class FileLoader {
  #queue;
  #whenQueueEnd = null;

  constructor(base = ""){
    this.base = base;
    this.resources = {};

    this.#queue = [];
  }


  loadSync(...other){
    this.#queue.push([ ...other ]);

    if (this.#whenQueueEnd === null){
      let resolve;
      this.#whenQueueEnd = new Promise(res => resolve = res);
      this.#handleQueue(resolve);
    }
    return this;
  }


  loadAsync(path, { parent, type = "js", createElement = null, ...other }){
    const fullPath = this.base + path;

    const node = createElement ?
      createElement(fullPath, type, ...other) :
      this.#initElement(fullPath, type);

    parent = parent ?
      parent instanceof HTMLElement ? parent : document.querySelector(parent)
      : document.body;

    parent.append(node);
    this.resources[path] = { node, path, load: null };

    return this;
  }


  #initElement(fullPath, type){
    const TYPES = {
      "js":  () => {
        const node = document.createElement("script");
        node.setAttribute("src", fullPath);
        node.setAttribute("charset", "utf-8");
        return node;
      },
      "css": () => {
        const node = document.createElement("link");
        node.setAttribute("rel", "stylesheet");
        node.setAttribute("href", fullPath);
        return node;
      }
    }

    return TYPES[ type ]();
  }

  async #handleQueue(resolve){
    while (this.#queue.length){
      const [path, others] = this.#queue.shift();

      this.loadAsync(path, others);
      const node = this.resources[ path ].node;
      await new Promise(resolve => node.addEventListener("load", resolve, {once: true}));
    }

    resolve();
    this.#whenQueueEnd = null;
  }

  get whenQueueEnd(){
    return this.#whenQueueEnd;
  }


}
