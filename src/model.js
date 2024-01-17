import Sequelize, { DataTypes, Model } from 'sequelize';
import url from 'url';
import util from 'util';
import connectToDB from './db.js';

const sequelize = new Sequelize('postgresql:///hunt_app', {logging: false});


class Users extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
} 

Users.init(
    {
        id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        fname: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        lname: {
        type: DataTypes.STRING,
        allowNull: false,
        }

    },
  {
    modelName: 'user', 
    sequelize: sequelize, 
  },
);

class Hunts extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Hunts.init(
  {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    story: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  },
  {
    modelName: 'hunts', 
    sequelize: sequelize,  
  },
);

class HuntsSpeciesHarvests extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  HuntsSpeciesHarvests.init(
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      harvested: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      modelName: 'HuntsSpeciesHarvests', 
      sequelize: sequelize, 
    },
  );

  class Species extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  Species.init(
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gameType: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      modelName: 'species', 
      sequelize: sequelize, 
    },
  );

Users.hasMany(Hunts, { foreignKey: 'userId' });
Hunts.belongsTo(Users, { foreignKey: 'userId' });

// HuntsSpeciesHarvests.belongsTo(Hunts, { foreignKey: 'huntsId' });
// Hunts.hasMany(HuntsSpeciesHarvests, { foreignKey: 'huntsId' });

// HuntsSpeciesHarvests.belongsTo(Species, { foreignKey: 'speciesId' });
// Species.hasMany(HuntsSpeciesHarvests, { foreignKey: 'speciesId' });

Hunts.belongsToMany(Species, { through: 'HuntsSpeciesHarvests' });
Species.belongsToMany(Hunts, { through: 'HuntsSpeciesHarvests' });

export default sequelize;
export { sequelize, Users, Hunts, Species };