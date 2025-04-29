//// app.js
//
//function onPageLoad() {
//    console.log("Document loaded");
//    var url = "http://127.0.0.1:5000/get_location_names"; // Flask server se location names laa rahe hain
//
//    $.get(url, function(data, status) {
//        console.log("Got response for get_location_names request");
//        if (data) {
//            var locations = data.locations;
//            var locationSelect = document.getElementById("location"); // dropdown ka ID 'location' hai
//
//            $('#location').empty(); // pehle dropdown ko empty karo (optional)
//
//            for (var i in locations) {
//                var opt = new Option(locations[i]);
//                $('#location').append(opt);
//            }
//        }
//    });
//}
//
//// Ye ensure karega ki jab pura page load ho jaye tab function chale
//window.onload = onPageLoad;

// app.js

// app.js

function onPageLoad() {
    console.log("Document loaded");

    var url = "http://127.0.0.1:5000/get_location_names";  // Flask API endpoint

    $.get(url, function(data, status) {
        console.log("Got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var locationSelect = document.getElementById("location");

            // Clear existing options
            locationSelect.innerHTML = "";

            // Add default option
            var defaultOption = document.createElement("option");
            defaultOption.text = "Select Location";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            locationSelect.appendChild(defaultOption);

            // Add locations to dropdown
            for (var i in locations) {
                var opt = document.createElement("option");
                opt.text = locations[i];
                opt.value = locations[i];
                locationSelect.appendChild(opt);
            }
        }
    });
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("total-sqrt").value;
    var bhk = document.getElementById("bedroom").value;
    var bath = document.getElementById("bathroom").value;
    var location = document.getElementById("location").value;
    var url = "http://127.0.0.1:5000/predict_home_price";  // Flask API endpoint

    // Validation (optional but good)
    if (!sqft || !bhk || !bath || !location) {
        alert("Please fill all the fields properly.");
        return;
    }

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: parseInt(bhk),
        bath: parseInt(bath),
        location: location
    }, function(data, status) {
        console.log("Got response for predict_home_price request");
        console.log(data.estimated_price);

        if (data.estimated_price) {
            var estPrice = data.estimated_price.toFixed(2);  // 2 decimal points
            document.getElementById("estimatedPrice").innerHTML = "Estimated Price: ₹ " + estPrice + " Lakhs";
        } else {
            document.getElementById("estimatedPrice").innerHTML = "Unable to predict the price. Please try again.";
        }
    });
}

// When page loads, call onPageLoad
window.onload = onPageLoad;

