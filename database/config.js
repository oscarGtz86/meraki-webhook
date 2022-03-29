/**
 * Mongoose config file
 * @author Oscar Escamilla
 * @date 02.02.2022
 */

 const mongoose = require("mongoose")

 const dbConnection = async () => {
     try {
         // Use encodeURIComponent if the password contains $,#,@
         await mongoose.connect( process.env.DB_URL );
         console.log('Database connected');
     } catch (error) {
         console.error( error.stack );
         console.error('Unable to connect to database');
         process.exit(1);
     }
 }
 
 module.exports = {
     dbConnection
 }