# matrix_util_accel.js

### JavaScript library to manage matrix operations with different representations

- - -

### `BEZIER(sel)(controlpoints)`
Transfinite mapping function of genric degree Bezier curve.

#### I/O

> #### in
> `Function` `selector`: domain coordinate selector function.
>
> > #### in
> > `Array` `v`: point of the `domain`.
> >
> > #### out
> > `Number`: the selected coordinate. 
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `Function`: an anonymous mapping function.

#### Example

> ```js
> var domain = INTERVALS(1)(32);
> var controlpoints = [[-0,0],[1,0],[1,1],[2,1],[3,1]];
> var curveMapping = BEZIER(S0)(controlpoints);
> var curve = MAP(curveMapping)(domain);
> DRAW(curve);
> ```

> ```js
> var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
> var c0 = BEZIER(S0)([[0,0,0],[10,0,0]]);
> var c1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);
> var c2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);
> var c3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);
> var out = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);
> DRAW(out);
>```

- - -

### `BOUNDARY(d)(model)`

Get the `d`-boundary of the `model`.

#### I/O

> #### in
> `Number` `d`: space dimension.
> 
> #### out
> `plasm.Model`: the `d`-boundary of the `model`.

#### Example

> ```js
> var d = 1;
> var model = TORUS_SURFACE()();
> var boundary = BOUNDARY(d)(model);
> DRAW(boundary);
> ```

- - -
