const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run(data){
  try {
    await client.connect(); // Ensure the client connects to the database
    const database = client.db('Registration');
    const dbo = database.collection('RegistrationData');

    const { firstName, lastName, email, phoneNumber, password, age, gender, branch } = data;
    var myobj = { firstName, lastName, email, phoneNumber, password, age, gender, branch };

    const result = await dbo.insertOne(myobj);
    console.log("1 document inserted", result);
  } catch (err) {
    console.error('Error inserting document:', err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.post('/', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (firstName && lastName && email && phoneNumber && password) {
        try {
            await run(req.body);
            res.status(200).json({ message: 'Registration successful' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration failed' });
        }
    } else {
        res.status(400).json({ message: 'Missing required fields' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
