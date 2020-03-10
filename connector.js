/* SAMPLE WEB DATA CONNECTOR JS: https://github.com/tableau/webdataconnector/blob/master/Examples/js/earthquakeUSGS.js */
/* global tableau reqwest */

(function() {
    // Dark Sky API Key
    var API_KEY = "c5a50d083981d1ecad8c5b22c76d2762";
    // Location of forecast (currently Hillsboro Airport, because there's a weather station there)
    var LOCATION = "45.535122,-122.948361";
    
    /* Schema for data to get from Dark Sky JSON */
    // id: attribute in Dark Sky JSON
    // alias: name of data value in Tableau table
    // dataType: Data type of value (see all at https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.datatypeenum)
    
    // Put column objects in this array! See the documentation above, along with the sample web data connector, for more info.
    let cols = [];
    
    // Create the connector object
    var connector = tableau.makeConnector();

    // Define schema
    connector.getSchema = surfaceSchema => {
        /* Create schema with columns & some other attributes */
        // alias: Name of Data Source in Tableau
        var tableSchema = {
            id: "darkskyData",
            alias: "Weather",
            columns: cols
        };

        // Surface schema to Tableau
        surfaceSchema([tableSchema]);
    };

    // Download and format data
    connector.getData = (table, done) => {
        // Get data (gets 7-day hourly forcast (extended); excludes all other data)
        // Format: JSON-P
        // URL: `https://api.darksky.net/forecast/${API_KEY}/${LOCATION}?extend=hourly&exclude=currently,minutely,daily,alerts,flags`

        // A reqwest call should go here! See https://github.com/ded/reqwest for documentation as to how this library works.
    };

    // Surface connector to tableau library
    tableau.registerConnector(connector);
    
    // Run ready() when everything is loaded
    if (document.readyState != 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }


    // Create event listener for when user requests data
    function ready() {
        document.getElementById("submitButton").addEventListener("click", () => {
            // Set data source name
            tableau.connectionName = "Dark Sky Connector";
            // Submit connector to Tableau
            tableau.submit();
        });
    }

    function requestSuccess(response, table, done) {
        // Put your table row objects in here
        let tableData = [];

        // Format data objects in response and put them in tableData here!


        // Send data to Tableau and mark as complete
        table.appendRows(tableData);
        done();
    }
    
})();