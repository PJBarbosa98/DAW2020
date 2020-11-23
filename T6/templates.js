/*
 * `templates.js`
 *
 * Server module that holds HTML pages
 *
 */

var fs     = require('fs');

/* welcome_page: template for the welcome page */
function welcome_page ()
{
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Goals List - Welcome</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="favicon.ico"/>
    <link rel="stylesheet" href="w3.css"/>
  </head>
  <body class="w3-lime">
    <div class="w3-container w3-center" style="margin-top: 10%;">
      <h2 class="w3-lime">Goals List</h2>
      <h3 class="w3-lime">Welcome</h3>
      <br><br>
      
      <div
        class="w3-indigo w3-panel w3-border w3-round-large"
        style="width: 25% !important; margin: auto;"
      >
        <p>Check your <a href="/tasks">Goals!</a></p>
      </div>
    </div>
  </body>
  </html>
  `
}

exports.welcome_page = welcome_page;

/* generate_tasks_page: template for all tasks */
function generate_tasks_page ( tasks, d )
{
  let html_page = `

    <html>
      
      <head>
        <title>Goals List - Tasks</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
      </head>

      <body>
        <div class="w3-container w3-lime">
          <h2 class="w3-center">Goals List</h2>
          <pre class="w3-center">Session: ${d}</pre>
        </div>

        <div class="w3-row" style="margin-top: 5%;">
          <!-- Ongoing Tasks -->
          <div class="w3-col s6 w3-indigo w3-center">
            <p class="w3-indigo">Ongoing Tasks</p>

            <table class="w3-table w3-bordered w3-center w3-indigo">
              <tr>
                <th>ID</th>
                <th>Description</th>
              </tr>
  `

  tasks.forEach(t => {

    if (t.status == 'Ongoing')
    {
      html_page += `
        <tr>
          <td>${t.id}</td>
          <td><a href="tasks/${t.id}">${t.what}</a></td>
          <td><a href="/tasks/edit/${t.id}">EDIT</a></td>
          <td><a href="/tasks/delete/${t.id}">DELETE</a></td>
        </tr>
      `;
    }

  });

  html_page += `
            </table>

            <!-- Add new task -->
            <div style="margin: auto; margin-top: 15%; width: 30% !important;"
              class="w3-lime w3-panel w3-border w3-round-large"
              style="width: 25% !important; margin: auto;"
            >
              <p><a href="/tasks/new">New Task</a></p>
            </div>

          </div>
          <!-- Completed Tasks -->
          <div class="w3-col s6 w3-blue w3-center">
            <p class="w3-blue">Completed Tasks</p>

            <table class="w3-table w3-bordered w3-center w3-blue">
              <tr>
                <th>ID</th>
                <th>Description</th>
              </tr>
  `

  tasks.forEach(t => {

    if (t.status == 'Completed')
    {
      html_page += `
        <tr>
          <td>${t.id}</td>
          <td><a href="/tasks/${t.id}">${t.what}</a></td>
          <td><a href="/tasks/edit/${t.id}">EDIT</a></td>
          <td><a href="/tasks/delete/${t.id}">DELETE</a></td>
        </tr>
      `;
    }

  });

  html_page += `
            </table>

            <!-- Add new task -->
            <div style="margin: auto; margin-top: 15%; width: 30% !important;"
              class="w3-lime w3-panel w3-border w3-round-large"
              style="width: 25% !important; margin: auto;"
            >
              <p><a href="/tasks/clear">Clear Completed</a></p>
            </div>

          </div>
        </div> 
      </body>
    </html>

  `;

  return html_page;
}

exports.generate_tasks_page = generate_tasks_page;


/* generate_individual_task_page : template for individual page */
function generate_individual_task_page ( task )
{
  let html_page = `
    <html>

      <head>
          <title>Goals List - ${task.id}</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>

      <body>
        <div class="w3-container w3-lime">
          <h2 class="w3-center">Task Page (${task.id})</h2>
        </div>

        <div style="margin-top: 5%;" class="w3-container w3-center"
          <div class="w3-row">
            
            <div class="w3-col s6 w3-center">
              <ul class="w3-ul w3-center w3-hoverable">
                <li><b>ID</b></li>
                <li><b>Date Created</b></li>
                <li><b>Date Dued</b></li>
                <li><b>Who</b></li>
                <li><b>What</b></li>
                <li><b>Type</b></li>
                <li><b>Status</b></li>
              </ul>
            </div>
            
            <div class="w3-col s6 w3-center">
              <ul class="w3-ul w3-center w3-hoverable">
                <li>${task.id}</li>
                <li>${task.dateCreated}</li>
                <li>${task.dateDued}</li>
                <li>${task.who}</li>
                <li>${task.what}</li>
                <li>${task.type}</li>
                <li>${task.status}</li>                
              </ul>
            </div>
          </div> 
        </div>

        <br/>
        <div
          class="w3-indigo w3-panel w3-border w3-round-large"
          style="width: 25% !important; margin: auto; margin-top: 5%"
        >
          <p class="w3-center"><a href="/tasks">Go Back</a></p>
        </div>

      </body>

    </html>
  `;

  return html_page;
}

exports.generate_individual_task_page = generate_individual_task_page;

/* generate_register_form : template for new task */
function generate_register_form ()
{
  return `
    <html>

      <head>
          <title>New Task</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>

      <body>

        <div class="w3-container w3-lime">
          <h2 class="w3-center">New Task</h2>
        </div>

        <br/><br/>
        <div class="w3-container w3-center">
          <form class="w3-container" action="/tasks" method="POST">
            <label class="w3-text-indigo"><b>ID</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="id">

            <br/>
            <label class="w3-text-indigo"><b>Date Created</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="dateCreated">

            <br/>
            <label class="w3-text-indigo"><b>Date Dued</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="dateDued">

            <br/>
            <label class="w3-text-indigo"><b>Who has to do it</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="who">

            <br/>
            <label class="w3-text-indigo"><b>What is it</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="what">

            <br/>
            <label class="w3-text-indigo"><b>Task Type</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="type">

            <br/>
            <label class="w3-text-indigo"><b>Status (either "Ongoing" or "Completed")
            </b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="status">

            <br/>
            <input class="w3-btn w3-blue-grey" type="submit" value="Add"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Reset"/> 

          </form>
        </div>

      </body>

    </html>
  `
}

exports.generate_register_form = generate_register_form;

/* generate_new_task_confirmed : template for page to be displayed
 * when a new task was successfuly created */
function generate_new_task_confirmed (task)
{
  return `
    <html>
      <head>
          <title>Task Added - ${task.id}</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>
      <body>
        <div class="w3-card-4">
          
          <header class="w3-container w3-lime">
            <h1>Task inserted!</h1>
          </header>

          <div class="w3-container w3-center" style="margin-top:5%;">
              <p><a href="/tasks/${task.id}">Access your page</a></p>
          </div>

          <div
            class="w3-indigo w3-panel w3-border w3-round-large"
            style="width: 25% !important; margin: auto; margin-top: 5%"
          >
            <p class="w3-center"><a href="/tasks">Go Back</a></p>
          </div>

        </div>
      </body>
    </html>
  `;
}

exports.generate_new_task_confirmed = generate_new_task_confirmed;

/* generate_delete_page : template for task deletion page */
function generate_delete_page ( )
{
  return `
    <html>

      <head>
        <title>Task Deleted</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
      </head>

      <body>
        <div class="w3-container w3-center w3-lime">
          <h2>Task successfuly deleted!</h2>
        </div>

          <div
            class="w3-indigo w3-panel w3-border w3-round-large"
            style="width: 25% !important; margin: auto; margin-top: 5%"
          >
            <p class="w3-center"><a href="/tasks">Go Back</a></p>
          </div>

      </body>

    </html>
  `;
}

exports.generate_delete_page = generate_delete_page;


/* edit_task_form : template for task alteration page */
function edit_task_form ( task )
{
  let html_page = `
     <html>

      <head>
          <title>Task Edit - ${task.id}</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>

      <body>

        <div class="w3-container w3-lime">
          <h2 class="w3-center">Edit Task (${task.id})</h2>
        </div>

        <br/><br/>

        <div class="w3-container w3-center">
          <form class="w3-container" action="/tasks" method="POST">
            <input type="hidden" name="_method" value="PUT"/>

            <label class="w3-text-indigo"><b>ID</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="id" value="${task.id}">

            <br/>
            <label class="w3-text-indigo"><b>Date Created</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="dateCreated" value="${task.dateCreated}">

            <br/>
            <label class="w3-text-indigo"><b>Date Dued</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="dateDued" value="${task.dateDued}">

            <br/>
            <label class="w3-text-indigo"><b>Who has to do it</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="who" value="${task.who}">

            <br/>
            <label class="w3-text-indigo"><b>What is it</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="what" value="${task.what}">

            <br/>
            <label class="w3-text-indigo"><b>Task Type</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="type" value="${task.type}">



            <label class="w3-text-indigo"><b>Status</b></label>
            <input style="width:50%; margin: auto; margin-top: 1%;"
            class="w3-input w3-border w3-light-grey w3-center" type="text"
            name="status" value="${task.status}">

            <input class="w3-btn w3-blue-grey" type="submit" value="Update"/>
          </form>
        </div>
      </body>

      </html>

  `;

  return html_page;
}

exports.edit_task_form = edit_task_form;

/* generate_edit_confirmed : template for page to be displayed
 * when a task was successfuly edited */
function generate_edit_confirmed ()
{
  return `
    <html>

      <head>
          <title>Task Altered</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>
    
      <body>

        <div class="w3-card-4">
          
          <header class="w3-container w3-lime">
            <h1>Task altered!</h1>
          </header>

          <div
            class="w3-indigo w3-panel w3-border w3-round-large"
            style="width: 25% !important; margin: auto; margin-top: 5%"
          >
            <p class="w3-center"><a href="/tasks">Go Back</a></p>
          </div>

        </div>

      </body>
    
    </html>

  `;
}

exports.generate_edit_confirmed = generate_edit_confirmed;

/* generate_clear_page : template for page to be presented
 * when all completed tasks are deleted from the database */
function generate_clear_page ()
{
  return `
    <html>

      <head>
          <title>Tasks Cleared</title>
          <meta charset="utf-8"/>
          <link rel="icon" href="favicon.ico"/>
          <link rel="stylesheet" href="w3.css"/>
      </head>
    
      <body>

        <div class="w3-card-4">
          
          <header class="w3-container w3-lime">
            <h1>Task Cleared!</h1>
          </header>

          <div
            class="w3-indigo w3-panel w3-border w3-round-large"
            style="width: 25% !important; margin: auto; margin-top: 5%"
          >
            <p class="w3-center"><a href="/tasks">Go Back</a></p>
          </div>

        </div>

      </body>
    
    </html>

  `;
}

exports.generate_clear_page = generate_clear_page;