/*
* dim: dimension parameter (values: 2 or 3)
* levels: number of fractal levels
* modelLength: initial triangle simplex length
*/

function fractalSimplex(dim, levels, modelLength) {
	if (dim === undefined || dim === 0)
		return undefined;
	else if (dim === 1 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 1 && modelLength>0)
		return (new lar.Model([[0,0,0],[0,modelLength,0]], [[0,1]]));
	else if (dim === 2 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 2 && modelLength>0 && (levels === 0 || levels === undefined))
		return (new lar.Model([[0,0,0],[modelLength,0,0],[0,modelLength,0]], [[0,1,2]]));
	else if (dim === 2 && modelLength>0 && levels>0)
		return fractalSimplex2D(dim, levels, modelLength);
	else if (dim === 3 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 3 && modelLength>0 && (levels === 0 || levels === undefined)) {
		return simpleFractalSimplex3D(dim, modelLength);
	}
	else if (dim === 3 && modelLength>0 && levels>0)
		return fractalSimplex3D(dim, levels, modelLength);
	
	return undefined;
}

function fractalSimplex2D(dim, levels, modelLength) {
	if (dim === 2) {
		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0]];
		var C = [[0,1,2]];
		var lastVertex = 2;

		for (var l=0; l<levels; l++) {
			var cellsTMP = copyArr(C);

			for (var c=0; c<C.length; c++) {
				var index0 = C[c][0];
				var index1 = C[c][1];
				var index2 = C[c][2];

				var medianPoint0 = [((V[index0][0] + V[index1][0])/2), ((V[index0][1] + V[index1][1])/2), ((V[index0][2] + V[index1][2])/2)]; //0 - 1
				var medianPoint1 = [((V[index2][0] + V[index1][0])/2), ((V[index2][1] + V[index1][1])/2), ((V[index2][2] + V[index1][2])/2)]; //1 - 2
				var medianPoint2 = [((V[index0][0] + V[index2][0])/2), ((V[index0][1] + V[index2][1])/2), ((V[index0][2] + V[index2][2])/2)]; //0 - 2

				V.push(medianPoint0);
				V.push(medianPoint1);
				V.push(medianPoint2);
				lastVertex = lastVertex + 3;

				var cell0 = [C[c][0], lastVertex-2, lastVertex];
				var cell1 = [C[c][1], lastVertex-2, lastVertex-1];
				var cell2 = [C[c][2], lastVertex-1, lastVertex];

				cellsTMP.push(cell0);
				cellsTMP.push(cell1);
				cellsTMP.push(cell2);

				cellsTMP.reverse();
				cellsTMP.pop();
				cellsTMP.reverse();
			}
			C = copyArr(cellsTMP);
		}

		return (new lar.Model(V,C));
	}
	return undefined;
}

function simpleFractalSimplex3D(dim, modelLength) {
	if (dim === 3) {
		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0],[0,0,modelLength]];
		var C = [[0,1,2,3]];
		return (new lar.Model(V,C));
	}
	return undefined;
}

function fractalSimplex3D(dim, levels, modelLength) {
	if (dim === 3) {
	
		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0],[0,0,modelLength]];
		var C = [[0,1,2,3]];
		
		var simplexes3D = [[V,C]];
		var simplexes3dTMP = new Array();
		for (var l=0; l<levels; l++) {	
			var simplexes3dTMP = copyArr(simplexes3D);
			
			for (var i=0; i<simplexes3D.length; i++) {				
				var simplex3D = simplexes3D[i];
				var vertices = simplex3D[0];
				
				var p4 = [((vertices[0][0] + vertices[2][0])/2), ((vertices[0][1] + vertices[2][1])/2), ((vertices[0][2] + vertices[2][2])/2)]; //0 - 2
				var p5 = [((vertices[1][0] + vertices[2][0])/2), ((vertices[1][1] + vertices[2][1])/2), ((vertices[1][2] + vertices[2][2])/2)]; //1 - 2
				var p6 = [((vertices[0][0] + vertices[1][0])/2), ((vertices[0][1] + vertices[1][1])/2), ((vertices[0][2] + vertices[1][2])/2)]; //0 - 1
				var p7 = [((vertices[2][0] + vertices[3][0])/2), ((vertices[2][1] + vertices[3][1])/2), ((vertices[2][2] + vertices[3][2])/2)]; //2 - 3
				var p8 = [((vertices[1][0] + vertices[3][0])/2), ((vertices[1][1] + vertices[3][1])/2), ((vertices[1][2] + vertices[3][2])/2)]; //1 - 3
				var p9 = [((vertices[0][0] + vertices[3][0])/2), ((vertices[0][1] + vertices[3][1])/2), ((vertices[0][2] + vertices[3][2])/2)]; //0 - 3
				
				var v0 = new Array();
				v0.push(vertices[0]);
				v0.push(p4, p6, p9);
				
				var v1 = new Array();
				v1.push(vertices[1]);
				v1.push(p5, p6, p8);
				
				var v2 = new Array();
				v2.push(vertices[2]);
				v2.push(p4, p5, p7);
				
				var v3 = new Array();
				v3.push(vertices[3]);
				v3.push(p7, p8, p9);
				
				var c = new Array();
				c.push([0,1,2,3]);
				
				simplexes3dTMP.push([v0, c]);
				simplexes3dTMP.push([v1, c]);
				simplexes3dTMP.push([v2, c]);
				simplexes3dTMP.push([v3, c]);
				
				simplexes3dTMP.reverse();
				simplexes3dTMP.pop();
				simplexes3dTMP.reverse();
			}
			
			
			simplexes3D = copyArr(simplexes3dTMP);
		}
		
		var model = mergeSimplexes3D(simplexes3D);
		return model;
				
	}
	return undefined
}

function mergeSimplexes3D(simplexes3D) {
	var modelV = new Array();
	var modelC = new Array();
	
	for (var i=0; i<simplexes3D.length; i++) {
		var C = simplexes3D[i][1];
		for (var c=0; c<C.length; c++) {
			var cellTMP = [];
			for (var p=0; p<C[c].length; p++) {
				cellTMP.push(C[c][p] + modelV.length);
			}
			modelC.push(cellTMP);
		}
		
		var V = simplexes3D[i][0];
			for (var v=0; v<V.length; v++)
				modelV.push(V[v]);
	}
	
	return (new lar.Model(modelV, modelC));
}

function copyArr(arr) {
	var result = [];
	for (var i=0; i<arr.length; i++) {
		result.push(arr[i]);
	}
	return result;
}