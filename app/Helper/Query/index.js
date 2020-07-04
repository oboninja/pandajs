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
                // if(typeof(param[items]) === 'string'){
                //     query += `'${param[items]}')`
                // }else if(typeof(param[items]) === 'number'){
                //     query += `${param[items]})`
                // }else if(typeof(param[items]) === "boolean"){
                //     query += `${param[items]})`
                // }
            }else{
                query += `?, `
                // if(typeof(param[items]) === 'string'){
                //     query += `'${param[items]}', `
                // }else if(typeof(param[items]) === 'number'){
                //     query += `${param[items]}, `
                // }else if(typeof(param[items]) === "boolean"){
                //     query += `${param[items]}, `
                // }
            }
        })

        return query
    }
}

const Query = new QueryHelper()

module.exports = Query