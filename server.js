import express from 'express';
import ViteExpress from 'vite-express';
import { Species, Hunts, Users, HuntsSpeciesHarvests } from './src/model.js'

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
    // console.log(newSpecies)
    
    
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

app.delete('/post/:post', async (req, res) => {
    let huntId = req.params.post
    console.log(huntId)

        const deleteMe = await Hunts.findAll({where: { id: huntId}})
        console.log(deleteMe[0])

        await deleteMe[0].destroy()

        let hunts = await Hunts.findAll()

        for (let i = 0; i < hunts.length; i++) {
            hunts[i].dataValues.species = await hunts[i].getSpecies()
        }
    
    res.status(200).send(hunts)
  })

  app.put('/edit-post/:species/:harvested/:story/:huntId', async (req, res) => {
    //   console.log(req.params.huntId)
    //   console.log(req.params)
    //   console.log(+req.params.harvested)
    //   console.log(req.params.story)

      
    let editedSpecies = req.params.species
    let editedHarvested = +req.params.harvested
    let editedStory = req.params.story
    let huntId = +req.params.huntId
    // console.log(editedSpecies)
    
    let speciesInfo = await Species.findAll({where: {species: editedSpecies}}) 
    // console.log(speciesInfo)
    
    await Hunts.update({story: editedStory},{
        where: {
            id: huntId
        },
    })
    
    //using editedSpecies, find the Species object that correcsponds to it, save it to a variable

    //then in the HuntSpeciesHarvest.update, you'll reference the above variable's id property for speciesId

    await HuntsSpeciesHarvests.update({speciesId: speciesInfo.id, harvested: editedHarvested},{
        where: {
           huntId 
        }
    })

    
    let hunts = await Hunts.findAll()
    for (let i = 0; i < hunts.length; i++) {
        hunts[i].dataValues.species = await hunts[i].getSpecies()
    }

    res.status(200).send(hunts)
})

ViteExpress.listen(app, 5173, () => {console.log('listening on 5173')})