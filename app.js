import getNotes from './note.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import note from './note.js';

yargs(hideBin(process.argv)).command({
    command:'add',
    describe:'Adding command',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        note.addNotes(argv.title, argv.body);
    }
}).parse()

yargs(hideBin(process.argv)).command({
    command:'remove',
    describe:'Remove command',
    handler(argv){
        note.removeNotes(argv.id);
    }
}).parse()

yargs(hideBin(process.argv)).command({
    command:'list',
    describe:'List command',
    handler(){
        note.listNotes();
    }
}).parse()

yargs(hideBin(process.argv)).command({
    command:'read',
    describe:'Read command',
    id: {
        describe: 'Note id',
        demandOption: true,
        type: 'number'
    },
    handler(argv){
        note.readNotes(argv.id);
    }
}).parse()