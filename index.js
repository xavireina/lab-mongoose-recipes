



const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  //Connexió amb la base de dades...
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Afegim una recepta...
  .then(() => { 
    const my_recipe = {
      title: "Salmorejo",
      level: "Easy Peasy",
      ingredients:["tomato", "oil", "bread"],
      cuisine: "Andaluza",
      dishType: "soup",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 50, 
      creator: "Xavi",
      // created: Date.now
    }
      return Recipe.create(my_recipe, (error, receta) => {
        if (error) {
          console.log('An error happened:', error);
          return;
        }
        console.log('The recipe is saved and its value is: ', receta.title);
      });

  }) 
  //Insertem totes les receptes del fitxer data.json
  .then(() => { 
      return Recipe.insertMany(data, (error, recetas) => {
        if (error) {
          console.log('An error happened:', error);
          return;
        }
        console.log('The amount of recetas are: ', recetas.length);
      });

  })

  //Modifiquem atribut d'un element 
  .then(() => { 
    return Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese"
      }, 
      {
        duration: 100
      },
    );

  })

  //Eliminem un element
  .then(() => { 
    return Recipe.deleteOne({title: "Carrot Cake"})

  })


// Busquem tots els elements 
  .then(() => { 
    return Recipe.find({})
    .then(recetas => console.log(recetas))
  })

// Ens desconectem
  .then(() => { 
    mongoose.connection.close();
    console.log("connection closed")
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  




  
  