'use strict';

import fetch from "node-fetch";
import * as fs from "fs";
import * as pg from "pg";
import { config } from "../dist/src/Config.js";
import * as cheerio from "cheerio";

const { Pool } = pg.default;

const pool = new Pool({
  host: config.pg.host,
  user: config.pg.username,
  password: config.pg.password,
  database: config.pg.database
});

const models = {};

go();

async function go() {
  console.log('Retrieving...');
  const content = await fetch('https://cbmvic.net/registry').then((r) => r.text());
  // const content = fs.readFileSync("cbmvic.html");
  const $ = cheerio.load(content);
  let lastDescriptor = null;
  const insertable = [];
  console.log('Parsing...');
  $("tbody > tr").each((i, tr) => {
    const row = [];
    $(tr).children().each((i, td) => row.push(getText($(td))));
    if (row[1] == "Serial number") {
      return;
    }
    if (lastDescriptor) {
      insertable.push(lastDescriptor);
    }
    lastDescriptor = rowToDescriptor(row);
  });
  insertable.push(lastDescriptor);
  console.log('Storing...');
  syncInsertable(insertable);
}

async function syncInsertable(insertable) {
  for (const row of insertable) {
    if (row) {
      const modelId = await model(row.attributes?.badge && row.attributes.badge.startsWith("1001") ? "VIC-1001" : "VIC-20");
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
    "INSERT INTO device (model_id, owner_id, prefix, serial_number, description, source, date_created, date_modified) VALUES ($1, $2, $3, $4, $5, 'cbmvic', NOW(), NOW())",
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
  if (!models[modelName]) {
    const result = await pool.query("SELECT model_id FROM model WHERE name = $1", [modelName])
      .then((res) => res.rows[0].model_id);
    models[modelName] = result;
  }
  return models[modelName];
}

async function owner(o) {
  const res = await pool.query("SELECT owner_id FROM owner WHERE name = $1 AND location = $2", [o.name, o.location]);
  if (res.rows.length > 0) {
    return res.rows[0].owner_id;
  }
  await pool.query("INSERT INTO owner (name, location, date_created, date_modified) VALUES ($1, $2, NOW(), NOW())", [o.name, o.location]);
  return owner(o);
}

function getText(td) {
  const tags = td.children('a').children('img');
  if (tags.length > 0) {
    return tags[0].attribs['src'];
  }
  return td.text().trim();
}

function rowToDescriptor(row) {
  return {
    serial: row[1],
    description: null,
    owner: {
      name: row[10],
      location: row[9]
    },
    attributes: {
      board_assembly: row[5],
      badge: row[3] ? row[3].substring(row[3].indexOf("label/") + 6, row[3].indexOf(".png")) : null,
      date_code: row[8],
      video_format: row[7] ? row[7].substring(0, row[7].indexOf(" ")) : null,
      made_in: row[2],
      keyboard: row[6]
    }
  };
}
