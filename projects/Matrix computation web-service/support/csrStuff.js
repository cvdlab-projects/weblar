require("./array.prototype.js");

// *
var isInteger = function(value) {
	return (!isNaN(value) && (Math.floor(value) === value));
};

var isUInteger = function(value) {
	return (!isNaN(value) && (Math.floor(value) === value) && (value >= 0));
};

var isOnlyOnes = function(el) {
	return (el === 1);
};

var newFilledArray = function(len, val) {
    var a = [];
    while(len--){
        a.push(val);
    }
    return a;
};


// *

function csr_matrix(objargs) {
	// CSR Data
	this.rowptr = null;
	this.col = null;
	this.data = null;
	// Useful for various calc and shape
	this.numrow = 0;
	this.lastcolumn = 0;
	this.nnz = 0;
	// To alter shape at runtime
	this.emptycolumns = 0;
	// BaseIndexing
	this.baseIndex = 0;

	this.loadData(objargs);
}

csr_matrix.prototype.getRowPointer = function(useTypedArrays) {
	useTypedArrays = useTypedArrays || false;

	if (useTypedArrays) {
		var tmp_rowptr = new Uint32Array(this.rowptr.length);
		this.rowptr.forEach(function(i,idx) { tmp_rowptr[idx] = i; } );
		return tmp_rowptr;
	} else {
		return this.rowptr;
	}
};

csr_matrix.prototype.getColumnIndices = function(useTypedArrays) {
	useTypedArrays = useTypedArrays || false;

	if (useTypedArrays) {
		var tmp_col = new Uint32Array(this.col.length);
		this.col.forEach(function(i,idx) { tmp_col[idx] = i; } );
		return tmp_col;
	} else {
		return this.col;
	}
};

csr_matrix.prototype.getData = function(useTypedArrays, useBestIntegerType) {
	useTypedArrays = useTypedArrays || false;
	useBestIntegerType = useBestIntegerType || false;

	if (useTypedArrays) {
		var tmp_data, currentData;
		currentData = this.data;

		if ( useBestIntegerType ) {
			if ( currentData.every( isUInteger ) ) {
				tmp_data = new Uint32Array(currentData.length);
			} else {
				tmp_data = new Int32Array(currentData.length);
			}
		} else {
			tmp_data = new Float32Array(currentData.length);
		}

		currentData.forEach(function(i,idx) { tmp_data[idx] = i; } );
		return tmp_data;
	} else {
		return this.data;
	}
};

csr_matrix.prototype.isDataInteger = function() {
	return this.getData().every( isInteger );
};

csr_matrix.prototype.isDataUinteger = function() {
	return this.getData().every( isUInteger );
};

csr_matrix.prototype.isBinary = function() {
	return this.getData().every( isOnlyOnes );
};

csr_matrix.prototype.getRowCount = function() {
	return this.numrow;
};

csr_matrix.prototype.getColCount = function() {
	return (this.lastcolumn + this.emptycolumns);
};

csr_matrix.prototype.getNonZeroElementsCount = function() {
	return this.nnz;
};

csr_matrix.prototype.pushEmptyRow = function() {
	this.rowptr.push( this.getRowPointer()[this.getRowPointer().length - 1] );
	this.numrow = this.getRowPointer().length - 1;
};

csr_matrix.prototype.popEmptyRow = function() {
	if (this.getRowCount() <= 1) {
		throw new Error('Cannot remove any more rows');
	}

	if ( this.getRowPointer()[this.getRowCount()] != this.getRowPointer()[this.getRowCount() + 1] ) {
		throw new Error('Cannot remove any more rows');
	}

	this.rowptr.pop();
	this.numrow = this.getRowPointer().length - 1;
};

csr_matrix.prototype.pushEmptyColumn = function() {
	this.emptycolumns += 1;
};

csr_matrix.prototype.popEmptyColumn = function() {
	if (this.emptycolumns <= 0) {
		throw new Error('Cannot remove any more columns');
	}

	this.emptycolumns -= 1;
};

