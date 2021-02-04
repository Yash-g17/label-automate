const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //   console.log("db " + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getLastId() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names ORDER BY id DESC LIMIT 1";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            //   console.log(response);
            return response;
        } catch (error) {
            console.log("error" + error);
        }
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            //   console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewProduct(prod_code, prod_weight) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query =
                    "INSERT INTO names (product_code,date_added,weight,status) VALUES (?,?,?,?)";
                connection.query(
                    query, [prod_code, dateAdded, prod_weight, 1],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result.insertId);
                    }
                );
            });
            // console.log(insertId);
            return insertId;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = DbService;