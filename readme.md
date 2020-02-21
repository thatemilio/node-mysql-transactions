## node-mysql-transactions



### dependencies
`npm install mysql`



### install
`npm install mysql-transactions`



### quick start
```javascript
var transactions = require('mysql-transactions')({
    user: 'hamburglar',
    password: 'omnomnomnomnomnom',
    database: 'playhouse'
});



transactions.begin();


transactions.query('INSERT INTO users SET ?', { name: 'Lord Voldemort' }, function(err, result) {

    if (err) {
        transactions.rollback();
        return console.log('Rolled back.');
    }


    transactions.commit(function(err, result) {
        console.log('Committed.');
    });

});
```

**Note**: After calling `.begin()`, `.commit()` or `.rollback()` **must** be called so that the 
connection is closed.



### api
Each `[fn]` is a `callback` for a [mysql.query](https://github.com/felixge/node-mysql#introduction).

* `begin([fn])`: start the transaction process.
* `query(String [, Object/Array] [, fn])`: traditional query.
* `rollback([fn])`: rollback the transaction.
* `commit([fn])`: commit the transaction.

