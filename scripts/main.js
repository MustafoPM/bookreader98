document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelector('.menuItems');
  if (!menuItems.classList.contains('hidden')) {
      menuItems.classList.add('hidden');
  }
});
  
function toggleMenu() {
  const menuItems = document.querySelector('.menuItems');
  menuItems.classList.toggle('hidden');
}
  
  
//

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Создаем кнопку
    let installButton = document.createElement("button");
    installButton.innerText = "Добавить на главный экран";
    installButton.style.position = "fixed";
    installButton.style.bottom = "20px";
    installButton.style.right = "20px";
    installButton.style.padding = "10px";
    installButton.style.background = "#007bff";
    installButton.style.color = "#fff";
    installButton.style.border = "none";
    installButton.style.borderRadius = "5px";
    installButton.style.cursor = "pointer";
    
    document.body.appendChild(installButton);

    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("Пользователь установил приложение");
            } else {
                console.log("Пользователь отказался");
            }
            deferredPrompt = null;
            installButton.remove();
        });
    });
});

