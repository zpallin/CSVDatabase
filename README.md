
# CSVDatabase

## Purpose

A simple implementation of a CSVDatabase. You can store data in a csv and search for matching values in the database by performing a simple text match search.

This is not intended to be used for production purposes. This is only for practice.

## Options

Usage: node /Users/Zeppelin/Programs/CSVDatabase/csvdatabase.js [options argument]

Options:

  -c, --csvfile Take parameter of csv file (expects value)
  -s, --search  Take a search string as key=value (expects value)

Example:
 node /Users/Zeppelin/Programs/CSVDatabase/csvdatabase.js --csvfile sampleValue -s sampleValue

CSVDatabase

## Instructions

Use -c in the command line to reference a csv file. Use -s to perform a search. A test csv has been provided. Try running `node csvdatabase.js -s name=zpallin` to see a sample result.

## Release

Apache License 2.0 to zpallin
