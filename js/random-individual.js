#!/usr/bin/env node

require('mootools');
var fs = require('fs');

var jsEO_code=fs.readFileSync('./libs/jsEO/core/jsEO.js', "utf8" ); 
eval(jsEO_code);

var jsEOUtils_code=fs.readFileSync('./libs/jsEO/core/jsEOUtils.js', "utf8" ); 
eval(jsEOUtils_code);

var jsEOIndividual_code = fs.readFileSync('./libs/jsEO/core/jsEOIndividual.js',"utf8");
eval( jsEOIndividual_code );

var jsEOBSIndividual_code = fs.readFileSync('./libs/jsEO/jsEOBitString/jsEOBSIndividual.js',"utf8");
eval(jsEOBSIndividual_code);

var one = new jsEOBSIndividual;
one.randomize(256);

console.log(one);