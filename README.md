# Loja de Produtos - Aplicativo Front-end Angular

Este é um aplicativo de exemplo de e-commerce construído com Angular, simulando uma loja de produtos. Ele consome dados de uma API externa para listar produtos, gerenciar um carrinho de compras e simular pedidos.

## Funcionalidades

*   **Listagem de Produtos:** Exibe uma lista de produtos disponíveis, com detalhes como nome, preço, descrição e imagem.
*   **Detalhes do Produto:** Visualização detalhada de cada produto.
*   **Carrinho de Compras:** Adicione, remova e ajuste a quantidade de itens no carrinho.
*   **Notificações Toast:** Mensagens de feedback visuais para ações do usuário (ex: "Produto adicionado ao carrinho", "Item removido do carrinho", "Novo produto criado com sucesso").
*   **Formulário de Produto:** Adiciona novos produtos (simulado via API).
*   **Página de Login:** Simulação de autenticação.
*   **Meus Pedidos:** Visualização de pedidos (funcionalidade em desenvolvimento/simulada).
*   **Página de Contato:** Formulário de contato (funcionalidade em desenvolvimento/simulada).

## Tecnologias Utilizadas

*   Angular (v17+)
*   TypeScript
*   SCSS
*   RxJS (para gerenciamento de estado assíncrono)
*   Angular HttpClient (para comunicação com a API)
*   Node v20.19.5

## Configuração e Instalação

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/loja-produtos-app.git
    cd loja-produtos-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o aplicativo:**
    ```bash
    npm run start
    ```
    O aplicativo estará disponível em `http://localhost:4200/`.

## Informações sobre a API Externa (Fake Store API)

Este aplicativo utiliza a [Fake Store API](https://fakestoreapi.com/) para simular operações de e-commerce. É **importante notar** que esta é uma API para fins de prototipagem e testes.

**Limitação de Persistência:**
Alguns métodos HTTP, como `POST` (para adicionar novos produtos), `PUT` (para atualizar produtos) e `DELETE` (para excluir produtos), **não persistem as alterações no "banco de dados" real** da Fake Store API. Isso significa que, embora a API retorne um sucesso e os dados pareçam ser manipulados no front-end, essas alterações não serão armazenadas permanentemente na API. Ao recarregar a página ou fazer novas requisições, você verá os dados originais da API.

Esta limitação é esperada para uma API de testes e prototipagem e não afeta a funcionalidade do front-end em simular as interações.

## Notificações Toast

O aplicativo agora inclui notificações "toast" para fornecer feedback imediato ao usuário sobre ações importantes:

*   **"Novo produto criado com sucesso!"**: Exibido após a tentativa de adicionar um novo produto.
*   **"Item removido do carrinho."**: Exibido quando um item é retirado do carrinho de compras.

## Estrutura do Projeto (Resumida)

```
src/
├── app/
│   ├── carrinho/             # Componentes e serviços relacionados ao carrinho de compras
│   ├── contato/              # Componentes da página de contato
│   ├── login/                # Componentes da página de login
│   ├── pedidos/              # Componentes e serviços relacionados a pedidos
│   ├── produtos/             # Componentes e serviços relacionados a produtos
│   ├── styles/               # Estilos globais e variáveis SCSS
│   ├── app.component.ts      # Componente raiz
│   ├── app.config.ts         # Configuração da aplicação
│   ├── app.routes.ts         # Rotas da aplicação
│   ├── toast-container.component.ts # Container para as notificações toast
│   ├── toast.model.ts        # Modelo de dados para notificações toast
│   └── toast.service.ts      # Serviço para gerenciar notificações toast
├── assets/
│   └── imgs/                 # Imagens e outros recursos estáticos (ex: logo.png)
└── main.ts                   # Ponto de entrada da aplicação
└── index.html                # Página HTML principal
└── styles.scss               # Estilos globais
```
