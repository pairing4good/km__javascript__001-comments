const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the first-item grid area', () => {
    it('should be named header', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.first-item.*{[\s\S][^}]*grid-area.*:.*header.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the second-item grid area', () => {
    it('should be named leftNav', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.second-item.*{[\s\S][^}]*grid-area.*:.*leftNav.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the third-item grid area', () => {
    it('should be named main', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.third-item.*{[\s\S][^}]*grid-area.*:.*main.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should be displayed as a grid', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.grid-container.*{[\s\S][^}]*display.*:.*grid.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a 10px gap', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.grid-container.*{[\s\S][^}]*gap.*:.*10px.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a left navigation bar that extends vertially across the first and second row of the grid', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match( /\.grid-container.*{[\s\S][^}]*display:.*grid.*;[\s\S][^}]*grid-template-areas.*:[\s\S][^}]*'leftNav.*'[\s\S][^}]*'leftNav.*'.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a header that extends horizontally across the top row', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match( /\.grid-container.*{[\s\S][^}]*display:.*grid.*;[\s\S][^}]*grid-template-areas.*:[\s\S][^}]*'leftNav header/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a header that is twice the width of the left navigation bar', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match( /\.grid-container.*{[\s\S][^}]*display:.*grid.*;[\s\S][^}]*grid-template-areas.*:[\s\S][^}]*'leftNav header header'/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a main section that extends horizontally across the second row', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match( /\.grid-container.*{[\s\S][^}]*display:.*grid.*;[\s\S][^}]*grid-template-areas.*:[\s\S][^}]*'leftNav header header'[\s\S]*'leftNav main/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});

describe('the grid-container grid area', () => {
    it('should have a main section that is twice the width of the left navigation bar', async () => {
      const matches = await page.$eval('style', (style) => {
        return style.innerHTML.match( /\.grid-container.*{[\s\S][^}]*display:.*grid.*;[\s\S][^}]*grid-template-areas.*:[\s\S][^}]*'leftNav header header'[\s\S][^}]*'leftNav main main'.*;/g).length;
      });
      
      expect(matches).toEqual(1);
    });
});