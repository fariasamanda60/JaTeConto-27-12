
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJPnMZLsJI2Wi4QxRTQJE-CthETCpMWw0",
    authDomain: "cadastro-3cf7c.firebaseapp.com",
    databaseURL: "https://cadastro-3cf7c-default-rtdb.firebaseio.com",
    projectId: "cadastro-3cf7c",
    storageBucket: "cadastro-3cf7c.firebasestorage.app",
    messagingSenderId: "259093234672",
    appId: "1:259093234672:web:e46bab73cca38e9dc85335",
    measurementId: "G-PV1VZ7LXPY"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const CAMINHO_CATALOGO = "/dados/jateconto_catalogo_mec.json";
const COLECAO_USUARIOS = "usuarios";

const CAMPO_FAVORITOS = "livrosFavoritos";
const CAMPO_ABANDONADOS = "livrosAbandonados";
const CAMPO_LIDOS = "livrosLidos";

const paginaLivro = document.querySelector(".pagina-livro");

const elementos = {
    breadcrumb: document.getElementById("breadcrumbTitulo"),
    capa: document.getElementById("capaLivro"),
    titulo: document.getElementById("tituloLivro"),
    autor: document.getElementById("autorLivro"),
    genero: document.getElementById("generoLivro"),
    sinopse: document.getElementById("sinopseLivro"),
    frase: document.getElementById("fraseLivro"),
    paginas: document.getElementById("paginasLivro"),
    idioma: document.getElementById("idiomaLivro"),
    classificacao: document.getElementById("classificacaoLivro"),
    tempoLeitura: document.getElementById("tempoLeitura"),
    botaoLeitura: document.getElementById("botaoLeitura"),
    observacaoCapa: document.getElementById("observacaoCapa"),
    botaoFavorito: document.getElementById("botaoFavorito"),
    botaoAbandonado: document.getElementById("botaoAbandonado"),
    botaoLido: document.getElementById("botaoLido"),
    mushuFavorito: document.getElementById("mushuFavorito")
};

let usuarioAtual = null;
let livroAtual = null;

let listaFavoritos = [];
let listaAbandonados = [];
let listaLidos = [];

let favoritoAtual = false;
let abandonadoAtual = false;
let lidoAtual = false;

let temporizadorMushu = null;

// Preferência de aparição do Mushu.
// O padrão é ativado até que o Firestore informe o contrário.
let aparicaoMushuAtivada = true;

/* ==========================================
   MUSHU: EXPRESSÕES E ANIMAÇÕES
========================================== */

