
document.addEventListener("DOMContentLoaded", carregarGeneros);

// Caminho do arquivo JSON
const caminhoJSON = "/dados/jateconto_catalogo_mec.json";

// ==========================================
// CONFIGURAÇÃO DOS GÊNEROS
// ==========================================

const generos = [
    {
        nome: "Romance",
        emoji: "💗",
        descricao: "O romance literário explora relações humanas, sentimentos, conflitos afetivos e diferentes formas de amar.",
        livros: [
            "dungeons-drama",
            "orgulho-e-preconceito",
            "madame-bovary"
        ]
    },
    {
        nome: "Ficção científica",
        emoji: "🚀",
        descricao: "Histórias que exploram ciência, tecnologia, viagens espaciais e possíveis futuros da humanidade.",
        livros: [
            "frankenstein",
            "neuromancer",
            "1984"
        ]
    },
    {
        nome: "Fantasia",
        emoji: "🪄",
        descricao: "Mundos imaginários, magia, criaturas fantásticas e acontecimentos que ultrapassam os limites da realidade.",
        livros: [
            "alice-no-pais-das-maravilhas",
            "harry-potter",
            "cronicas-do-japao"
        ]
    },
    {
        nome: "Clássicos",
        emoji: "📚",
        descricao: "Obras que marcaram a história da literatura, atravessaram gerações e continuam provocando reflexões.",
        livros: [
            "o-morro-dos-ventos-uivantes",
            "a-metamorfose",
            "dom-casmurro"
        ]
    },
    {
        nome: "Infantojuvenil",
        emoji: "🧸",
        descricao: "Histórias que acompanham a infância e a juventude, explorando amizade, imaginação, descobertas e amadurecimento.",
        livros: [
            "pequeno-principe",
            "peter-pan-wendy",
            "livro-selva"
        ]
    },
    {
        nome: "Aventura",
        emoji: "🧭",
        descricao: "Viagens, explorações, desafios e acontecimentos inesperados que conduzem a grandes jornadas.",
        livros: [
            "tom-sawyer",
            "ilha-do-tesouro",
            "robinson-crusoe"
        ]
    },
    {
        nome: "Suspense",
        emoji: "🔎",
        descricao: "Mistérios, investigações, segredos e reviravoltas que despertam a curiosidade e prendem a atenção do leitor.",
        livros: [
            "um-estudo-em-vermelho",
            "a-outra",
            "o-cao-dos-baskervilles"
        ]
    },
    {
        nome: "Escrevivência",
        emoji: "✊🏾",
        descricao: "Uma escrita que entrelaça vivências, memória e identidade, dando espaço a histórias e experiências que precisam ser contadas.",
        frase: "Escrever é uma maneira de sangrar. Acrescento: e de muito sangrar, muito e muito…",
        autoraFrase: "Conceição Evaristo",
        livros: [
            "cancao-para-ninar-menino-grande",
            "olhos-dagua",
            "querido-estudante-negro"
        ]
    }
];


// ==========================================
// CARREGAMENTO DOS GÊNEROS
// ==========================================

