const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("Hello Said BENAISSA");
});

app.get("/api/courses",(req,res) => {
    let courses = [ 1, 2, 3, 4];
    res.send(courses);
});

app.get("/api/posts/:id",(req,res) =>{
    res.send(req.params.id);

});

app.get("/api/posts/:year/:month",(req,res) =>{
    res.send(req.params);

});


app.get("/api/posts/:year/:month",(req,res) =>{
    res.send(req.query);

});

// PORT process.env.PORT || 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=>{ 
    console.log(`Listening to port:${port}`);
});