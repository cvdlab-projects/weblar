var csr_json = { "ROW" : [0,2,3,4], "COL" : [0,2,1,0], "DATA" : [1,1,1,1], "ROWCOUNT" : 3, "COLCOUNT" : 3 };

var matrixFromJson = new csr_matrix_from_json(csr_json);

print(matrixFromJson.toString());

print(matrixFromJson.toDense());