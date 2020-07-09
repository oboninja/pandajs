const db = require('../Db')
const mysql = require('mysql')

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
}

module.exports = QueryHelper