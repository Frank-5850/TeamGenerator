const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function assembleTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the managers name?",
      },

      {
        type: "input",
        name: "id",
        message: "What is the managers id?",
      },

      {
        type: "input",
        name: "email",
        message: "What is the managers email?",
      },

      {
        type: "input",
        name: "officeNumber",
        message: "What is the managers office number?",
      },
    ])

    .then(function (answers) {
      let manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      team.push(manager);
      newTeamMate();
    })

    .catch(function (err) {
      console.log(err);
    });

  async function newTeamMate() {
    try {
      let teamMate = await inquirer.prompt([
        {
          type: "list",
          name: "teamType",
          message: "What type of teammate would you like to add",
          choices: [
            "Engineer",
            "Intern",
            "I don/t want to add anymore teammates.",
          ],
        },
      ]);

      if (teamMate.teamType === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is the intern name?",
            },

            {
              type: "input",
              name: "id",
              message: "What is the intern id?",
            },

            {
              type: "input",
              name: "email",
              message: "What is the intern email?",
            },

            {
              type: "input",
              name: "school",
              message: "What is the intern school?",
            },
          ])

          .then(function (answers) {
            let intern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            );
            team.push(intern);
            newTeamMate();
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (teamMate.teamType === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is the Engineer name?",
            },

            {
              type: "input",
              name: "id",
              message: "What is the Engineer id?",
            },

            {
              type: "input",
              name: "email",
              message: "What is the Engineer email?",
            },

            {
              type: "input",
              name: "github",
              message: "What is the Engineer GitHub username?",
            },
          ])

          .then(function (answers) {
            let engineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            );
            team.push(engineer);
            console.log(team);
            newTeamMate();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

assembleTeam();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
