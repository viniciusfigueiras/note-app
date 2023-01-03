import fs from 'fs';
import chalk from 'chalk';

const getNotes = () => {
    return 'Your notes'
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse("Your Notes:"));
    notes.forEach(note => {
        console.log(chalk.bold(note.id, note.title));
    });
}

const getMaxID = () => {
    const notes = loadNotes();
    let maxID = 0;
    notes.forEach(note => {
        if (note.id > maxID) {
            maxID = note.id;
        }
    });
    return maxID + 1;
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    const id = getMaxID();
    notes.push({
        id: id,
        title: title,
        body: body
    })
    saveNotes(notes);
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(err) {
        return [];
    }
};

const readNotes = (id) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.id === id);

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red("Id Not Found!"));
    }
};

const removeNotes = (id) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((notes) => notes.id !== id);
    const notesToRemove = notes.filter((notes) => notes.id === id);

    if(notesToRemove.length > 0) {
        console.log(chalk.green("Note Removed!"))
        saveNotes(notesToKeep);
    } else if (notesToRemove.length === 0) {
        console.log(chalk.red("Note Not Found!"))
    } else {
        console.log(chalk.red("Unexpected ERROR!"))
    }
};

export default {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}