const util = require("util");
const fs = require("fs");

//use node.js util function to promisify read and write with POSTs, Gets and DELETE
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//creating a constructor class
class Store {
    constructor(lastId) {
      this.lastId = 0;
    }
//method to interpret object data in the db.json
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    // write object data(note) into db.json file also convert into string
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    // GET method
    getTheNotes(){
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
              } catch (err) {
                parsedNotes = [];
              }
              // prints note
              return parsedNotes;
            });
          }
 // POST method
 addTheNotes(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text, id: this.lastId++ };
    return this.getTheNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // DELETE note method
  deleteNote(id) {
    return this.getTheNotes()
    .then((notes) => notes.filter((note) => note.id !== parseInt(id)))
    .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
