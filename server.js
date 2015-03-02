var express = require ('express');
var app= express();
var mongojs = require('mongojs');
var db= mongojs('admin:WeZ-Phst1vaH@mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/blooddonar',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname +"/public/"));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){

	//console.log("Received Request");
	
db.contactlist.find(function(err,docs){
//console.log(docs);
res.json(docs); 
});


	/*
	person1 = {	
			name : 'ABC' ,  
			contact : 'abc@gmail.com', 
			email : 9594813901,
			bldgrp : 'A +ve'
		}
	person2 = {	name : 'PQR' ,
		contact : 'pqr@gmail.com' ,
		email : 9594813902,
		bldgrp : 'O +ve'

	};
	person3 = {
		name : 'XYZ' ,
		contact : 'xzy@gmail.com' ,
		email : 9594813903,
		bldgrp : 'B -ve'
	};

	var contactlist =[person1,person2,person3];

	res.json(contactlist);
	*/
});
/*
app.get('/',function(req, res)
	{
		res.send("Hello Nilesh");
	});
*/

app.post('/contactlist',function(req,res){
	//console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});
});


app.delete('/contactlist/:id', function(req,res){
	var id=req.params.id;
	//console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req,res){
	var id=req.params.id;
	//console.log("ser_get");
	//console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req,res){
	var id=req.params.id;
	//console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
	 update: {$set: {name: req.body.name,contact: req.body.contact, email: req.body.email, bldgrp: req.body.bldgrp}},
	 new: true}, function(err,doc){
	 	res.json(doc);
	 }
	);
	
	});
/*
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
*/
app.listen(3000);
console.log("Server running on port no. 3000");
