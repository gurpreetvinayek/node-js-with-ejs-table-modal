const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3002;
const jwt = require('jsonwebtoken');
const path = require('path');
const databse = require('./config/conn');
const secretKey = 'sarewr23424erfe';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src','views'));


const authenticateTokens = require('./middleware/authenticateToken');
const userController = require('./src/controller/UserController');
const userRoutes = require('./routes/userRoute');
app.use('/api',userRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/alluser',authenticateTokens,userController.commonFunction)
app.get('/user-info',authenticateTokens,userController.getAuthUserDta);
app.get('/signup',userController.FrontendRegister);
app.post('/signup',userController.saveRegister);
app.get('/users',userController.users)
app.get('/info/:id',userController.info);
// Login route
app.post('/login', (req, res) => {
    const { name, password } = req.body;
   
    const query = 'SELECT * FROM users WHERE name = ?';
    databse.query(query, [name], (err, result) => {
        if (err) throw err;
        console.log(result)
        if (result.length == 0) {
            return res.status(400).send('Username or password is incorrect');
        }   
       // return res.status(200).send('All good');
        const token = jwt.sign({ id: result[0].id }, secretKey, { expiresIn: '1h' });
        res.send({ token });
    })
})

app.get('/protected',authenticateTokens,(req,res)=>{
    res.json({ user: req.user });
});



app.listen(PORT, () => {
    console.log("App is running on port 3000");
});