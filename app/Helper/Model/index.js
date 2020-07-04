const db = require('../Db')
const mysql = require('mysql')
const Query = require('../Query')

class ModelHelper {

    // get methods

    get(table, param = {where: {}, order: {}}, fields = [],status = 200){

        /*

        get data from database
        SELECT * FROM tb_name
        or with clause

        SELECT * FROM tb_name WHERE tb_name = param

        called

        Model.get(table_name, parameter = {where: {}, order: {}}, fields = [], http_status_code)
        example
        Model.get('tb_barang', {where: {kodebarang: 39}, order: {kodebarang: "DESC"}}, ['namabarang', 'harga'], 200)
        or param and fields can be null, so the query will look like this
        Model.get(tb_user, null, null, 200)
        */

        return new Promise((resolve, reject) => {
            let query = `SELECT `
            if(fields !== null && fields.length > 0 && fields !== undefined){
                fields.forEach((items, i) => {
                    if(i >= fields.length - 1){
                        query += `${items}`
                    }else{
                        query += `${items}, `
                    }
                })
                query += ` FROM ${table}`
            }else{
                query += `* FROM ${table}`
            }

            // handling if there is paramter send by user

            if(param !== undefined && param !== null && Object.keys(param.where).length > 0){
                query += ' WHERE'
                let parseParam = Object.keys(param.where)
                parseParam.forEach((items, i) => {
                    if(parseParam.length > 1){
                        if(i >= parseParam.length - 1){
                            query += ` ${items} = ${mysql.escape(param.where[items])}`
                        }else{
                            query += ` ${items} = ${mysql.escape(param.where[items])} AND`
                        }
                    }else{
                        query += ` ${items} = ${mysql.escape(param.where[items])} `
                    }
                })
            }

            // handling if there's order

            if(param !== null && param.order !== undefined)
            {
                if(Object.keys(param.order).length > 0){
                    let order_val = Object.keys(param.order)
                    order_val.forEach((items, i) => {
                        if( i >= order_val.length - 1){
                            query += ` ORDER BY ${items} ${param.order[items]}`
                        }
                    })
                }
            }

            db.query(query, (err, data, fields) => {
                let res = ''
                if(err){
                    res = {
                        status: 400,
                        message: err,
                    }
                    reject(JSON.stringify(res))
                }else{
                    res = {
                        status: status,
                        data: data,
                    }
                    resolve(JSON.stringify(res))
                }
            })
            
        })
    }

    getLike(table, param = {where: {}, order: {}}, fields = [],status = 200){
        /*

        get data using clause
        SELECT * FROM table WHERE table_name LIKE '%abc%'

        this is the way to call this method
        Model.getLike(table_name, {where: {table_column: value}, order: {table_name: "ASC / DESC"}, fields = [], http_status_code);
        example 
        Model.getLike('tb_barang', {where : {namabarang: `%${key}%`}, order: {namabarang: "DESC"}}, null, 200)

        */
        return new Promise((resolve, reject) => {
            if(param !== null || param !== undefined && Object.keys(param.where).length > 0){
                let val = Object.keys(param.where)[0]
                let query = `SELECT `
                /* 
                check if fields is not null and not undefined and fields length > 0
                query will add fileds that added and if there is not fields will get all
                the data from databases
                */
                if(fields !== null && fields !== undefined && fields.length > 0){
                    fields.forEach((items, i) => {
                        if(i >= fields.length - 1){
                            query += `${items}`
                        }else{
                            query += `${items}, `
                        }
                    })
                    query += ` FROM ${table}`
                }else{
                    query += `* FROM ${table}`
                }
                query += ` WHERE ${val} LIKE '${param.where[val]}'`

                // handling order data
                if(param.order !== undefined && param.order !== null && Object.keys(param.order).length > 0){
                    let order_data = Object.keys(param.order)[0]
                    query += ` ORDER BY ${order_data} ${param.order[order_data]}`
                }

                // end of manipulating query

                db.query(query, (err, data, fields) => {
                    let res = ''
                    if(!err){
                        res = {
                            status: status,
                            data: data
                        }
                        resolve(JSON.stringify(res))
                    }else{
                        res = {
                            status: 500,
                            data: err
                        }
                        reject(JSON.stringify(res))
                    }
                })
            }else{
                reject({
                    status: 500,
                    data: 'provide a parameter like %word%'
                })
            }
        })
    }

