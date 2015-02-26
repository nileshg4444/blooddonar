function AppCtrl($scope,$http){

console.log("Hello frm the controller");

$scope.dist1=parseInt($scope.dist) * 5;



var refresh = function(){
$http.get('/contactlist').success(function(response){
	console.log("Got data");

	$scope.contactlist = response;
    $scope.contact="";
});
};

refresh();
$scope.addContact = function(){
$http.post('/contactlist',$scope.contact).success(function(response){
//	console.log(response);
refresh();
});

};


$scope.remove = function(id){
//console.log(id);
$http.delete('/contactlist/' + id).success(function(response){
refresh();
});

};

$scope.edit = function(id){
//console.log(id);
$http.get('/contactlist/' + id).success(function(response){
$scope.contact =response;
});

};


$scope.update = function(){
//console.log($scope.contact._id);
$http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(response){
refresh();
});

};


$scope.deselect = function(){
$scope.contact=" ";
refresh();
};

}

/*
var app = angular.module('Myapp',[]);

app.controller('AppCtrl',['$scope',
	{
		//console.log("Hello frm the controller");

	person1 = {	name : 'ABC' ,  contact : 'abc@gmail.com', email : 9594813901}
	person2 = {	name : 'PQR' ,
		contact : 'pqr@gmail.com' ,
		email : 9594813902,

	};
	person3 = {
		name : 'XYZ' ,
		contact : 'xzy@gmail.com' ,
		email : 9594813903,

	};

	var contactlist =[person1,person2,person3];
	$scope.contactlist = contactlist;

}])
*/