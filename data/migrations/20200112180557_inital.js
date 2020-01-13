
exports.up = async function(knex) {
  await knex.schema.createTable("projects", (table) => {
    table.increments("id")
    table.text("name")
      .notNullable()
    table.text("description")
    table.boolean("completed")
      .defaultTo(false)
      .notNullable()
  })

  await knex.schema.createTable("tasks", (table) => {
    table.increments("id")
    table.integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
    table.text("description").notNullable()
    table.text("notes")
    table.boolean("completed")
      .defaultTo(false)
      .notNullable()
  })

  await knex.schema.createTable("resources", (table) => {
    table.increments("id")
    table.text("name")
      .notNullable()
      .unique()
    table.text("description")
  })

  await knex.schema.createTable("projects_resources", (table) => {
    table.integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
    table.integer("resource_id")
      .notNullable()
      .references("id")
      .inTable("resources")
    table.primary(["project_id", "resource_id"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("projects_resources")
  await knex.schema.dropTableIfExists("resources")
  await knex.schema.dropTableIfExists("tasks")
  await knex.schema.dropTableIfExists("projects")
};
