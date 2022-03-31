const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//conceccion
let connection = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	database: 'db',
});

// conect //revisar errores
connection.connect(function (error) {
	if (error) throw 'error de conexion a la base de datos' + error;
});

//rutas
app.get('/sucursal', (req, res) => {
    let dia = new Date().toISOString().slice(0,10).replace('T', ' ');
    
	let query ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '1' AND DATE(hora_dia) = ?  ";
    let query2 ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '0' AND DATE(hora_dia) = ? ";
    let query3 = "SELECT capacidad_personas FROM sucursal";
    connection.query(query3,function (err, rows3, fields) {
        connection.query(query,[dia],function (err, rows1, fields) {
            connection.query(query2,[dia], function (err, rows2, fields) {
                if (err) throw err;
                let cantidad = rows1[0]['COUNT(*)'] - rows2[0]['COUNT(*)'];
                res.render("sucursal.ejs", {
                    title: "Eventos",
                    data: [cantidad,rows3[0]['capacidad_personas']]
                });
            });
        });
    });
});

app.get('/visitante', (req, res) => {
    let dia = new Date().toISOString().slice(0,10).replace('T', ' ');
    
	let query ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '1' AND DATE(hora_dia) = ?  ";
    let query2 ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '0' AND DATE(hora_dia) = ? ";
    let query3 = "SELECT capacidad_personas FROM sucursal";
    connection.query(query3,function (err, rows3, fields) {
        connection.query(query,[dia],function (err, rows1, fields) {
            connection.query(query2,[dia], function (err, rows2, fields) {
                if (err) throw err;
                let cantidad =  rows1[0]['COUNT(*)'] - rows2[0]['COUNT(*)'];
                res.render("visitante.ejs", {
                    title: "Eventos",
                    data: [cantidad,rows3[0]['capacidad_personas']]
                });
            });
        });
    });
});

app.get('/entrar', (req,res) => {
    let dia = new Date().toISOString().slice(0,10).replace('T', ' ');
	let query ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '1' AND DATE(hora_dia) = ?  ";
    let query2 ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '0' AND DATE(hora_dia) = ? ";
    let query3 = "SELECT capacidad_personas FROM sucursal";
    connection.query(query3,function (err, rows3, fields) {
        connection.query(query,[dia],function (err, rows1, fields) {
            connection.query(query2,[dia], function (err, rows2, fields) {
                if (err) throw err;
                let cantidad =  rows1[0]['COUNT(*)'] - rows2[0]['COUNT(*)'];
                if (cantidad < rows3[0]['capacidad_personas']) { //para que no puedan seguir ingresando si ya esta el maximo de personas
                    console.log(cantidad)
                    let dia2 = new Date().toISOString().slice(0,19).replace('T', ' ');
                    let query4 = "INSERT INTO evento(hora_dia,tipo_evento,nombre_sucursal) VALUES (?,1,'frabega')";
                    connection.query(query4,[dia2], function (err, rows2, fields) {
                        if (err) throw err;
                        res.send(true);
                    });
                }
                else{
                    res.send(false);
                }
            });
        });
    });
});


app.get("/salir" , (req,res) =>{
    let dia = new Date().toISOString().slice(0,10).replace('T', ' ');
	let query ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '1' AND DATE(hora_dia) = ?  ";
    let query2 ="SELECT COUNT(*) FROM evento WHERE tipo_evento = '0' AND DATE(hora_dia) = ? ";
    let query3 = "SELECT capacidad_personas FROM sucursal";
    connection.query(query3,function (err, rows3, fields) {
        connection.query(query,[dia],function (err, rows1, fields) {
            connection.query(query2,[dia], function (err, rows2, fields) {
                if (err) throw err;
                let cantidad =  rows1[0]['COUNT(*)'] - rows2[0]['COUNT(*)'];
                if (cantidad > 0) { //para que no puedan seguir ingresando si ya esta el maximo de personas
                    query4 = "DELETE FROM evento LIMIT 1 ;"
                    connection.query(query4,(error, rows, fields) => {
                        res.send(true);
                        })
                }
                else{
                    res.send(false);
                }
            });
        });
    });
});

//





app.use((req, res, next) => { //para cuando quieren entrar a una ruta que no existe
    res.status(404).render("404");
});


app.listen(3001); //se ejecuta en ese puerto
console.log('Servidor corriendo en el puerto 3001');
