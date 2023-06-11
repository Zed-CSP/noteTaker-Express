// Headers:
const express = require('express');
const fs = require('fs');
const path = require('path');

// Init Express.js app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// POST /api/notes should receive a new note to save on the request body.
// It should then add it to the db.json file,
// Then return the new note to the client.
app.post('/api/notes', (req, res) => {
    //random id created. UUID could also be implimented, but this demo app will not be used at a scale 
    req.body.id = Math.floor(Math.random() * 100000000);
    const newNote = req.body;
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

"/api/notes/19"
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes = notes.filter(note => note.id != req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
