
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: "Lambda School",
          description: "Online coding bootcamp for busy adults",
        },
        {
          name: "YDYJS series", 
          description: "Book series about javascript front to back",
        },
        {
          name: "Myself", 
          description: "The better half of me",
        },
        {
          name: "My computer", 
          description: "MacBook Pro",
        },
        {
          name: "Jason", 
          description: "Lambda School instructor",
        },
        {
          name: "Chris", 
          description: "Lambda School Team Leader",
        },
        {
          name: "Lambda Endorsement", 
          description: "Given to lambda student who do a required list of tasks",
        },
        {
          name: "Pen & Paper", 
          description: "Used to take notes and plan applications",
        },
        {
          name: "Fingers", 
          description: "Used to type and do other things",
        },
        {
          name: "My Brain", 
          description: "Only works when its being used",
        },
      ]);
    });
};
