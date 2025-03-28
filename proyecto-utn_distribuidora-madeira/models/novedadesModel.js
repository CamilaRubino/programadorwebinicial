var pool = require('./bd');

/*funcion asincronica*/
async function getNovedades() {    
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;

}

async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
    
}

//abre insert*
async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";  //cual es la consulta de la base de datos
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    } //cierra catch    
} //cierra insert*

//traigo los datos para modificar una sola novedad
async function getNovedadById(id) {    
    var query = 'select * from novedades where id=? ';
    var rows = await pool.query(query, [id]);
    return rows [0];
}

//abre modificar*
async function modificarNovedadById(obj, id) {
    try {
        var query = "update novedades set ? where id=?"; 
        var rows = await pool.query(query, [obj, id])
        return rows;
    } catch (error) {        
        throw error;
    } //cierra catch    
} //cierra modificar*

async function buscarNovedades(busqueda) {
    var query = "select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;    
}


module.exports = { getNovedades, deleteNovedadesById, insertNovedad, getNovedadById, modificarNovedadById, buscarNovedades }