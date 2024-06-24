import Mysql from 'mysql'

let connection = Mysql.createConnection({
    host: "db-instancia.cny42qou81q6.us-east-1.rds.amazonaws.com",
    database: "BD_RegistroActividad",
    user: "johanna",
    password: "hola1234"
})

connection.connect(function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected to the database")
    }
})

export function insert_RegistroActividad(titulo, horas, descripcion, personas, estado, fechainicial, fechafinal) {
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

export async function consult_Activities() {
    const instructionSql = "select id_actividad,titulo,horas_trabajadas,descripcion,personas,estado,fecha_inicio,fecha_fin from registro_actividades"

    try {
        const resultado = await connection.query(instructionSql, function (err, result) {
                if (err) {
                    console.log("Error " + err)
                }

                const actividadesJSON = result.map((actividad) => {
                    return {
                        id_actividad: actividad.id_actividad,
                        titulo: actividad.titulo,
                        horas_trabajadas: actividad.horas_trabajadas,
                        descripcion: actividad.descripcion,
                        personas: actividad.personas,
                        estado: actividad.estado,
                        fecha_inicio: new Date(actividad.fecha_inicio).toLocaleDateString(), // Formatear fecha
                        fecha_fin: new Date(actividad.fecha_fin).toLocaleDateString(), // Formatear fecha
                    }
                })
                //console.log(actividadesJSON)
                return actividadesJSON
            })
    } catch (error) {
        console.error(error);
        throw error; // Propagar el error
    }
}