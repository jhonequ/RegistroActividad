import Express from 'express'
import Path from 'path'

const app = Express();
const dir_root = Path.resolve();

app.use(Express.static("FrontEnd/dist/registro-actividades/browser"))
app.use(Express.json());
app.use(Express.urlencoded({}));



app.listen('8000',function(){
    console.log("Server has started");
});

app.get('/',function(req,res){
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
});

app.get("/Login", (req,res)=>{
    res.sendFile(dir_root + "/FrontEnd/dist/registro-actividades/browser/index.html");
})