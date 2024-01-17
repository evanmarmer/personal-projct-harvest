import express from 'express';
import ViteExpress from 'vite-express';
import { Species, Hunts, Users } from './src/model.js'

let app = express();

app.use(express.json())

app.get('/species', async (req, res) => {
    const speciesArr = await Species.findAll();
    res.send(speciesArr)
    // console.log(speciesArr)
})

app.get('/posts', async (req, res) => {
    let hunts = await Hunts.findAll()

    for (let i = 0; i < hunts.length; i++) {
        hunts[i].dataValues.species = await hunts[i].getSpecies()
    }
    res.send(hunts)
})

app.post('/post', async (req, res) => {
    let newSpecies = req.body.species
    let newHarvestNum = req.body.harvest
    let newStory = req.body.story
    let userId = 1
    console.log(newSpecies)
    
    
    //sqlize shiz
    // console.log(user)
    const story = await Hunts.create({story: newStory, userId: userId})
    // console.log(story)
    // console.log(newStory)
    const harvestedSpecies = await Species.findAll({where: { species: newSpecies}})

    await story.setSpecies(harvestedSpecies, { through: { harvested: newHarvestNum}})

    let hunts = await Hunts.findAll()

    for (let i = 0; i < hunts.length; i++) {
        hunts[i].dataValues.species = await hunts[i].getSpecies()
    }
    res.send(hunts)
})



ViteExpress.listen(app, 5173, () => {console.log('listening on 5173')})