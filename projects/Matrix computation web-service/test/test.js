var date = new Date();

var getTime = function(){
	return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

var log = function(string){
	if (string === undefined){
		console.log();
		return;
	}	
	console.log("["+getTime()+"] "+string);
}

var print = function(string){
	if (string === undefined){
		return;
	}	
	console.log(string);
}


//log();
//log("This is a test");
//log("You are executing test.js");
//log();
//log("Generate matrix with ones");

//var matrixWithOnes = lar.utils.ones(6,5);
//print(matrixWithOnes);

//log("Change first row");
//matrixWithOnes[0] = [1,2,3,4,5];
//print(matrixWithOnes);

//log("test: utils.select");
//var selectedRow = lar.utils.select(matrixWithOnes,[1]);
//print(selectedRow);

//var selectedRows = lar.utils.select(matrixWithOnes,[1,1]);
//print(selectedRows);


log("test: matrix_util");
var Ajson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
var Bjson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };

matrix_util.prodMatrixAsync_log(Ajson,Bjson);
