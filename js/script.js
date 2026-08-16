const menu = document.getElementById("menu");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        menu.classList.add("menu-rolado");
    } else {
        menu.classList.remove("menu-rolado")
    }

})