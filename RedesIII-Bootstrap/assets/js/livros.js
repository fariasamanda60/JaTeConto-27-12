
 // ==========================================
 // CATÁLOGO JÁ TE CONTO
 // Carregamento dos livros pelo arquivo JSON
 // ==========================================

const CAMINHO_CATALOGO = "/dados/jateconto_catalogo_mec.json";

// ELEMENTOS DO HTML

const listaLivros = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisaLivro");
const botoesCategorias = document.getElementById("botoesCategorias");
const mensagemVazia = document.getElementById("mensagemVazia");

// VARIÁVEIS DO CATÁLOGO

let livros = [];
let categoriaSelecionada = "todos";


// ==========================================
// NORMALIZAR TEXTO
// Remove espaços extras e diferenças de acentos
// ==========================================

function normalizarTexto(texto) {
    return String(texto || "")
        .trim()
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ==========================================
// TRANSFORMAR VALORES EM LISTAS
// Aceita texto, lista ou valores vazios
// ==========================================

function transformarEmLista(valor) {

    if (Array.isArray(valor)) {
        return valor;
    }

    if (typeof valor === "string" && valor.trim()) {
        return [valor];
    }

    return [];
}


// ==========================================
// OBTER TODOS OS GÊNEROS E CATEGORIAS
// de cada livro
// ==========================================

function obterCategoriasLivro(livro) {

    const categorias = [
        ...transformarEmLista(livro.genero),
        ...transformarEmLista(livro.generos),
        ...transformarEmLista(livro.categoria),
        ...transformarEmLista(livro.categorias)
    ];

    // Remove valores vazios e categorias repetidas
    const categoriasUnicas = new Map();

    categorias.forEach(categoria => {

        if (typeof categoria !== "string") {
            return;
        }

        const nome = categoria.trim();

        if (!nome) {
            return;
        }

        const chave = normalizarTexto(nome);

        if (!categoriasUnicas.has(chave)) {
            categoriasUnicas.set(chave, nome);
        }

    });

    return [...categoriasUnicas.values()];
}


// ==========================================
// CRIAR CARTÃO DE LIVRO
// ==========================================

function criarCartao(livro) {

    const cartao = document.createElement("a");

    cartao.className = "livro-card";
    cartao.href = `/livro.html?id=${encodeURIComponent(livro.id)}`;

    // CAPA

    if (livro.capa) {

        const imagem = document.createElement("img");

        imagem.src = livro.capa;
        imagem.alt = `Capa de ${livro.titulo}`;
        imagem.loading = "lazy";

        imagem.addEventListener("error", () => {

            imagem.remove();

            const placeholder = criarPlaceholder(livro.titulo);
            cartao.insertBefore(placeholder, cartao.firstChild);

        });

        cartao.appendChild(imagem);

    } else {

        cartao.appendChild(criarPlaceholder(livro.titulo));

    }

    // TÍTULO

    const titulo = document.createElement("h3");
    titulo.textContent = livro.titulo;

    cartao.appendChild(titulo);

    // AUTOR

    const autor = document.createElement("p");
    autor.textContent = livro.autor || "Autor não informado";

    cartao.appendChild(autor);

    return cartao;
}


// ==========================================
// CAPA PROVISÓRIA
// Para livros sem imagem cadastrada
// ==========================================

function criarPlaceholder(titulo) {

    const placeholder = document.createElement("div");

    placeholder.className = "capa-sem-imagem";
    placeholder.textContent = "📖";
    placeholder.setAttribute("role", "img");

    placeholder.setAttribute(
        "aria-label",
        `Capa não cadastrada para ${titulo}`
    );

    return placeholder;
}


// ==========================================
// CRIAR BOTÕES DE CATEGORIA
// ==========================================

function criarCategorias() {

    botoesCategorias.innerHTML = "";

    // BOTÃO TODOS

    const botaoTodos = document.createElement("button");

    botaoTodos.type = "button";
    botaoTodos.className = "categoria-btn ativa";
    botaoTodos.dataset.categoria = "todos";
    botaoTodos.textContent = "Todos";

    botoesCategorias.appendChild(botaoTodos);

    // REUNIR TODAS AS CATEGORIAS DOS LIVROS

    const categoriasEncontradas = [];

    livros.forEach(livro => {

        obterCategoriasLivro(livro).forEach(categoria => {
            categoriasEncontradas.push(categoria);
        });

    });

    // REMOVER CATEGORIAS REPETIDAS

    const categoriasUnicas = new Map();

    categoriasEncontradas.forEach(categoria => {

        const chave = normalizarTexto(categoria);

        if (!categoriasUnicas.has(chave)) {
            categoriasUnicas.set(chave, categoria);
        }

    });

    // ORDENAR CATEGORIAS

    const categorias = [...categoriasUnicas.values()]
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    // CRIAR BOTÕES

    categorias.forEach(categoria => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "categoria-btn";
        botao.dataset.categoria = categoria;
        botao.textContent = categoria;

        botoesCategorias.appendChild(botao);

    });

    // EVENTOS DOS BOTÕES

    botoesCategorias.querySelectorAll(".categoria-btn")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                botoesCategorias
                    .querySelectorAll(".categoria-btn")
                    .forEach(item => {
                        item.classList.remove("ativa");
                    });

                botao.classList.add("ativa");

                categoriaSelecionada = botao.dataset.categoria;

                filtrarLivros();

            });

        });

}