    innerJoin(param = {param : {}, order: {}}, status){
        /*
        Join 2 table ( INNER JOIN )

        parameter struckture
        Model.innerJoin({param:[
            {table: table_name, fields: [column_name], identifier: table_name},
            {table: table_name, fields: [column_name], identifier: table_name}
        ]}, order: {asc/desc})
        1. first table {table: table_name, fields: ["table_fields"], identifier: table_name},
        2. second table {table: table_name, fields: ["table_fields"], identifier: table_name}

        can be called like this
        
        Model.innerJoin({ param: [
            {table: 'tb_barang', fields: ["namabarang", "harga"], identifier: "kategoribarang"},
            {table: 'tb_kategori', fields: ["namakat", "kodekat"], identifier: "namakat"}
        ]}, order: {}})
        */
        
        return new Promise((resolve, reject) => {
            let res = ''
            if(param !== null && param !== undefined && param.param !== null && param.param !== undefined && Object.keys(param.param).length > 0){
                let query = this.QueryJoin(param.param)
                if(param.order !== null && param.order !== undefined && Object.keys(param.order).length > 0){
                    let order_param = Object.keys(param.order)
                    query  += ` ORDER BY ${order_param[0]} ${param.order[order_param]}`
                }
                db.query(query, (err, data, fields) => {
                    if(err){
                        throw err
                    }else{
                        res = {
                            status: status,
                            data: data,
                        }
                        resolve(JSON.stringify(res))
                    }
                })


            }else{
                res = {
                    status: 500,
                    data: 'provide parameters'
                }
                reject(JSON.stringify(res))
            }
        })
    }

    QueryJoin(val){
        let query = 'SELECT'
        val[0].fields.forEach(items => {
            query += ` ${val[0].table}.${items},`
        })
        val[1].fields.forEach((items,i) => {
            if(i >= val[1].fields.length - 1){
            
                query += ` ${val[1].table}.${items}`
            }else{
                query += ` ${val[1].table}.${items},`
            }
        })
        query += ` FROM ${val[0].table} INNER JOIN ${val[1].table} ON ${val[0].table}.${val[0].identifier} = ${val[1].table}.${val[1].identifier}`
        return query
    }

    // post method

    insert(table = null, param = null, status){
        /* 
        this method is used for insert data to the database;
        1. table is table name that you want to use
        2. params is column name of your table if you insert data using this method
            you should follow this rules
            (table_name, {colum1: value1, column2: value2}, 200)
        3. status is http status code when the query succesfuly 
            excecuted default is 200 which means is ok

        structure:

        Model.insert(table_name, {
            column_name : value,
        }, 200)
        */
        return new Promise((resolve, reject) => {
            let res = ''
            if(param !== null && param !== undefined){
                let query = Query.CreateQuery(table, param)
                let arr_query = []
                let query_obj = Object.keys(param)
                query_obj.forEach((items, i) => {
                    arr_query.push(param[items])
                })
                // quer database
                db.query(query,arr_query,(err, data, fields) => {
                    if(err){
                        throw err
                    }else{
                        res = {status: status, data}
                        resolve(JSON.stringify(res))
                    }
                })
            }else{
                res = {
                    status: 500,
                    data: { message: 'Provide a table name and value'}
                }
                reject(res)
            }
        })
    }

    // update method

