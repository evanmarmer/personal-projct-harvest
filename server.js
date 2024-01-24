import express from 'express';
import ViteExpress from 'vite-express';
import { Species, Hunts, Users, HuntsSpeciesHarvests, sequelize } from './src/model.js'

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
    console.log(req.body.speciesHarvest)
    // let newSpecies = req.body.species
    // let newHarvestNum = req.body.harvest
    let newSpeciesHarvestNum = req.body.speciesHarvest
    let newStory = req.body.story
    let userId = 1
    
    const story = await Hunts.create({story: newStory, userId: userId})
    // console.log(story)
    // console.log(newStory)

    let sqlStringData = ''

    for (let i = 0; i < newSpeciesHarvestNum.length; i++) {
        // console.log('-----------------' + i + '-----------------')
        // const harvestedSpecies = await Species.findAll({where: { species: newSpeciesHarvestNum[i].species}})
        // console.log(harvestedSpecies)
        // let eraseMe = await story.setSpecies(harvestedSpecies, { through: { harvested: newSpeciesHarvestNum[i].harvested}, reset: false})
        // story.save()
        // console.log(eraseMe)
        let speciesObj = await sequelize.query(`
            SELECT * FROM species WHERE species = '${newSpeciesHarvestNum[i].species}';
        `)

        let speciesId

        if (speciesObj[0].length === 0) {
            let newSpeciesObj = await Species.create({species: newSpeciesHarvestNum[i].species, gameType: 'userCreated'})
            speciesId = newSpeciesObj.id
            console.log(newSpeciesObj)
        } else {
            speciesId = speciesObj[0][0].id
        }

        console.log(speciesObj)

        sqlStringData += `(${story.id}, ${speciesId}, ${newSpeciesHarvestNum[i].harvested}, '${(new Date()).toISOString()}', '${(new Date()).toISOString()}'), `

    }

    sqlStringData = sqlStringData.substring(0, sqlStringData.length - 2) + ';'

    await sequelize.query(`
        INSERT INTO "HuntsSpeciesHarvests" ("huntId", "speciesId", harvested, "createdAt", "updatedAt") VALUES 
        ${sqlStringData}
    `)
    

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

  app.put('/edit-post', async (req, res) => {

    for (let i = 0; i < req.body.speciesHarvestInput.length; i++) {
        // console.log(req.body.speciesHarvestInput[i].HuntsSpeciesHarvests)
        let editedHarvested = req.body.speciesHarvestInput[i].HuntsSpeciesHarvests.harvested
        let editedSpecies = req.body.speciesHarvestInput[i].species
        // console.log(editedHarvested)
    }

    let speciesInfo = await Species.findAll({where: {species: editedSpecies}}) 
    // console.log(speciesInfo)

    await HuntsSpeciesHarvests.update({speciesId: speciesInfo.id, harvested: editedHarvested},{
        where: {
           huntId 
        }
    })
    
    let editedStory = req.params.story
    let huntId = +req.params.huntId
    console.log(req.body)
    
    
    await Hunts.update({story: editedStory},{
        where: {
            id: huntId
        },
    })
    

    let hunts = await Hunts.findAll()
    for (let i = 0; i < hunts.length; i++) {
        hunts[i].dataValues.species = await hunts[i].getSpecies()
    }

    res.status(200).send(hunts)
})

ViteExpress.listen(app, 5173, () => {console.log('listening on 5173')})