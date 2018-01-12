module.exports = function() {
    var d = new Date();
    var currentDate = d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear(); // Current date.
    var currentTime = d.getHours() + ":" + d.getMinutes(); // Current time.
    var dateAndTime = currentDate + " | " + currentTime; // Current date and time combined.
    
    console.log("Current date and time: " + dateAndTime);
}