async function carregarGeneros() {
    const areaSlides = document.getElementById("generosCarrossel");
    const areaIndicadores = document.getElementById("indicadoresGeneros");

    if (!areaSlides || !areaIndicadores) {
        console.error("Não foram encontrados os elementos do carrossel no HTML.");
        return;
    }

    try {
        const resposta = await fetch(caminhoJSON);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao acessar o JSON: ${resposta.status} - ${resposta.statusText}`
            );
        }

        const dados = await resposta.json();

        if (!dados.livros) {
            throw new Error("A propriedade 'livros' não foi encontrada no JSON.");
        }

        // Acrescenta o ID de cada livro ao seu objeto.
        const livros = Array.isArray(dados.livros)
            ? dados.livros
            : Object.entries(dados.livros).map(([id, livro]) => ({
                ...livro,
                id: id
            }));

        const livrosPorId = Object.fromEntries(
            livros.map(livro => [livro.id, livro])
        );

        areaSlides.innerHTML = "";
        areaIndicadores.innerHTML = "";

        generos.forEach((genero, indice) => {
            const livrosDoGenero = genero.livros
                .map(id => livrosPorId[id])
                .filter(Boolean);

            // Avisa no console caso algum livro não seja encontrado.
            genero.livros.forEach(id => {
                if (!livrosPorId[id]) {
                    console.warn(`Livro não encontrado no JSON: ${id}`);
                }
            });

            const slide = criarSlide(genero, livrosDoGenero, indice);
            const indicador = criarIndicador(genero, indice);

            areaSlides.appendChild(slide);
            areaIndicadores.appendChild(indicador);
        });

        console.log("Carrossel carregado com sucesso!");

    } catch (erro) {
        console.error("Erro ao carregar o carrossel:", erro);

        areaSlides.innerHTML = `
            <div class="carousel-item active">
                <section class="genero-slide">
                    <p class="text-center">
                        Não foi possível carregar as recomendações.
                        Verifique o arquivo JSON.
                    </p>
                </section>
            </div>
        `;

        areaIndicadores.innerHTML = "";
    }
}


// ==========================================
// CRIAÇÃO DOS SLIDES
// ==========================================

function criarSlide(genero, livros, indice) {
    const slide = document.createElement("div");

    slide.className = `carousel-item${indice === 0 ? " active" : ""}`;

    const secao = document.createElement("section");
    secao.className = "genero-slide";

    const titulo = document.createElement("h3");
    titulo.textContent = `${genero.emoji} ${genero.nome}`;

    const descricao = document.createElement("p");
    descricao.className = "genero-descricao";
    descricao.textContent = genero.descricao;

    secao.appendChild(titulo);
    secao.appendChild(descricao);

    // Frase específica do gênero ou frase do primeiro livro.
    const primeiroLivro = livros[0];

    const textoFrase = genero.frase ||
        primeiroLivro?.fraseMarcante;

    if (textoFrase) {
        const frase = document.createElement("p");
        frase.className = "frase-literaria";

        frase.appendChild(
            document.createTextNode(`“${textoFrase}”`)
        );

        const autoria = document.createElement("span");

        autoria.textContent = genero.autoraFrase
            ? `— ${genero.autoraFrase}`
            : `— ${primeiroLivro.titulo}, ${primeiroLivro.autor}`;

        frase.appendChild(autoria);
        secao.appendChild(frase);
    }

    const subtitulo = document.createElement("h4");
    subtitulo.textContent = "Por onde começar?";

    const listaLivros = document.createElement("div");
    listaLivros.className = "livros-recomendados";

    if (livros.length > 0) {
        livros.forEach(livro => {
            listaLivros.appendChild(
                criarCartaoLivro(livro, genero.nome)
            );
        });
    } else {
        const aviso = document.createElement("p");
        aviso.className = "text-center";
        aviso.textContent = "Nenhum livro encontrado para este gênero.";

        listaLivros.appendChild(aviso);
    }

    secao.appendChild(subtitulo);
    secao.appendChild(listaLivros);

    slide.appendChild(secao);

    return slide;
}


// ==========================================
// CRIAÇÃO DOS CARTÕES DOS LIVROS
// ==========================================

function criarCartaoLivro(livro, genero) {
    const cartao = document.createElement("a");

    cartao.className = "livro-recomendado";
    cartao.href = `/livro.html?id=${encodeURIComponent(livro.id)}`;

    const caminhoCapa = selecionarCapa(livro, genero);

    if (caminhoCapa) {
        const imagem = document.createElement("img");

        imagem.className = "capa-livro";
        imagem.src = caminhoCapa;
        imagem.alt = `Capa de ${livro.titulo}`;
        imagem.loading = "lazy";

        cartao.appendChild(imagem);
    }

    const titulo = document.createElement("strong");
    titulo.textContent = livro.titulo || "Título não informado";

    const autor = document.createElement("small");
    autor.textContent = livro.autor || "Autor não informado";

    cartao.appendChild(titulo);
    cartao.appendChild(autor);

    return cartao;
}


// ==========================================
// SELEÇÃO DAS CAPAS
// ==========================================

function selecionarCapa(livro, genero) {
    const capas = Array.isArray(livro.capas)
        ? livro.capas
        : [];

    const pastaGenero = {
        "Romance": "Romance",
        "Ficção científica": "FiccaoCientifica",
        "Fantasia": "Fantasia",
        "Clássicos": "Classicos",
        "Infantojuvenil": "Infantojuvenil",
        "Aventura": "Aventura",
        "Suspense": "Suspense",
        "Escrevivência": "Escrevivencia"
    };

    const pasta = pastaGenero[genero];

    const capaDoGenero = capas.find(capa =>
        capa.includes(`/${pasta}/`)
    );

    return capaDoGenero || livro.capa || capas[0] || "";
}


// ==========================================
// CRIAÇÃO DOS INDICADORES
// ==========================================

function criarIndicador(genero, indice) {
    const indicador = document.createElement("button");

    indicador.type = "button";

    indicador.setAttribute(
        "data-bs-target",
        "#carrosselGeneros"
    );

    indicador.setAttribute("data-bs-slide-to", indice);
    indicador.setAttribute("aria-label", genero.nome);

    if (indice === 0) {
        indicador.classList.add("active");
        indicador.setAttribute("aria-current", "true");
    }

    return indicador;
}
