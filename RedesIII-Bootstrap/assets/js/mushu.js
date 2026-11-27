
(() => {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";

    // ==========================================
    // CRIAÇÃO DO SVG
    // ==========================================

    function createSVG() {
        const svg = document.createElementNS(SVG_NS, "svg");

        svg.setAttribute("viewBox", "0 0 400 450");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Mushu, mascote leitor");
        svg.setAttribute("class", "mushu-svg");

        svg.innerHTML = `
            <defs>
                <linearGradient id="mushu-body-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#e1fbe4"/>
                    <stop offset="100%" stop-color="#c8f0d1"/>
                </linearGradient>

                <linearGradient id="mushu-book-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#218b80"/>
                    <stop offset="100%" stop-color="#287c75"/>
                </linearGradient>
            </defs>

            <g class="mushu-line">
                <path class="mushu-body"
                    fill="url(#mushu-body-gradient)"
                    d="
                        M 83 389
                        C 51 388 38 359 43 322
                        C 47 286 62 254 70 205
                        C 77 153 90 116 131 103
                        C 158 94 242 94 269 103
                        C 310 116 323 153 330 205
                        C 338 254 353 286 357 322
                        C 362 359 349 388 317 389
                        C 289 404 111 404 83 389 Z
                    "
                />

                <path fill="#fff0cf" stroke="none"
                    d="
                        M 159 108
                        C 181 99 214 101 244 111
                        C 265 118 287 121 309 134
                        C 318 140 321 157 318 177
                        C 315 194 307 194 304 177
                        C 301 153 285 137 260 130
                        C 232 121 204 128 181 125
                        C 161 123 145 116 159 108 Z
                    "
                />

                <path fill="#d3f5d9"
                    d="M 87 365 C 64 374 70 414 98 424
                       C 119 432 142 418 143 399
                       C 144 381 120 361 87 365 Z"/>

                <path fill="#d3f5d9"
                    d="M 313 365 C 336 374 330 414 302 424
                       C 281 432 258 418 257 399
                       C 256 381 280 361 313 365 Z"/>
            </g>

            <g class="mushu-line mushu-sprout" fill="#82c765">
                <path d="
                    M 198 98
                    C 174 92 157 74 151 49
                    C 174 41 198 54 200 87
                    C 205 54 231 37 252 43
                    C 248 73 229 93 202 98
                    L 202 111 L 198 111 Z
                "/>
            </g>

            <g class="mushu-line">
                <path fill="#278c80"
                    d="M 270 99
                       L 306 103
                       Q 315 104 311 118
                       L 303 159
                       L 285 145
                       L 264 155
                       L 265 116
                       Q 265 104 270 99 Z"/>
            </g>

            <path fill="#278c80"
                d="
                    M 314 305
                    C 307 293 288 300 290 313
                    C 292 326 313 340 314 340
                    C 315 340 336 326 338 313
                    C 340 300 321 293 314 305 Z
                "
            />

            <g class="mushu-line mushu-eyebrows" fill="none">
                <path class="mushu-eyebrow-left" d="M 124 177 Q 136 163 151 169"/>
                <path class="mushu-eyebrow-right" d="M 249 169 Q 264 163 276 177"/>
            </g>

            <g>
                <g class="mushu-eye-left">
                    <g class="mushu-eye-follow">
                        <ellipse cx="139" cy="215" rx="24" ry="27" fill="#35190f"/>
                        <circle cx="146" cy="207" r="7" fill="#ffffff"/>
                    </g>
                </g>

                <g class="mushu-eye-right">
                    <g class="mushu-eye-follow">
                        <ellipse cx="261" cy="215" rx="24" ry="27" fill="#35190f"/>
                        <circle cx="268" cy="207" r="7" fill="#ffffff"/>
                    </g>
                </g>
            </g>

            <g class="mushu-mouth">
                <path class="mushu-mouth-shape"
                    fill="#35190f"
                    d="
                        M 173 237
                        Q 200 248 227 237
                        Q 230 260 200 264
                        Q 170 260 173 237 Z
                    "
                />

                <path class="mushu-tongue"
                    fill="#ff7775"
                    d="
                        M 182 251
                        Q 200 245 218 251
                        Q 200 267 182 251 Z
                    "
                />

                <path class="mushu-carinho-smile"
                    d="M 174 245 Q 200 270 226 245"
                    fill="none"
                    stroke="#35190f"
                    stroke-width="6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>

            <g class="mushu-blush">
                <ellipse cx="91" cy="232" rx="20" ry="12" fill="#ffa6b1" opacity=".95"/>
                <ellipse cx="309" cy="232" rx="20" ry="12" fill="#ffa6b1" opacity=".95"/>
            </g>

            <g class="mushu-line">
                <path class="mushu-page"
                    d="
                        M 105 283
                        Q 144 269 193 301
                        Q 200 306 207 301
                        Q 256 269 295 283
                        L 292 300
                        Q 247 292 203 317
                        Q 200 319 197 317
                        Q 153 292 108 300 Z
                    "
                />

                <path fill="url(#mushu-book-gradient)"
                    d="M 99 299 Q 148 292 198 317 L 198 405 Q 151 412 110 395 Z"/>

                <path fill="url(#mushu-book-gradient)"
                    d="M 202 317 Q 252 292 301 299 L 290 395 Q 249 412 202 405 Z"/>

                <path fill="#278c80"
                    d="M 194 317 Q 200 314 206 317 L 206 405 Q 200 408 194 405 Z"/>

                <path fill="none" d="M 198 318 L 198 405"/>
                <path fill="none" d="M 206 318 L 206 405"/>
            </g>

            <g class="mushu-open-arms">
                <path class="mushu-arm"
                    d="
                        M 106 294
                        C 84 291 67 307 68 330
                        C 68 352 88 370 105 383
                        C 116 391 113 399 101 400
                        C 87 401 78 389 75 378
                        C 65 389 73 406 91 411
                        C 111 418 134 405 145 385
                        C 157 364 140 337 126 315
                        C 119 304 112 297 106 294 Z
                    "
                />

                <path class="mushu-arm"
                    d="
                        M 294 294
                        C 316 291 333 307 332 330
                        C 332 352 312 370 295 383
                        C 284 391 287 399 299 400
                        C 313 401 322 389 325 378
                        C 335 389 327 406 309 411
                        C 289 418 266 405 255 385
                        C 243 364 260 337 274 315
                        C 281 304 288 297 294 294 Z
                    "
                />
            </g>

            <g class="mushu-visible-arms">
                <path class="mushu-arm mushu-one-cover"
                    d="
                        M 78 240
                        C 69 222 79 203 95 190
                        C 115 173 140 158 157 170
                        C 174 182 169 200 153 217
                        L 120 248
                        C 107 261 87 258 78 240 Z
                    "
                />

                <path class="mushu-arm mushu-free-arm"
                    d="
                        M 294 294
                        C 316 291 333 307 332 330
                        C 332 352 312 370 295 383
                        C 284 391 287 399 299 400
                        C 313 401 322 389 325 378
                        C 335 389 327 406 309 411
                        C 289 418 266 405 255 385
                        C 243 364 260 337 274 315
                        C 281 304 288 297 294 294 Z
                    "
                />
            </g>

            <g class="mushu-covered-arms">
                <g class="mushu-cover">
                    <path class="mushu-arm"
                        d="
                            M 78 240
                            C 69 222 79 203 95 190
                            C 115 173 140 158 157 170
                            C 174 182 169 200 153 217
                            L 120 248
                            C 107 261 87 258 78 240 Z
                        "
                    />

                    <path class="mushu-arm"
                        d="
                            M 322 240
                            C 331 222 321 203 305 190
                            C 285 173 260 158 243 170
                            C 226 182 231 200 247 217
                            L 280 248
                            C 293 261 313 258 322 240 Z
                        "
                    />
                </g>
            </g>

            <g class="mushu-line" fill="#d3f5d9">
                <ellipse cx="111" cy="405" rx="32" ry="29"/>
                <ellipse cx="289" cy="405" rx="32" ry="29"/>
            </g>
        `;

        return svg;
    }

    // ==========================================
    // OLHOS SEGUINDO O MOUSE + CARINHO
    // ==========================================

    function ativarOlhosSeguindoMouse(svg) {
        const limiteHorizontal = 4;
        const limiteVertical = 3;

        function voltarAoCentro() {
            svg.style.setProperty("--mushu-look-x", "0px");
            svg.style.setProperty("--mushu-look-y", "0px");
            svg.dataset.carinho = "false";
        }

        function acompanharMouse(evento) {
            if (evento.pointerType === "touch") return;

            const retangulo = svg.getBoundingClientRect();

            if (!retangulo.width || !retangulo.height) return;

            const x = ((evento.clientX - retangulo.left) / retangulo.width) * 400;
            const y = ((evento.clientY - retangulo.top) / retangulo.height) * 450;

            // Área do rostinho do Mushu.
            const mouseNoRosto =
                x >= 75 &&
                x <= 325 &&
                y >= 145 &&
                y <= 275;

            svg.dataset.carinho = mouseNoRosto ? "true" : "false";

            // Olhos acompanhando o cursor.
            const centroX = retangulo.left + retangulo.width * 0.5;
            const centroY = retangulo.top + retangulo.height * 0.48;

            const distanciaX = (evento.clientX - centroX) / (retangulo.width * 0.5);
            const distanciaY = (evento.clientY - centroY) / (retangulo.height * 0.5);

            const direcaoX = Math.max(-1, Math.min(1, distanciaX));
            const direcaoY = Math.max(-1, Math.min(1, distanciaY));

            svg.style.setProperty(
                "--mushu-look-x",
                `${direcaoX * limiteHorizontal}px`
            );

            svg.style.setProperty(
                "--mushu-look-y",
                `${direcaoY * limiteVertical}px`
            );
        }

        document.addEventListener("pointermove", acompanharMouse);

        document.addEventListener("pointerout", (evento) => {
            if (!evento.relatedTarget) {
                voltarAoCentro();
            }
        });

        window.addEventListener("blur", voltarAoCentro);
    }

    // ==========================================
    // CONTROLE DOS ESTADOS
    // ==========================================

    function initMushu() {
        const containers = document.querySelectorAll("[data-mushu], .mushu-palco");

        containers.forEach((container) => {
            if (container.dataset.mushuReady === "true") return;

            container.dataset.mushuReady = "true";
            container.classList.add("mushu-widget");

            const svg = createSVG();

            container.replaceChildren(svg);

            svg.dataset.estado = "normal";
            svg.dataset.carinho = "false";

            function setState(state) {
                const estadosValidos = ["normal", "oculta", "visivel"];

                if (!estadosValidos.includes(state)) return;

                svg.dataset.estado = state;
            }

            container.mushu = {
                setState,

                coverEyes() {
                    setState("oculta");
                },

                showEyes() {
                    setState("normal");
                },

                showOneEye() {
                    setState("visivel");
                },

                toggleEyes() {
                    setState(
                        svg.dataset.estado === "oculta"
                            ? "normal"
                            : "oculta"
                    );
                },

                element: svg
            };

            // ACOMPANHAMENTO DO MOUSE:
            // Página inicial E perfil.
            const paginaComMushuInterativo =
                document.body.classList.contains("pagina-inicio") ||
                document.body.classList.contains("pagina-perfil");

            if (paginaComMushuInterativo) {
                ativarOlhosSeguindoMouse(svg);
            }
        });

        // SINCRONIZAÇÃO COM A SENHA
        const senha = document.querySelector("#senha");

        if (!senha) return;

        function atualizarMushu() {
            const temSenha = senha.value.length > 0;
            const senhaVisivel = senha.type === "text";

            document.querySelectorAll("[data-mushu], .mushu-palco")
                .forEach((container) => {
                    if (!container.mushu) return;

                    if (!temSenha) {
                        container.mushu.setState("normal");
                    } else if (senhaVisivel) {
                        container.mushu.setState("visivel");
                    } else {
                        container.mushu.setState("oculta");
                    }
                });
        }

        senha.addEventListener("input", atualizarMushu);
        senha.addEventListener("change", atualizarMushu);

        const observador = new MutationObserver(atualizarMushu);

        observador.observe(senha, {
            attributes: true,
            attributeFilter: ["type"]
        });

        atualizarMushu();
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMushu);
    } else {
        initMushu();
    }

})();
