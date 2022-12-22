const knexConfig = require('../config');
const knex = require('knex')(knexConfig);

knex.schema.createTable('products', table => {
    table.increments('id').notNullable().primary(),
    table.string('name').notNullable(),
    table.float('price').notNullable(),
    table.string('photo')
}).then(() => {
    console.info('Table created');
}).catch(error => {
    console.error(error)
}).finally(() => {
    knex.destroy();
});

knex.schema.createTable('messages', table => {
    table.string('email').notNullable(),
    table.string('message').notNullable()
}).then(() => {
    console.info('Table created');
}).catch(error => {
    console.error(error)
}).finally(() => {
    knex.destroy();
});