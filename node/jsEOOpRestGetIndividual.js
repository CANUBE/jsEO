/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var jsEOOpRestGetIndividual = new Class({
    Extends: jsEOOperator,
    numIndividuals: 1,
    initialize: function(_appRate) {
        this.parent(_appRate);
        if (typeof _numIndividuals === 'undefined' || !_numIndividuals) {
            _numIndividuals = 1;
        }
        this.numIndividuals = 1;
        jsEOUtils.debugln("Initializing a jsEOOpGetIndividuals " +
                " with applicationRate " + this.applicationRate +
                ", numIndividuals " + this.numIndividuals
                );

    },
    getNumIndividuals: function() {
        return this.numIndividuals;
    },
    operate: function(_auxPop) {
        var toRet = new jsEOPopulation();
        /*
         for (var j = 0; j < this.numIndividuals; ++j) {
         var tmpInd = Math.floor(Math.random() * _auxPop.length());
         for (var i = 1; i < this.tournamentSize; ++i) {
         rnd = Math.floor(Math.random() * _auxPop.length());
         jsEOUtils.debugln("  Comparando  " +
         _auxPop.getAt(rnd).getFitness() +
         " con " + _auxPop.getAt(tmpInd).getFitness());
         tmpInd = (_auxPop.getAt(rnd).gt(_auxPop.getAt(tmpInd))) ? rnd : tmpInd;
         }
         jsEOUtils.debugln("  Final  " + _auxPop.getAt(tmpInd).getFitness());
         toRet.add(_auxPop.getAt(tmpInd).copy());
         }
         */
        var data2bSend = "data=" + jsEOUtils.getProblemId();
        jsEOUtils.debugln("  Sending a RestGetIndividual request with " + data2bSend);
        try {
            new Request.JSON({
                //url: jsEOUtils.getGetURL()+"/best_of_problem/"+jsEOUtils.getProblemId(),
		url: jsEOUtils.getGetURL()+"/best_of_problem/rr",
                method: 'GET',
                async: false,
                timeout: 1000,
                data: "",
                onSuccess: function(responseJSON, responseText) {
                    jsEOUtils.debugln('jsEOOpRestGetIndividual: Getting individuals connection response: ' +
                            responseText);
                    // Processing the individual
                    if( !responseText ) {return null;}
                    var tmpInd = new jsEOIndividual();
		    tmpInd.setChromosome(responseJSON.chromstring);
                    tmpInd.setFitness(responseJSON.fitness);
                    jsEOUtils.debugln("jsEOOpRestGetIndividual: Adding the individual");
                    toRet.add(tmpInd);
                },
                onTimeout: function() {
                    jsEOUtils.debugln("jsEOOpRestGetIndividual: Timeout while conecting to " +
                            jsEOUtils.getSendURL());
                    this.cancel();
                },
                onFailure: function() {
                    this.cancel();
                    jsEOUtils.debugln("jsEOOpRestGetIndividual: Failure while conecting to " +
                            jsEOUtils.getSendURL());
                }

            }).send();
        } catch (err) {
            jsEOUtils.debugln("jsEOOpRestGetIndividual: Error captured! ");
            return toRet=_auxPop;
        }
        /*
         var data2bSend = "data=" + jsEOUtils.getProblemId() + ",";
         var tmpPop = "";
         for (var i = 0; i < this.numIndividuals; ++i) {
         if (i > 0) {
         tmpPop += ",";
         }
         var tmpChr = _auxPop.getAt(i).getChromosome();
         if (Object.prototype.toString.call(tmpChr) === '[object Array]') {
         for (var j = 0; j < tmpChr.length; ++j) {
         if (j > 0) {
         tmpPop += ",";
         }
         tmpPop += tmpChr[j];
         }
         } else {
         tmpPop += tmpChr;
         }
         
         tmpPop += "," + _auxPop.getAt(i).getFitness();
         }
         
         data2bSend += tmpPop;
         */
        return toRet;
    }
});

