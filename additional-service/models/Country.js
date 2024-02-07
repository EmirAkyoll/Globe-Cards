const mongoose = require('mongoose');

const BackgroundSchema = mongoose.Schema(
    { 
      direction: { type: String, require: true },
      colors: { type: [String], require: true },
    }
  );

const CountrySchema = mongoose.Schema(
{ 
    _id: { type: String, require: true },
    country_name: { type: String, require: true },
    flag_url: { type: String, require: true },
    silhouette_url: { type: String, require: true },
    area: { type: Number, require: true },
    population: { type: Number, require: true },
    currency_sign: { type: String, require: true },
    gdp: { type: Number, require: true },
    form_of_government: { type: String, require: true },
    background: [BackgroundSchema]
},

{ timestamps: true }
);

const Country = mongoose.model('countries', CountrySchema);
module.exports = Country;
