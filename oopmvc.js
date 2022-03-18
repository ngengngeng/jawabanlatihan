//wines.json
[
  {
    id: 1,
    name: "Moscato 2010",
    year: 2010,
    type: "Red",
    createdAt: "2021-01-10",
  },

  {
    id: 2,
    name: "White Bourdon",
    year: 2010,
    type: "White",
    createdAt: "2021-01-10",
  },
];

//apps.js
const command = process.argv[2];
const params = process.argv.slice(3);
const WineController = require("./controllers/WineController");

switch (command) {
  case "help":
    WineController.help();
    break;
  case "wines":
    WineController.wines();
    break;
  case "add":
    WineController.add(params);
    break;
  case "sell":
    WineController.sell(params);
    break;
  case "rename":
    WineController.rename(params);
    break;
  case "findById":
    WineController.findById(params);
    break;
  default:
    WineController.message("Unknown command.");
    break;
}

//WineController.js
const View = require("../Views/views/View");
const Wine = require("../models/Wine");

class WineController {
  static help() {
    View.help();
  }
  static add(params) {
    let feedback = Wine.add(params);
    View.message(feedback);
  }

  static wines() {
    const result = Wine.getWines();
    View.wines(result);
  }

  static rename(params) {
    let feedback = Wine.rename(params);
    View.message(feedback);
  }

  static sell(params) {
    let feedback = Wine.sell(params);
    View.message(feedback);
  }

  static findById(params) {
    let result = Wine.findById(params);
    View.findById(params[0], result);
  }

  static message(msg) {
    View.message(msg);
  }
}

module.exports = WineController;

//Wine.js
const fs = require("fs");

class Wine {
  constructor(id, name, year, type, createdAt) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.type = type;
    this.createdAt = createdAt;
  }
  static getWines() {
    const wines = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    const winesInstance = wines.map((wine) => {
      let { id, name, year, type, createdAt, updatedAt } = wine;

      createdAt = new Date(createdAt);

      return new Wine(id, name, year, type, createdAt);
    });
    return winesInstance;
  }

  static add(params) {
    const wines = this.getWines();
    const fields = params[0].split("/");
    const name = fields[0];
    const year = Number(fields[2]);
    const createdAt = new Date();
    let type = fields[3];

    switch (type) {
      case "R":
        type = "Red";
        break;
      case "W":
        type = "White";
        break;
      default:
        type = "Other";
        break;
    }

    const newWine = new Wine(id, name, year, type, createdAt);
    wines.push(newWine);
    this.save(wines);
    return `"${name}" has been added.`;
  }

  static sell(params) {
    let wines = this.getWines();
    const name = params[0];
    const id = Number(params[0]);

    wines = wines.filter((wine) => wine.id !== id);
    this.save(wines);
    return `"${name}" has been sold.`;
  }
  static rename(params) {
    let wines = this.getWines();
    const id = Number(params[0]);
    const name = params[1];

    wines = wines.map((wine) => {
      if (wine.id === id) {
        wine.name = name;
        wine.updatedAt = new Date();
      }
      return wine;
    });

    this.save(todos);
    return `Wine number ${id} has been rename.`;
  }

  static findById(params) {
    let wines = this.getWines();
    let id = params[0];
    let name = name;
    let year = year;
    const Nowyear = 2022;
    const Newyear = Nowyear - year;

    if (id === id) {
      console.log(`${name} "is" ${type} "with age of" ${Newyear}.`);
    } else {
      console.log("Id is not found!");
    }
    return wine;
  }

  static save(wines) {
    let jsonString = JSON.stringify(wines, null, 2);
    fs.writeFileSync("./data.json", jsonString);
  }
}

module.exports = Wine;

//View.js
const { type } = require("fs");

class View {
  static help() {
    console.log("Command List: ");
    console.log("node apps.js help");
    console.log("node apps.js wines");
    console.log("node apps.js add <name>");
    console.log("node apps.js delete <id>");
    console.log("node apps.js rename <id> <name>");
    console.log("node apps.js findById <id>");
  }
  static wines(wines) {
    console.log("Welcome to Wine Management!!");
    wines.forEach((wine) => {
      const { id, name, type } = wine;
    });
  }
  static findById(name, wines, type, year) {
    wines.forEach((wine, index) => {
      const { id } = wine;
      console.log(`${name} "is" ${type} "with age of" ${2022 - year}.`);
    });
  }

  static message(msg) {
    console.log(msg);
  }
}

module.exports = View;
