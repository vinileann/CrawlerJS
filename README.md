# CrawlerJS
# Web Scraping based on Puppeteer JS
Crawler para o site Mega Leilões, buscar imóveis ou itens diversos;
Em imovel.js já foi feita a conexão com o banco de dados mySQL;
- Preferencialmente rodar localmente com XAMPP. Segue o banco de dados nos arquivos para fazer teste; Trocar no arquivo conexao.php as credenciais do seu banco de dados local;
- Banco SQL é o phpMyAdmin, criar uma tabela chamada leiloes como seguinte comando:

CREATE TABLE leiloes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    imgs JSON,
    status VARCHAR(50),
    priceI VARCHAR(50),
    priceA VARCHAR(50),
    diaIF VARCHAR(50),
    incremento VARCHAR(50),
    local VARCHAR(255),
    leiloeiro VARCHAR(255),
    descricao TEXT,
    link VARCHAR(255)
);

Node.js v18.19.1 => "npm i para instalar dependências"
