const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require("mysql")
const bodyParser = require('body-parser');
const dotenv = require('dotenv')


const app = express();
dotenv.config({ path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})


app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())


// Register route



// Login route
app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if(username && password){
        query = `
        SELECT * FROM users 
        WHERE email = "${user_email_address}"
        `;

        database.query(query, function(error, data){
            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].password == password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.send("Logged in");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });

}
});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});


// Protected route example
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  res.send(`Hello ${req.session.user.username}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
