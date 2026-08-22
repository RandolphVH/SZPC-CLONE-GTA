// OBJETIVO: dar comportamento ao site do GTA VI com JavaScript.

// Passos:
// 1. MENU QUE SOME AO ROLAR
//    - achar o menu no HTML
//    - escutar o evento de rolagem da janela
//    - se a página desceu mais de 50px, adicionar a classe "menu-rolado"
//    - se voltou pro topo, remover a classe

// 2. BLOCOS QUE APARECEM
//    - achar todos os elementos com a classe "aparecer"
//    - avisar quando cada um entrar na tela
//    - ao entrar, adicionar a classe "visivel"

// 3. VÍDEO QUE ANDA COM O SCROLL
//    - achar o vídeo da capa
//    - prender a capa na tela enquanto a pessoa rola
//    - sumir com o conteúdo da capa e revelar o vídeo
//    - avançar o tempo do vídeo conforme o scroll

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
        const tempoScroll = duracao * 300;
        const tempoSaida = 240;

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
                end: "+=" + (tempoScroll + tempoSaida),
                scrub: isMobile ? 0.8 : 1.2,
                invalidateOnRefresh: true,
                pin: true,
            }
        })
            .to(video, {
                currentTime: function () {
                    if (!video.duration || Number.isNaN(video.duration)) {
                        return 0;
                    }
                    return video.duration;
                },
                duration: tempoScroll,
                ease: "none",
            })
            .to(video, {
                opacity: 0,
                duration: tempoSaida,
                ease: "none",
            })
            .fromTo(".secao-historia",
                { y: "100vh", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: tempoSaida,
                    ease: "none",
                },
                "<" // começa exatamente junto com o fade-out do vídeo
            )
            .to(capaPainel, {
                y: -100,
                duration: tempoSaida,
                ease: "none",
            }, "<");
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