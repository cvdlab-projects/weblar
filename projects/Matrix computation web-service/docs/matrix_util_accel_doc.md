# matrix_util_accel.js

**JavaScript library that manages matrix operations in an easy and fast way with different representations.**

Dependences: `node-lar-multiply-rest` (online web service), `csr.js`, `coo.js`, `matrix_util_accel_json`.

- - -

### `csrToJson(csrMatrix)`

Convert a csr_matrix instance in a JSON.

#### I/O

> #### in
> `csr_matrix` `csrMatrix`: a csr_matrix instance.
> 
> #### out
> `JSON`: a JSON representing a CSR matrix.

#### Example

> ```js
> var csrMatrix = new csr_matrix_from_json(
  { 
    "ROW":[0,2,3,5,7],
    "COL":[1,2,1,0,1,0,2],
    "DATA":[1,1,2,1,3,1,1],
    "ROWCOUNT":4,
    "COLCOUNT":3
  });
>
> var csrJson = matrix_util_accel.csrToJson(csrMatrix);
> ```

- - -

### `jsonToCsr(jsonCsrMatrix)`

From a JSON containing a csr matrix representation create a new csr_matrix instance.

#### I/O

> #### in
> `JSON` `jsonCsrMatrix`: a JSON representing a CSR matrix.
> 
> #### out
> `csr_matrix`: a csr_matrix instance.

#### Example

> ```js
> var json = { "ROW" : [0,2,3,4], "COL" : [0,2,1,0], "DATA" : [1,1,1,1], "ROWCOUNT" : 3, "COLCOUNT" : 3 };
> var csrMatrix = matrix_util_accel.jsonToCsr(json);
> ```

- - -

### `coo_to_json(cooMatrix)`

Converts from a COO instance to JSON

#### I/O

> #### in
> `coo_matrix` `cooMatrix`: a COO matrix.
> 
> #### out
> `JSON`: a JSON representing a COO matrix.

- - -

### `json_to_coo(jsonMatrix)`

Converts from a JSON to a COO instance

#### I/O

> #### in
> `JSON` `jsonMatrix`: a JSON representing a COO matrix.
> 
> #### out
> `coo_matrix`: a COO matrix.

#### Example

> ```js
> var coo_json = { "rowcount": 3, "colcount": 4, "row": [0,0,1,1,2,2,2], "col": [0,2,1,3,0,1,2], "val": [1,1,2,1,1,3,6]};
> var cooMatrix = matrix_util_accel.json_to_coo(coo_json);
> ```

- - -

### `csr_product(csrMatrixA, csrMatrixB)`

Send a request for an accelerated matrix product for the web service.
Starting from two instances of CSR matrices returns their product.

#### I/O

> #### in
> `csr_matrix` `csrMatrixA`: a CSR matrix instance
> `csr_matrix` `csrMatrixB`: a CSR matrix instance
> 
> #### out
> `csr_matrix`: their product.

#### Example

> ```js
> var matrix_A = ...;
> var matrix_B = ...;
> var matrix_AB = matrix_util_accel.csr_product(matrix_A,matrix_B);
> ```

- - -

### `coo_product(cooMatrixA, cooMatrixB)`

Send a request for an accelerated matrix product for the web service.
Starting from two instances of COO matrices returns their product.

#### I/O

> #### in
> `coo_matrix` `cooMatrixA`: a COO matrix instance
> `coo_matrix` `cooMatrixB`: a COO matrix instance
> 
> #### out
> `coo_matrix`: their product.

#### Example

> ```js
> var matrix_A = ...;
> var matrix_B = ...;
> var matrix_AB = matrix_util_accel.coo_product(matrix_A,matrix_B);
> ```

- - -

### `dense_product(denseMatrixA, denseMatrixB)`

Send a request for an accelerated matrix product for the web service.
Starting from two array of array representing two matrices returns their product.

#### I/O

> #### in
> `Array{Array}` `denseMatrixA`: a dense matrix instance
> `Array{Array}` `denseMatrixA`: a dense matrix instance
> 
> #### out
> `Array{Array}`: their product.

#### Example

> ```js
> var matrix_A = ...;
> var matrix_B = ...;
> var matrix_AB = matrix_util_accel.dense_product(matrix_A,matrix_B);
> ```

- - -
