
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: "Follow the path laid out by student success",
          notes: "The student success is a department at Lambda School dedicated to students succeeding",
          completed: false,
          project_id: 1
        },
        {
          description: "Learn all there is to know about the programming language javascript", 
          notes: "Starting off with the basics and gradually learning more from there",
          completed: false,
          project_id: 1
        },
        {
          description: "Remove full bag of trash from can and replace with empty bag", 
          notes: "The trash gets full on an almost daily basis",
          completed: false,
          project_id: 1
        }
      ]);
    });
};
