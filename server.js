const http = require("http"); // Módulo com os métodos HTTP

// Função que cria o servidor
http.createServer((request, response) => {
    // Status da requisição e o Tipo de retorno
    response.writeHead(200, { 'Content-Type': 'application/json' });
    
    if(request.url === "/"){
        response.end(JSON.stringify({
            mensagem: "Rota padrão",
        }));
    }

    if(request.url === "/produto"){
        response.end(JSON.stringify({
            mensagem: "Rota de produto",
        }));
    }

    if(request.url === "/usuario"){
        response.end(JSON.stringify({
            mensagem: "Rota do usuário",
        }));
    }

}).listen(4001, () => console.log("O servidor está rodando na porta 4001")); // Define a porta em que o servidor ficará ouvindo