function mostrarMushuFavorito(expressao = "empolgado") {
    const palco = elementos.mushuFavorito;

    // Não exibe o Mushu se o usuário desativou a aparição.
    if (!aparicaoMushuAtivada) return;

    if (!palco) return;

    if (temporizadorMushu) {
        clearTimeout(temporizadorMushu);
        temporizadorMushu = null;
    }

    const estaChorando = expressao === "choro";
    const estaFeliz = expressao === "feliz";

    let rosto = "";

    if (estaChorando) {
        rosto = `
            <path d="M 124 181 Q 145 159 168 181"
                  fill="none" stroke="#073b32"
                  stroke-width="8" stroke-linecap="round"/>

            <path d="M 232 181 Q 255 159 278 181"
                  fill="none" stroke="#073b32"
                  stroke-width="8" stroke-linecap="round"/>

            <path d="M 121 211 Q 145 230 169 211"
                  fill="none" stroke="#35190f"
                  stroke-width="9" stroke-linecap="round"/>

            <path d="M 231 211 Q 255 230 279 211"
                  fill="none" stroke="#35190f"
                  stroke-width="9" stroke-linecap="round"/>

            <g class="mushu-favorito-lagrimas">
                <path class="mushu-favorito-lagrima mushu-favorito-lagrima-1"
                      d="M 132 224 C 126 237 124 244 132 250 C 140 244 138 237 132 224 Z"
                      fill="#73c9f5"/>

                <path class="mushu-favorito-lagrima mushu-favorito-lagrima-2"
                      d="M 268 224 C 262 237 260 244 268 250 C 276 244 274 237 268 224 Z"
                      fill="#73c9f5"/>
            </g>

            <path d="M 174 269 Q 200 243 226 269"
                  fill="none" stroke="#35190f"
                  stroke-width="8" stroke-linecap="round"/>
        `;

    } else if (estaFeliz) {
        rosto = `
            <g fill="none" stroke="#073b32"
               stroke-width="8" stroke-linecap="round">
                <path d="M 125 174 Q 143 151 164 161"/>
                <path d="M 236 161 Q 257 151 275 174"/>
            </g>

            <g class="mushu-favorito-olhos-felizes">
                <g class="mushu-favorito-piscar mushu-favorito-piscar-feliz">
                    <circle cx="145" cy="215" r="25" fill="#35190f"/>
                    <circle cx="151" cy="207" r="7" fill="#ffffff"/>
                    <circle cx="137" cy="222" r="3.5" fill="#ffffff"/>

                    <circle cx="255" cy="215" r="25" fill="#35190f"/>
                    <circle cx="261" cy="207" r="7" fill="#ffffff"/>
                    <circle cx="247" cy="222" r="3.5" fill="#ffffff"/>
                </g>
            </g>

            <path d="M 183 238 Q 183 259 200 259 Q 217 259 217 238"
                  fill="none" stroke="#35190f"
                  stroke-width="9" stroke-linecap="round"/>
        `;

    } else {
        rosto = `
            <path d="M 124 169 Q 145 153 168 170"
                  fill="none" stroke="#073b32"
                  stroke-width="8" stroke-linecap="round"/>

            <path d="M 232 170 Q 255 153 278 169"
                  fill="none" stroke="#073b32"
                  stroke-width="8" stroke-linecap="round"/>

            <g class="mushu-favorito-olhos">
                <g class="mushu-favorito-piscar">
                    <ellipse cx="145" cy="213" rx="25" ry="29" fill="#35190f"/>
                    <circle cx="153" cy="202" r="9" fill="#ffffff"/>
                    <circle cx="137" cy="220" r="4" fill="#ffffff"/>

                    <ellipse cx="255" cy="213" rx="25" ry="29" fill="#35190f"/>
                    <circle cx="263" cy="202" r="9" fill="#ffffff"/>
                    <circle cx="247" cy="220" r="4" fill="#ffffff"/>
                </g>
            </g>

            <path d="M 166 239 Q 200 228 234 239 Q 232 279 200 282 Q 168 279 166 239 Z"
                  fill="#35190f"/>

            <path d="M 181 263 Q 200 254 219 263 Q 200 279 181 263 Z"
                  fill="#ff7775"/>

            <path class="mushu-favorito-brilho mushu-favorito-brilho-1"
                  d="M 94 188 L 100 201 L 113 207 L 100 213 L 94 226 L 88 213 L 75 207 L 88 201 Z"
                  fill="#e6b84f"/>

            <path class="mushu-favorito-brilho mushu-favorito-brilho-2"
                  d="M 306 188 L 312 201 L 325 207 L 312 213 L 306 226 L 300 213 L 287 207 L 300 201 Z"
                  fill="#e6b84f"/>
        `;
    }

    let mensagem;
    let descricao;

    if (estaChorando) {
        mensagem = "Ah, não! Esse livro foi abandonado...";
        descricao = "Mushu chorando porque o livro foi abandonado";
    } else if (estaFeliz) {
        mensagem = "Mais uma história concluída! Parabéns pela leitura!";
        descricao = "Mushu feliz comemorando a leitura concluída";
    } else {
        mensagem = "Oba! Foi para os favoritos!";
        descricao = "Mushu comemorando o livro adicionado aos favoritos";
    }

    palco.innerHTML = `
        <div class="mushu-favorito-card">
            <svg class="mushu-favorito-svg"
                 viewBox="0 0 400 450"
                 role="img"
                 aria-label="${descricao}">

                <g class="mushu-favorito-folhinha"
                   fill="#82c765"
                   stroke="#073b32"
                   stroke-width="6"
                   stroke-linejoin="round">
                    <path d="M 198 105 C 174 94 158 75 151 49 C 177 42 198 61 200 91 C 207 59 231 39 252 45 C 248 76 229 97 202 105 L 202 119 L 198 119 Z"/>
                </g>

                <path d="M 83 389 C 51 388 38 359 43 322 C 47 286 62 254 70 205 C 77 153 90 116 131 103 C 158 94 242 94 269 103 C 310 116 323 153 330 205 C 338 254 353 286 357 322 C 362 359 349 388 317 389 C 289 404 111 404 83 389 Z"
                      fill="#d3f5d9"
                      stroke="#073b32"
                      stroke-width="7"
                      stroke-linejoin="round"/>

                <path d="M 159 108 C 181 99 214 101 244 111 C 265 118 287 121 309 134 C 318 140 321 157 318 177 C 315 194 307 194 304 177 C 301 153 285 137 260 130 C 232 121 204 128 181 125 C 161 123 145 116 159 108 Z"
                      fill="#fff0cf"/>

                <path d="M 270 99 L 306 103 Q 315 104 311 118 L 303 159 L 285 145 L 264 155 L 265 116 Q 265 104 270 99 Z"
                      fill="#278c80"
                      stroke="#073b32"
                      stroke-width="6"
                      stroke-linejoin="round"/>

                <ellipse cx="91" cy="232" rx="20" ry="12" fill="#ffa6b1" opacity=".9"/>
                <ellipse cx="309" cy="232" rx="20" ry="12" fill="#ffa6b1" opacity=".9"/>

                ${rosto}

                <path d="M 106 294 C 84 291 67 307 68 330 C 68 352 88 370 105 383 C 116 391 113 399 101 400 C 87 401 78 389 75 378 C 65 389 73 406 91 411 C 111 418 134 405 145 385 C 157 364 140 337 126 315 C 119 304 112 297 106 294 Z"
                      fill="#d3f5d9"
                      stroke="#073b32"
                      stroke-width="7"
                      stroke-linejoin="round"/>

                <path d="M 294 294 C 316 291 333 307 332 330 C 332 352 312 370 295 383 C 284 391 287 399 299 400 C 313 401 322 389 325 378 C 335 389 327 406 309 411 C 289 418 266 405 255 385 C 243 364 260 337 274 315 C 281 304 288 297 294 294 Z"
                      fill="#d3f5d9"
                      stroke="#073b32"
                      stroke-width="7"
                      stroke-linejoin="round"/>

                <path d="M 105 283 Q 144 269 193 301 Q 200 306 207 301 Q 256 269 295 283 L 292 300 Q 247 292 203 317 Q 200 319 197 317 Q 153 292 108 300 Z"
                      fill="#fff0cf"
                      stroke="#073b32"
                      stroke-width="6"
                      stroke-linejoin="round"/>

                <path d="M 99 299 Q 148 292 198 317 L 198 405 Q 151 412 110 395 Z"
                      fill="#278c80"
                      stroke="#073b32"
                      stroke-width="6"
                      stroke-linejoin="round"/>

                <path d="M 202 317 Q 252 292 301 299 L 290 395 Q 249 412 202 405 Z"
                      fill="#278c80"
                      stroke="#073b32"
                      stroke-width="6"
                      stroke-linejoin="round"/>

                <path d="M 198 318 L 198 405 M 206 318 L 206 405"
                      fill="none"
                      stroke="#073b32"
                      stroke-width="5"
                      stroke-linecap="round"/>

                <path d="M 87 365 C 64 374 70 414 98 424 C 119 432 142 418 143 399 C 144 381 120 361 87 365 Z"
                      fill="#d3f5d9"
                      stroke="#073b32"
                      stroke-width="6"/>

                <path d="M 313 365 C 336 374 330 414 302 424 C 281 432 258 418 257 399 C 256 381 280 361 313 365 Z"
                      fill="#d3f5d9"
                      stroke="#073b32"
                      stroke-width="6"/>
            </svg>

            <p class="mushu-favorito-mensagem">${mensagem}</p>
        </div>
    `;

    palco.setAttribute("aria-hidden", "false");
    palco.classList.remove("mushu-favorito-visivel");

    void palco.offsetWidth;

    palco.classList.add("mushu-favorito-visivel");

    temporizadorMushu = setTimeout(() => {
        palco.classList.remove("mushu-favorito-visivel");
        palco.setAttribute("aria-hidden", "true");

        temporizadorMushu = null;

        setTimeout(() => {
            if (!palco.classList.contains("mushu-favorito-visivel")) {
                palco.innerHTML = "";
            }
        }, 350);

    }, 2400);
}

