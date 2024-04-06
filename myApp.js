require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true , useUnifiedTopology:true});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const Person1= new Person({name:"Vivek", age:21 , favoriteFoods:['Jalebi','Gulab Jamun']});
  
  Person1.save( function(err, data){
    if(err) return console.error(err);
    done(null , data);
  });

};

const arrayOfPeople=[
  {name:'P',age:21,favoriteFoods:['Dosa','Rasam']},
  {name:'S',age:20,favoriteFoods:['PuranPoli','Sajuk Tup']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,data){
    if(err) return console.log(err);
    done(null, data);  
  });
};

const personName = 'Vivek';

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const food=['Idli'];

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const personId=0o145634;

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err,person){ // here 'data' is the found document with the matching id
    if(err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save( (err, updatedPerson)=>{
      if(err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true, runValidators:true},function(err,person){
    if(err) return console.error(err);
    done(null, person);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err,data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function(err,data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, data) {
    done(err,data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
