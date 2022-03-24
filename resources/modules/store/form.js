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

    const title  = userTag + (email ? ` | ${ email }` : "");
    const response = await sendWebhook(title, description, fields);
  });


  function sendWebhook(title, description, fields){

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

    return fetch(URL, options);
  };
})();
