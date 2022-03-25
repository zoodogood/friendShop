(async () => {
  const URL = "https://discord.com/api/webhooks/956174616081100800/9t_mP2xkKMD_VW3HdmoZcL-vIgcOYc9bx2ejVC_UNaTLmLxsRp0zYBKxC6D5SjXIfpBK";
  const form = document.querySelector("#form__base[name = 'sendwebhook']");

  form.querySelector("#level-confirm select")
    .selectedIndex = globalThis.level - 1;


  form.addEventListener("submit", async submitEvent => {
    submitEvent.preventDefault();
    const description = form.querySelector("#description textarea").value;
    const fields = [...form.elements]
      .filter(node => node.nodeName === "SELECT")
      .map(node => {
        const name  = node.parentNode.querySelector("label").textContent;
        const value = node.selectedOptions[ 0 ].textContent;
        return {name, value};
      });

    const userTag = form.querySelector("#user-tag input").value;
    const email   = form.querySelector("#email input").value;

    const title  = `\`${ userTag }\`${ email ? `| ${ email }` : ""}`;
    const promise = sendWebhook(title, description, fields);

    const submitNode = form.querySelector("#submit input");
    submitNode.classList.add("pending");
    submitNode.setAttribute("disabled", true);
    submitNode.value = "Загрузка...";

    const response = await promise;

    const setTextContent = async (node, content) => {
      const glitch = new GlitchText(node.value, content);
      for (const content of glitch){
        await delay(5);
        node.value = content;
      }
    }

    submitNode.classList.remove("pending");
    submitNode.classList.add(response?.ok ? "success" : "error");
    setTextContent(submitNode, response?.ok ? "Успех!" : "Ошибка.");
  });


  async function sendWebhook(title, description, fields){

    const embed = {
      title,
      description,
      fields,
      color: 2895667,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "<@728107783697989662>",
        allowed_mentions: {
          parse: ["users", "roles"],
        },
        embeds: [embed],
      })
    };



    const response = fetch(URL, options)
      .catch(() => {});

    return response;
  };
})();
