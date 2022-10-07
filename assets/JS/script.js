var body = $("i");
var timeDateDisplay = document.getElementById("currentDay");
var now = moment().format("HH");
var nowInt = Number(now);

function displayTimeDate() {
  var timeDate = moment().format("dddd MMM Do, YYYY  h:mm:s a");
  timeDateDisplay.textContent = timeDate;
  setTimeout(function () {
    displayTimeDate();
  }, 1000);
}
displayTimeDate();

for (let i = 9; i < 18; i++) {
  if (nowInt > i) {
    $("[data-hour='" + i + "']").addClass("past");
  } else if (nowInt === i) {
    $("[data-hour='" + i + "']").addClass("present");
  } else {
    $("[data-hour='" + i + "']").addClass("future");
  }
}

function loadEvents() {
  for (i = 9; i < 18; i++) {
    if (localStorage.getItem(i) !== null) {
      let storedEvent = localStorage.getItem(i)
      let currentEvent = $("[data-hour='" + i + "']")
      currentEvent[0].children[1].value = JSON.parse(storedEvent).description

    }
  }
}

function saveEvents(event) {
  var hourBlock = event.target.parentElement.parentElement.getAttribute("data-hour");
  console.log(hourBlock);
  var eventDescription = event.target.parentElement.parentElement.children[1].value;
  console.log(eventDescription)
  localStorage.setItem(hourBlock, JSON.stringify({time: hourBlock, description: eventDescription}))
}

loadEvents()
body.on("click", saveEvents);