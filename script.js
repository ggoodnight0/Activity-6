// script.js

function initPlanner() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    loadEvents();
  
    $(".saveBtn").on("click", saveEvent);
  
    applyTimeBlockClasses();
  }
  
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id").split("-")[1];
      var savedEvent = localStorage.getItem(`event_${hour}`);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }
  
  function saveEvent() {
    var hour = $(this).closest(".time-block").attr("id").split("-")[1];
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(`event_${hour}`, eventText);
  }
  
  function applyTimeBlockClasses() {
    var currentHour = dayjs().hour();
  
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  
  $(document).ready(function () {
    initPlanner();
  });