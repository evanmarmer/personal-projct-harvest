import express from 'express';
import ViteExpress from 'vite-express';
import { Species, Hunts } from './src/model.js'

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

})



ViteExpress.listen(app, 5173, () => {console.log('listening on 5173')})