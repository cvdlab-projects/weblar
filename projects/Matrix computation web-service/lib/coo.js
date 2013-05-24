/**
 * @description Library that offers classes to represent and manipulate a sparse matrix in COO. 
 *
 * @author Fabrizio Rebecca
 * @author Luca Menichetti
 */

!(function (exports){

	/**
	 * [coo_matrix description]
	 * @param  {[type]} objargs [description]
	 * @return {[type]}         [description]
	 */
	function coo_matrix(objargs) {
		this.row = objargs.row || undefined;
		this.col = objargs.col || undefined;
		this.val = objargs.val || undefined;
		this.rowcount = objargs.colcount || undefined;
		this.colcount = objargs.rowcount || undefined;
		this.nnz = this.val.length || undefined;
	}
	
	/**
	 * [coo_matrix_from_json description]
	 * @param  {[type]} objargs [description]
	 * @return {[type]}         [description]
	 */
	function coo_matrix_from_json(objargs){

		if ( !objargs.hasOwnProperty("row") || !objargs.hasOwnProperty("col") || !objargs.hasOwnProperty("val") ||
				 !objargs.hasOwnProperty("rowcount") || !objargs.hasOwnProperty("colcount")){
				throw new Error("Some arguments are missing. " +
					"For example the syntax is : { \"row\" : [0,2,3,4], \"col\" : [0,2,1,0], " +
					"\"val\" : [1,1,1,1], \"rowcount\" : 3, \"colcount\" : 3 }.");
 			}
		
		return new coo_matrix(objargs);
	}

	/**
	 * [coo_matrix_from_dense description]
	 * @param  {[type]} denseMatrix [description]
	 * @return {[type]}             [description]
	 */
	function coo_matrix_from_dense(denseMatrix) {
		

		throw new Error("Not yet implemented.");

		/*if ( !denseMatrix instanceof Array || !denseMatrix[0] instanceof Array ){
			throw new Error("denseMatrix has to be an Array of Array."); 
		}

		return new csr_matrix({
			"fromdense" : [].concat.apply([],denseMatrix),
			"numcols" : denseMatrix[0].length
		});*/

	}

	/**
	 * Return a coo_matrix reference from a flat representation given in a JSON format
	 * @param  {JSON} objargs The JSON has to be : { "FLAT" : array , "colUMNS" : value }
	 * @return {csr_matrix} An csr_matrix object.
	 */
	function coo_matrix_from_flat(objargs) {

		throw new Error("Not yet implemented.");

		/*if ( !objargs.hasOwnProperty("FLAT") || !objargs.hasOwnProperty("colUMNS") ){
			throw new Error("Invalid JSON format. The param has to be : { \"FLAT\" : array , \"colUMNS\" : value }"); 
		}

		if ( !objargs.FLAT instanceof Array ){
			throw new Error("FLAT has to be an Array."); 
		}

		if (!isInteger(objargs.colUMNS)){
			throw new Error("colUMNS has to be an integer."); 
		}

		return new csr_matrix({
			"fromdense" : objargs.FLAT ,
			"numcols" : objargs.colUMNS
		});*/

	}

	coo_matrix.prototype.getRow = function(useTypedArrays) {
		useTypedArrays = useTypedArrays || false;

		if (useTypedArrays) {
			var tmp_row = new Uint32Array(this.row.length);
			this.row.forEach(function(i,idx) { tmp_row[idx] = i; } );
			return tmp_row;
		} else {
			return this.row;
		}
	};

	coo_matrix.prototype.getColumn = function(useTypedArrays) {
		useTypedArrays = useTypedArrays || false;

		if (useTypedArrays) {
			var tmp_col = new Uint32Array(this.col.length);
			this.col.forEach(function(i,idx) { tmp_col[idx] = i; } );
			return tmp_col;
		} else {
			return this.col;
		}
	};

	coo_matrix.prototype.getVal = function(useTypedArrays, useBestIntegerType) {
		useTypedArrays = useTypedArrays || false;
		useBestIntegerType = useBestIntegerType || false;

		if (useTypedArrays) {
			var tmp_val, currentval;
			currentval = this.val;

			if ( useBestIntegerType ) {
				if ( currentval.every( isUInteger ) ) {
					tmp_val = new Uint32Array(currentval.length);
				} else {
					tmp_val = new Int32Array(currentval.length);
				}
			} else {
				tmp_val = new Float32Array(currentval.length);
			}

			currentval.forEach(function(i,idx) { tmp_val[idx] = i; } );
			return tmp_val;
		} else {
			return this.val;
		}
	};


	coo_matrix.prototype.getRowcount = function() {
		return this.rowcount;
	};

	coo_matrix.prototype.getColcount = function() {
		return this.colcount;
	};

	coo_matrix.prototype.getNonZeroElementsCount = function() {
		return this.nnz;
	};

	coo_matrix.prototype.pushEmptyrow = function() {
		//TODO
		return;
		this.row.push( this.getrowPointer()[this.getrowPointer().length - 1] );
		this.numrow = this.getrowPointer().length - 1;
	};

	coo_matrix.prototype.popEmptyrow = function() {

		//TODO
		return;
		if (this.getrowcount() <= 1) {
			throw new Error('Cannot remove any more rows');
		}

		if ( this.getrowPointer()[this.getrowcount()] != this.getrowPointer()[this.getrowcount() + 1] ) {
			throw new Error('Cannot remove any more rows');
		}

		this.row.pop();
		this.numrow = this.getrowPointer().length - 1;
	};

	coo_matrix.prototype.pushEmptycolumn = function() {
		//TODO
		return;
		this.emptycolumns += 1;
	};

	coo_matrix.prototype.popEmptycolumn = function() {
		//TODO
		return;
		if (this.emptycolumns <= 0) {
			throw new Error('Cannot remove any more columns');
		}

		this.emptycolumns -= 1;
	};

	
	/**
	 * [ description]
	 * @return {[type]} [description]
	 */
	coo_matrix.prototype.transpose = function() {
		var row_temp = this.row;
		this.row = this.col;
		this.col = row_temp;
		var rowcount_temp = this.rowcount;
		this.rowcount = this.colcount;
		this.colcount = rowcount_temp;
	};

	coo_matrix.prototype.toDense = function() {
		// TODO
		throw new Error('not yet implemented.');
	};

	coo_matrix.prototype.equals = function(other) {
		// TODO
		throw new Error('not yet implemented.');
	};

	/**
	 * [ description]
	 * @return {[type]} [description]
	 */
	coo_matrix.prototype.toString = function() {
		var outString = "Sparse Matrix Coo ("+this.row+" x "+this.col+") Nnz: "+this.nnz+"\n";
		outString += "row " + this.row + "\n";
		outString += "col " + this.col + "\n";
		outString += "val " + this.val + "\n";

		return outString;
	};

	/**
	 * [ description]
	 * @return {[type]} [description]
	 */
	coo_matrix.prototype.toJSON = function() {
		return {"row" : this.row,
				"col": this.col,
				"val": this.val,
				"rowcount": this.rowcount,
				"colcount": this.colcount};
	};

	/**
	 * [ description]
	 * @return {[type]} [description]
	 */
	coo_matrix.prototype.toCsrJSON = function() {

		// TODO
		var ptr = [];
		var col = [];
		var data = [];

		var i;

		for (i=0; i<=this.rowcount; i++)
			ptr[i] = 0;

		for (i=0; i<this.row.length; i++)
			ptr[this.row[i]+1]++;

		for (i=0; i<this.rowcount; i++)
			ptr[i+1] += ptr[i];

		for (i = 0; i < this.row.length; i++) {
			col[i] = this.col[i];
			data[i] = this.val[i];
		};

		return { "ROW" : ptr, "COL" : col, "DATA" : data, "ROWCOUNT" : this.rowcount, "COLCOUNT" : this.colcount };

	};

	exports.coo_matrix = coo_matrix;
	exports.coo_matrix_from_json = coo_matrix_from_json;
	exports.coo_matrix_from_dense = coo_matrix_from_dense;
	exports.coo_matrix_from_flat = coo_matrix_from_flat;

}(this));