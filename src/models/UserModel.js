const database = require('../../config/conn');
const User = {};
User.commonFunction2 = ()=>{
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM users", (err, results) => {
            if(err){
                reject(err)
            }
            resolve(results)
        })
    })
}

User.authUser = (id)=>{
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM users WHERE id=?",[id], (err, results) => {
            if(err){
                reject(err)
            }
            resolve(results)
        })
    })
}

User.saveRegister = (data)=>{
    return new Promise((resolve, reject) => {
        database.query("insert into users set ? ",data,(err,results)=>{
           
            if(err){
                reject(err)
            }
            resolve(results)
        })
    })
}

module.exports = User;