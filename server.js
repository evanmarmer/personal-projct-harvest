import express from 'express';
import ViteExpress from 'vite-express';

let app = express();

app.use(express.json())





ViteExpress.listen(app, 5173, () => {console.log('listening on 5173')})