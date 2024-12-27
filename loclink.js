const pup = require('puppeteer');

const url = "https://www.megaleiloes.com.br/";
const searchFor = "casa goiânia";
let c = 1;
const list = [];

(async () => {
    const browser = await pup.launch({headless: false});
    const page = await browser.newPage();
    console.log('Iniciei o browser!');

    await page.goto(url);
    console.log('Fui pra URL!');
    await page.waitForSelector('#q')

    await page.type('#q', searchFor);

    await Promise.all([
        page.waitForNavigation(),
        page.click('.search-btn')
    ])

    console.log('Pesquisei e dei enter na busca!');
    console.log('Carregamento completo. Buscando links...');

    const links = await page.$$eval('.card.open > a , .card.finalized > a', el => el.map(link => link.href));
    console.log(`Foram encontrados ${links.length} leilões na página.`);

    for(const link of links)
    {
        try
        {
            console.log('Leilão', c);
            await page.goto(link);
            await page.waitForSelector('.wrap.main-info');

            const title = await page.$eval('.wrap.main-info > h1', element => element.innerText);
            const local = await page.$eval('.locality.item > .value', element => element.innerText);

            const obj = {};
            obj.title = title;
            obj.local = local;
            obj.link = link;

            list.push(obj);
            console.log(`Leilão ${c} processado com sucesso!`);
        }
        catch (err) {
            console.error(`Erro no leilão ${c} (${link}): ${err.message}`);
        }
        finally {
            c++; // Incrementa o contador mesmo que tenha erro
        }
    }
    console.log(list);

    //await page.waitForTimeout(10000);
    await browser.close();
})();