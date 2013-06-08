/**
   * larFacets_simple
   * extracts facets from a model
   *
   * @param {lar.Model} lar model with vertices and cells
   * @param {Number} dim of the model
   * @return {Boolean} true if model[1] is cell's array, false if it's Md matrix
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
			// input = celle

	var csr_Md = csr_matrix_from_dense(Md);

	var csr_Md_trans = csr_Md.transpose();

    //var product = matrix_util_accel.csr_product(Md, Md_trans);

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

