Weblar - Task two: 
==================
Integration of the `matrix computation` web-service

!

## Description

*Create a webservice that provides fast matrixs' operations on the network.*

!

Summary
=======

1) Localization of code's sections that use matrix's operation

2) Creation of a proper layer that implements the computation of matrix's operation hiding the logic implementation

3) Setup a web service that offers such operation online

!

## Point (1) - Localization of code's sections that use matrix's operation

* Find in `lar.js` which functions needs to do a matrix operation

* Replacement with a call to an external procedure (*interface*)

!

## Point (2.1)

#####Creation of a proper layer that implements the computation of matrix's operation hiding the logic implementation

*Definition of a `matrixutil_accel.js` layer.

*This layer is responsable to handle format or encoding, such as csr, json...

!

## Point (2.2)

*Valuate if there's the possibility to introduce some kind of high level optimizations. Ex. A^T x B

*Realization of a `HttpRequest` with the matrix computation webservice using Representational state transfer (`REST`)

*This layer is also responsable to manage the answer, with an opportune decoding in order to satisfy the spefics

!

## Point (3)
===
* Content slide 3 *
** Content slide 3 **

		ioefifofewioefh
[google link](www.google.com)
