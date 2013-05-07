/**

	"matrix_util_accel.js"

	Accelerated matrix utility

	The MIT License
	===============
	    
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	'Software'), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

!(function (exports){
	
	var matrix_util_accel = exports.matrix_util_accel = {};

	// TODO documentation
	matrix_util_accel.csrToJson = function (csrMatrix) {
		if ( csrMatrix.constructor == csr_matrix )
			throw new Error("The argument of this function has to be a csr object.");
		return csrMatrix.toJSON();
	}

	// TODO documentation
	matrix_util_accel.jsonToCsr = function (jsonMatrix) {
		return new csr_matrix_from_json(jsonMatrix);
	}


	/**
		// TODO documentation
		[[0,1,0],[2,3,0],[0,0,1]]

	 * var m = matrix_util_accel.cooRowSortedJsonMatrixToCsrMatrix({"row":[0,1,1,2],"col":[1,0,1,2],"val":[1,2,3,1],"colcount":3,"rowcount":3})
	 */
	matrix_util_accel.cooRowSortedJsonMatrixToCsrMatrix = function (cooJson) {
		
		if ( !cooJson.hasOwnProperty("row") || !cooJson.hasOwnProperty("col") || !cooJson.hasOwnProperty("val") || !cooJson.hasOwnProperty("rowcount") || !cooJson.hasOwnProperty("colcount") )
			throw new Error("Format not valid. Needs a COO Json rapresentation with sorted row. Syntax" +
				"{ \"row\": [...], \"col\": [...], \"val\": [...], \"rowcount\": numberOfRows, \"colcount\": numberOfcolunms }");

		var ptr = [];
		var col = [];
		var data = [];

		var i;

		for (i=0; i<=cooJson.rowcount; i++)
			ptr[i] = 0;

		for (i=0; i<cooJson.row.length; i++)
			ptr[cooJson.row[i]+1]++;

		for (i=0; i<cooJson.rowcount; i++)
			ptr[i+1] += ptr[i];

		var ptr_curr = 0;

		for (i = 0; i < cooJson.row.length; i++) {
			ptr_curr = ptr[cooJson.row[i]];
			console.log("ptr_curr "+ptr_curr);
			while ( col[ptr_curr] != undefined )
				++ptr_curr;
			console.log("ptr_curr reload "+ptr_curr);	
			col[ptr_curr] = cooJson.col[i];
			data[ptr_curr] = cooJson.val[i];
		};

		return new csr_matrix_from_json({ "ROW" : ptr, "COL" : col, "DATA" : data, "ROWCOUNT" : cooJson.rowcount, "COLCOUNT" : cooJson.colcount });

	}

}(this));
