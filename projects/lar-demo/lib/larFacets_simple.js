/**
* larFacets_simple
* extracts facets from a model
*
* @author Fabio Cumbo, Elisa Lamberti and Andrea Somma
* @copyright 2013 Fabio Cumbo, Elisa Lamberti and Andrea Somma
*
* @param {lar.Model} lar model with vertices and cells
* @param {Number} dim of the model
* @return {Boolean} true if first param is a lar model, false if it's an array containing vertices and Md matrix
*/

function larFacets_simple(model, dim, bool) {	

			

	if(!bool){
		var V = model[0];
		var Md = model[1];	// input = Md
	}
		
	else{
		var V = model.vertices;
		var Md = model.getMdFromCells();
	}

	var csr_Md = csr_matrix_from_dense(Md);

	var csr_Md_trans = csr_Md.transpose();

    //var product = matrix_util_accel.csr_product(csr_Md, csr_Md_trans);

    // Uncomment this line and comment the line above if the "Matrix computation web-service" is offline
	var product = csr_Md.multiply(csr_Md_trans);

	var new_cells_binary = [];

	for ( var i = 0; i<product.data.length; i++){
		var iElement = product.getData()[i];
		if (product.getRowIndex(i)<product.getColumnIndex(i) && iElement>=dim){
			var row1 =  csr_Md.getRowDense(product.getRowIndex(i));
			var row2 =  csr_Md.getRowDense(product.getColumnIndex(i));
			var cell = [];

		    for(var l = 0; l < row1.length; l++){		// AND bit a bit
		    	if(row1[l] !== row2[l]){
		    		cell.push(0);
		    	}
				else{
					if(row1[l] === 0){
						cell.push(0);
					}
		 			else{
		 				cell.push(1);
		 			}
		 			
		 	}
		}
		new_cells_binary.push(cell);
		}
	}

	var new_cells = lar.Model.prototype.getCellsFromMd(new_cells_binary);

	return (new lar.Model(V, new_cells)); 
}


/*
 * a function to get the facets from a cube
 *
 */
function getFaces(vertices, cell) {
	var p0 = vertices[cell[0]];

	var f1 = [cell[0]];
	var f2 = [];
	var f3 = [cell[0]];
	var f4 = [];
	var f5 = [cell[0]];
	var f6 = [];

	for(var i=1; i<cell.length; i++) {
		var p = vertices[cell[i]];
		if (p[0] === p0[0])
			f1.push(cell[i]);
		else f2.push(cell[i]);
		if (p[1] === p0[1])
			f3.push(cell[i]);
		else f4.push(cell[i]);
		if (p[2] === p0[2])
			f5.push(cell[i]);
		else f6.push(cell[i]);	
	}
	return [f1,f2,f3,f4,f5,f6];
}

/*
 * a function to get the external facets from a model composed by cubes
 *
 */
function getExtFaces(model) {
	var v = model.vertices;
	var c = model.cells;

	var faces = [];

	for (var cell = 0; cell < c.length; cell++) {
		var tempFaces = getFaces(v,c[cell]);
		for (var f = 0; f < tempFaces.length; f++) {
			faces.push(tempFaces[f]);
		}

	}
	faces = updateFaces(faces);
	//faces = updateFaces2(v,faces);
	return faces;
}

/*
 * a function to compare the equality of two arrays
 *
 */
function compareArrays (array1, array2){
	var equal = true;
	if (array1.length!=array2.length){
		equal = false;
		return equal;
	}
	else{
		for (var i = 0; i<array1.length; i++){
			if (array1[i]!=array2[i]){
				equal = false;
				return equal;
			}
		}
		return equal;
	}
}

/*
 * a function to eliminate the internal facets from a model composed by cubes
 *
 */
function updateFaces(faces)  {
	var result = [];
	for (var f = 0; f < faces.length; f++) {
		var count = 0;
		for (var t = 0; t < faces.length; t++) {
			if(f !== t) {
				if(compareArrays(faces[f],faces[t])) {
					count++;
				}
			}
		}	
		if (count === 0)
			result.push(faces[f]);
	}

	return result;
}

/*
 * a function to eliminate the internal facets from a model composed by cubes
 *
 */
function updateFaces2(verts, faces)  {
	var result = [];
	var x_max = 0;
	var y_max = 0;
	var z_max = 0;
	var x_min = 0;
	var y_min = 0;
	var z_min = 0;
	for (var f = 0; f < faces.length; f++) {
		for (var v in f) {
			var vert = verts[v];
			if(vert[0] < x_min)
				x_min = vert[0];
			if(vert[0] > x_max)
				x_max = vert[0];
			if(vert[1] < y_min)
				y_min = vert[1];
			if(vert[1] > y_max)
				y_max = vert[1];
			if(vert[2] < z_min)
				z_min = vert[2];
			if(vert[2] > z_max)
				z_max = vert[2];
		}
	}

	for (var f2 = 0; f2 < faces.length; f2++) {
		var bool = false;
		for (var v2 in f2) {
			var vert2 = verts[v2];
			console.log(vert2);
			if(vert2[0]===x_min || vert2[0]===x_max)
				bool = true;
			else {
				if(vert2[1]===y_min || vert2[1]===y_max)
					bool = true;
				else {
					if(vert2[2]===z_min || vert2[2]===z_max)
						bool = true;
				}
			}
		}
		if(bool)
			result.push(faces[f2]);
	}
	return result;
}

/*
 * the main function to add the external facets to a model composed by cubes
 */
function addExtFacetsToModel(model) {
	var extFacets = getExtFaces(model);
	for(var i = 0; i < extFacets.length; i++)
   		model.cells.push(extFacets[i]);
   	return model;
}