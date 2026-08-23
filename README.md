# GTA VI Clone

Clone visual de uma página inspirada no site do GTA VI, desenvolvido durante a **Semana do Zero ao Programador Contratado**, do Dev em Dobro.

> Este é um projeto educacional e não oficial, criado para fins de estudo de desenvolvimento front-end. GTA VI, Grand Theft Auto e demais marcas relacionadas pertencem aos seus respectivos proprietários.

## Sobre o projeto

Acompanhei a construção do clone junto com os irmãos do Dev em Dobro, aprendendo na prática como estruturar uma página moderna e trabalhar com animações no front-end.

Durante o desenvolvimento, aprofundei meus conhecimentos em:

- Estruturação de páginas com HTML semântico;
- Estilização responsiva com CSS;
- Manipulação do DOM com JavaScript;
- Animações controladas pelo scroll;
- Uso do GSAP e do ScrollTrigger;
- Sincronização da reprodução do vídeo com a rolagem da página.

Depois de acompanhar a implementação original, também fiz alterações por conta própria. Uma das principais foi a harmonização da transição entre o final do vídeo e a introdução do parágrafo da seção de história, deixando a mudança de conteúdo mais fluida.

## Funcionalidades

- Menu de navegação que reage à rolagem;
- Vídeo de capa controlado pelo scroll;
- Transição animada entre a capa e a seção de história;
- Elementos revelados conforme entram na tela;
- Layout adaptado para diferentes tamanhos de tela;
- Seção visual para o segundo trailer;
- Rodapé com links institucionais e redes sociais.

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript;
- GSAP;
- GSAP ScrollTrigger;
- Google Fonts: Oswald e Questrial.

## Estrutura do projeto

```text
.
├── assets/
│   ├── card-trailer.png
│   ├── gta-box-art.jpeg
│   ├── icone-play.png
│   ├── seta-baixo.png
│   └── video-capa.mp4
├── css/
│   ├── responsive.css
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Como executar

Como este projeto não utiliza framework ou processo de build, existem duas formas simples de visualizá-lo.

### Localmente com Live Server

1. Abra o projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não a tenha.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

O projeto será aberto em um endereço local, geralmente `http://127.0.0.1:5500`.

### Publicado no GitHub Pages

O GitHub não executa a extensão Live Server. Para disponibilizar o projeto online pelo próprio repositório, use o **GitHub Pages**:

1. Envie os arquivos do projeto para um repositório no GitHub.
2. Abra **Settings** > **Pages** no repositório.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch principal, normalmente `main`, e a pasta `/ (root)`.
5. Clique em **Save**.

Após a publicação, o GitHub exibirá o link da página na mesma seção. Como o arquivo `index.html` está na raiz do projeto, ele será usado como a página inicial.

As bibliotecas GSAP e ScrollTrigger são carregadas por CDN, portanto as animações dependem de uma conexão com a internet.

## Créditos

Projeto desenvolvido como parte dos estudos da Semana do Zero ao Programador Contratado, acompanhando o conteúdo do Dev em Dobro.

As alterações e ajustes adicionais de animação foram realizados de forma independente durante o processo de aprendizagem.
