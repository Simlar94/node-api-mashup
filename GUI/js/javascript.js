$(document).ready(function () {
//Skolan: 192.168.48.136
//Hemma: 192.168.1.10
    var APIUrl = "https://api.nasa.gov/planetary/apod?api_key=9B4Qpd8fTil57gHOvsehQ2dwXnoXva9f4q2FsGUn"
    var DBUrl = "http://localhost:3000/testdb"; //On Pi: 192.168.48.248:3000/testdb, http://localhost:3000/testdb, home:http://192.168.1.10:3000/testdb
    var APIDataExists = false;
    var DBDataExists = false;


    $.getJSON(APIUrl, function (data) {

        var title = data.title;
        var explanation = data.explanation;
        var copyright = data.copyright;
        var date = data.date;
        var img = data.hdurl;

        var tr = $("<tr/>");
        tr.append("<td>" + title + "</td>");
        tr.append("<td><img src='" + img + "' style='width: 100%'></td>");
        tr.append("<td>" + explanation + "</td>");
        tr.append("<td>" + copyright + "</td>");
        tr.append("<td>" + date + "</td>");
        tr.append("<td><form method='POST' action='" + DBUrl + "'><input type='hidden' name='title' value='" + title + "'/><input type='hidden' name='explanation' value='" + explanation + "'/><input type='hidden' name='copyright' value='" + copyright + "'/><input type='hidden' name='img' value='" + img + "'/><input type='hidden' name='date' value='" + date + "'/><input class='add' type='submit' value='+'/></form></td>");
        $(".table-left3").append(tr);

    });


    //Handle JSON-data from my own database.
    $.getJSON(DBUrl, function (data) {
        
        console.log(data[0].time);


        for (var i = 0; i < data.length; i++) {
            var title = data[i].title;
            var explanation = data[i].explanation;
            var copyright = data[i].copyright;
            var date = data[i].date;
            var img = data[i].img;
            var id = data[i]._id;
            var time = data[i].time;

            var tr = $("<tr/>");
            tr.append("<td class='id' style='display:none'>" + id + "</td>");
            tr.append("<td>" + title + "</td>");
            tr.append("<td><img src='" + img + "' style='width: 100%'></td>");
            tr.append("<td>" + explanation + "</td>");
            tr.append("<td>" + copyright + "</td>");
            tr.append("<td>" + date + "</td>");
            tr.append("<td>" + time + "</td>");
            tr.append("<td width='10%'><center><button type='button' class='del'>" + "x" + "</button></center></td>");
            $(".table-right").append(tr);

        };
        
                    $(".del").click(function () {
                // Get current row's ID.
                var row = $(this).closest("tr"); // Find the row.
                var id = row.find(".id").text(); // Find the row's content (ID).

                // Configure and execute DELETE request.
                $.ajax({
                    type: "DELETE",
                    url: DBUrl + "/" + id
                }).then(function () {
                    window.location.reload(); // Reload window after deletion.
                });
            });
    });

    function APITableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table-left3 tr").length > 1) {
            //If rows is more than 1, make boolean true.
            APIDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (APIDataExists) {
                var exists = "API-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "API-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function(fromResolve) {
            console.log(fromResolve);
        }).catch(function(fromReject) {
            alert(fromReject);
        }); 

    };


    function DBTableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table-right tr").length > 1) {
            //If rows is more than 1, make boolean true.
            DBDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (DBDataExists) {
                var exists = "Database-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "Database-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function(fromResolve) {
            console.log(fromResolve);
        }).catch(function(fromReject) {
            alert(fromReject);
        }); 

    };
    //Call after 2 seconds to let tables find data.
    setTimeout(APITableCheck, 2000);
    setTimeout(DBTableCheck, 2000);

});