csr_matrix.prototype.loadData = function(objargs) {
	// possibili casi
	if ( !objargs.hasOwnProperty("numcols") ) {
		objargs.numcols = 0;
	}

	var tmp_rowptr, tmp_col, tmp_colMax, tmp_data;

	if (objargs.hasOwnProperty("rowptr") && objargs.hasOwnProperty("colindices") && objargs.hasOwnProperty("data")) {
		if (objargs.colindices.length != objargs.data.length) {
			throw new Error('Expected objargs.colindices.length == objargs.data.length');
		}

		tmp_rowptr = new Array(objargs.rowptr.length);
		tmp_col = new Array(objargs.colindices.length);
		tmp_colMax = 0;
		tmp_data = new Array(objargs.data.length);

		objargs.rowptr.forEach(function(i,idx) { tmp_rowptr[idx] = i; } );
		objargs.colindices.forEach(function(i,idx) { tmp_col[idx] = i; tmp_colMax = Math.max(tmp_colMax,i+1); } );
		objargs.data.forEach(function(i,idx) { tmp_data[idx] = i; } );

		this.rowptr = tmp_rowptr;
		this.col = tmp_col;
		this.data = tmp_data;
		this.numrow = tmp_rowptr.length - 1;
		this.lastcolumn = Math.max(tmp_colMax, objargs.numcols);
		this.nnz = this.data.length;

	} else if (objargs.hasOwnProperty("rowptr") && objargs.hasOwnProperty("colindices")) {

		tmp_rowptr = new Array(objargs.rowptr.length);
		tmp_col = new Array(objargs.colindices.length);
		tmp_colMax = 0;

		objargs.rowptr.forEach(function(i,idx) { tmp_rowptr[idx] = i; } );
		objargs.colindices.forEach(function(i,idx) { tmp_col[idx] = i; tmp_colMax = Math.max(tmp_colMax,i+1); } );

		this.rowptr = tmp_rowptr;
		this.col = tmp_col;
		this.data = newFilledArray(tmp_col.length, 1);
		this.numrow = tmp_rowptr.length - 1;
		this.lastcolumn = Math.max(tmp_colMax, objargs.numcols);
		this.nnz = this.data.length;

	} else if (objargs.hasOwnProperty("size")) {
		// 0 everywhere
		this.loadData({"numcols": objargs.size.col, "fromdense": newFilledArray(objargs.size.row * objargs.size.col, 0)});
	} else if (objargs.hasOwnProperty("fromtriples")) {
		// leggi da file le triple e genera
	} else if (objargs.hasOwnProperty("fromdense") && (objargs.numcols > 0)) {
		tmp_rowptr = [];
		tmp_col = [];
		tmp_data = [];
		var nnz = 0;
		var colIdx = 0;
		var rowCount = 0;
		var prevRow = this.baseIndex - 1;

		// modify 
		// 1) for objargs.numcols
		// 2) for objargs.numrows

		for (var i = 0; i < objargs.fromdense.length; i++, colIdx++) {
			if (prevRow != rowCount) {
				tmp_rowptr.push( nnz );
				prevRow = rowCount;
			}

			if ( objargs.fromdense[i] !== 0 ) {
				tmp_col.push( colIdx );
				tmp_data.push( objargs.fromdense[i] );
				nnz += 1;
			}

			if ((colIdx+1) == objargs.numcols) {
				colIdx = -1;
				rowCount += 1;
			}
		}

		// Add last nnz
		tmp_rowptr.push( tmp_data.length );

		// Recreate data
		this.loadData({"numcols": objargs.numcols, "rowptr": tmp_rowptr, "colindices": tmp_col, "data": tmp_data});
	}
};

