/*
	 File: https://vanhauml.github.io/Comp4610_a7/js/mtable.js
     Assignment 7: Using the jQuery Validation Plugin with Your Dynamic Table
	 Course: COMP4610 GUI I
	 Name: Van Ha, Senior UMass Lowell EE/CS Student
	 Email: van_ha@student.uml.edu
	 Copyright 2018 by Van Ha
	 Date Updated: 11/25/2018

    Javascript file for Interactive Dynamic Table page with
    jQuery Validation plugin.

*/

// validates input of form to be integers only
$(document).ready(function () {

    // additional methods used to make sure low values are less than high values
    $.validator.addMethod("less_than", function (value, element, param) {
        if ($(param).val() == "") {
            return true;
        }
        return parseInt(value) <= parseInt($(param).val());
    });

    $.validator.addMethod("greater_than", function (value, element, param) {
        if ($(param).val() == "") {
            return true;
        }
        return parseInt(value) >= parseInt($(param).val());
    });

    /* validation of form inputs*/
   $('#multiplicationTableForm').validate({
        rules: {
          lowColVal: {
              required: true,
              integer: true,
              less_than: "#highColVal"
          },
          highColVal: {
              required: true,
              integer: true,
              greater_than: "#lowColVal"
          },
          lowRowVal: {
              required: true,
              integer: true,
              less_than: "#highRowVal"
          },
          highRowVal: {
              required: true,
              integer: true,
              greater_than: "#lowRowVal"
          }
        },
        /* error messages for invalid input fields */
        messages: {
          lowColVal: {
            required: "This field is required.",
            integer: "Enter an integer for the low column value.",
            less_than: "Value must be lower than high value."
        },
          highColVal: {
            required: "This field is required.",
            integer: "Enter an integer for the high column value.",
            greater_than: "Value must be greater than low value."
          },
          lowRowVal: {
            required: "This field is required.",
            integer: "Enter an integer for the low row value.",
            less_than: "Value must be lower than high value."
          },
          highRowVal: {
            required: "This field is required.",
            integer: "Enter an integer for the high row value.",
            greater_than: "Value must be greater than low value."
          }
        },
        errorElement: "div",
        submitHandler: function(form) {
            makeTable();
        },
    });
});

/* creates multiplication table */
function makeTable() {
   var xLow = parseInt(document.getElementById("lowColVal").value);
   var xHigh = parseInt(document.getElementById("highColVal").value);
   var yLow = parseInt(document.getElementById("lowRowVal").value);
   var yHigh = parseInt(document.getElementById("highRowVal").value);

   clearAll();
   var addition = "";
   

    addition += "<table>";
    for (var i = yLow - 1; i <= yHigh; i++) {
        addition += "<tr>";

        for (var j = xLow - 1; j <= xHigh; j++) {
            if (i < yLow && j < xLow) {
                addition += "<th></th>";
            }
            else if (i < yLow) {
                addition += "<th>" + j + "</th>";
            }
            else if (j < xLow) {
                addition += "<th>" + i + "</th>";
            }
            else {
                addition += "<td>" + (i * j) + "</td>";
            }
        }

        addition += "</tr>";
    }
    addition += "</table>";
    writeOut(addition);
}

/* writes to HTML file */
function writeOut(add) {
    document.getElementById("table").innerHTML = add;
}

/* clears section of HTML javascript writes to*/
function clearAll() {
    writeOut("");
}