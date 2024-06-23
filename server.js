import Express from 'express'
import Path from 'path'

import {insert_RegistroActividad} from './dbs.js'

const app = Express();
const dir_root = Path.resolve();

app.use(Express.static("FrontEnd/dist/registro-actividades/browser"))
app.use(Express.json());
app.use(Express.urlencoded({}));

app.listen('8080',function(){
    console.log("Server has started");
});

app.get('/',function(req,res){
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
});

app.get("/Login", (req,res)=>{
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
})

app.get("/registro-actividad", (req,res)=>{
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
})

app.post("/registro_actividad", (req,res) =>{
    //const titulo = req.body.titulo
    let {titulo,horas,descripcion,personas,estado,fechainicial,fechafinal} = req.body
    console.log(titulo)
    insert_RegistroActividad(titulo,horas,descripcion,personas,estado,fechainicial,fechafinal)
    
    res.redirect("/")
})