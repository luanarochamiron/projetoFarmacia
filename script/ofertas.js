// espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

  const botoes = document.querySelectorAll(".btn-reivindicar");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {

      // 🎉 confete
      if (typeof confetti === "function") {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 }
        });
      }

      // feedback visual
      botao.innerText = "Reivindicado ✔";
      botao.style.background = "#22c55e";
      botao.disabled = true;

    });
  });

});