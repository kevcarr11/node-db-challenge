
exports.up = async function(knex) {
  await knex.schema.createTable("projects", (table) => {
    table.increments()
    table.text("name")
      .notNullable()
    table.text("description")
    table.boolean("completed")
      .defaultTo(false)
  })

  await knex.schema.createTable("tasks", (table) => {
    table.increments()
    table.integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    table.text("description").notNullable()
    table.text("notes")
    table.boolean("completed")
      .defaultTo(false)
      .notNullable()
  })

  await knex.schema.createTable("resources", (table) => {
    table.increments()
    table.text("name")
      .notNullable()
      .unique()
    table.text("description")
  })

  await knex.schema.createTable("projects_resources", (table) => {
    table.integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer("resource_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("resources")
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.primary(["project_id", "resource_id"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("projects_resources")
  await knex.schema.dropTableIfExists("resources")
  await knex.schema.dropTableIfExists("tasks")
  await knex.schema.dropTableIfExists("projects")
};
