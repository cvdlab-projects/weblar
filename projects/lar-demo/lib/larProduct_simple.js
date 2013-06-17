/**!
* larProduct_simple.js
* does the cartesian product between two LAR models
*
* @author Fabio Cumbo, Elisa Lamberti and Andrea Somma
* @copyright 2013 Fabio Cumbo, Elisa Lamberti and Andrea Somma
*
* @param {lar.Model} lar model #1 with vertices and cells
* @param {lar.Model} lar model #2 with vertices and cells
*/

/*
 * models have to be an arry with two model objects;
 * vertices and cells are properties of the model object (ie a simplicial complex)
 *
 */

function larProduct(model1, model2) {
	var V = model1.vertices;
	var cells1 = model1.cells;

	var W = model2.vertices;
	var cells2 = model2.cells;

	var verts = {};
	var index = 0;

	for (var v=0; v<V.length; v++) {
		for (var w=0; w<W.length; w++) {
			var vertex = V[v];
			vertex = vertex.concat(W[w]);
			if (verts[hash_function(vertex)] === undefined) {
				verts[hash_function(vertex)] = index;
				index++;
			}
		}
	}

	var cells = new Array();
	// for (var c1=0; c1<cells1.length; c1++) {
		
	// 	for (var c2=0; c2<cells2.length; c2++) {
	// 		var cell = new Array();
	// 		for (var v=0; v<cells1[c1].length; v++) {
	// 			for (var w=0; w<cells2[c2].length; w++) {
	// 				var vertex = V[v];
	// 				vertex = vertex.concat(W[w]);
	// 				cell.push(verts[hash_function(vertex)]);
	// 			}
	// 		}
	// 		cell.sort(function(a,b){return a-b});

	// 		var clone = JSON.parse(JSON.stringify(cell));
	// 		console.log(clone);
	// 		cells.push(clone);
	// 	}
		
	// }

	for (var i1=0; i1<cells1.length; i1++) {
		var c1=cells1[i1];

		for (var i2=0; i2<cells2.length; i2++) {
			var c2=cells2[i2];

			var cell = new Array();
			for (var iv=0; iv<c1.length; iv++) {
				var v = c1[iv];
				for (var iw=0; iw<c2.length; iw++) {
					var w = c2[iw];
					var vertex = V[v];
					vertex = vertex.concat(W[w]);
					cell.push(verts[hash_function(vertex)]);
				}
			}
			cell.sort(function(a,b){return a-b});
			cells.push(cell);
		}
		
	}

	return (new lar.Model(get_keys_from_verts(verts), cells));
}

/*
 * the hash_function() method takes as input an array of integers and returns
 * a string as the result of the concatenation of all array elements
 *
 */

function hash_function(array) {
//	var result = "";
//	for (var i=0; i<array.length-1; i++) {
//		result += (new String(array[i])) + "_";
//	}
//	result += (new String(array[i]));
//	return result;
return array.join('_');
}

/*
 * the get_keys_from_verts() method takes as input an object and returns
 * an array with all keys (ie arrays) of the specified object (all properties without values);
 * ie, in this case, all keys are the result of the hash_function() method, so it's
 * necessary to split each strings (the keys of all properties) to an array using
 * the predefined split() method for the String object.
 *
 */

function get_keys_from_verts(verts) {
	return Object.keys(verts).map(function (str) {
		return str.split('_').map(function (s) {
			return +s;
		});
	})
	// var keys = new Array();
	// for (var k in verts)
	// 	keys.push(k.split("_"));
	// return keys;
}

/*
 * a function to create a concatenation of "n" vectors
 *
 */
function nn(n) {
	var i = 0;
	var verts = [];
	var cells = [];
	for (i = 0; i < n; i++) {
		verts.push([i]);
		cells.push([i,i+1]);
	}
	cells.pop();
	return [verts, cells];
}

/*
 * a function to create "n/2" spaced vectors
 *
 */
function ns(n) {
	var i = 0;
	var verts = [];
	var cells = [];
	for (i = 0; i < n; i++) {
		verts.push([i]);
		if (i % 2 == 0) {
			cells.push([i,i+1]);
		}
	}
	return [verts, cells];
}

