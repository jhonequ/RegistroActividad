import Mysql from 'mysql'

let connection = Mysql.createConnection({
    host: "db-instancia.cny42qou81q6.us-east-1.rds.amazonaws.com",
    database: "BD_RegistroActividad",
    user: "johanna",
    password: "hola1234"
})

connection.connect(function (err) {
    if (err) {
        console.err(err.message)
    }
    else {
        console.log("Connected to the database")
    }
})

function insert_RegistroActividad(titulo, horas, descripcion, personas, estado, fechainicial, fechafinal) {
    let instructionSql = "insert into registro_actividades (titulo,horas_trabajadas,personas,estado,fecha_inicio,fecha_fin,descripcion) values ('" + titulo + "'," +
        horas + ", '" + personas + "', '" + estado + "','" + fechainicial + "','" + fechafinal + "','" + descripcion + "')"

    connection.query(instructionSql, function (err, result) {
        if (err) {
            console.log("Error " + err)
        }
        else {
            console.log("Actividad registrada")
        }
    })
}

async function consult_Activities() {
    const instructionSql = "select id_actividad,titulo,horas_trabajadas,descripcion,personas,estado,fecha_inicio,fecha_fin from registro_actividades"

    const resultado = await new Promise((resolve,reject)=>{
        connection.query(instructionSql, (err, result,fields) => {
            if (err) {
                reject(new Error("Error " + err.message))
            }
            else {
                resolve(result)
            }
        })
    }) 

    const jsonResult = JSON.stringify(resultado);

    return jsonResult;
}

async function consult_ActivitybyParameter(instructionSql) {
   const resultado = await new Promise((resolve,reject)=>{
        connection.query(instructionSql, (err, result,fields) => {
            if (err) {
                reject(new Error("Error " + err.message))
            }
            else {
                resolve(result)
            }
        })
    }) 

    const jsonResult = JSON.stringify(resultado);
    
    return jsonResult;
}

export { consult_Activities, insert_RegistroActividad,consult_ActivitybyParameter }