/* ==========================================
   FUNÇÕES AUXILIARES
========================================== */

function transformarEmLista(valor) {
    if (Array.isArray(valor)) return valor;
    if (typeof valor === "string" && valor.trim()) return [valor];
    return [];
}

function obterGeneros(livro) {
    const lista = [
        ...transformarEmLista(livro.genero),
        ...transformarEmLista(livro.generos),
        ...transformarEmLista(livro.categoria),
        ...transformarEmLista(livro.categorias)
    ];

    const unicos = new Map();

    lista.forEach(genero => {
        if (typeof genero !== "string" || !genero.trim()) return;

        const nome = genero.trim();
        const chave = nome.toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (!unicos.has(chave)) unicos.set(chave, nome);
    });

    return [...unicos.values()];
}

function preencherElemento(elemento, valor, alternativa = "Não informado") {
    if (!elemento) return;

    if (Array.isArray(valor)) valor = valor.join(", ");

    elemento.textContent =
        valor !== undefined && valor !== null && String(valor).trim() !== ""
            ? valor
            : alternativa;
}

function obterIdLivro() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("id") || "pequeno-principe";
}

function obterDadosDoLivro() {
    if (!livroAtual) return null;

    const capas = transformarEmLista(livroAtual.capas);

    return {
        id: String(livroAtual.id),
        titulo: livroAtual.titulo || "",
        autor: livroAtual.autor || "",
        genero: obterGeneros(livroAtual),
        capa: livroAtual.capa || capas[0] || ""
    };
}

