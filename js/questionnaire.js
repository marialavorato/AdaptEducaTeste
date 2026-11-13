
(function () {
    "use strict";

    // ==========================================
    // 1. CONFIGURAÇÕES E DADOS DO QUESTIONÁRIO
    // ==========================================

    const key = "adapteduca_questionnaire_draft";

    let current = 0;
    let answers = {};

    const camposMultiplos = [
        "dificuldade",
        "formats",
        "necessidades",
        "explicacoes"
    ];

    // ==========================================
    // 2. COMPONENTES DAS PERGUNTAS
    // ==========================================

    // Perguntas com apenas uma resposta.
    function radio(name, items) {
        return `
            <div class="choice-list">
                ${items.map(item => `
                    <label class="choice">
                        <input
                            type="radio"
                            name="${name}"
                            value="${item}"
                            required
                        >
                        <span>${item}</span>
                    </label>
                `).join("")}
            </div>
        `;
    }

    // Perguntas com múltiplas respostas.
    function checkbox(name, items) {
        return `
            <div class="choice-list">
                ${items.map(item => `
                    <label class="choice checkbox">
                        <input
                            type="checkbox"
                            name="${name}"
                            value="${item}"
                        >
                        <span>${item}</span>
                    </label>
                `).join("")}
            </div>
        `;
    }

    // Estrutura padrão de uma pergunta.
    function question(num, title, name, items) {
        return `
            <div class="question-block">
                <h3>
                    <span class="qnum">${num}</span>
                    ${title}
                </h3>

                ${radio(name, items)}
            </div>
        `;
    }

    // ==========================================
    // 3. SEÇÕES DO QUESTIONÁRIO
    // ==========================================

    const steps = [

        // SEÇÃO 1 — PERFIL DO ALUNO
        {
            title: "Perfil do Aluno",

            render: () => `
                <div class="question-block">

                    <h3>
                        <span class="qnum">1.</span>
                        Em quais matérias você tem mais dificuldade?
                    </h3>

                    <p class="muted small">
                        Selecione todas as opções que se aplicam.
                    </p>

                    ${checkbox("dificuldade", [
                        "Matemática",
                        "Português",
                        "História",
                        "Geografia",
                        "Ciências/Biologia",
                        "Física",
                        "Química",
                        "Inglês"
                    ])}

                    <input
                        class="input"
                        name="dificuldadeOutra"
                        placeholder="Outra: escreva aqui..."
                        style="margin-top: 10px"
                    >

                </div>

                <div class="form-row" style="margin-top: 18px">

                    <div class="input-group">
                        <label>Nome</label>
                        <input
                            class="input"
                            name="nome"
                            autocomplete="name"
                            required
                        >
                    </div>

                    <div class="input-group">
                        <label>Idade</label>
                        <input
                            class="input"
                            type="number"
                            min="6"
                            max="100"
                            name="idade"
                            required
                        >
                    </div>

                    <div class="input-group">
                        <label>Série</label>
                        <input
                            class="input"
                            name="serie"
                            placeholder="Ex.: 9º Ano"
                            required
                        >
                    </div>

                    <div class="input-group">
                        <label>Escola</label>
                        <input
                            class="input"
                            name="escola"
                            required
                        >
                    </div>

                </div>
            `
        },

        // SEÇÃO 2 — COMO VOCÊ APRENDE MELHOR
        {
            title: "Como Você Aprende Melhor",

            render: () => `

                ${question(
                    "2.",
                    "Quando você está aprendendo algo novo, o que mais ajuda?",
                    "novo",
                    [
                        "Ver imagens, gráficos ou mapas mentais.",
                        "Ouvir uma explicação.",
                        "Ler textos e fazer anotações.",
                        "Fazer exercícios e colocar a mão na massa."
                    ]
                )}

                ${question(
                    "3.",
                    "Em uma aula, você aprende mais quando:",
                    "aula",
                    [
                        "O professor usa slides e imagens.",
                        "O professor explica falando.",
                        "Você acompanha por um livro ou apostila.",
                        "Você faz atividades durante a aula."
                    ]
                )}

                ${question(
                    "4.",
                    "Quando precisa lembrar de um conteúdo, você normalmente:",
                    "lembrar",
                    [
                        "Lembra das imagens ou cores.",
                        "Lembra do que ouviu.",
                        "Lembra do que escreveu.",
                        "Lembra da prática ou de um exercício."
                    ]
                )}

                ${question(
                    "5.",
                    "Você aprende melhor quando o professor:",
                    "professor",
                    [
                        "Explica passo a passo.",
                        "Faz demonstrações.",
                        "Conta histórias.",
                        "Faz perguntas.",
                        "Passa exercícios."
                    ]
                )}

                ${question(
                    "6.",
                    "Você aprende melhor quando:",
                    "estrutura",
                    [
                        "Existe bastante interação.",
                        "O conteúdo é curto e objetivo.",
                        "O conteúdo é bem detalhado.",
                        "Há exemplos práticos."
                    ]
                )}

                ${question(
                    "7.",
                    "Você prefere conteúdos:",
                    "preferenciaConteudo",
                    [
                        "Curtos e objetivos.",
                        "Detalhados.",
                        "Divididos em pequenas partes.",
                        "Com muitos exemplos."
                    ]
                )}

            `
        },

        // SEÇÃO 3 — FORMATOS PREFERIDOS
        {
            title: "Formatos Preferidos",

            render: () => `
                <div class="question-block">

                    <h3>
                        <span class="qnum">8.</span>
                        Como você aprende melhor?
                    </h3>

                    <p class="muted small">
                        Selecione uma ou mais opções.
                    </p>

                    ${checkbox("formats", [
                        "Lendo textos",
                        "Vídeos",
                        "Áudios",
                        "Resumos",
                        "Mapas Mentais",
                        "Infográficos",
                        "Exercícios",
                        "Flashcards"
                    ])}

                </div>
            `
        },

        // SEÇÃO 4 — HORÁRIO DE ESTUDO
        {
            title: "Horário de Estudo",

            render: () => question(
                "9.",
                "Qual é o melhor horário para estudar?",
                "horario",
                [
                    "Manhã",
                    "Tarde",
                    "Noite"
                ]
            )
        },

        // SEÇÃO 5 — TEMPO DE CONCENTRAÇÃO
        {
            title: "Tempo de Concentração",

            render: () => question(
                "10.",
                "Por quanto tempo você costuma manter a concentração?",
                "concentracao",
                [
                    "Menos de 15 minutos",
                    "15 a 30 minutos",
                    "30 a 60 minutos",
                    "Mais de 1 hora"
                ]
            )
        },

        // SEÇÃO 6 — NECESSIDADES EDUCACIONAIS
        {
            title: "Necessidades Educacionais",

            render: () => `
                <div class="question-block">

                    <h3>
                        <span class="qnum">11.</span>
                        Selecione as necessidades educacionais
                        que se aplicam.
                    </h3>

                    ${checkbox("necessidades", [
                        "TDAH",
                        "TEA",
                        "Dislexia",
                        "Discalculia",
                        "Baixa visão",
                        "Deficiência auditiva",
                        "Nenhuma",
                        "Outro"
                    ])}

                    <input
                        class="input"
                        name="necessidadeOutra"
                        placeholder="Descreva outra necessidade"
                        style="margin-top: 10px"
                    >

                </div>
            `
        },

        // SEÇÃO 7 — PREFERÊNCIA DE EXPLICAÇÃO
        {
            title: "Preferência de Explicação",

            render: () => `
                <div class="question-block">

                    <h3>
                        <span class="qnum">12.</span>
                        Como você prefere as explicações?
                    </h3>

                    ${checkbox("explicacoes", [
                        "Objetivas",
                        "Detalhadas",
                        "Passo a passo",
                        "Com exemplos",
                        "Com imagens"
                    ])}

                </div>
            `
        },

        // SEÇÃO 8 — CONTEÚDO E AVALIAÇÃO
        {
            title: "Conteúdo e Avaliação",

            render: () => `

                ${question(
                    "13.",
                    "Qual tamanho de conteúdo você prefere?",
                    "tamanho",
                    [
                        "Curto",
                        "Médio",
                        "Longo"
                    ]
                )}

                ${question(
                    "14.",
                    "Qual forma de avaliação você prefere?",
                    "avaliacao",
                    [
                        "Questões objetivas",
                        "Questões discursivas",
                        "Exercícios",
                        "Flashcards",
                        "Quiz"
                    ]
                )}

            `
        },

        // SEÇÃO 9 — REVISÃO E FINALIZAÇÃO
        {
            title: "Revisão e Finalização",

            render: () => `
                <div class="completion">

                    <div class="success-ring">✓</div>

                    <h2>Seu perfil está quase pronto!</h2>

                    <p>
                        Revise suas escolhas e conclua o perfil.
                        Você poderá editar essas informações
                        posteriormente no seu perfil.
                    </p>

                    <div
                        id="reviewAnswers"
                        class="card"
                        style="text-align: left; padding: 18px"
                    ></div>

                </div>
            `
        }

    ];

    // ==========================================
    // 4. CARREGAR RESPOSTAS SALVAS
    // ==========================================

    function readDraft() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(key) || "{}"
            );

            answers = (
                saved &&
                typeof saved === "object" &&
                !Array.isArray(saved)
            ) ? saved : {};

        } catch (error) {
            answers = {};
        }
    }

    // ==========================================
    // 5. COLETAR E SALVAR AS RESPOSTAS
    // ==========================================

    function collect() {

        const form = document.querySelector(
            "#questionnaireForm"
        );

        if (!form) {
            return;
        }

        // Limpa apenas os campos múltiplos
        // presentes na seção atual.
        camposMultiplos.forEach(function (campo) {

            const existeNaPagina = form.querySelector(
                `[name="${campo}"]`
            );

            if (existeNaPagina) {
                answers[campo] = [];
            }

        });

        // Captura as respostas do formulário.
        const fd = new FormData(form);

        for (const [nome, valor] of fd) {

            if (camposMultiplos.includes(nome)) {

                // Múltiplas respostas.
                if (!Array.isArray(answers[nome])) {
                    answers[nome] = [];
                }

                if (!answers[nome].includes(valor)) {
                    answers[nome].push(valor);
                }

            } else {

                // Resposta única ou texto digitado.
                answers[nome] = valor;

            }
        }

        // Guarda o progresso no navegador.
        localStorage.setItem(
            key,
            JSON.stringify(answers)
        );
    }

    // ==========================================
    // 6. RESTAURAR RESPOSTAS AO VOLTAR
    // ==========================================

    function restore() {

        const form = document.querySelector(
            "#questionnaireForm"
        );

        if (!form) {
            return;
        }

        Object.entries(answers).forEach(
            function ([name, value]) {

                const fields = [
                    ...form.querySelectorAll(
                        `[name="${name}"]`
                    )
                ];

                fields.forEach(function (field) {

                    if (field.type === "radio") {

                        field.checked =
                            field.value === value;

                    } else if (field.type === "checkbox") {

                        field.checked =
                            Array.isArray(value) &&
                            value.includes(field.value);

                    } else {

                        field.value = value ?? "";

                    }

                });

            }
        );
    }

    // ==========================================
    // 7. VALIDAR RESPOSTAS
    // ==========================================

    function validate() {

        const form = document.querySelector(
            "#questionnaireForm"
        );

        if (!form) {
            return false;
        }

        // Verifica os campos obrigatórios.
        if (!form.checkValidity()) {

            form.reportValidity();
            return false;

        }

        // Seção 3: exige ao menos um formato.
        if (
            current === 2 &&
            !form.querySelector(
                '[name="formats"]:checked'
            )
        ) {

            showToast(
                "Selecione ao menos um formato de aprendizagem.",
                "error"
            );

            return false;
        }

        return true;
    }

    // ==========================================
    // 8. PROTEGER TEXTO DA REVISÃO
    // ==========================================

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // ==========================================
    // 9. EXIBIR REVISÃO DAS RESPOSTAS
    // ==========================================

    function renderReview() {

        const review = document.querySelector(
            "#reviewAnswers"
        );

        if (!review) {
            return;
        }

        const respostasValidas = Object.entries(answers)
            .filter(function ([, value]) {

                if (Array.isArray(value)) {
                    return value.length > 0;
                }

                return value !== null &&
                    value !== undefined &&
                    String(value).trim() !== "";
            });

        if (respostasValidas.length === 0) {

            review.innerHTML = `
                <p class="muted">
                    As respostas aparecerão aqui.
                </p>
            `;

            return;
        }

        review.innerHTML = respostasValidas
            .map(function ([nome, valor]) {

                const titulo = nome.replace(
                    /([A-Z])/g,
                    " $1"
                );

                const resposta = Array.isArray(valor)
                    ? valor.join(", ")
                    : valor;

                return `
                    <p style="margin-bottom: 8px">
                        <strong>${escapeHTML(titulo)}:</strong>
                        ${escapeHTML(resposta)}
                    </p>
                `;

            })
            .join("");
    }

    // ==========================================
    // 10. RENDERIZAR SEÇÕES
    // ==========================================

    function render() {

        const host = document.querySelector(
            "#questionnaireStep"
        );

        if (!host) {
            return;
        }

        const step = steps[current];

        // Monta a seção atual.
        host.innerHTML = `

            <div class="question-section-title">

                <span class="step-number">
                    ${current + 1}
                </span>

                <strong>${step.title}</strong>

            </div>

            ${step.render()}

            <div class="question-nav">

                <button
                    class="btn btn-light"
                    type="button"
                    id="prevStep"
                    ${current === 0 ? "disabled" : ""}
                >
                    ‹ Anterior
                </button>

                <button
                    class="btn btn-primary"
                    type="button"
                    id="nextStep"
                >
                    ${
                        current === steps.length - 1
                            ? "Concluir Perfil"
                            : "Próxima ›"
                    }
                </button>

            </div>
        `;

        // Atualiza o indicador de progresso.
        const progresso = (
            (current + 1) / steps.length
        ) * 100;

        document.querySelector("#stepLabel").textContent =
            `Seção ${current + 1} de ${steps.length}`;

        document.querySelector("#stepPercent").textContent =
            `${Math.round(progresso)}% concluído`;

        document.querySelector("#stepBar").style.width =
            `${progresso}%`;

        // Recupera respostas da seção atual.
        restore();

        // Exibe revisão na última seção.
        if (current === steps.length - 1) {
            renderReview();
        }

        // ======================================
        // BOTÃO ANTERIOR
        // ======================================

        document.querySelector("#prevStep").onclick =
            function () {

                collect();

                if (current > 0) {
                    current--;
                }

                render();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            };

        // ======================================
        // BOTÃO PRÓXIMA / CONCLUIR
        // ======================================

        document.querySelector("#nextStep").onclick =
            async function () {

                if (!validate()) {
                    return;
                }

                collect();

                // FINALIZAÇÃO DO QUESTIONÁRIO
                if (current === steps.length - 1) {

                    const btn = document.querySelector(
                        "#nextStep"
                    );

                    btn.disabled = true;

                    try {

                        // Envia respostas para o backend.
                        await AdaptAuth.completeQuestionnaire(
                            answers
                        );

                    } catch (error) {

                        btn.disabled = false;

                        showToast(
                            error.message ||
                            "Não foi possível salvar o perfil.",
                            "error"
                        );

                        return;
                    }

                    // Apaga o rascunho somente
                    // depois de salvar com sucesso.
                    localStorage.removeItem(key);

                    host.innerHTML = `

                        <div class="completion">

                            <div class="success-ring">
                                ✓
                            </div>

                            <h2>
                                Perfil de aprendizagem
                                concluído com sucesso!
                            </h2>

                            <p>
                                Agora nossa IA poderá adaptar
                                os conteúdos enviados pelos seus
                                professores de acordo com suas
                                necessidades e preferências.
                            </p>

                            <button
                                class="btn btn-primary"
                                type="button"
                                id="goDashboard"
                            >
                                Ir para o Dashboard
                            </button>

                        </div>
                    `;

                    // Acessar o painel do aluno.
                    document.querySelector(
                        "#goDashboard"
                    ).onclick = function () {

                        AdaptAuth.goToDashboard();

                    };

                    return;
                }

                // Avança para a próxima seção.
                current++;

                render();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            };
    }

    // ==========================================
    // 11. INICIALIZAR QUESTIONÁRIO
    // ==========================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const questionario = document.querySelector(
                "#questionnaireStep"
            );

            if (!questionario) {
                return;
            }

            readDraft();
            render();
        }
    );

})();

