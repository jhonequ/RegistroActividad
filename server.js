import Express from 'express'
import Path, { resolve } from 'path'
import bodyParse from 'body-parser'

import { insert_RegistroActividad, consult_Activities, consult_ActivitybyParameter } from './dbs.js'

const app = Express();
const dir_root = Path.resolve();

app.use(Express.static("FrontEnd/dist/registro-actividades/browser"))
//app.use(Express.json());
app.use(Express.urlencoded({}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', '*')
    next()
})

app.use(bodyParse.json())

app.listen('8080', function () {
    console.log("Server has started");
});

app.get('/', function (req, res) {
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
});

app.get("/Login", (req, res) => {
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
})

app.get("/registro-actividad", (req, res) => {
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
})

app.post("/registro_actividad", (req, res) => {
    let { titulo, horas, descripcion, personas, estado, fechainicial, fechafinal } = req.body
    insert_RegistroActividad(titulo, horas, descripcion, personas, estado, fechainicial, fechafinal)

    res.redirect("/")
})

app.get("/consulta_actividades", (req, res) => {
    try {

        consult_Activities().then(response => {
            if (response.length > 0) {
                res.status(200).json(JSON.parse(response))
            } else {
                res.status(400).json('No hay registros')
            }

            return response;
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al consultar actividades"); // Manejar error
    }
})

app.post("/consulta_actividadesPorParametro", (req, res) => {
    try {
        let instructionSql = "select id_actividad,titulo,horas_trabajadas,descripcion,personas,estado,fecha_inicio,fecha_fin from registro_actividades where "
        let { id, estado } = req.body

        if (id > 0) {
            instructionSql += "id_actividad = " + id + ";"
        }
        else if (estado != '') {
            instructionSql += "estado = '" + estado + "';"
        }
        else{
            res.status(400).json('Los registros ingresados son erroneos')
        }

        consult_ActivitybyParameter(instructionSql).then(response => {
            if (response.length > 0) {
                res.status(200).json(JSON.parse(response))
            } else {
                res.status(400).json('No hay registros')
            }
            return response;
        })

        /*
                consult_Activities().then(response => {
                    if (response.length > 0){
                        res.status(200).json(JSON.parse(response))
                    }else{
                        res.status(400).json('No hay registros')
                    }
        
                    return response;
                })*/
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al consultar actividades"); // Manejar error
    }
})