csr_matrix.prototype.transpose = function() {
	// private function
	var f_transposeEnum = function(inputArray, maxN, outputArray) {
		if (maxN === 0) {
			return;
		}

		outputArray[0] = 0;
		for (var i = 1; i <= maxN; i++) {
			outputArray[i] = outputArray[i - 1] + inputArray[i - 1];
		}
	};

	// lookup
	var m = this.getRowCount();
	var n = this.getColCount();
	var base = this.baseIndex;

	// NNZ elements
	var nnz = this.getRowPointer()[m] - base;

	// New arrays
	var newPtr = new Array(n + 1);
	var newCol = new Array(nnz);
	var newData = new Array(nnz);
	// Create and initialize to 0
	var count_nnz = newFilledArray(n, 0);

	// Reused index
	var i = 0;

	// Count nnz per column
	for(i = 0; i < nnz; i++) {
		count_nnz[(this.getColumnIndices()[i] - base)]++;
	}

	// Create the new rowPtr
	f_transposeEnum(count_nnz, n, newPtr);

	// Copia TrowPtr in moda tale che count_nnz[i] == location in Tind, Tval
	for(i = 0; i < n; i++) {
		count_nnz[i] = newPtr[i];
	}

	// Copia i valori in posizione
	for(i = 0; i < m; i++) {
		var k;
		for (k = (this.getRowPointer()[i] - base); k < (this.getRowPointer()[i+1] - base); k++ ) {
			var j = this.getColumnIndices()[k] - base;
			var l = count_nnz[j];

			newCol[l] = i;
			newData[l] = this.getData()[k];
			count_nnz[j]++;
		}
	}

	return new csr_matrix({"numrows": n, "numcols": m, "rowptr": newPtr, "colindices": newCol, "data": newData});
};

csr_matrix.prototype.toDense = function() {
	var rowArray = new Array(this.getRowCount());
	for(var i = 0; i < (this.getRowPointer().length - 1); i++) {
		var columnAdd = newFilledArray(this.getColCount(), 0);
		for(var k = this.getRowPointer()[i]; k < this.getRowPointer()[i+1]; k++ ) {
			columnAdd[ this.getColumnIndices()[k] ] = this.getData()[k];
		}
		rowArray[i] = columnAdd;
	}

	return rowArray;
};

csr_matrix.prototype.multiply = function(matrix) {
	if ((matrix instanceof csr_matrix) === false) {
		throw new Error("Invalid matrix");
	}

	return this.__denseMultiply(matrix);
};

csr_matrix.prototype.__denseMultiply = function(matrix) {
	if (this.getColCount() != matrix.getRowCount()) {
		throw new Error("Current matrix columns are different from argument matrix rows");
	}

	var argMatrix = matrix.transpose();
    var denseResult = new Array(this.getRowCount() * matrix.getColCount());

    for (var i = 0; i < this.getRowCount(); i++) {
		for (var j = 0; j < argMatrix.getRowCount(); j++) {

			var ArowCur = this.getRowPointer()[i],
				ArowEnd = this.getRowPointer()[i + 1],
				curPosA = ArowCur;

			var BrowCur = argMatrix.getRowPointer()[j],
				BrowEnd = argMatrix.getRowPointer()[j + 1],
				curPosB = BrowCur;

			var AcurIdx = this.getColumnIndices()[ArowCur],
				BcurIdx = argMatrix.getColumnIndices()[BrowCur];

            var localSum = 0;

            while ((curPosA < ArowEnd) && (curPosB < BrowEnd)) {
				AcurIdx = this.getColumnIndices()[curPosA];
				BcurIdx = argMatrix.getColumnIndices()[curPosB];

				if (AcurIdx == BcurIdx) {
					localSum += this.getData()[curPosA] * argMatrix.getData()[curPosB];
					curPosA++;
					curPosB++;
				} else if (AcurIdx < BcurIdx) {
					curPosA++;
				} else {
					curPosB++;
				}
			}

			denseResult[i*matrix.getColCount()+ j] = localSum;
		}
	}

	return new csr_matrix({"fromdense": denseResult, "numcols": matrix.getColCount()});
};

