$(document).ready(function () {

    var urlTest = "http://localhost:3000/testdb";
    var randNumMax = 49429; // Number of different available item id:s on GW2:s open API.
    var itemIdResult = Math.floor(Math.random() * randNumMax); //Generates a random item id.
    var itemIdResultStr = itemIdResult.toString(); //Converts the result from itemIdResult to a string.
    var battleTag = ["Toxic-1141", "Oaklander-2383", "Kevinhawk-1223", ];


    // Handle data from external API (Blizzard Diablo 3).
    $.getJSON("https://eu.api.battle.net/d3/profile/" + battleTag[0] + "/?locale=en_GB&apikey=g8cgut9qnsfhm2mjt3ggq2axd8pea76j", function (data) {

        var json = data.heroes;

        for (var i = 0; i < json.length; i++) {

            var name = json[i].name;
            var classes = json[i].class;
            var level = json[i].level;
            var paragonLevel = json[i].paragonLevel;
            var kills = json[i].kills.elites;


            var tr = $("<tr/>");
            tr.append("<td>" + name + "</td>");
            tr.append("<td>" + classes + "</td>");
            tr.append("<td>" + level + "</td>");
            tr.append("<td>" + paragonLevel + "</td>");
            tr.append("<td>" + kills + "</td>");
            tr.append("<td><form method='POST' action='" + urlTest + "'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='class' value='" + classes + "'/><input type='hidden' name='level' value='" + level + "'/><input type='hidden' name='paragonLevel' value='" + paragonLevel + "'/><input type='hidden' name='kills' value='" + kills + "'/><input class='add' type='submit' value='+'/></form></td>");
            $(".table-left").append(tr);


        };
    });


    $.getJSON("https://eu.api.battle.net/d3/profile/" + battleTag[1] + "/?locale=en_GB&apikey=g8cgut9qnsfhm2mjt3ggq2axd8pea76j", function (data) {

        var json = data.heroes;

        for (var i = 0; i < json.length; i++) {

            var name = json[i].name;
            var classes = json[i].class;
            var level = json[i].level;
            var paragonLevel = json[i].paragonLevel;
            var kills = json[i].kills.elites;


            var tr = $("<tr/>");
            tr.append("<td>" + name + "</td>");
            tr.append("<td>" + classes + "</td>");
            tr.append("<td>" + level + "</td>");
            tr.append("<td>" + paragonLevel + "</td>");
            tr.append("<td>" + kills + "</td>");
            tr.append("<td><form method='POST' action='" + urlTest + "'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='class' value='" + classes + "'/><input type='hidden' name='level' value='" + level + "'/><input type='hidden' name='paragonLevel' value='" + paragonLevel + "'/><input type='hidden' name='kills' value='" + kills + "'/><input class='add' type='submit' value='+'/></form></td>");
            $(".table-left2").append(tr);


        };
    });

    /*
        
        $.getJSON("https://api.guildwars2.com/v2/items/" + itemIdResultStr + "?access_token=<9E5B066A-3FD8-084B-87D4-8BA28AFB6EF91BBEFFB5-6BDF-4F49-9853-F7EC76E6F79F>", function(data) {
            
            console.log(data.name);
            
            var json = data;
            
            for (var i = 0; i < json.length; i++) {
                
                var name = json[i].name;
                var classes = json[i].class;
                var level = json[i].level;
                var paragonLevel = json[i].paragonLevel;
                var kills = json[i].kills.elites;
                
                var tr = $("<tr/>");
                tr.append("<td>" + name + "</td>");
                tr.append("<td>" + classes + "</td>");
                tr.append("<td>" + level + "</td>");
                tr.append("<td>" + paragonLevel + "</td>");
                tr.append("<td>" + kills + "</td>");
                tr.append("<td><form method='POST' action='"+ urlTest +"'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='class' value='" + classes + "'/><input type='hidden' name='level' value='" + level + "'/><input type='hidden' name='paragonLevel' value='" + paragonLevel + "'/><input type='hidden' name='kills' value='" + kills + "'/><input class='add' type='submit' value='+'/></form></td>");
                $(".table-left2").append(tr);

                
            };
        });
        */

    //Handle JSON-data from my own database.
    $.getJSON("http://localhost:3000/testdb", function (data) {

        for (var i = 0; i < data.length; i++) {
            var tr = $("<tr/>");
            tr.append("<td class='id' style='display: none;'>" + data[i]._id + "</td>");
            tr.append("<td>" + data[i].name + "</td>");
            tr.append("<td>" + data[i].class + "</td>");
            tr.append("<td>" + data[i].level + "</td>");
            tr.append("<td>" + data[i].paragonLevel + "</td>");
            tr.append("<td>" + data[i].kills + "</td>");
            tr.append("<td width='10%'><button type='button' class='del'>" + "x" + "</button></td>");
            $(".table-right").append(tr);

            $(".del").click(function () {
                // Get current row's ID.
                var row = $(this).closest("tr"); // Find the row.
                var id = row.find(".id").text(); // Find the row's content (ID).

                // Configure and execute DELETE request.
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:3000/testdb/" + id
                }).then(function () {
                    window.location.reload(); // Reload window after deletion.
                });
            });
        };
    });





});
