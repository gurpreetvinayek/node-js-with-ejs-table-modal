const express = require('express');
const router = express.Router();

router.get('/first',(req,res)=>{
    res.send('i am from router');
});

module.exports = router;