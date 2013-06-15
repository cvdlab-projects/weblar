/**
* matrix_product.js
*
* @author Luca Menichetti and Fabrizio Rebecca
* @copyright 2013 Luca Menichetti and Fabrizio Rebecca
* @licence MIT
*/

!(function (exports){
    
    var mrp = exports.matrix_remote_product = {};

    mrp.url = "http://webpdb.dia.uniroma3.it/service/test/multiply";

    /**
     * Test if the json pattern used for the remote matrix product is correct
     * @param  {JSON} matrix a CSR JSON matrix
     * @return {boolean} true if there are all these keys: "ROWCOUNT", "COLCOUNT", "ROW", "COL", "DATA".
     */
    var is_matrix_json_valid = function(matrix){
        return matrix.hasOwnProperty("ROW") && matrix.hasOwnProperty("COL") && matrix.hasOwnProperty("DATA") &&
            matrix.hasOwnProperty("ROWCOUNT") && matrix.hasOwnProperty("COLCOUNT");
    }

    /**
     * Check if the two CSR JSON matrix are compatible to be multiplied through the remote webservice
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     * @return {boolean} true if matrixs are valid
     */
    var are_matrices_valid = function(matrixA,matrixB){
        if ( !is_matrix_json_valid(matrixA) || !is_matrix_json_valid(matrixB) ){
            return false;
        }
        if ( matrixA.hasOwnProperty("COLCOUNT") != matrixB.hasOwnProperty("ROWCOUNT")  ){
            return false;
        }
        return true;
    }

    /**
     * Send the product to the web service specified in mrp.url
     * @param  {JSON}   matrixA
     * @param  {JSON}   matrixB
     * @param  {Function} callback
     * @param  {boolean} asynchronous true if asyncronous
     */
    var send_request = function(matrixA,matrixB,callback,asynchronous){ 
        $.ajax({
            type: 'POST' ,
            url: mrp.url ,
            data :  "matrixa=" + JSON.stringify(matrixA) + "&matrixb=" + JSON.stringify(matrixB) ,
            async : asynchronous ,
            processData : false ,
            success : callback , 
            error : function(req, status, ex) {} ,
            timeout:60000
        });
    }

    /**
     * Where the synchronous request save its result
     * @type {JSON}
     */
    var sync_result = mrp.sync_result = {};
    
    /**
     * Synchronous method that implements a POST request to the rest webserver.
     * It stores the result in the "sync_result" variable.
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     */
    var send_request_sync = function(matrixA,matrixB){
        if ( !are_matrices_valid(matrixA,matrixB) )
            throw new Error("Format or invalid matrices submitted.");
        var callback = function(data) {
            mrp.sync_result = data;
        };
        send_request(matrixA,matrixB,callback,false);
    };

    /**
     * Asynchronous method that implements a POST request to the rest webserver.
     * On success will be executed the "callback" function.
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     */
    var send_request_async = function(matrixA,matrixB,callback){
        if ( !are_matrices_valid(matrixA,matrixB) )
            throw new Error("Format or invalid matrices submitted.");
        send_request(matrixA,matrixB,callback,true);
    };

    /**
     * Send a sync request for a matrices product.
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     */
    mrp.prodMatrixSync = function (matrixA,matrixB) {
        send_request_sync(matrixA,matrixB);
    }

    /**
     * Send a sync request for a matrices product and print a log in the console.
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     */
    mrp.prodMatrixSync_log = function (matrixA,matrixB) {
        send_request_sync(matrixA,matrixB);
        console.log(this.sync_result);
    }

    /**
     * Send an async request for a matrices product
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     * @param  {Function} callback the function executed after the product
     */
    mrp.prodMatrixAsync = function (matrixA,matrixB,callback) {
        send_request_async(matrixA,matrixB,callback);
    }

    /**
     * Send an async request for a matrices product and print a log in the console.
     * @param  {JSON} matrixA
     * @param  {JSON} matrixB
     */
    mrp.prodMatrixAsync_log = function (matrixA,matrixB) {
        send_request_async(matrixA,matrixB, function(data) { console.log(data); }); 
    }

}(this));