/* ==========================================
   ATUALIZAÇÃO DOS BOTÕES
========================================== */

function atualizarBotaoFavorito() {
    const botao = elementos.botaoFavorito;
    if (!botao) return;

    botao.textContent = favoritoAtual ? "♥" : "♡";
    botao.classList.toggle("favoritado", favoritoAtual);
    botao.setAttribute("aria-pressed", String(favoritoAtual));

    botao.setAttribute(
        "aria-label",
        favoritoAtual
            ? "Remover dos livros favoritos"
            : "Adicionar aos livros favoritos"
    );

    botao.title = favoritoAtual
        ? "Remover dos livros favoritos"
        : "Adicionar aos livros favoritos";
}

function atualizarBotaoAbandonado() {
    const botao = elementos.botaoAbandonado;
    if (!botao) return;

    botao.textContent = abandonadoAtual ? "⚑" : "⚐";
    botao.classList.toggle("abandonado", abandonadoAtual);
    botao.setAttribute("aria-pressed", String(abandonadoAtual));

    botao.setAttribute(
        "aria-label",
        abandonadoAtual
            ? "Retirar dos livros abandonados"
            : "Marcar como livro abandonado"
    );

    botao.title = abandonadoAtual
        ? "Retirar dos livros abandonados"
        : "Marcar como livro abandonado";
}

function atualizarBotaoLido() {
    const botao = elementos.botaoLido;
    if (!botao) return;

    botao.textContent = lidoAtual ? "✔" : "✓";
    botao.classList.toggle("lido", lidoAtual);
    botao.setAttribute("aria-pressed", String(lidoAtual));

    botao.setAttribute(
        "aria-label",
        lidoAtual
            ? "Retirar dos livros lidos"
            : "Marcar como livro lido"
    );

    botao.title = lidoAtual
        ? "Retirar dos livros lidos"
        : "Marcar como livro lido";
}