// ==========================================
// EXIBIR LIVROS
// ==========================================

function exibirLivros(lista) {

    listaLivros.innerHTML = "";

    lista.forEach(livro => {

        const cartao = criarCartao(livro);

        listaLivros.appendChild(cartao);

    });

    mensagemVazia.hidden = lista.length > 0;

}


// ==========================================
// PESQUISAR E FILTRAR
// ==========================================

function filtrarLivros() {

    const termo = normalizarTexto(pesquisa?.value);

    const resultado = livros.filter(livro => {

        // TODOS OS GÊNEROS E CATEGORIAS DO LIVRO

        const categoriasLivro = obterCategoriasLivro(livro);

        const categoriasNormalizadas = categoriasLivro.map(
            categoria => normalizarTexto(categoria)
        );

        // CAMPOS PARA PESQUISA

        const titulo = normalizarTexto(livro.titulo);
        const autor = normalizarTexto(livro.autor);

        const correspondePesquisa =
            titulo.includes(termo) ||
            autor.includes(termo) ||
            categoriasNormalizadas.some(categoria =>
                categoria.includes(termo)
            );

        // VERIFICAR SE O LIVRO PERTENCE À CATEGORIA SELECIONADA

        const categoriaNormalizada =
            normalizarTexto(categoriaSelecionada);

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            categoriasNormalizadas.includes(categoriaNormalizada);

        return correspondePesquisa && correspondeCategoria;

    });

    exibirLivros(resultado);

}


// ==========================================
// CARREGAR ARQUIVO JSON
// ==========================================

async function carregarCatalogo() {

    try {

        const resposta = await fetch(CAMINHO_CATALOGO);

        if (!resposta.ok) {
            throw new Error("Não foi possível acessar o arquivo JSON.");
        }

        const dados = await resposta.json();

        if (!dados.livros || typeof dados.livros !== "object") {
            throw new Error("A estrutura do catálogo está incorreta.");
        }

        livros = Object.entries(dados.livros).map(([chave, livro]) => ({

            ...livro,

            id: livro.id || chave,

            titulo: livro.titulo || "Título não informado",

            autor: livro.autor || "Autor não informado"

        }));

        // CRIAR CATEGORIAS E EXIBIR LIVROS

        criarCategorias();

        filtrarLivros();

        console.log("Catálogo carregado com sucesso!");
        console.log("Quantidade de livros:", livros.length);

    } catch (erro) {

        console.error("Erro ao carregar o catálogo:", erro);

        listaLivros.innerHTML = "";

        mensagemVazia.textContent =
            "Não foi possível carregar os livros. Verifique o arquivo JSON.";

        mensagemVazia.hidden = false;

    }

}


// ==========================================
// EVENTO DE PESQUISA
// ==========================================

if (pesquisa) {
    pesquisa.addEventListener("input", filtrarLivros);
}


// ==========================================
// INICIAR
// ==========================================

carregarCatalogo();
