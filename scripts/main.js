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

//
document.querySelector(".addFileButton").addEventListener("click", function () {
    document.querySelector(".fileInput").click();
});

document.querySelector(".fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const bookViewer = document.querySelector(".bookViewer");
    const bookContent = document.querySelector(".bookContent");

    // Показываем окно просмотра
    bookViewer.style.display = "block";
    bookContent.innerHTML = ""; // Очищаем перед загрузкой

    if (file.name.endsWith(".fb2")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(e.target.result, "text/xml");

            // Получаем содержимое книги
            const body = xmlDoc.querySelector("body");
            const paragraphs = body.querySelectorAll("p");

            paragraphs.forEach(p => {
                const page = document.createElement("div");
                page.classList.add("page");
                page.innerText = p.textContent; // Добавляем текст с переносами
                bookContent.appendChild(page);
            });
        };
        reader.readAsText(file);
    } else if (file.type.startsWith("text/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result.split("\n");
            text.forEach(line => {
                const page = document.createElement("div");
                page.classList.add("page");
                page.innerText = line;
                bookContent.appendChild(page);
            });
        };
        reader.readAsText(file);
    } else {
        bookContent.innerHTML = `<p>Этот формат пока не поддерживается.</p>`;
    }
});


/**/ 
function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
}

// Вызываем при открытии книги
document.querySelector(".addFileButton").addEventListener("click", disableScroll);

// Вызываем при закрытии книги
document.querySelector(".closeViewer").addEventListener("click", enableScroll);


/**/ 
function openBook() {
    document.body.classList.add("no-scroll");
    document.querySelector(".main-content").style.display = "none";
    document.querySelector(".bookViewer").style.display = "flex";
}

function closeBook() {
    document.body.classList.remove("no-scroll");
    document.querySelector(".main-content").style.display = "block";
    document.querySelector(".bookViewer").style.display = "none";
}


/**/
const bookContent = document.querySelector(".bookContent");

// Функция прокрутки вперед и назад
function scrollBook(direction) {
    let scrollAmount = window.innerWidth; // Прокрутка на ширину экрана
    if (direction === "next") {
        bookContent.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (direction === "prev") {
        bookContent.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
}

// Добавьте обработку свайпов (для мобильных устройств)
let touchStartX = 0;
let touchEndX = 0;

bookContent.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

bookContent.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX - 50) {
        scrollBook("next");
    } else if (touchEndX > touchStartX + 50) {
        scrollBook("prev");
    }
});

// Добавьте кнопки для управления (если нужно)
document.querySelector(".nextPage").addEventListener("click", () => scrollBook("next"));
document.querySelector(".prevPage").addEventListener("click", () => scrollBook("prev"));

/* Загрузка карточек*/

document.addEventListener("DOMContentLoaded", function() {
    const lazyCards = document.querySelectorAll('.lazy-card');

    const lazyLoadCard = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('loaded'); // Просто делаем карточку видимой
                    observer.unobserve(card); // Прекращаем наблюдение
                }
            });
        });

        io.observe(target);
    };

    lazyCards.forEach(lazyLoadCard);
});