// TODO: Broken in column index multiplication. Need to debug
csr_matrix.prototype.__csrMultiply = function(matrix) {
	var baseFiller = this.baseIndex - 1;
	//
	var newRowCount = this.getRowCount();
	var newColCount = matrix.getColCount();

	var tmpCol = newFilledArray(newColCount, baseFiller);
	var newRow = newFilledArray(newRowCount+1, 0);

	// Primo step
	var i = 0, k = 0, j = 0, l = 0, cntLoop = 0;
	for(i = 0; i < newRowCount; ++i) {
		cntLoop = 0;

		for(k = this.getRowPointer()[i]; k < this.getRowPointer()[i+1]; ++k ) {
			for(j = matrix.getRowPointer()[this.getColumnIndices()[k]]; j < matrix.getRowPointer()[this.getColumnIndices()[k]+1]; ++j ){
				for(l = 0; l < cntLoop; l++ ) {
					if (tmpCol[l] == matrix.getColumnIndices()[j]) {
						break;
					}
				}

				if (l == cntLoop) {
					tmpCol[cntLoop] = matrix.getColumnIndices()[j];
					cntLoop++;
				}
			}
		}

		newRow[i+1] = cntLoop;
		for (j=0; j < cntLoop; ++j) {
			tmpCol[j] = baseFiller;
		}
	}

	for(i=0; i < newRowCount; ++i) {
		newRow[i+1] += newRow[i];
	}

	// secondo step
	var newCol = newFilledArray(newRow[newRowCount], 0);

	for (i = 0; i < newRowCount; ++i) {
		var countTmpCol = 0;
		cntLoop = newRow[i];
		for (k = this.getRowPointer()[i]; k < this.getRowPointer()[i+1]; ++k) {
			for (j = matrix.getRowPointer()[this.getColumnIndices()[k]]; j < matrix.getRowPointer()[this.getColumnIndices()[k]+1]; ++j) {
				for (l = 0; l < countTmpCol; l++) {
					if (tmpCol[l] == matrix.getColumnIndices()[j]) {
						break;
					}
				}

				if (l == countTmpCol) {
					newCol[cntLoop] = matrix.getColumnIndices()[j];
					tmpCol[countTmpCol] = matrix.getColumnIndices()[j];
					cntLoop++;
					countTmpCol++;
				}
			}
		}

		for (j=0; j < countTmpCol; j++) {
			tmpCol[j] = baseFiller;
		}
	}

	// terzo step
	var newData = newFilledArray(newRow[newRowCount], 0);

	for (i = 0; i < newRowCount; ++i) {
		for ( j = newRow[i]; j < newRow[i+1]; ++j) {
			newData[j] = 0;
			for (k = this.getRowPointer()[i]; k < this.getRowPointer()[i+1]; ++k) {
				for ( l = matrix.getRowPointer()[this.getColumnIndices()[k]]; l < matrix.getRowPointer()[this.getColumnIndices()[k]+1]; l++) {
					if (matrix.getColumnIndices()[l] == newCol[j]) {
						newData[j] += this.getData()[k] * matrix.getData()[l];
					}
				}
			}
		}
	}

	return new csr_matrix({"numrows": newRowCount, "numcols": newColCount, "rowptr": newRow, "colindices": newCol, "data": newData});
};

csr_matrix.prototype.equals = function(other) {
	if ((other instanceof csr_matrix) === false) {
		return false;
	}

	// It's me!
	if ( this === other ) {
		return true;
	}

	return	( this.getRowCount() == other.getRowCount() ) &&
			( this.getColCount() == other.getColCount() ) &&
			( this.getNonZeroElementsCount() == other.getNonZeroElementsCount() ) &&
			this.getRowPointer().equalsV8(other.getRowPointer()) &&
			this.getColumnIndices().equalsV8(other.getColumnIndices()) &&
			this.getData().equalsV8(other.getData());
};

csr_matrix.prototype.copy = function() {
	var outMatrix = new csr_matrix({"rowptr": this.getRowPointer(), "colindices": this.getColumnIndices(), "data": this.getData()});
	outMatrix.emptycolumns = this.emptycolumns;

	return outMatrix;
};

csr_matrix.prototype.toString = function() {
	var outString = "Sparse Matrix ("+this.getRowCount()+" x "+this.getColCount()+") Nnz: "+this.getNonZeroElementsCount()+"\n";
	outString += "RowPtr " + this.getRowPointer() + "\n";
	outString += "Column Indices " + this.getColumnIndices() + "\n";
	outString += "Data " + this.getData() + "\n";

	return outString;
};

csr_matrix.prototype.toJSON = function() {
	return {"ROW" : this.getRowPointer(),
			"COL": this.getColumnIndices(),
			"DATA": this.getData(),
			"ROWCOUNT": this.getRowCount(),
			"COLCOUNT": this.getColCount()};
};

exports.csr_matrix = csr_matrix;
