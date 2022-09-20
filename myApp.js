require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const Schema = mongoose.Schema;
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
//    unique: true,
    },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);

let the_date = new Date();
let person_value = new Person({name:'ODHM86__6', age: 36, favoriteFoods:["pizza","apple","pozole"]});
let arrayOfPeople = [{ path:'people',name:'ODHM86__86a', age: 36, favoriteFoods:["pizza","apple"]},{ path:'people', name:'ODHM86__86b', age: 36, favoriteFoods:["pizza","apple"]}];
let personName = 'Oscar';
 let food = ['pizza'];
let personId = '';


/*
const createAndSavePerson_WORKING = (done) => {
  person_value.save()
   .then(doc => {
     console.log(doc);
   })
   .catch(err => {
     console.error(err)
   })
};
*/

const createAndSavePerson = function(done) {
  person_value.save(function (err,data){
    if(err){ 
      return console.error(err);
    }
    else {
    return done(null, data);
    }
  });
};


const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, people){
    if(err){ 
      return console.error(err);
    }
    else {
    done(null, people)
    }
  });
  };
 



//createManyPeople();

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).exec(function(err,personFound){
    if(err){
      console.error(err);
    }
    else{
      console.log('object is: ',personFound);
      done(null, personFound);
    }
    });
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}).exec(function(err, data){
     if(err){
      return done(err);
    }
    else {
      console.log("found",data);
     return done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId).exec(function(err,data){
    if(err){
      return done(err);
    }
    else {
      console.log("found",data);
     return done(null, data);
    }
  });

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  console.log("var hamburger")

  Person.findById(personId).exec(function(err,byid){
    if(err){
      return done(err);
    }
    else {
      console.log("found",byid);
      byid.favoriteFoods.push(foodToAdd);
      console.log("new object: ", byid,"type of object: ",typeof byid);
      let new_object = {favoriteFoods: byid.favoriteFoods, name: byid.name, age: byid.age};
   
      console.log("deleted id: ", new_object);
      let new_model = new Person(new_object);
      byid.save(function (err,personUpdated){
    if(err){ 
      console.log("there was a error");
      return console.error(err);
    }
    else {
      console.log("saved foods");
    return done(null, personUpdated);
    }
      }
    );
      
    };
 //    return done(null, byid);
    }
  );

  
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  const query = { name: personName };
Person.findOneAndUpdate(query, { age: ageToSet }, { new: true }, function(err,data){
  if(err){
      return done(err);
    }
    else {
      console.log("modified document: ",data);
     return done(null, data);
}
}
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, null , function(err, data){
    if(err){
      return done(err);
    }
    else {
      console.log("deleted document: ",data);
     return done(null, data);
  }
  }
                          );

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name: nameToRemove}, function(err, response){
  if(err){
      return done(err);
    }
    else {
      console.log("json file: ",response);
     return done(null, response);
}
  
}
                                  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:false}).exec(function(err, result){
    if(err){
      return done(err);
    }
    else {
      console.log("result: ",result);
     return done(null, result);
  }
  }
                                                                               );
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
