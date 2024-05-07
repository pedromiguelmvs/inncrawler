# InnCrawler





[![Author](https://img.shields.io/badge/author-PedroMiguel-D54F44?style=flat-square)](https://github.com/pedromiguelmvs)


> Aplicação de gerenciamento de reservas.

<br />
<p align="center"><img src="https://i.imgur.com/fkFn4m1.png" /></p>

---

# :pushpin: Indice

* [Considerações iniciais](#paintbrush-considerações-iniciais)
* [Backend: como rodar?](#runner-rodando-o-projeto)
* [Frontend: como rodar?](#runner-rodando-o-projeto)
* [Outros](#runner-rodando-o-projeto)

# :paintbrush: Considerações iniciais

Este projeto foi cuidadosamente contruido com um backend e um frontend, os dois se encontram neste mesmo repositório.
A interface do projeto foi cuidadosamente prototipada antes de ser implementada de fato, o link do projeto no Figma pode ser acessado [clicando aqui](https://www.figma.com/file/7TAUzwPNTfTjpmTqbfYiWw/inncrawler?type=design&node-id=2%3A668&mode=design&t=5GtY1Ni1Uwj7x6ut-1)

# :blue_book: Backend: como rodar?

Primeiro, você deve clonar o repositório do projeto:

```git clone https://github.com/pedromiguelmvs/inncrawler```

Após isso, dentro da pasta do `backend`, crie seu arquivo de variáveis de ambiente (só tem uma) e inclua o valor:

```cp .env.example .env ```

Preferencialmente, aponte o valor de `API_PORT` para a porta `3000`

Feito isso, instale as dependências do projeto e o servidor estará pronto para ser executado.

```npm install```

Pronto! Rode o projeto:

```npm run start:dev```

# :orange_book: Frontend: como rodar?

Primeiro, você deve clonar o repositório do projeto:

```git clone https://github.com/pedromiguelmvs/inncrawler```

Após isso, dentro da pasta `front`, instale as dependências do projeto e o servidor estará pronto para ser executado.

```npm install```

Pronto! Rode o projeto:

```npm start```

# :floppy_disk: Outros

Versão do NodeJS: `18.18.2`

Rota das collections (Postman): `backend/postman/Inncrawler.postman_collection.json`
