
const http = require('http');
const url = require('url');

const colors = [
    { variant: "Vermillion", hex: "#2E191B" },
    { variant: "Forest", hex: "#0B6623" },
    { variant: "Navy", hex: "#000080" },
    { variant: "Crimson", hex: "#DC143C" },
    { variant: "Sky Blue", hex: "#87CEEB" },
    { variant: "Lime", hex: "#00FF00" },
    { variant: "Gold", hex: "#FFD700" },
    { variant: "Lavender", hex: "#E6E6FA" },
    { variant: "Tangerine", hex: "#F28500" },
    { variant: "Magenta", hex: "#FF00FF" },
    { variant: "Cyan", hex: "#00FFFF" },
    { variant: "Olive", hex: "#808000" },
    { variant: "Teal", hex: "#008080" },
    { variant: "Maroon", hex: "#800000" },
    { variant: "Coral", hex: "#FF7F50" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    console.log('server path: ' + path);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (path === '/color') {

        let selectedColor;

        if (query.variant) {
            selectedColor = colors.find(c => c.variant.toLowerCase() === query.variant.toLowerCase());
        }

        if (!selectedColor){
            selectedColor = colors[Math.floor(Math.random() * colors.length)];
        }
        // const randomColor = colors[Math.floor(Math.random() * colors.length)];

        res.writeHead(200, 'Content-Type', 'text/html; charset=utf-8');
    
        res.write(`<p style="color:${selectedColor.hex}">${selectedColor.hex}</p>`);
        res.end();
        return; /**Evitem que el codi de sota continuï executant-se */
    } else if (path === '/get-colors'){
        let colorList = [];
        colorList = colors.map(e => e.variant);
        console.log(colorList);
        res.write(`<h1>Colores disponibles</h1>`)
        res.write(`<ul>`);
        colorList.forEach(variant => {
            res.write(`<li>${variant}</li>`)
        });
        res.write(`</ul>`);
        res.end();
        return;
    }


    res.write('<h1> Bienvenidos a la base de datos de colores de NetMind! </h1>');
    res.write('<p> Para obtener un color aleatorio, haz una petición GET al endpoint <strong>/color</strong> .</p>');
    res.write('<p> Para obtener un color específico, usa el parámetro de consulta <b>?variant=[color]</b> (por ejemplo, <b>?variant=[Vermillion]</b>). </p>');


});

server.listen(3400, () => {
    console.log("Listening to requests for 3400 port");
})

// node --watch app.js per executar en temps real