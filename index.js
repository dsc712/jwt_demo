const express = require('express'),
      jwt     = require('jsonwebtoken'),
      app     = express();

const PORT = process.env.port || 8080;

app.get('/api',(req,res) => {
    res.json({
       message: "This is my api"
    });
});

app.post('/api/login', async (req, res) => {

    // auth user
    const user = {
        name: "Devyendu",
        sex: "male",
        organization: "edunuts",
        college: "G.B Pant govt. engineering college",
        university: "GGSIPU",
        insta: "@shekhardevyendu"
    };

    const token = await jwt.sign({user}, 'secret_key');

    res.json({
        token: token
    });

});

app.get('/api/protected', ensureToken, async (req, res) => {
    await jwt.verify(req.token,'secret_key' , (err, data) => {
        if(err){
          res.status(403).send(err.message);
        }else{
           res.json({
               text: 'this is protected',
               data: data
           });
        }
    });
});

function ensureToken(req, res, next){
   const bearerHeader = req.headers["authorization"];
   if( typeof bearerHeader !== "undefined"){
       req.token = bearerHeader;
       next();
   }else{
       res.sendStatus(403);
   }
}

app.listen(PORT,(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("server started on port " + PORT );
    }
});