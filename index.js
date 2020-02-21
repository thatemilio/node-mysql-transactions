/*
 * node-mysql-transactions
 *
 * npm:     mysql-transactions
 * github:  https://github.com/thatemilio/node-mysql-transactions
 *
 */


var mysql = require('mysql');



module.exports = function(mysqlOpts) {

    return {

        _connection: null,


        begin:  function(cb) {

            this._connection = mysql.createConnection(mysqlOpts);

            this._connection.connect();

            this._connection.query('START TRANSACTION', cb);
       
        },


        query:  function(str, data, cb) {

            var args = arguments.length;

            if ( args === 2 ) {
            
                var cb = data;
                this._connection.query(str, cb);
            
            } else if ( args === 3 ) {
            
                this._connection.query(str, data, cb);
            
            }

        },


        commit: function(cb) {

            this._connection.query('COMMIT', cb);

            this._connection.end();

        },


        rollback: function(cb) {

            this._connection.query('ROLLBACK', cb);

            this._connection.end();

        }

    };

};