    update(table = null, param = {update: {}, identifier: {}}, status = 200){
        /*
        update data in database

        structure:
        Model.update('tb_barang', {
            update: {
                column_name: value,
            }, 
            identifier: {
                column_name: value
            }
        }, http_status_code (default is 200 which means ok no problem));

        example :
        Model.update('tb_barang', {
            update: {
                name : "Arnold"
            }, 
            identifier: {
                age: 21
            }
        }, 200);

        */
        return new Promise((resolve, reject) => {
            let res = ''
            if(param !== null && param !== undefined){
                let update_params = Object.keys(param.update)
                let identifier_params = Object.keys(param.identifier)

                // parameter can't be null or undefined

                if(param.update !== null && param.identifier !== null && param.update !== undefined && param.identifier !== undefined && update_params.length > 0 && identifier_params.length > 0){
                    let query = `UPDATE ${table} SET`
                    let arr_val = []
                    // set column name and the value
                    update_params.forEach((items, i) => {
                        arr_val.push(param.update[items])
                        if(i >= update_params.length - 1){
                            query += ` ${items} = ?`
                        }else{
                            query += ` ${items} = ?, `
                        }
                    })

                    // handling idenfier more than 1

                    identifier_params.forEach((items, i) => {
                        arr_val.push(param.identifier[items])
                        if(i >= identifier_params.length - 1){
                            query += ` WHERE ${items} = ?`
                        }else{
                            query += ` WHERE ${items} ?, `
                        }
                    })

                    // EXECUTION OF QUERY
                    db.query(query,arr_val,(err, data, fields) => {
                        res = {
                            status: status,
                            data: data
                        }
    
                        resolve(JSON.stringify(res))
                    })

                }else{
                    res = {
                        status: 500,
                        data: "Provide a parameter"
                    }
                    reject(JSON.stringify(res))
                }
            }else{
                res = {
                    status: 500,
                    data: "Provide a parameter"
                }
                reject(reject(res))
            }
        })
    }

    delete(table = null, param = {}, status = 200){

        /*
        structure :

        Model.delete(table_name, {column_name: value}, http_status_code (default is 200))

        example :

        Model.delete('tb_user', {userID: 1}, 200);
        */
        return new Promise((resolve,reject) => {
            if(param !== null && param !== undefined && Object.keys(param).length > 0){
                let identifier_params = Object.keys(param)
                let query = `DELETE FROM ${table} WHERE`
                let res = ''
                let arr_val = []
    
                // SET IDENTIFIER
    
                identifier_params.forEach((items, i) => {
                    arr_val.push(param[items])
                    if(i >= identifier_params.length - 1){
                        query += ` ${items} = ?`
                    }else{

                        // set data type
                        query += ` ${items} = ? AND`
                    }
                })

                // HANDLING QUERY
                db.query(query, arr_val, (err, data, fields) => {
                    if(err){
                        res = {
                            status: 500,
                            data: err
                        }
                        reject(JSON.stringify(res))
                    }else{
                        res = {
                            status: status,
                            data: data,
                        }
                        resolve(JSON.stringify(res))
                    }
                })

            }else{
                res = {
                    status: 500,
                    data: "Parameter can not be null",
                }

                reject(JSON.stringify(res))
            }
            //
        })
    }

    raw(query, status){
        /* 
        you can passing query whatever you want using this method
        example : 
        SELECT name, image FROM user WHERE age >= 20
        and use in controller like this:
        Model.raw(`SELECT * FROM tb_kategori WHERE kodekat <= 7`, 202)
        */
        return new Promise((resolve, reject) => {
            let res = ''
            db.query(query, (err, data, fields) => {
                if(err){
                    res = {
                        status: 500,
                        data: data,
                    }
                    reject(JSON.stringify(res))
                }else{
                    res = {
                        status: status,
                        data: data,
                    }

                    resolve(JSON.stringify(res))
                }
            })
        })
    }
}
const Model = new ModelHelper()
module.exports = Model