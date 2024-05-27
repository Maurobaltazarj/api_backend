const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, name: 'silvia', age: 30, enroll:true },
    {id: 2, name: 'tobias', age: 20, enroll:true },
    {id: 3, name: 'alejandro', age: 27, enroll:false },
];


app.get('/', (req, res) => {
    res.send('Node js api')
});


app.get('/api/students', (req, res)=>{
    res.send(students)
});


app.get('/api/students/:id', (req, res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('estudiante no encontrado');
    else res.send(student);
});


app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    students.push(student);
    res.send(students);
});


app.delete('/api/students/:id', (req, res) => {
    const student = students.find (c => c.id == parseInt(req.params.id));
    if (!student) return res.status(404).send('estudiante no encotrado');
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.PORT || 3232;
app.listen(port, () => console.log(`escuchando en el puerto ${port}...`));