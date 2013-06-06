/* restituisce la matrice di adiacenza a partire dall'array di celle del modello passato come
parametro, tale matrice andrà poi passata come parametro alla funzione di partizionamento dello spazio esterno
che gli aggiungerà le righe mancanti*/
lar.Model.prototype.getMdFromCells = function (numVerts, cells) {
	/*var vertices = model.vertices;
	var cells = model.cells;*/
	var matrix = lar.utils.zeros(cells.length, /*vertices.length*/ numVerts);
	
	for (var i = 0, l = matrix.length; i<l; i++){
		for (var j = 0; j<cells[i].length; j++){
			matrix[i][cells[i][j]]=1;
			
		}
	}
	return matrix;
}

/*operazione inversa */
lar.Model.prototype.getCellsFromMd = function (Md) {
	var new_cells = []; // Rappresentazione "LAR by Spini-Marino" delle celle, 0 = Punto1, 1 = Punto2, 2 = Punto3...

	for (var n = 0; n < Md.length; n++) {

		var b_cell = Md[n];
		var new_cell = [];

		for (var p = 0; p < b_cell.length; p++) {

			var point = b_cell[p];

			if(point === 1)
				new_cell.push(p);
		}

		new_cells.push(new_cell);
	}
	return new_cells;
}



function larFacets(model, dim) {	// LA COPPIA SETUP-LARFACETS è STATA RIASSUNTA TUTTA QUì
	/* Versione avanzata, con estrazione automatica del bordo esterno */

	var V = model.vertices;

	var cells = model.cells;

	var all_cells = model.cells;

	var ext_cells = model.boundary(dim, cells, false).cells;
	for (var i = 0; i < ext_cells.length; i++)
		all_cells.push(ext_cells[i]);

	var Md = lar.Model.prototype.getMdFromCells(V.length, all_cells);

	var Md_trans = numeric.transpose(Md);	// Uso la libreria numeric.js

	var A = matrix_util_accel.dense_product(Md, Md_trans);

	// var A = numeric.dot(Md, Md_trans);		// Uso la libreria numeric.js   //A=[[riga1][riga2]...]

	var app = [];		// Variabile d'appoggio per prendere le coppie di righe d'interesse su cui poi fare l'AND bit a bit
	for(var i = 0; i < A[0].length; i++) { //
		for(var j = 0; j < A.length; j++) {
			if(A[i][j] >= dim && i < j)		
				app.push([i,j]);
		}
	}

	var new_cells_binary = [];		/* Le nuove celle sono rappresentate in forma binaria, 
	con uno zero se il punto non è presente, un uno altrimenti */

	for(var k = 0; k < app.length; k++) {

		var num1 = app[k][0];		// Numero della prima riga della coppia k-esima
		var num2 = app[k][1];		// Numero della seconda riga coppia k-esima

		var row1 = Md[num1];		// Prima riga della coppia k-esima
		var row2 = Md[num2];		// Seconda riga coppia k-esima

		var cell = [];

		for(var l = 0; l < row1.length; l++){		// AND bit a bit
			if(row1[l] !== row2[l])
				cell.push(0);
			else
		 		if(row1[l] === 0)
		 			cell.push(0);
		 		else
		 			cell.push(1);
		}
		new_cells_binary.push(cell);
	}

	var new_cells = lar.Model.prototype.getCellsFromMd(new_cells_binary);

	return (new lar.Model(V, new_cells)); 
}