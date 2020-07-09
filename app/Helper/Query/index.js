const db = require('../Db')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
class QueryHelper{
    CreateQuery(table,param){
        const obj = Object.keys(param)
        let query = `INSERT INTO ${table}(`
        obj.forEach((items, i) => {
            if(i >= obj.length - 1){
                query += `${items})`
            }else{
                query += `${items}, `
            }
        })
        query += ` VALUES (`
        obj.forEach((items, i) => {
            if(i >= obj.length - 1){
                query += `? )`

            }else{
                query += `?, `
            }
        })

        return query
    }

    getDataHelper(table, param, fields, status, success, fail){
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

        if(param !== null && param.where !== undefined && param.where !== null && Object.keys(param.where).length > 0){
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

        db.query(query, (err, data) => {
            let res = ''
            if(err){
                res = {
                    status: 400,
                    message: err,
                }
                fail(res)
            }else{
                res = {
                    status: status,
                    data: data,
                }
                success(res)
            }
        })
    }

    // where like
    whereLikeHelper(table, param, fields, status, success, fail){
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
                    success(res)
                }else{
                    res = {
                        status: 500,
                        data: err
                    }
                    fail(res)
                }
            })
        }else{
            reject({
                status: 500,
                data: 'provide a parameter like %word%'
            })
        }  
    }
    // post helpeor
    PostHelper(table, param, status, success, failed){
        let res = ''
        if(param !== null && param !== undefined){
            let query = this.CreateQuery(table, param)
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
                    success(res)
                }
            })
        }else{
            res = {
                status: 500,
                data: { message: 'Provide a table name and value'}
            }
            failed(res)
        }
    }
    // update helper
    UpadateHelper(table, param, status, success, error){
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

                    success(res)
                })

            }else{
                res = {
                    status: 500,
                    data: "Provide a parameter"
                }
                error(res)
            }
        }else{
            res = {
                status: 500,
                data: "Provide a parameter"
            }
            error(err)
        }
    }
    // delete helper
    DeleteHelper(table, param, status, success, failed){
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
                    failed(res)
                }else{
                    res = {
                        status: status,
                        data: data,
                    }
                    success(res)
                }
            })

        }else{
            res = {
                status: 500,
                data: "Parameter can not be null",
            }

            failed(res)
        }
    }
    // raw query helper
    RawHelper(query, status, success, failed){
        let res = ''
        db.query(query, (err, data, fields) => {
            if(err){
                res = {
                    status: 500,
                    data: data,
                }
                success(res)
            }else{
                res = {
                    status: status,
                    data: data,
                }

                failed(res)
            }
        })
    }
    // check api key on the database
    CheckApiKey(apikey, success, failed){
        console.log(apikey.length)
        if(apikey && apikey.length > 1){
            let sql = `SELECT key_value FROM ${dotenv.parsed.database}.table_key WHERE key_value = '${apikey}'`
            console.log(sql)
            db.query(sql, (err, data) => {
                if(err){
                    failed(err)
                }else{
                    if(data.length > 0){
                        success(true)
                    }else{
                        success(false)
                    }
                }
            })
        }else{
            success(false)
        }
    }
}

module.exports = QueryHelper