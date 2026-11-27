
// ========================================
// FAQ — JÁ TE CONTO
// ========================================


// ELEMENTOS DOS TÓPICOS

const topicos = document.querySelectorAll(".faq-topico");


// ABRIR E FECHAR TÓPICOS

topicos.forEach(topico => {

    const botao = topico.querySelector(".faq-topico-titulo");

    botao.addEventListener("click", () => {

        const estavaAberto = topico.classList.contains("aberto");

        // Fecha todos os tópicos
        topicos.forEach(item => {

            item.classList.remove("aberto");

            const botaoItem = item.querySelector(".faq-topico-titulo");

            botaoItem.setAttribute("aria-expanded", "false");

            // Fecha também as respostas
            item.querySelectorAll(".faq-item").forEach(pergunta => {

                pergunta.classList.remove("aberto");

                pergunta.querySelector(".faq-pergunta")
                    .setAttribute("aria-expanded", "false");

            });

        });

        // Abre o tópico selecionado, se estava fechado
        if (!estavaAberto) {

            topico.classList.add("aberto");

            botao.setAttribute("aria-expanded", "true");

        }

    });

});


// ELEMENTOS DAS PERGUNTAS

const perguntas = document.querySelectorAll(".faq-item");


// ABRIR E FECHAR RESPOSTAS

perguntas.forEach(pergunta => {

    const botao = pergunta.querySelector(".faq-pergunta");

    botao.addEventListener("click", () => {

        const estavaAberta = pergunta.classList.contains("aberto");

        // Fecha as outras respostas do mesmo tópico
        const perguntasDoTopico = pergunta.closest(".faq-perguntas")
            .querySelectorAll(".faq-item");

        perguntasDoTopico.forEach(item => {

            item.classList.remove("aberto");

            item.querySelector(".faq-pergunta")
                .setAttribute("aria-expanded", "false");

        });

        // Abre a resposta selecionada
        if (!estavaAberta) {

            pergunta.classList.add("aberto");

            botao.setAttribute("aria-expanded", "true");

        }

    });

});


// FIM DO FAQ