function verificarEstadosDoLivro() {
    if (!livroAtual) return;

    const id = String(livroAtual.id);

    favoritoAtual = listaFavoritos.some(livro =>
        String(livro.id) === id
    );

    abandonadoAtual = listaAbandonados.some(livro =>
        String(livro.id) === id
    );

    lidoAtual = listaLidos.some(livro =>
        String(livro.id) === id
    );

    atualizarBotaoFavorito();
    atualizarBotaoAbandonado();
    atualizarBotaoLido();
}

/* ==========================================
   PREFERÊNCIA DE APARIÇÃO DO MUSHU
========================================== */

async function carregarPreferenciaMushu() {
    // Visitantes sem login usam o padrão: Mushu ativado.
    if (!usuarioAtual) {
        aparicaoMushuAtivada = true;
        return;
    }

    try {
        const referencia = doc(db, COLECAO_USUARIOS, usuarioAtual.uid);
        const documento = await getDoc(referencia);

        if (documento.exists()) {
            const dados = documento.data();
            aparicaoMushuAtivada = dados.mushuAtivado !== false;
        } else {
            aparicaoMushuAtivada = true;
        }

    } catch (erro) {
        console.error("Erro ao carregar preferência do Mushu:", erro);
        aparicaoMushuAtivada = true;
    }
}

/* ==========================================
   CARREGAR ESTANTES DO FIRESTORE
========================================== */

async function carregarEstantes() {
    if (!usuarioAtual) {
        listaFavoritos = [];
        listaAbandonados = [];
        listaLidos = [];
        verificarEstadosDoLivro();
        return;
    }

    try {
        const referencia = doc(db, COLECAO_USUARIOS, usuarioAtual.uid);
        const documento = await getDoc(referencia);

        if (documento.exists()) {
            const dados = documento.data();

            listaFavoritos = Array.isArray(dados[CAMPO_FAVORITOS])
                ? dados[CAMPO_FAVORITOS]
                : [];

            listaAbandonados = Array.isArray(dados[CAMPO_ABANDONADOS])
                ? dados[CAMPO_ABANDONADOS]
                : [];

            listaLidos = Array.isArray(dados[CAMPO_LIDOS])
                ? dados[CAMPO_LIDOS]
                : [];

        } else {
            listaFavoritos = [];
            listaAbandonados = [];
            listaLidos = [];
        }

        verificarEstadosDoLivro();

    } catch (erro) {
        console.error("Erro ao carregar as estantes:", erro);
    }
}

/* ==========================================
   FAVORITOS E ABANDONADOS
========================================== */

async function alternarNaEstante(campo, tipo) {
    if (!usuarioAtual) {
        window.location.href = "/login.html";
        return;
    }

    if (!livroAtual) return;

    const botao = tipo === "favorito"
        ? elementos.botaoFavorito
        : elementos.botaoAbandonado;

    if (botao) botao.disabled = true;

    try {
        const referencia = doc(db, COLECAO_USUARIOS, usuarioAtual.uid);
        const documento = await getDoc(referencia);

        const dados = documento.exists() ? documento.data() : {};

        let livrosSalvos = Array.isArray(dados[campo])
            ? [...dados[campo]]
            : [];

        const id = String(livroAtual.id);

        const jaEstaNaLista = livrosSalvos.some(livro =>
            String(livro.id) === id
        );

        if (jaEstaNaLista) {
            livrosSalvos = livrosSalvos.filter(livro =>
                String(livro.id) !== id
            );
        } else {
            livrosSalvos.push(obterDadosDoLivro());
        }

        await setDoc(
            referencia,
            { [campo]: livrosSalvos },
            { merge: true }
        );

        if (tipo === "favorito") {
            listaFavoritos = livrosSalvos;
        } else {
            listaAbandonados = livrosSalvos;
        }

        verificarEstadosDoLivro();

        if (!jaEstaNaLista) {
            if (tipo === "favorito") {
                mostrarMushuFavorito("empolgado");
            } else if (tipo === "abandonado") {
                mostrarMushuFavorito("choro");
            }
        }

    } catch (erro) {
        console.error(`Erro ao atualizar ${tipo}:`, erro);
    } finally {
        if (botao) botao.disabled = false;
    }
}

