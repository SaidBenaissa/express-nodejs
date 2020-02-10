

const Joi = require('joi');
// Get method example
const express = require('express');
const app = express();

// Enable json for post (not enabled by default in express)
app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/',(req,res) => {
    res.send("Hello Said BENAISSA");
});

app.get("/api/courses",(req,res) => {
    res.send(JSON.stringify(courses));
});

app.get("/api/courses/:id",(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send(' The course with the given id not found');
    res.send(course);
});

// using Joi for post handling requist errors
app.post('/api/courses', (req,res) => {


    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body,schema);
    // // console.log(result);

    // if(result.error){
    //     // 400 Bad request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // if(!req.body.name || req.body.name.length<3){
    //     // 400 Bad request
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }

  //const result = validateCourse(req.body);// with object destructring we don't need this line eany more
  const {error} = validateCourse(req.body);//{error} equivalent to result.error (object destructring)

  if(error){ // here we can simply use if(error) in the place of if(result.error) (object destructor)
      // 400 Bad request
      res.status(400).send(error.details[0].message);
      return;
  }
  ///

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// app.get("/api/posts/:id",(req,res) =>{
//     res.send(req.params.id);

// });

// app.get("/api/posts/:year/:month",(req,res) =>{
//     res.send(req.params);

// });


// app.get("/api/posts/:year/:month",(req,res) =>{
//     res.send(req.query);

// });


// PUT method for updating ressources
app.put('/api/courses/:id',(req,res) => {
    // Look up to the course // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send(' The course with the given id not found');
    
    // // Validate: we can export it to function validateCourse() 
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body,schema);

    // If invalid, return 400 error - witch means Bad request

    //const result = validateCourse(req.body);// with object destructring we don't need this line eany more
    const {error} = validateCourse(req.body);//{error} equivalent to result.error (object destructring)

    if(error){ // here we can simply use if(error) in the place of if(result.error) (object destructor)
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }
// /////////
// you can replace this code 
//
///////////////////////////////////////////////////////////////////
//    if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }
////////////////////////////////////////////////////////////////////
//
// with only one line
//
////////////////////////////////////////////////////////////////////
// if(error) return res.status(400).send(error.details[0].message);
////////////////////////////////////////////////////////////////////
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

function validateCourse(course){
    // Validate     
    const schema = {
        name: Joi.string().min(3).required()
    };
    // const result = Joi.validate(req.body,schema); 
    return Joi.validate(course,schema);
}


// DELETE Methode

app.delete('/api/courses/:id',(req,res)=>{

// Look up to the course // If not existing, return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send(' The course with the given id not found');
// Delete
// To delete this course you need to detect its index
const index = courses.indexOf(course);

// and remove it using splice(index,number of elements to delete) method
courses.splice(index,1);

// return the same course deleted
res.send(course );
});


// PORT process.env.PORT || 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=>{ 
    console.log(`Listening to port:${port}`);
});