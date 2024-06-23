import Mysql from 'mysql'

let connection = Mysql.createConnection({
    host:"db-instancia.cny42qou81q6.us-east-1.rds.amazonaws.com",
    database:"BD_RegistroActividad",
    user:"johanna",
    password:"hola1234"
})

connection.connect(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Connected to the database")
    }
})

export function insert_RegistroActividad(titulo,horas,descripcion,personas,estado,fechainicial,fechafinal){
    let instructionSql = "insert into registro_actividades (titulo,horas_trabajadas,personas,estado,fecha_inicio,fecha_fin,descripcion) values ('"+titulo+"'," +
    horas + ", '"+personas + "', '"+estado + "','"+fechainicial+"','"+fechafinal+"','"+descripcion + "')"
    
    connection.query(instructionSql, function(err,result){
        if(err){
            console.log("Error "+ err)
        }
        else{
            console.log("Actividad registrada")
        }
    })
    
}