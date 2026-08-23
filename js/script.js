const menu = document.getElementById("menu");
const blocos = document.querySelectorAll(".aparecer");
const video = document.querySelector(".capa-video");
const capa = document.querySelector(".capa");
const capaPainel = document.querySelector(".capa-painel");
const capaConteudo = document.querySelector(".capa-conteudo");

function configurarMenu() {
    if (!menu) return;

    window.addEventListener("scroll", function () {
        menu.classList.toggle("menu-rolado", window.scrollY > 50);
    });
}

function configurarBlocos() {
    if (!blocos.length || !window.IntersectionObserver) return;

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
            }
        });
    });

    blocos.forEach(function (bloco) {
        observador.observe(bloco);
    });
}

function criarAnimacoesVideo() {
    if (!window.gsap || !window.ScrollTrigger || !video || !capa || !capaPainel || !capaConteudo) return;

    gsap.registerPlugin(ScrollTrigger);

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.preload = "metadata";

    const isMobile = window.innerWidth < 768;
    const duracao = video.duration || 15;
    const pixelsPorSegundo = isMobile ? 180 : 300;
    const tempoScroll = duracao * pixelsPorSegundo;
    const tempoSaida = 240;
    const distanciaPausaFinal = 5 * pixelsPorSegundo;

    gsap.timeline({
        scrollTrigger: {
            trigger: capa,
            start: "top top",
            end: "+=600",
            scrub: isMobile ? 0.1 : 0.5,
        }
    })
        .to(video, { opacity: 1, ease: "none" }, 0)
        .to(".capa-conteudo, .capa-barra, .capa-seta", {
            opacity: 0,
            y: -40,
            scale: 0.6,
            ease: "none",
        }, 0);

    gsap.timeline({
        scrollTrigger: {
            trigger: capa,
            start: "top top",
            end: "+=" + (tempoScroll + tempoSaida + distanciaPausaFinal),
            scrub: isMobile ? 0.8 : 1.2,
            invalidateOnRefresh: true,
            pin: true,
        }
    })
        .to(video, {
            currentTime: function () {
                return (!video.duration || Number.isNaN(video.duration)) ? 0 : video.duration;
            },
            duration: tempoScroll,
            ease: "none",
        })
        .to(video, { opacity: 0, duration: tempoSaida, ease: "none" })
        .fromTo(".secao-historia",
            { y: "0", opacity: 0 },
            { y: "-100vh", opacity: 1, duration: tempoSaida, ease: "power2.out" },
            "<"
        )
        .to(capaPainel, { y: -100, duration: tempoSaida, ease: "none" }, "<");
}

function iniciarAnimacaoVideo() {
    if (!video) return;

    let animacaoIniciada = false;
    const iniciarUmaVez = function () {
        if (animacaoIniciada) return;
        animacaoIniciada = true;
        criarAnimacoesVideo();
    };

    if (video.readyState >= 1) {
        iniciarUmaVez();
    } else {
        video.addEventListener("loadedmetadata", iniciarUmaVez, { once: true });
    }

    setTimeout(iniciarUmaVez, 3000);
}

configurarMenu();
configurarBlocos();
iniciarAnimacaoVideo();