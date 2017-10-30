import datastore from 'nedb-promise';
import path from 'path';
import electron from 'electron';

const app = electron.remote.app;

const getDb = type => {
  const dbPath = `${app.getPath('userData')}/${type}.json`;
  const db = datastore({
    filename: dbPath,
    autoload: true
  });

  db.ensureIndex({ fieldName: 'name', unique: true });
  return db;
};

export default getDb;
