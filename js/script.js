const menu = document.getElementById("menu");
const blocos = document.querySelectorAll(".aparecer");
const video = document.querySelector(".capa-video");
const capa = document.querySelector(".capa");
const capaPainel = document.querySelector(".capa-painel");
const capaConteudo = document.querySelector(".capa-conteudo");
const capaBarra = document.querySelector(".capa-barra");
const capaSeta = document.querySelector(".capa-seta");

if (menu) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            menu.classList.add("menu-rolado");
        } else {
            menu.classList.remove("menu-rolado");
        }
    });
}

if (blocos.length) {
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

if (window.gsap && window.ScrollTrigger && video && capa && capaPainel && capaConteudo) {
    gsap.registerPlugin(ScrollTrigger);

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.preload = "metadata";

    // Detecta se é mobile
    const isMobile = window.innerWidth < 768;

    const iniciarAnimacaoVideo = function () {
        const duracao = video.duration || 15;
        const pixelsPorSegundo = 300;
        const tempoScroll = duracao * pixelsPorSegundo;
        const tempoSaida = 240;
        const tempoPausaFinal = 3; // segundos de "leitura" do usuário
        const distanciaPausaFinal = tempoPausaFinal * pixelsPorSegundo;


        // Timeline rápida para desaparecer os conteúdos iniciais
        gsap.timeline({
            scrollTrigger: {
                trigger: capa,
                start: "top top",
                end: "+=600",
                scrub: isMobile ? 0.3 : 0.5,
            }
        })
            .to(video, { opacity: 1, ease: "none" }, 0)
            .to(".capa-conteudo, .capa-barra, .capa-seta", {
                opacity: 0,
                y: -40,
                scale: 0.6,
                ease: "none",
            }, 0);

        // Mantém a capa fixa enquanto as informações entram e o vídeo desaparece.
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
            .to(capaPainel, { y: -100, duration: tempoSaida, ease: "none" }, "<")
    };

    // Tenta iniciar se o vídeo já está pronto
    let animacaoIniciada = false;

    const iniciarAnimacaoVideoUmaVez = function () {
        if (animacaoIniciada) return;
        animacaoIniciada = true;
        iniciarAnimacaoVideo();
    };

    if (video.readyState >= 1) {
        iniciarAnimacaoVideoUmaVez();
    } else {
        video.addEventListener("loadedmetadata", iniciarAnimacaoVideoUmaVez, { once: true });
    }

    setTimeout(function () {
        iniciarAnimacaoVideoUmaVez();
    }, 3000);
}