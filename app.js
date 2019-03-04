const http = require('http');
const _ = require('lodash');
const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    const result = _.indexOf([1, 2, 3, 2], 3);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Hello World${ result }</h1>`);
});
server.listen(port, () => {
    console.log(`Server running at port ` + port);
});
