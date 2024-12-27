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

            const title =       await page.$eval('.wrap.main-info > h1', element => element.innerText);
            const imgs =        await page.$$eval('.owl-stage > .owl-item > div > img', element => element.map(img => img.src));
            const status =      await page.$eval('.instance-text', element => element.innerText);
            const priceI =      await page.$eval('.col-sm-4.col-md-3.price.hidden-phone > .wrap > .value', element => element.innerText);
            const priceA =      await page.$eval('.last-bid > .value', element => element.innerText);
            const diaIF =       await page.$$eval('.row-2 > .instance.active > .card-first-instance-date', element => element.innerText);
            const incremento =  await page.$eval('.increment > .value', element => element.innerText);
            const local =       await page.$eval('.locality.item > .value', element => element.innerText);
            const leiloeiro =   await page.$eval('.author.item > .value', element => element.innerText);
            const descricao =   await page.$eval('#tab-description > .content', element => element.innerText);

            const obj = {};
            obj.title = title;
            obj.imgs = imgs;
            obj.status = status;
            obj.priceI = priceI;
            obj.priceA = priceA;
            obj.diaIF = diaIF;
            obj.incremento = incremento;
            obj.local = local;
            obj.leiloeiro = leiloeiro;
            obj.descricao = descricao;
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