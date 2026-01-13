function abrirModal() {
      document.getElementById("modalSobre").style.display = "flex";
    }

    function fecharModal() {
      document.getElementById("modalSobre").style.display = "none";
    }

    // Fechar se clicar fora da janela
    window.onclick = function(event) {
      var modal = document.getElementById("modalSobre");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }