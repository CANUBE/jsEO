#!/usr/bin/node

var express = require('express');
var app = express();
var problems = new Object;

app.get('/', function(req, res){
  res.send('hello world');
});

app.put('/problem/:id', function(req,res) {
	    problems[req.params.id] = new Array;
	    res.send( { created: req.params.id } );
});

app.put('/problem/:id/chromosome/:chrom/fitness/:fitness', function(req,res) {
	    var new_chrom = { chromstring: req.params.chrom,
			      fitness: req.params.fitness };
	    problems[req.params.id].push( new_chrom ) ;
	    res.send( { created: new_chrom } );
});

app.get('/chromosomes_problem/:id', function(req,res) {
	    res.send( problems[req.params.id] );
});

app.listen(3000);