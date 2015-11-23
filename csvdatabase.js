
/* 
 *  CSVDatabase
 */

// packages
var argumentParser = require("node-argument-parser");
var fs = require("fs");
var path = require("path");
var util = require("util");
var config = require("./config.json");

// prototypes
var content;

// argument parser
var argv = argumentParser.parse("./arguments.json", process);
// default csv value
if (argv.csfile !== null)
  argv.csvfile = config.defaults.csvfile;
var csvFilePath = path.join(__dirname,argv.csvfile);

////////////////////////////////////////////////////////////////////////////
function getSearchDict (searchString) {
  var crazyPlaceHolderString = "%*)@#@#@#@#@#*@&&@";
  searchString = searchString.replace("\\=",crazyPlaceHolderString);
  search = searchString.split("=");

  for (var i = 0; i < search.length; i++) {
    search[i] = search[i].replace(crazyPlaceHolderString,'=');
  }
  return search;
}

////////////////////////////////////////////////////////////////////////////
function resultObject (columns,row) {
  var result = {};
  for (var c in columns) {
    if (c < row.length)
      result[columns[c]] = row[c];
    else 
      result[columns[c]] = null;
  }
  return result;
}

////////////////////////////////////////////////////////////////////////////
function searchCSV (csvData,searchString) {
  if (typeof csvData === 'undefined' || csvData === null)
    throw new Error("CSV is undefined. Try using --csvdata");

  if (typeof searchString === 'undefined' || searchString === null)
    throw new Error("Search is undefined. Try use --search");

  if (csvData.split("\n").length < 2)
    throw new Error("CSV is does not contain any data");

  if (searchString.split("=").length != 2)
    throw new Error("Search string has incorrect syntax. Please use \"key=value\" format");

  var rows = csvData.split("\n");
  var columnHeaders = rows.shift().split(',');
  var search = getSearchDict(searchString);
  var columnIndex = columnHeaders.indexOf(search[0]);
  var searchValue = search[1];

  if (columnIndex === -1)
    throw new Error("Search key is not a column in the CSV database");

  var results = {
    'response':false,
    'column': search[0],
    'value': search[1],
    'results':[]
  };

  for (var r in rows) {
    var row = rows[r].split(',');
    if (row[columnIndex] === searchValue) {
      results['response'] = true; 
      resultObj = {};
      results['results'].push(resultObject(columnHeaders,row));
    }
  }
  
  return JSON.stringify(results,null,"\t");
}

////////////////////////////////////////////////////////////////////////////
if (argv.help !== true) {
  fs.readFile(csvFilePath,"utf8",function(err,data){
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(searchCSV(data,argv.search));
  });
}

