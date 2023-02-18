const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json());



const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const fresherJobCollection = client.db('ItJobPortal').collection('fresherJob');
        const experienceJobCollection = client.db('ItJobPortal').collection('experienceJob');

        app.get('/fresherJob', async (req, res) => {
            const query = {};
            const result = await fresherJobCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/experienceJob', async (req, res) => {
            const query = {};
            const result = await experienceJobCollection.find(query).toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(e => console.error(e))




app.get('/', (req, res) => {
    res.send('server open on port 5000');
})

app.listen(port, () => {
    console.log(`server open on port ${port}`);
})