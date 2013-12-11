#!/usr/bin/node

var fs=require('fs');
var express = require('express');
var app = express();
var problems = new Object;
app.use(express.urlencoded());
app.use(express.json());    

app.get('/', function(req, res){
  res.sendfile('256_royal_road.html');
});

app.get('/js/:file', function(req, res){
	    var file_name = req.params.file.split(/\./);
	    var path = file_name[file_name.length-2];
	    res.sendfile(path+'.js');
});

app.put('/problem/:id', function(req,res) {
	    problems[req.params.id] = new Array;
	    res.send( { created: req.params.id } );
});

app.put('/problem/:id/chromosome/:chrom/fitness/:fitness', function(req,res) {
	    var new_chrom = { chromstring: req.params.chrom,
			      fitness: req.params.fitness };
	    problems[req.params.id].push( new_chrom ) ;
	    console.log("PUT "+JSON.stringify(new_chrom));
	    res.send( { created: new_chrom } );
});

app.post('/problem/:id', function(req,res) {
	     console.log(req.body);
	    var new_chrom = { chromstring: req.body.chromstring,
			      fitness: req.body.fitness };
	    problems[req.params.id].push( new_chrom ) ;
	    console.log("POST "+JSON.stringify(new_chrom));
	    res.send( { created: new_chrom } );
});

app.get('/chromosomes_problem/:id', function(req,res) {
	    res.send( problems[req.params.id] );
});

app.get('/best_of_problem/:id', function(req,res) {
	    var best_of_problem =  best_of( problems[req.params.id] ) ;
	    console.log("GET best_of_problem: "+JSON.stringify(best_of_problem));
	    res.send(best_of_problem);
});

app.listen(3000);


function best_of( un_array ) {
    var best_so_far= { chromstring: null,
		       fitness: -1 };

    for ( var i in un_array ) {
	if ( un_array[i].fitness > best_so_far.fitness ) {
	    best_so_far = un_array[i];
	}
    }
    return best_so_far;
    
}