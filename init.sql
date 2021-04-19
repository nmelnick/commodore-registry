-- Machine grouping (CBM-II)
CREATE TABLE machine (
  machine_id serial primary key,
  name varchar(250),
  date_created timestamp with time zone,
  date_modified timestamp with time zone
);

CREATE INDEX machine_name ON machine (name);

INSERT INTO machine
  (name, date_created, date_modified)
VALUES
  ('CBM-II', NOW(), NOW()),
  ('64', NOW(), NOW()),
  ('128', NOW(), NOW()),
  ('Amiga 4000', NOW(), NOW());

-- Corresponds to the model sticker (B128)
CREATE TABLE model (
  model_id serial primary key,
  machine_id integer,
  name varchar(250),
  date_created timestamp with time zone,
  date_modified timestamp with time zone
);

CREATE INDEX model_name ON model (name);

INSERT INTO model
  (machine_id, name, date_created, date_modified)
VALUES
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'B128', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'P500', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'B500', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'B700', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'CBM128', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), 'CBM256', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), '610', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), '620', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), '710', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'CBM-II'), '720', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '64'), '64', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '64'), '64C', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '128'), '128', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '128'), '128D', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000/040 Desktop', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000/030 Desktop', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000T/040 Tower', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000T/060 Tower', NOW(), NOW());

CREATE TABLE owner (
  owner_id serial primary key,
  name varchar(250),
  email varchar(250),
  location varchar(250),
  salt varchar(16),
  pwhash varchar(70),
  date_created timestamp with time zone,
  date_modified timestamp with time zone
);

CREATE TABLE device (
  device_id serial primary key,
  model_id integer NOT NULL,
  owner_id integer NOT NULL,
  prefix varchar(8),
  serial_number varchar(32),
  description text,
  date_created timestamp with time zone,
  date_modified timestamp with time zone
);

CREATE INDEX device_model_id ON device (model_id);
CREATE INDEX device_owner_id ON device (owner_id);

CREATE TABLE attribute (
  attribute_id serial primary key,
  name varchar(64)
);

CREATE INDEX attribute_name ON attribute (name);

CREATE TABLE device_attribute (
  device_id integer,
  attribute_id integer,
  attribute_value varchar(250),
  date_created timestamp with time zone,
  PRIMARY KEY (device_id, attribute_id)
);

INSERT INTO attribute (name) VALUES
 ('board_serial'),
 ('board_datecode'),
 ('board_revision'),
 ('board_assembly'),
 ('badge'),
 ('fkey'),
 ('made_in');
