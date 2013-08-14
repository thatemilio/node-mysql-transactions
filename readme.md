### node-mysql-transactions



#### dependencies
`npm install mysql`



#### install
`npm install mysql-transactions`



#### tutorial
Seeing as how you're viewing a module named `mysql-transactions` I'm going to assume you understand the little bits and 
jump right into coding a simple demo. Cool? Cool.


##### the schema
Before we get started this is the structure we're going to be using for this demo.

```sql
CREATE TABLE users (

    id      INT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(40) NOT NULL

);
```


##### game time
```javascript
var async = require('async');

var transactions = require('mysql-transactions')({
    user: 'hamburglar',
    password: 'omnomnomnomnom',
    database: 'playhouse'
});
```

As you can see, we're using the `async` module as well. But the section to note is `require('mysql-transactions')({ ... });`. 
Here we must pass in our `connection` options (again?). These options are the same ones used in your non-transactional queries 
i.e. the options/string supplied to [mysql.createConnection](https://github.com/felixge/node-mysql#connection-options).


```javascript
async.series(
[
    function(done) {
        transactions.begin(done);
    },
```

Okay, so now that we have our connection options ready we need to kick off the transactions process which we do by 
calling `transactions.begin(done)`. Note that we passed in `done` to continue the `async` flow.


```javascript
    function(done) {
        transactions.query('insert into users set ?', { name: 'John Smith' }, function(err, result) {
            if (err) return done(err);

            done(null, result.affectedRows ? true : false);
        });
    }
```

With the `transactions` process open we can query the database like 
[normal](https://github.com/felixge/node-mysql#escaping-query-values).


```javascript
],

    function(err, results) {
        if (err) {
            transactions.rollback();
            return console.log(err);
        }

        transactions.commit(function(err, result) {
            if (err) return console.log(err);

            console.log('done');
        });
    }
);
```

The last step in the process is to either `commit` or `rollback` the `transactions`. One _must_ be called to close the 
`connection`. While this example shows `transactions.commit(function...)`, it is not necessary to provide a function to 
`commit`/`rollback` or `begin` for that matter.



#### full demo
```javascript
var async = require('async');

var transactions = require('mysql-transactions')({
    user: 'hamburglar',
    password: 'omnomnomnomnom',
    database: 'playhouse'
});



async.series(
[
    function(done) {
        transactions.begin(done);
    },

    function(done) {
        transactions.query('insert into users set ?', { name: 'John Smith' }, function(err, result) {
            if (err) return done(err);

            done(null, result.affectedRows ? true : false);
        });
    }
],

    function(err, results) {
        if (err) {
            transactions.rollback();
            return console.log(err);
        }

        transactions.commit(function(err, result) {
            if (err) return console.log(err);

            console.log('done');
        });
    }
);
```