/* ==========================================
   MARCAR COMO LIDO
   Ao adicionar aos lidos, remove dos abandonados.
========================================== */

async function alternarLivroLido() {
    if (!usuarioAtual) {
        window.location.href = "/login.html";
        return;
    }

    if (!livroAtual) return;

    const botao = elementos.botaoLido;
    if (botao) botao.disabled = true;

    try {
        const referencia = doc(db, COLECAO_USUARIOS, usuarioAtual.uid);
        const documento = await getDoc(referencia);

        const dados = documento.exists() ? documento.data() : {};

        let livrosLidos = Array.isArray(dados[CAMPO_LIDOS])
            ? [...dados[CAMPO_LIDOS]]
            : [];

        let livrosAbandonados = Array.isArray(dados[CAMPO_ABANDONADOS])
            ? [...dados[CAMPO_ABANDONADOS]]
            : [];

        const id = String(livroAtual.id);

        const jaEstaLido = livrosLidos.some(livro =>
            String(livro.id) === id
        );

        if (jaEstaLido) {
            livrosLidos = livrosLidos.filter(livro =>
                String(livro.id) !== id
            );
        } else {
            livrosLidos.push(obterDadosDoLivro());

            livrosAbandonados = livrosAbandonados.filter(livro =>
                String(livro.id) !== id
            );
        }

        await setDoc(
            referencia,
            {
                [CAMPO_LIDOS]: livrosLidos,
                [CAMPO_ABANDONADOS]: livrosAbandonados
            },
            { merge: true }
        );

        listaLidos = livrosLidos;
        listaAbandonados = livrosAbandonados;

        verificarEstadosDoLivro();

        if (!jaEstaLido) {
            mostrarMushuFavorito("feliz");
        }

    } catch (erro) {
        console.error("Erro ao atualizar livros lidos:", erro);
    } finally {
        if (botao) botao.disabled = false;
    }
}

/* ==========================================
   EVENTOS DOS BOTÕES
========================================== */

if (elementos.botaoFavorito) {
    elementos.botaoFavorito.addEventListener("click", () => {
        alternarNaEstante(CAMPO_FAVORITOS, "favorito");
    });
}

if (elementos.botaoAbandonado) {
    elementos.botaoAbandonado.addEventListener("click", () => {
        alternarNaEstante(CAMPO_ABANDONADOS, "abandonado");
    });
}

if (elementos.botaoLido) {
    elementos.botaoLido.addEventListener("click", alternarLivroLido);
}

/* ==========================================
   INFORMAÇÕES DO LIVRO
========================================== */

