# Commodore Registry

This is a work in progress as I go through some ideas.

## Registry import

An importer for the Commodore 64 Registry exists in importers/64registry.js.

Original is at https://c64preservation.com/?pg=registry

I have not asked permission to pull this data, and have only used this data to
test and validate the model as I go. This is likely to be removed before doing
anything with this data, with the potential of partnering later.


## Local hacking

```
createdb commodoreregistry
psql commodoreregistry < init.sql
npm i
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
