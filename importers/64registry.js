'use strict';

const Pool = require("pg").Pool;
const fs = require("fs");
const readline = require('readline');
const parse = require("node-html-parser").parse;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "commodoreregistry"
});

const dom = parse(fs.readFileSync("64registry.html"));
const table = dom.querySelector("tbody");
let lastDescriptor = null;
const insertable = [];
table.childNodes.forEach((tr) => {
  const row = tr.childNodes.map((td) => getText(td));
  if (row.length == 1) {
    lastDescriptor.description = row[0];
  } else {
    if (row[0] == "Badge") {
      return;
    }
    if (lastDescriptor) {
      insertable.push(lastDescriptor);
    }
    lastDescriptor = rowToDescriptor(row);
  }
});
insertable.push(lastDescriptor);
syncInsertable(insertable);

async function syncInsertable(insertable) {
  for (const row of insertable) {
    if (row) {
      const modelId = await model("64");
      const ownerId = await owner(row.owner);
      const deviceId = await device(modelId, ownerId, row.serial, row.description);
      for (const attribute of Object.keys(row.attributes)) {
        if (row.attributes[attribute] && row.attributes[attribute].length > 0) {
          await deviceAttribute(deviceId, attribute, row.attributes[attribute]);
        }
      }
    }
  }
}

async function device(modelId, ownerId, serial, description) {
  let prefix = "";
  let dbSerial = serial;
  const groups = serial.match(/^([A-Za-z ]+)(.*)$/);
  if (groups && groups.length > 1) {
    prefix = groups[1].toUpperCase().replace(/ /g, "");
    dbSerial = groups[2].replace(/ /g, "");
  }
  const res = await pool.query("SELECT device_id FROM device WHERE model_id = $1 AND owner_id = $2 AND prefix = $3 AND serial_number = $4", [modelId, ownerId, prefix, dbSerial]);
  if (res.rows.length > 0) {
    return res.rows[0].device_id;
  }
  await pool.query(
    "INSERT INTO device (model_id, owner_id, prefix, serial_number, description, date_created, date_modified) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())",
    [modelId, ownerId, prefix, dbSerial, description]
  );
  return device(modelId, ownerId, serial, description);
}

async function deviceAttribute(deviceId, attribute, value) {
  return await pool.query(
    `
      INSERT INTO device_attribute
       (device_id, attribute_id, attribute_value, date_created)
      VALUES
       ($1, (SELECT attribute_id FROM attribute WHERE name = $2), $3, NOW())
       ON CONFLICT DO NOTHING
    `,
    [deviceId, attribute, value]
  );
}

async function model(modelName) {
  return pool.query("SELECT model_id FROM model WHERE name = $1", [modelName])
             .then((res) => res.rows[0].model_id);
}

async function owner(o) {
  const res = await pool.query("SELECT owner_id FROM owner WHERE name = $1 AND location = $2", [o.name, o.location]);
  if (res.rows.length > 0) {
    return res.rows[0].owner_id;
  }
  await pool.query("INSERT INTO owner (name, location, date_created, date_modified) VALUES ($1, $2, NOW(), NOW())", [o.name, o.location]);
  return owner(o);
}

function getImageSource(node) {
  if (node.rawTagName == "center") {
    return getImageSource(node.childNodes[0]);
  }
  return node.rawAttrs;
}

function getText(td) {
  const tags = td.childNodes.filter((n) => n.nodeType == 1);
  if (tags.length > 0) {
    return getImageSource(tags[0]);
  }
  return td.innerText;
}

function rowToDescriptor(row) {
  return {
    serial: row[2],
    description: null,
    owner: {
      name: row[6],
      location: row[7]
    },
    attributes: {
      board_assembly: row[3],
      board_revision: row[4],
      board_serial: row[5],
      badge: row[0] ? row[0].substring(row[0].indexOf("files/") + 6, row[0].indexOf("_badge")) : null,
      fkey: row[1] ? row[1].substring(row[1].indexOf("files/") + 6, row[1].indexOf("_f1.png")) : null
    }
  };
}
