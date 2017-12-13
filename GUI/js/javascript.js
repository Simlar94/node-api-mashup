$(document).ready(function() {
    
    var urlTest = "";

    // Handle data from self made API.
    $.getJSON("https://eu.api.battle.net/d3/profile/Toxic-1141/?locale=en_GB&apikey=g8cgut9qnsfhm2mjt3ggq2axd8pea76j", function(data) {
        
        var json = data.heroes;
        
        for (var i = 0; i < json.length; i++) {
            
            var name = json[i].name;
            var classes = json[i].class;
            var level = json[i].level;
            var paragonLevel = json[i].paragonLevel;
            var kills = json[i].kills.elites;
            
            console.log(name);
            var tr = $("<tr/>");
            tr.append("<td>" + name + "</td>");
            tr.append("<td>" + classes + "</td>");
            tr.append("<td>" + level + "</td>");
            tr.append("<td>" + paragonLevel + "</td>");
            tr.append("<td>" + kills + "</td>");
            tr.append("<td><form method='POST' action='"+ urlTest +"'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='class' value='" + classes + "'/><input type='hidden' name='level' value='" + level + "'/><input type='hidden' name='paragonLevel' value='" + paragonLevel + "'/><input type='hidden' name='kills' value='" + kills + "'/><input class='add' type='submit' value='+'/></form></td>");
            $(".table-left").append(tr);

            
        };
    });
});