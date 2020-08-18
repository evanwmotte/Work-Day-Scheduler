$(document).ready(function() {

   $("#currentDay").text(moment().format('MMMM Do YYYY'));
   var timedClass;
   var calendarTime = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
   var currentTime = moment().format('HH');
   var amOrPm = "";
   console.log(currentTime);
   var textValue = "";

   var toDoArray2 = JSON.parse(localStorage.getItem("toDoArray2")) || [];

    for ( i = 0; i < calendarTime.length; i++) {

        if (toDoArray2[i] != null) {
            textValue = toDoArray2[i].toDo;
        } else {
            textValue = "";
        }
        if (calendarTime[i] < 12) {
            amOrPm = "am";
        } else {
            amOrPm = "pm";
        }
        if (calendarTime[i] < parseInt(currentTime)) {
            timedClass = "past";
        }
         if (calendarTime[i] == parseInt(currentTime)) {
            timedClass = "present";
        }   
         if (calendarTime[i] > parseInt(currentTime)) {
            timedClass = "future";
        }
         if (calendarTime[i] > 12) {
            calendarTime[i] -= 12;
        }

        $("#timeblocks").append(`<div  class="row" id="row${i}"></div>`);
        $(`#row${i}`).append(`<label id ="time${i}" class = "hour"> ${calendarTime[i]} ${amOrPm}</label>`);
        $(`#row${i}`).append(`<textarea class = " textarea  ${timedClass}" type="text" id="${i}" name="text${i}"> ${textValue} </textarea>`);
        $(`#row${i}`).append(`<button type="button" class = "saveBtn" id="saveBtn${i}"> Save </button><br>`);

        
    }

    $(`.saveBtn`).click(function() {
        var prevIdValue = $(this).prev().val();
        var prevId = $(this).prev().attr('id');
        var toDoArray = {

            "toDo" : prevIdValue,
            "id" : prevId            
        }
        if (toDoArray2[prevId] = toDoArray.id) {
            toDoArray2.splice(prevId, 1, toDoArray)
        } else {
            toDoArray2.push(toDoArray)
        }        
        console.log(toDoArray2)

        localStorage.setItem("toDoArray2", JSON.stringify(toDoArray2));

        })


});
