const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    } else{
        products = JSON.parse(data);
    }
});

/**
 * POST => Insere dados
 * GET => Busca dados
 * PUT => Atualiza dados
 * DELETE => Remove um dado
*/

/**
 * Body => é onde enviamos informações na requisição
 * Params => ex: /products/124
 * Query => ex: /product?id=124131
 */

app.post("/products", (req, res) => {
    // Dados = nome e preço
    const { name, price } = req.body;

    const product = {
        id: randomUUID(),
        name,
        price,
    };

    products.push(product);

    productFile("products.json", products)

    return res.json(product);
});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);

    return res.json(product);
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };

    productFile("products.json", products)

    return res.json({ message: "Produto alterado com sucesso!!"});
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(product => product.id === id);
    
    products.splice(productIndex, 1);

    productFile("products.json", products)

    return res.json({ message: "Produto removido com sucesso!"})
});

function productFile(file, arr){
    fs.writeFile(file, JSON.stringify(arr), (err) => {
        if(err){
            console.log(err);
        } else {
            console.log("Produto inserido com sucesso!")
        }
    });
}

app.listen(4002, () => console.log("Servidor rodando na porta 4002."));

