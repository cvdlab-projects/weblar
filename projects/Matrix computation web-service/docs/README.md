# matrix_util_accel.js

### JavaScript library that manages matrix operations in an easy and fast way with different representations

Dependences: `node-lar-multiply-rest`, `csr.js`, `coo.js`.

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

### `csrMatrixProduct(csrMatrixA, csrMatrixB)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -

### `denseMatrixProduct(denseMatrixA, denseMatrixB)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -

### `csrJsonMatrixProduct(csrJsonMatrixA,csrJsonMatrixB)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -

### `cooRSJsonMatrixProduct(cooJsonMatrixA,cooJsonMatrixB)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -
- 
### `csrJsonMatrixToCooJsonMatrix(cooJson)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -

### `cooRSJsonMatrixToCsrMatrix(cooJson)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -

### `cooRSJsonMatrixToCsrJsonMatrix(cooJson)`

Description.

#### I/O

> #### in
> `type` `arg`: descr.
> 
> #### out
> `type`: descr.

#### Example

> ```js
> here 
> some
> examples
> ```

- - -
