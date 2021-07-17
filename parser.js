const fs = require('fs');
const readline = require('readline');

class Parser {
    // may add parameter to constructor
    constructor(filename, line) {
        this._filename = filename;
        this._maxLine = line;
        this._count = 0;
        this._data = [];
        this._rl;
    }
    // setters & getters
    setFilename(value) {
        if ( value.length < 1 ) { return; }
        this._filename = value;
    } 
    getFilename() {
        return this._filename;
    }
    setMaxLine(value) {
        if ( value < 1 ) { return; }
        this._maxLine = value;
    } 
    getMaxLine() {
        return this._maxLine;
    }
    readLines() {
        this._rl = readline.createInterface({
            input: fs.createReadStream(__dirname + this._filename),
            output: process.stdout,
            terminal: false
        }).on("line", (line) => {
            if (line[0] !== '@') {
                if (line.length > 1) {
                    this._count++;
                    console.log(line);
                    this._data.push(line);
                }
            }
            // Limit
            if (this._count == this._maxLine) {
                this._rl.close();
            }
        }).on('close', function() {
            // console.log(savedLine);  
            process.exit(0);
        });
    }
}

// let parser = new Parser("/esco_v1.0.8.ttl", 500);
let parser = new Parser("/esco_reduced.ttl", 24);
console.log(parser._filename);
console.log(parser._maxLine);
parser.readLines();