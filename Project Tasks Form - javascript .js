/******************************************/
/************** פרויקט - 1 ***************/
/*********** טופס ג'אווה סקריפט *********/
/**************** יובל דוד ***************/
/*****************************************/

/* הגדרת מערך שיחיל את כל המשימות */
let tasksList = [];

/* הגדרת 3 משתנים: משימה, תאריך וזמן */
let task, date, time;


/* הגדרת הפונקציה שתתבצע בשמירת הטופס */
/* שמירת המשימה בזיכרון והצגתה בפתק */
function saveTask() {
    task = document.getElementById("task").value;
    date = document.getElementById("date").value;
    time = document.getElementById("time").value;

    /*הגדרת אובייקט שיכיל כל משימה שנשמרת*/
    const newTask = {
        "Task": task,
        "Date": date,
        "Time": time,
    };


    /* ולידציה */
    if (task == "" || date == "") {
        alert("Please enter a task and the date!");
    }
    else {

        /*הוספת משימה למערך המכיל את כל המשימות*/
        tasksList.push(newTask);

        /*שמירת המשימות בזיכרון*/
        localStorage.setItem("AllTasks", JSON.stringify(tasksList));

        /*קריאה לפונקציה שיוצרת פתק*/
        createNotes(newTask, tasksList.length - 1);

    }

}


function createNotes(newNote, currIndex) {

    /*יצירת פתק שיכיל את המשימה*/
    /*קישור לדיב הקיים שמכיל את כל האיזור בו יכנסו הפתקים*/
    const containerNotes = document.getElementById("container-notes");
    /*דיב שיכיל את המשימה*/
    const noteDiv = document.createElement("div");
    containerNotes.appendChild(noteDiv);

    /*הגדרת מחלקה לעיצוב הפתק*/
    noteDiv.setAttribute("class", "noteDiv");
    noteDiv.id = currIndex;

    /*יצירת דיב לכל אחד מהפריטים, שיהיה תחת הדיב של הפתק*/

    /*יצירת דיב שיכיל את תוכן המשימה*/
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = newNote.Task;
    noteDiv.appendChild(taskDiv);

    /*הגדרת עיצוב לטקסט המשימה*/
    taskDiv.setAttribute("class", "taskDiv");

    /*דיב שיכיל את התאריך*/
    const dateDiv = document.createElement("div");
    dateDiv.innerHTML = newNote.Date;
    noteDiv.appendChild(dateDiv);

    /*הגדרת מחלקה לעיצוב התאריך */
    dateDiv.setAttribute("class", "dateDiv");

    /*דיב שיכיל את הזמן*/
    const timeDive = document.createElement("div");
    timeDive.innerHTML = newNote.Time;
    noteDiv.appendChild(timeDive);

    /*הגדרת מחלקה לעיצוב הזמן*/
    timeDive.setAttribute("class", "timeDiv");

    /* יצירת אלמנט  שיכיל את האייקון של מחיקת משימה*/
    const xIcon = document.createElement("div");
    noteDiv.appendChild(xIcon);
    xIcon.innerHTML = `<span>x<span>`;

    xIcon.setAttribute("class", "xIcon");

    noteDiv.addEventListener("mouseover", function (event) {
        xIcon.style = "opacity : 1";
    })

    noteDiv.addEventListener("mouseout", function (event) {
        xIcon.style = "opacity : 0"
    })

    /* אירוע למחיקת הפתק מהזיכרון */
    xIcon.addEventListener("click", function () {
        removeNote(noteDiv);
    });

}

/* פונקציה למחיקת פתק */
function removeNote(div) {

    div.remove();
    tasksList.splice(div.id, 1);
    localStorage.setItem('AllTasks', JSON.stringify(tasksList));
}


/* פונקציה לשמירת הפתקים אחרי רענון/ יציאה מהאתר */

function loadTasks() {
    let tasksListSave = JSON.parse(localStorage.getItem("AllTasks"));

    if (tasksListSave != null && tasksListSave.length > 0) {
        for (let i = 0; i < tasksListSave.length; i++) {
            createNotes(tasksListSave[i], i);
        }

        tasksList = tasksListSave;

    }

}



