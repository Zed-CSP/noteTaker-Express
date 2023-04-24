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
// GET /index should return the index.html file.
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// POST /api/notes should receive a new note to save on the request body.
// It should then add it to the db.json file,
// Then return the new note to the client.
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id when it's saved.
// In order to delete a note, you'll need to read all notes from the db.json file,
// remove the note with the given id property,
// Then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes = notes.filter(note => note.id != req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});