function carregarInformacoesLivro(livro, idLivro) {
    livroAtual = { ...livro, id: String(idLivro) };

    document.title = `Já Te Conto | ${livro.titulo}`;

    preencherElemento(elementos.breadcrumb, livro.titulo);
    preencherElemento(elementos.titulo, livro.titulo);
    preencherElemento(elementos.autor, livro.autor);
    preencherElemento(elementos.genero, obterGeneros(livro), "Gênero não informado");
    preencherElemento(elementos.sinopse, livro.sinopse, "Sinopse ainda não cadastrada.");

    preencherElemento(
        elementos.frase,
        livro.fraseMarcante || livro.frase,
        "Frase marcante ainda não cadastrada."
    );

    const capas = transformarEmLista(livro.capas);
    const caminhoCapa = livro.capa || capas[0] || "";

    if (elementos.capa && caminhoCapa) {
        elementos.capa.src = caminhoCapa;
        elementos.capa.alt = `Capa ilustrativa de ${livro.titulo}`;
        elementos.capa.hidden = false;

        elementos.capa.onerror = () => {
            elementos.capa.hidden = true;
        };

    } else if (elementos.capa) {
        elementos.capa.hidden = true;
    }

    preencherElemento(
        elementos.observacaoCapa,
        livro.observacaoImagem,
        "A imagem pode ser ilustrativa e não corresponder à edição disponível para leitura."
    );

    preencherElemento(elementos.paginas, livro.paginas);
    preencherElemento(elementos.idioma, "Português");
    preencherElemento(elementos.classificacao, livro.classificacao);
    preencherElemento(elementos.tempoLeitura, livro.tempoLeitura);

    const linkMEC = livro.linkMEC || livro.linkLeitura || livro.urlMEC || "";

    if (elementos.botaoLeitura && linkMEC) {
        elementos.botaoLeitura.href = linkMEC;
        elementos.botaoLeitura.target = "_blank";
        elementos.botaoLeitura.rel = "noopener noreferrer";
        elementos.botaoLeitura.classList.remove("disabled");
        elementos.botaoLeitura.removeAttribute("aria-disabled");
        elementos.botaoLeitura.textContent = "LER NO MEC LIVROS";

    } else if (elementos.botaoLeitura) {
        elementos.botaoLeitura.removeAttribute("href");
        elementos.botaoLeitura.removeAttribute("target");
        elementos.botaoLeitura.classList.add("disabled");
        elementos.botaoLeitura.setAttribute("aria-disabled", "true");
        elementos.botaoLeitura.textContent = "Link de leitura indisponível";
    }

    verificarEstadosDoLivro();
}

/* ==========================================
   LIVRO NÃO ENCONTRADO
========================================== */

function exibirLivroNaoEncontrado() {
    if (!paginaLivro) return;

    paginaLivro.innerHTML = `
        <div class="text-center py-5">
            <h1>Livro não encontrado!</h1>
            <p>Não conseguimos localizar esse livro no catálogo.</p>
            <a href="/livros.html" class="btn btn-success">Voltar ao catálogo</a>
        </div>
    `;
}

/* ==========================================
   CARREGAR CATÁLOGO
========================================== */

async function carregarLivro() {
    try {
        const resposta = await fetch(CAMINHO_CATALOGO);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }

        const dados = await resposta.json();

        if (!dados.livros) {
            throw new Error("O JSON não possui a propriedade 'livros'.");
        }

        const idLivro = obterIdLivro();
        let livroEncontrado = null;

        if (Array.isArray(dados.livros)) {
            livroEncontrado = dados.livros.find(livro =>
                String(livro.id) === String(idLivro)
            );

        } else {
            livroEncontrado = dados.livros[idLivro] ||
                Object.values(dados.livros).find(livro =>
                    String(livro.id) === String(idLivro)
                );
        }

        if (!livroEncontrado) {
            exibirLivroNaoEncontrado();
            return;
        }

        carregarInformacoesLivro(livroEncontrado, idLivro);

        console.log("Livro carregado:", livroEncontrado.titulo);

    } catch (erro) {
        console.error("Erro ao carregar livro:", erro);

        if (!paginaLivro) return;

        paginaLivro.innerHTML = `
            <div class="text-center py-5">
                <h1>Não foi possível carregar o livro.</h1>
                <p>Verifique se o arquivo JSON está na pasta correta e se o catálogo está atualizado.</p>
                <a href="/livros.html" class="btn btn-success">Voltar ao catálogo</a>
            </div>
        `;
    }
}

/* ==========================================
   AUTENTICAÇÃO
========================================== */

onAuthStateChanged(auth, async usuario => {
    usuarioAtual = usuario;

    // Carrega a preferência antes de permitir as ações nas estantes.
    await carregarPreferenciaMushu();

    // Depois carrega os livros salvos do usuário.
    await carregarEstantes();
});

carregarLivro();
