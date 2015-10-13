var person = {
   "name": "John",
   "gender": "M"
};

var john = Object.create(person, {});

//class Person{}

function Person(name, email) {
   this.name = name;
   this.email = email;

   this.toString = function(){return this.name;};
}

var john = new Person("john","...");
var doe = new Person("doe", "...");
