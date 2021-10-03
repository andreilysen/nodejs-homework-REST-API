const fs = require("fs/promises");
const path = require("path");

class ReadWriteDB {
  constructor(db) {
    this.db = path.join(__dirname, db);
  }

  async read() {
    const result = await fs.readFile(this.db, "utf8");
    const contacts = JSON.parse(result);
    return contacts;
  }

  async write(data) {
    await fs.writeFile(this.db, JSON.stringify(data, null, 2));
  }
}

module.exports = ReadWriteDB;
