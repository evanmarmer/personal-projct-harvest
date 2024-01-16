import { sequelize, Species, Users, Hunts } from '../src/model.js'

const species = [
    {
        species: "Elk",
        gameType: 'bigGame',
    },
    {
        species: "Antelope",
        gameType: 'bigGame',
    },
    {
        species: "Moose",
        gameType: 'bigGame',
    },
    {
        species: "Black Bear",
        gameType: 'trophyGame',
    },
    {
        species: "Grey Wolf",
        gameType: 'trophyGame',
    },
    {
        species: "Grey Wolf",
        gameType: 'trophyGame',
    },
    {
        species: "Mountain Lion",
        gameType: 'trophyGame',
    },
    {
        species: "Blue Grouse",
        gameType: 'uplandBird',
    },
    {
        species: "Chukar",
        gameType: 'uplandBird',
    },
    {
        species: "Pheasant",
        gameType: 'uplandBird',
    },
    {
        species: "Fox Squirrel",
        gameType: 'smallGame',
    },
    {
        species: "Snowshoe Hare",
        gameType: 'smallGame',
    },
    {
        species: "Cottontail Rabbit",
        gameType: 'smallGame',
    },
    {
        species: "Mallard",
        gameType: 'migratoryGame',
    },
    {
        species: "Redhead",
        gameType: 'migratoryGame',
    },
    {
        species: "Northern Pintail",
        gameType: 'migratoryGame',
    },
]

await sequelize.sync({force: true})

let speciesResults = await Species.bulkCreate(species);

let huntsResults = await Hunts.bulkCreate([
    {
        story: 'This was my best hunt everl',
    },
    {
        story: "Sucked. Climbed mountains for days and just got 2 squirrles."
    }
])



await Users.create({
    fname: 'Evan',
    lname: 'Marmer',
})

await huntsResults[0].addSpecies(speciesResults[0], { through: { harvested: 3}})
await huntsResults[0].addSpecies(speciesResults[1], { through: { harvested: 4}})

await huntsResults[1].addSpecies(speciesResults[3], { through: { harvested: 2}})
await huntsResults[1].addSpecies(speciesResults[0], { through: { harvested: 2}})

await sequelize.close()

