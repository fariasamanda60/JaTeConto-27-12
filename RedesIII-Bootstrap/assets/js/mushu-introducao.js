
(() => {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";

    // ==========================================
    // EXPRESSÕES DO MUSHU
    // ==========================================

    const rostos = {
        choro: `
            <!-- SOBRANCELHAS TRISTES -->
            <path d="M 130 180 Q 148 166 166 181"
                  fill="none" stroke="#073b32" stroke-width="8"
                  stroke-linecap="round"/>
            <path d="M 234 181 Q 252 166 270 180"
                  fill="none" stroke="#073b32" stroke-width="8"
                  stroke-linecap="round"/>

            <!-- OLHOS FECHADOS E TRISTES -->
            <path d="M 124 218 Q 145 195 166 218"
                  fill="none" stroke="#35190f" stroke-width="10"
                  stroke-linecap="round"/>
            <path d="M 234 218 Q 255 195 276 218"
                  fill="none" stroke="#35190f" stroke-width="10"
                  stroke-linecap="round"/>

            <!-- LÁGRIMA ESQUERDA -->
            <path class="mushu-lagrima mushu-lagrima-esquerda"
                  d="M 137 224
                     C 128 240 126 248 137 255
                     C 148 248 146 240 137 224 Z"
                  fill="#73c9f5"/>

            <!-- LÁGRIMA DIREITA -->
            <path class="mushu-lagrima mushu-lagrima-direita"
                  d="M 263 224
                     C 254 240 252 248 263 255
                     C 274 248 272 240 263 224 Z"
                  fill="#73c9f5"/>

            <!-- BOCA TRISTE -->
            <path d="M 173 264 Q 200 239 227 264"
                  fill="none" stroke="#35190f" stroke-width="10"
                  stroke-linecap="round"/>
        `,

        // EXPRESSÃO DE MORTE / DESMAIO
        pensativo: `
            <!-- OLHOS EM X -->
            <g fill="none"
               stroke="#35190f"
               stroke-width="15"
               stroke-linecap="round">

                <path d="M 127 190 L 163 226"/>
                <path d="M 163 190 L 127 226"/>

                <path d="M 237 190 L 273 226"/>
                <path d="M 273 190 L 237 226"/>
            </g>

            <!-- BOCA ABERTA DE DESMAIO -->
            <path d="
                M 174 250
                C 174 231 188 218 200 218
                C 212 218 226 231 226 250
                C 226 265 214 273 200 273
                C 186 273 174 265 174 250 Z
            "
            fill="#ff555b"/>

            <!-- PARTE INTERNA ESCURA DA BOCA -->
            <path d="
                M 183 247
                Q 200 236 217 247
                Q 215 263 200 265
                Q 185 263 183 247 Z
            "
            fill="#e94450"/>

            <!-- LÍNGUA ANIMADA -->
            <path class="mushu-lingua"
                d="
                    M 188 263
                    C 188 273 185 282 193 287
                    C 198 291 207 291 212 286
                    C 217 281 212 271 212 263 Z
                "
                fill="#ff777d"
                stroke="#e94450"
                stroke-width="3"
                stroke-linejoin="round"/>
        `,

        feliz: `
            <!-- SOBRANCELHAS ARQUEADAS -->
            <g fill="none"
               stroke="#073b32"
               stroke-width="8"
               stroke-linecap="round">

                <path d="M 125 174 Q 143 151 164 161"/>
                <path d="M 236 161 Q 257 151 275 174"/>
            </g>

            <!-- OLHOS COM CRESCIMENTO E PISCADA -->
            <g class="mushu-olhos-felizes">
                <g class="mushu-piscar mushu-piscar-feliz">
                    <circle cx="145" cy="215" r="25" fill="#35190f"/>
                    <circle cx="151" cy="207" r="7" fill="#ffffff"/>
                    <circle cx="137" cy="222" r="3.5" fill="#ffffff"/>

                    <circle cx="255" cy="215" r="25" fill="#35190f"/>
                    <circle cx="261" cy="207" r="7" fill="#ffffff"/>
                    <circle cx="247" cy="222" r="3.5" fill="#ffffff"/>
                </g>
            </g>

            <!-- SORRISO EM U -->
            <path d="
                M 183 238
                Q 183 259 200 259
                Q 217 259 217 238
            "
            fill="none"
            stroke="#35190f"
            stroke-width="9"
            stroke-linecap="round"/>
        `,

        empolgado: `
            <!-- SOBRANCELHAS LEVANTADAS -->
            <path d="M 124 169 Q 145 153 168 170"
                  fill="none" stroke="#073b32" stroke-width="8"
                  stroke-linecap="round"/>
            <path d="M 232 170 Q 255 153 278 169"
                  fill="none" stroke="#073b32" stroke-width="8"
                  stroke-linecap="round"/>

            <!-- OLHOS GRANDES COM CRESCIMENTO E PISCADA -->
            <g class="mushu-olhos-empolgados">
                <g class="mushu-piscar mushu-piscar-empolgado">
                    <ellipse cx="145" cy="213" rx="25" ry="29" fill="#35190f"/>
                    <circle cx="153" cy="202" r="9" fill="#ffffff"/>
                    <circle cx="137" cy="220" r="4" fill="#ffffff"/>

                    <ellipse cx="255" cy="213" rx="25" ry="29" fill="#35190f"/>
                    <circle cx="263" cy="202" r="9" fill="#ffffff"/>
                    <circle cx="247" cy="220" r="4" fill="#ffffff"/>
                </g>
            </g>

            <!-- BOCA ABERTA DE ALEGRIA -->
            <path d="M 166 239
                     Q 200 228 234 239
                     Q 232 279 200 282
                     Q 168 279 166 239 Z"
                  fill="#35190f"/>
            <path d="M 181 263 Q 200 254 219 263
                     Q 200 279 181 263 Z"
                  fill="#ff7775"/>

            <!-- BRILHINHO ESQUERDO -->
            <path class="mushu-brilhinho mushu-brilhinho-1"
                  d="M 94 188 L 100 201 L 113 207
                     L 100 213 L 94 226 L 88 213
                     L 75 207 L 88 201 Z"
                  fill="#e6b84f"/>

            <!-- BRILHINHO DIREITO -->
            <path class="mushu-brilhinho mushu-brilhinho-2"
                  d="M 306 188 L 312 201 L 325 207
                     L 312 213 L 306 226 L 300 213
                     L 287 207 L 300 201 Z"
                  fill="#e6b84f"/>
        `
    };

    // ==========================================
    // DESENHO BASE DO MUSHU
    // ==========================================

    function criarSVG(expressao) {
        const svg = document.createElementNS(SVG_NS, "svg");

        svg.setAttribute("viewBox", "0 0 400 450");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Mushu com expressão " + expressao);
        svg.setAttribute("class", "mushu-intro-svg");

        svg.innerHTML = `
            <!-- BROTO ANIMADO -->
            <g class="mushu-folhinha"
               fill="#82c765"
               stroke="#073b32"
               stroke-width="6"
               stroke-linejoin="round">
                <path d="
                    M 198 105
                    C 174 94 158 75 151 49
                    C 177 42 198 61 200 91
                    C 207 59 231 39 252 45
                    C 248 76 229 97 202 105
                    L 202 119 L 198 119 Z
                "/>
            </g>

            <!-- CORPO -->
            <path d="
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
            fill="#d3f5d9" stroke="#073b32"
            stroke-width="7" stroke-linejoin="round"/>

            <!-- BRILHO CREME -->
            <path d="
                M 159 108
                C 181 99 214 101 244 111
                C 265 118 287 121 309 134
                C 318 140 321 157 318 177
                C 315 194 307 194 304 177
                C 301 153 285 137 260 130
                C 232 121 204 128 181 125
                C 161 123 145 116 159 108 Z
            "
            fill="#fff0cf"/>

            <!-- FAIXA -->
            <path d="
                M 270 99
                L 306 103
                Q 315 104 311 118
                L 303 159
                L 285 145
                L 264 155
                L 265 116
                Q 265 104 270 99 Z
            "
            fill="#278c80" stroke="#073b32"
            stroke-width="6" stroke-linejoin="round"/>

            <!-- BOCHECHAS -->
            <ellipse cx="91" cy="232" rx="20" ry="12"
                     fill="#ffa6b1" opacity=".9"/>
            <ellipse cx="309" cy="232" rx="20" ry="12"
                     fill="#ffa6b1" opacity=".9"/>

            <!-- ROSTO VARIÁVEL -->
            ${rostos[expressao] || rostos.feliz}

            <!-- BRAÇOS -->
            <path d="
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
            fill="#d3f5d9" stroke="#073b32"
            stroke-width="7" stroke-linejoin="round"/>

            <path d="
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
            fill="#d3f5d9" stroke="#073b32"
            stroke-width="7" stroke-linejoin="round"/>

            <!-- LIVRO -->
            <path d="
                M 105 283
                Q 144 269 193 301
                Q 200 306 207 301
                Q 256 269 295 283
                L 292 300
                Q 247 292 203 317
                Q 200 319 197 317
                Q 153 292 108 300 Z
            "
            fill="#fff0cf" stroke="#073b32"
            stroke-width="6" stroke-linejoin="round"/>

            <path d="
                M 99 299
                Q 148 292 198 317
                L 198 405
                Q 151 412 110 395 Z
            "
            fill="#278c80" stroke="#073b32"
            stroke-width="6" stroke-linejoin="round"/>

            <path d="
                M 202 317
                Q 252 292 301 299
                L 290 395
                Q 249 412 202 405 Z
            "
            fill="#278c80" stroke="#073b32"
            stroke-width="6" stroke-linejoin="round"/>

            <path d="M 198 318 L 198 405
                     M 206 318 L 206 405"
                  fill="none" stroke="#073b32"
                  stroke-width="5" stroke-linecap="round"/>

            <!-- PÉS -->
            <path d="
                M 87 365
                C 64 374 70 414 98 424
                C 119 432 142 418 143 399
                C 144 381 120 361 87 365 Z
            "
            fill="#d3f5d9" stroke="#073b32"
            stroke-width="6"/>

            <path d="
                M 313 365
                C 336 374 330 414 302 424
                C 281 432 258 418 257 399
                C 256 381 280 361 313 365 Z
            "
            fill="#d3f5d9" stroke="#073b32"
            stroke-width="6"/>
        `;

        return svg;
    }

    // ==========================================
    // ESTILO DOS MUSHUS NA INTRODUÇÃO
    // ==========================================

    function prepararEstilos() {
        if (document.getElementById("mushu-introducao-estilos")) {
            return;
        }

        const estilo = document.createElement("style");
        estilo.id = "mushu-introducao-estilos";

        estilo.textContent = `
            .intro-mushu-slot {
                position: relative;
                width: 145px;
                height: 150px;
                flex: 0 0 145px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
            }

            .intro-mushu-slot .mushu-intro-svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
                animation: mushu-intro-flutuar 3s ease-in-out infinite;
            }

            /* FOLHINHA BALANÇANDO DELICADAMENTE */
            .mushu-folhinha {
                transform-box: fill-box;
                transform-origin: center bottom;
                animation: mushu-folhinha-balancando 3.2s ease-in-out infinite;
            }

            @keyframes mushu-folhinha-balancando {
                0%, 100% {
                    transform: rotate(0deg);
                }

                25% {
                    transform: rotate(3deg);
                }

                75% {
                    transform: rotate(-3deg);
                }
            }

            /* OLHINHOS CRESCENDO DELICADAMENTE NO TERCEIRO SLIDE */
            .mushu-olhos-felizes {
                transform-box: fill-box;
                transform-origin: center;
                animation: mushu-olhinhos-felizes 2.2s ease-in-out infinite;
            }

            @keyframes mushu-olhinhos-felizes {
                0%, 100% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.07);
                }
            }

            /* OLHINHOS CRESCENDO DELICADAMENTE NO QUARTO SLIDE */
            .mushu-olhos-empolgados {
                transform-box: fill-box;
                transform-origin: center;
                animation: mushu-olhinhos-empolgados 2.2s ease-in-out infinite;
            }

            @keyframes mushu-olhinhos-empolgados {
                0%, 100% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.07);
                }
            }

            /* PISCADAS DO TERCEIRO E QUARTO SLIDE */
            .mushu-piscar {
                transform-box: fill-box;
                transform-origin: center;
                animation: mushu-piscar-olhos 4.5s infinite;
            }

            /* Piscada do terceiro slide */
            .mushu-piscar-feliz {
                animation-delay: 0s;
            }

            /* Piscada do quarto slide, em outro ritmo */
            .mushu-piscar-empolgado {
                animation-delay: 1.2s;
            }

            @keyframes mushu-piscar-olhos {
                0%, 43%, 47%, 100% {
                    transform: scaleY(1);
                }

                45% {
                    transform: scaleY(0.08);
                }
            }

            /* BRILHINHOS PISCANDO */
            .mushu-brilhinho {
                transform-box: fill-box;
                transform-origin: center;
                animation: mushu-brilho-piscando 1.8s ease-in-out infinite;
            }

            .mushu-brilhinho-2 {
                animation-delay: 0.9s;
            }

            @keyframes mushu-brilho-piscando {
                0%, 100% {
                    opacity: 0.45;
                    transform: scale(0.85);
                }

                50% {
                    opacity: 1;
                    transform: scale(1.12);
                }
            }

            /* LÁGRIMAS CAINDO */
            .mushu-lagrima {
                transform-box: fill-box;
                transform-origin: center;
                animation: mushu-lagrima-caindo 1.4s ease-in infinite;
            }

            .mushu-lagrima-direita {
                animation-delay: 0.7s;
            }

            @keyframes mushu-lagrima-caindo {
                0% {
                    opacity: 0;
                    transform: translateY(-4px) scaleY(0.8);
                }

                15% {
                    opacity: 1;
                    transform: translateY(0) scaleY(1);
                }

                75% {
                    opacity: 1;
                    transform: translateY(12px) scaleY(1.05);
                }

                100% {
                    opacity: 0;
                    transform: translateY(18px) scaleY(1.1);
                }
            }

            /* LÍNGUA MEXENDO NO SEGUNDO SLIDE */
            .mushu-lingua {
                transform-box: fill-box;
                transform-origin: center top;
                animation: mushu-lingua-mexendo 1.6s ease-in-out infinite;
            }

            @keyframes mushu-lingua-mexendo {
                0%, 100% {
                    transform: translateY(0) scaleY(1);
                }

                50% {
                    transform: translateY(5px) scaleY(1.06);
                }
            }

            @keyframes mushu-intro-flutuar {
                0%, 100% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-6px);
                }
            }

            @media (max-width: 600px) {
                .intro-mushu-slot {
                    width: 125px;
                    height: 130px;
                    flex-basis: 125px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .intro-mushu-slot .mushu-intro-svg,
                .mushu-folhinha,
                .mushu-brilhinho,
                .mushu-lagrima,
                .mushu-lingua,
                .mushu-olhos-felizes,
                .mushu-olhos-empolgados,
                .mushu-piscar {
                    animation: none;
                }
            }
        `;

        document.head.appendChild(estilo);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    function iniciarMushusIntroducao() {
        prepararEstilos();

        const slots = document.querySelectorAll("[data-mushu-intro]");

        slots.forEach((slot) => {
            if (slot.dataset.mushuIntroReady === "true") {
                return;
            }

            slot.dataset.mushuIntroReady = "true";

            const expressao = slot.dataset.mushuIntro;
            const svg = criarSVG(expressao);

            slot.appendChild(svg);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarMushusIntroducao);
    } else {
        iniciarMushusIntroducao();
    }
})();
