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
  ('PET/CBM', NOW(), NOW()),
  ('CBM-II', NOW(), NOW()),
  ('VIC-20', NOW(), NOW()),
  ('MAX Machine', NOW(), NOW()),
  ('64', NOW(), NOW()),
  ('64GS', NOW(), NOW()),
  ('SX-64', NOW(), NOW()),
  ('128', NOW(), NOW()),
  ('16', NOW(), NOW()),
  ('Plus/4', NOW(), NOW()),
  ('Amiga 500', NOW(), NOW()),
  ('Amiga 600', NOW(), NOW()),
  ('Amiga 1000', NOW(), NOW()),
  ('Amiga 1200', NOW(), NOW()),
  ('Amiga 1500', NOW(), NOW()),
  ('Amiga 2000', NOW(), NOW()),
  ('Amiga 2500', NOW(), NOW()),
  ('Amiga 3000', NOW(), NOW()),
  ('Amiga 4000', NOW(), NOW()),
  ('Amiga CDTV', NOW(), NOW()),
  ('Amiga CD32', NOW(), NOW());

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
  ((SELECT machine_id FROM machine WHERE name = 'VIC-20'), 'VIC-20', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'MAX Machine'), 'MAX Machine', NOW(), NOW()),
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
  ((SELECT machine_id FROM machine WHERE name = '64'), 'Educator 64', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'SX-64'), 'SX-64', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '64GS'), '64GS', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '128'), '128', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '128'), '128D', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '128'), '128DCR', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '16'), '16', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = '16'), '116', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Plus/4'), 'Plus/4', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 500'), 'A500', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 500'), 'A500+', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 600'), 'A600', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 600'), 'A600HD', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 1200'), 'A1200', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 1500'), 'A1500', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 2000'), 'A2000', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 2000'), 'A2000HD', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 2500'), 'A2500', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 2500'), 'A2500HD', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 3000'), 'A3000', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 3000'), 'A3000T', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 3000'), 'A3000UX', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000/040 Desktop', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000/030 Desktop', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000T/040 Tower', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga 4000'), 'A4000T/060 Tower', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga CDTV'), 'CDTV', NOW(), NOW()),
  ((SELECT machine_id FROM machine WHERE name = 'Amiga CD32'), 'CD32', NOW(), NOW());

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
  source varchar(32),
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

CREATE TABLE model_attribute (
  model_id integer,
  attribute_id integer,
  PRIMARY KEY (model_id, attribute_id)
);

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
