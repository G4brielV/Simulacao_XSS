# 🛡️ Laboratório de Segurança Web: Stored XSS e Infecção em Cadeia

Este repositório contém uma simulação de ambiente web vulnerável, desenvolvido para fins estritamente **acadêmicos e educacionais**. O objetivo é demonstrar o ciclo de vida de um ataque cibernético baseado em Web, simulando um cenário real de comprometimento de site que leva ao download de arquivos maliciosos na máquina do usuário (vítima).

## 🎯 O que este repositório faz?

O projeto simula um "Fórum de Discussão" simples em HTML/JS. A aplicação possui uma falha crítica na forma como renderiza os comentários dos usuários na tela. Ao explorar essa falha, é possível injetar códigos JavaScript arbitrários que serão executados pelo navegador de qualquer usuário que acessar a página posteriormente. 

O laboratório prova que uma simples falha no frontend/backend de um site pode ser usada como vetor (ponte) para comprometer a máquina local da vítima com malwares simulados.

## 🗂️ Estrutura de Arquivos

* `index.html`: A interface do fórum. Contém o campo de input e a rotina vulnerável que processa e exibe os comentários na tela.
* `BD.json`: Simula o banco de dados da aplicação carregando comentários inofensivos iniciais.
* `_.js`: O script malicioso principal (Payload). Quando ativado, orquestra o ataque silencioso no navegador da vítima.
* `Autorun.jar` e `home.jar`: Arquivos de texto disfarçados de executáveis Java (`.jar`). Simulam os malwares que são baixados no computador da vítima para concluir a cadeia de infecção.

---

## 🐛 A Vulnerabilidade

A aplicação sofre de **Stored XSS (Cross-Site Scripting Armazenado)**.
O erro ocorre porque o input do usuário é recebido e injetado diretamente na estrutura do DOM utilizando a propriedade `.innerHTML` sem nenhuma sanitização prévia (limpeza de caracteres especiais como `<` e `>`). 

Para fins de demonstração acadêmica e para contornar bloqueios de navegadores modernos (que impedem a execução direta de `<script>` via `innerHTML`), o código possui um laço que varre o DOM, extrai a tag injetada e a reconstrói de forma dinâmica, forçando a sua execução.

---

## 💉 Exemplos de Scripts e Exploração (Payloads)

Para interagir com o laboratório, inicie a aplicação e digite os seguintes exemplos no campo de comentários:

### 1. Prova de Conceito Básica (PoC)
Antes de lançar um ataque real, o invasor testa se o campo é vulnerável injetando um script inofensivo para exibir uma caixa de alerta.
* **Payload:** `<script>alert(1)</script>` ou `<script>alert('Fórum Vulnerável!')</script>`
* **Resultado:** O navegador da vítima executa a função nativa do JavaScript e exibe um pop-up na tela, confirmando a vulnerabilidade.

### 2. O Ataque de Infecção em Cadeia (Forced Download)
Em vez de escrever todo o código do vírus no comentário (o que chamaria atenção), o atacante insere uma tag HTML que importa um arquivo JavaScript hospedado externamente (neste caso, o `_.js`).
* **Payload:** `<script src="_.js"></script>`
* **Como o `_.js` age no navegador da vítima:**
    1. O arquivo `_.js` é baixado e executado em segundo plano.
    2. Ele lista os arquivos maliciosos alvo (`home.jar` e `Autorun.jar`).
    3. Para cada arquivo, o script cria de forma invisível uma tag HTML de link (`<a>`) com o atributo `download`.
    4. O script aciona a função `link.click()` para forçar o clique do usuário sem que ele saiba.
    5. Imediatamente, ele remove a tag invisível (`removeChild`) para apagar os rastros.
* **Resultado:** Assim que a vítima abre o fórum, os falsos malwares são baixados automaticamente para sua pasta de Downloads.

---

## 🚀 Como Executar o Laboratório

Para que a simulação de download do `_.js` e dos `.jar` funcione corretamente simulando a arquitetura web (HTTP), é necessário rodar o projeto em um servidor local, e não apenas abrindo o arquivo `index.html` com duplo-clique.

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no **Visual Studio Code (VS Code)**.
3. Instale a extensão **Live Server** (de Ritwick Dey).
4. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
5. O site abrirá no seu navegador (ex: `http://127.0.0.1:5500`). Insira os payloads no campo de texto para observar o ataque.
