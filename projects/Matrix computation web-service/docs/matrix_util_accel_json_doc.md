# matrix_util_accel_json.js

JavaScript library that is responsable to interface with the layer that sends matrix operation commands over the network.
The only format used in this layer is JSON. It also provides conversions between types.

Dependences: `node-lar-multiply-rest` (web service needs to be running), `csr.js`, `coo.js`, `matrix_remote_product.js`.

- - -

### `csr_json_product(csrJsonMatrixA,csrJsonMatrixB)`

Takes two JSON representing two CSR matrices and send a remote request for the matric product webservice.
Return a JSON CSR matrix as result.

#### I/O

> #### in
> `JSON` `csrJsonMatrixA`: a JSON representing a CSR matrix instance. 
> `JSON` `csrJsonMatrixB`: a JSON representing a CSR matrix instance.
> 
> #### out
> `JSON`: a JSON representing their product in a CSR matrix.

#### Example

> ```js
> var csrJsonMatrixA = {"ROW":[0,2,3,3,4],"COL":[0,2,1,3],"DATA":[4,9,7,5],"ROWCOUNT":4,"COLCOUNT":4};
> var csrJsonMatrixB = {"ROW":[0,1,3,5,6],"COL":[1,0,1,0,1,0],"DATA":[1,2,3,4,5,6],"ROWCOUNT":4,"COLCOUNT":2};
> var resultJson = matrix_util_accel_json.csr_json_product(csrJsonMatrixA,csrJsonMatrixB);
> ```

- - -

### `coo_json_product(cooJsonMatrixA,cooJsonMatrixB)`

Takes two JSON representing two COO matrices, CONVERTS them in a CSR, 
and send a remote request for the matric product webservice.
Return a JSON COO matrix as result.

#### I/O

> #### in
> `JSON` `cooJsonMatrixA`: a JSON representing a COO matrix instance. 
> `JSON` `cooJsonMatrixB`: a JSON representing a COO matrix instance.
> 
> #### out
> `JSON`: a JSON representing their product in a COO matrix.

#### Example

> ```js
> var cooJsonMatrixA = {"row":[0,0,1,3],"col":[0,2,1,3],"val":[4,9,7,5],"rowcount":4,"colcount":4};
> var cooJsonMatrixB = {"row":[0,0,1,3],"col":[0,2,1,3],"val":[4,9,7,5],"rowcount":4,"colcount":4};
> var resultJson = matrix_util_accel_json.coo_json_product(cooJsonMatrixA,cooJsonMatrixB);
> ```

- - -

### `csr_json_to_coo_json(csrJson)`

Converts a CSR JSON matrix in a COOJSON matrix.

#### I/O

> #### in
> `JSON` `csrJson`: a JSON representing a CSR matrix instance. 
> 
> #### out
> `JSON`: a JSON representing a COO matrix.

- - -

### `coo_json_to_csr_json(cooJson)`

Converts a COO JSON matrix in a CSR JSON matrix.

#### I/O

> #### in
> `JSON` `cooJson`: a JSON representing a COO matrix instance. 
> 
> #### out
> `JSON`: a JSON representing a CSR matrix.

- - -
