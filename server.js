//express
//bodyparser

//Importacion de los módulos
const express = require('express');
const bodyParser = require('body-parser');

//Inicialización
const app = express();

app.use(bodyParser.json());

//Ruta de ejemplo
// app.get('/', (req, res) => {
//     res.send("Hola mundo");
// });

//Puerto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Servidor funcionando en puerto ${PORT}`)});

//CLASE 28.03.24 - CONTINUACIÓN
//Creación de vector con frutas
let items = ['Manzana', 'Papaya', 'Pera', 'Chirimoya', 'Carambola', 'Banana'];

app.get('/', (req, res) => {
    res.send('Hola Mundo con NODEJS');
})

//endpoint 1 /rutas GET
app.get('/items', (req, res) => {
    res.status(200).json(items);
})

//endpoint 2 /rutas POST
app.post('/items', (req, res) => {
    const fruta = req.body;
    if(fruta){
        // console.log('Fruta agregada', fruta);
        items.push(fruta.item);
        res.status(200).send(`Se agrego la fruta ${fruta.item} \n La nueva lista es: ${JSON.stringify(items)}`);
    } else{
        res.status(400).send('El item es invalido');
    }
    console.log(fruta);
})


//endpoint 3 /rutas PUT
app.put('/items/:posicion', (req, res) => {
    // console.log(req.params['posicion']);
    const posicion = parseInt(req.params.posicion);
    const updatedItem = req.body.item;
    if (posicion >= 0 && posicion < items.length) {
        items[posicion] = updatedItem;
        res.status(200).send(`Se actualizó el item en la posición ${posicion}\nLa nueva lista es: ${JSON.stringify(items)} `);
    } else {            
        res.status(400).send(`Error en la operación: Item en la posición ${posicion} sin datos`);
    }
});

//endpoint 4 /rutas DELETE
app.delete('/items/:posicion', (req, res) =>{
    console.log(req.params['posicion']);
    const posicion = parseInt(req.params.posicion); 
    
    if (posicion >= 0 && posicion < items.length) {
        const deletedItem = items.splice(posicion, 1);
        res.status(200).send(`Item de la posición ${posicion} eliminado: ${deletedItem} \nLa nueva lista es: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send(`Error en la eliminación. Item en la posicion ${posicion} sin datos `);
    }
});



