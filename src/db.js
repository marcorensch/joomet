const {app} = require('electron');
const Datastore = require('nedb-promises');const dbFactory = (fileName) => Datastore.create({
    filename: `${process.env.NODE_ENV === 'development' ? '.' : app.getAppPath('userData')}/data/${fileName}`,
    timestampData: true,
    autoload: true
});

const db = {
    projects: dbFactory('projects.db')
};
module.exports = db;