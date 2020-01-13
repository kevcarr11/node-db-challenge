
exports.seed = function(knex) {
  return knex("projects").insert([
    {
      name: "Land a Job as a Web Developer",
      description: "This would be my dream job",
      completed: false
    },
    {
      name: "Master JavaScript",
      description: "If I can master javascript, that would take you a long way",
      completed: false
    },
    {
      name: "Take out the trash",
      description: "Every time the trash is full, I have to take it out",
      completed: true
    },
  ])
};
