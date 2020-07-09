const db = require('../Db')
const Query = require('../Query')
const e = require('express')

class ModelHelper extends Query{
    

    // get methods

    get(table, param = {where: {}, order: {}, key: {api_key: ''}}, fields = [],status = 200){

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

           // check if any api key

            if(param && param.key !== null && param.key !== undefined && param.key.api_key !== null && Object.keys(param.key).length > 0 && param.key.api_key.length > 1){
                this.CheckApiKey(param.key.api_key, success => {
                    if(success === true){
                        this.getDataHelper(table, param, fields,status, success2 => {
                            resolve(JSON.stringify(success2))
                        }, fail => {
                            reject(JSON.stringify(fail))
                        })
                    }else{
                        reject({
                            status: 400,
                            data: "API key doesn't match"
                        })
                    }
                }, failed => {
                    console.error(failed)
                })
            }
            // without api key
            else{
                this.getDataHelper(table, param, fields,status, success => {
                    resolve(JSON.stringify(success))
                }, fail => {
                    reject(JSON.stringify(fail))
                })
            }
        })
    }

    getLike(table, param = {where: {}, order: {}}, fields = [],status = 200){
        /*

        get data using clause
        SELECT * FROM table WHERE table_name LIKE '%abc%'

        this is the way to call this method
        Model.getLike(table_name, {where: {table_column: value}, order: {table_name: "ASC / DESC"}, key: {}}, fields = [], http_status_code);
        example 
        Model.getLike('tb_users', {where : {username: `%${key}%`}, order: {namabarang: "DESC"}}, null, 200)

        */
        return new Promise((resolve, reject) => {
            if(param && param.key !== null && param.key !== undefined && param.key.api_key !== null && Object.keys(param.key).length > 0 && param.key.api_key.length > 1){
                // check api key
                this.CheckApiKey(param.key.api_key, success => {
                    if(success === true){
                        this.whereLikeHelper(table, param, fields, status, succes2 => {
                            resolve(JSON.stringify(succes2))
                        }, failed2 => {
                            reject(JSON.stringify(failed2))
                        });
                    }else{
                        let res = {
                            status: 400,
                            data: "Api key doesn's match"
                        }
                        resolve(JSON.stringify(res))
                    }
                }, failed => {
                    reject(JSON.stringify(failed))
                })
            }else{
                this.whereLikeHelper(table, param, fields, status, succes => {
                    resolve(JSON.stringify(succes))
                }, failed => {
                    reject(JSON.stringify(failed))
                });
            }
            
        })
    }

    innerJoin(param = {param : {}, order: {}, key: {api_key: ''}}, status = 200){
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
            if(param && param.key !== null && param.key !== undefined && param.key.api_key !== null && Object.keys(param.key).length > 0 && param.key.api_key.length > 1){
                this.CheckApiKey(param.key.api_key, success => {
                    if(success === true){

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

                    }else{
                        res = {
                            status: 400,
                            message: "API key doesn't match"
                        }
                        reject(res)
                    }
                }, failed => {
                    reject(JSON.stringify(failed))
                })
            }else{
                
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

    insert(table = null, param = null, key = {api_key: ''}, status){
        /* 
        this method is used for insert data to the database;
        1. table is table name that you want to use
        2. params is column name of your table if you insert data using this method
            you should follow this rules
            (table_name, {colum1: value1, column2: value2},api_key, 200)
        3. status is http status code when the query succesfuly 
            excecuted default is 200 which means is ok

        structure:

        Model.insert(table_name, {
            column_name : value,
        },{api_key : ''} 200)
        */
        return new Promise((resolve, reject) => {
            let res = ''
            if(key !== null && Object.keys(key).length > 0 && key.api_key.length > 0){
                this.CheckApiKey(key.api_key, success => {
                    if(success === true){
                        this.PostHelper(table, param, status, success2 => {
                            resolve(JSON.stringify(success2))
                        }, failed2 => {
                            reject(failed2)
                        })
                    }else{
                        res = {
                            status: 400,
                            data: "API key doesn't match"
                        }
                        reject(res)
                    }
                }, failed => {
                    res = {
                        status: 400,
                        data: failed,
                    }
                    reject(res)
                })
            }else{
                this.PostHelper(table, param, status, success => {
                    resolve(JSON.stringify(success))
                }, failed => {
                    reject(failed)
                })
            }
            
        })
    }

    // update method

    update(table = null, param = {update: {}, identifier: {}, key: {api_key: ''}}, status = 200){
        /*
        update data in database

        structure:
        Model.update('tb_barang', {
            update: {
                column_name: value,
            }, 
            identifier: {
                column_name: value
            },
            key: {
                api_key: ''
            }
        }, http_status_code (default is 200 which means ok no problem));

        example :
        Model.update('tb_barang', {
            update: {
                name : "Arnold"
            }, 
            identifier: {
                age: 21
            },
            key: {
                api_key: ''
            }
        }, 200);

        */
        return new Promise((resolve, reject) => {
            let res = ''
            if(param && param.key !== null && param.key !== undefined && param.key.api_key !== null && Object.keys(param.key).length > 0 && param.key.api_key.length > 1){
                this.CheckApiKey(param.key.api_key, success => {
                    if(success === true){
                        this.UpadateHelper(table, param, status, berhasil => {
                            resolve(JSON.stringify(berhasil))
                        }, failed2 => {
                            reject(failed2)
                        })
                    }else{
                        res = {
                            status: 400,
                            data: "API key doesn't match"
                        }
                        reject(res)
                    }
                })
            }else{
                this.UpadateHelper(table, param, status,success => {
                    resolve(JSON.stringify(success))
                }, err => {
                    reject(err)
                })
            }
        })
    }

    delete(table = null, param = {}, key = {api_key: ''}, status = 200){

        /*
        structure :

        Model.delete(table_name, {column_name: value},{api_key : ''}, http_status_code (default is 200))

        example :

        Model.delete('tb_user', {userID: 1},{api_key: 'aaa'}, 200);
        */
        return new Promise((resolve,reject) => {
            let res = ''
            if(key !== null && key.api_key !== null && key.api_key.length > 0){
                this.CheckApiKey(key.api_key, success => {
                    if(success === true){
                        this.DeleteHelper(table, param, status, success2 => {
                            resolve(JSON.stringify(success2))
                        }, failed2 => {
                            reject(failed2)
                        })
                    }else{
                        res = {
                            status: 400,
                            data: "API key doesn't match",
                        }
                        reject(res)
                    }
                }, failed => {
                    res = {
                        status: 400,
                        data: failed
                    }
                    reject(res)
                })
            }else{
                this.DeleteHelper(table, param, status, success => {
                    resolve(JSON.stringify(success))
                }, failed => {
                    reject(failed)
                })
            }
            
        })
    }

    raw(query, key = {api_key: ''}, status){
        /* 
        you can passing query whatever you want using this method
        example : 
        SELECT name, image FROM user WHERE age >= 20
        and use in controller like this:
        Model.raw(`SELECT name, image FROM tuser WHERE age >= 30`, {api_key: ''}, 202)
        */
        return new Promise((resolve, reject) => {
            let res = ''
            if(key !== null && key.api_key !== null && Object.keys(key).length > 0){
                this.CheckApiKey(key.api_key, success => {
                    if(success === true){
                        this.RawHelper(query, status, succes2 => {
                            resolve(JSON.stringify(succes2))
                        }, failed => {
                            reject(failed)
                        })
                    }else{
                        res = {
                            status: 400,
                            data: "API key doesn't match"
                        }
                        reject(res)
                    }
                })
            }else{
                this.RawHelper(query, status, success => {
                    if(res){
                        resolve(JSON.stringify(success))
                    }
                }, failed => {
                    reject(failed)
                })
            }
        })
    }
}
const Model = new ModelHelper()
module.exports = Model