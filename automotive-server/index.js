
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();


const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ariyjgs.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productCollection = client.db("WheelWondersDB").collection("products"); // Create a "products" collection
    const userCollection = client.db("WheelWondersDB").collection("users"); // Create a "users" collection
    const cartCollection = client.db("WheelWondersDB").collection("carts"); // Create a "users" collection

    // add product to DB
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    // Handle GET request to fetch products for homepage
    app.get('/products', async (req, res) => {
      try {
        // Retrieve all products from the database
        const products = await productCollection.find({}).toArray();
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle GET request to fetch products/brand/:brandName for allCarsUnderBrand
    app.get('/products/brand/:brandName', async (req, res) => {
      const { brandName } = req.params;
      try {
        const products = await productCollection.find({ brandName }).toArray();
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle GET request to fetch products /products/details/:_id for single product
    app.get('/products/details/:_id', async (req, res) => {
      const { _id } = req.params;
      try {
        const objectId = new ObjectId(_id);
        const product = await productCollection.findOne({ _id: objectId });
        if (product) {
          res.json(product); // Respond with the product details
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle GET request to fetch products /products/updateCarInfo/:_id for single car
    app.get('/products/updateCarInfo/:_id', async (req, res) => {
      const { _id } = req.params;
      try {
        const objectId = new ObjectId(_id);
        const product = await productCollection.findOne({ _id: objectId });
        if (product) {
          res.json(product); // Respond with the product details
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle PUT request to update car information
    app.put('/products/:_id', async (req, res) => {
      const { _id } = req.params; // Extract the _id from URL parameters
      const updatedData = req.body; // The updated data sent in the request body

      try {
        // Use updateOne to find and update the car information based on _id
        const result = await productCollection.updateOne(
          { _id: new ObjectId(_id) }, // Filter based on the _id
          {
            $set: {
              image: updatedData.image,
              name: updatedData.name,
              brandName: updatedData.brandName,
              brandImage: updatedData.brandImage,
              price: updatedData.price,
              shortDescription: updatedData.shortDescription,
              rating: updatedData.rating,
            },
          } // Update the car's fields
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Car information updated successfully' });
        } else {
          res.status(404).json({ error: 'Car not found' });
        }
      } catch (error) {
        console.error('Error updating car information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // add users to DB
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // just create user route but never use yet
    app.get('/users', async (req, res) => {
      try {
        // Retrieve all products from the database
        const users = await userCollection.find({}).toArray();
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // add cart to DB
    app.post("/carts", async (req, res) => {
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result);
    });

    // Handle GET request to fetch products for homepage
    app.get('/carts', async (req, res) => {
      try {
        // Retrieve all products from the database
        const carts = await cartCollection.find({}).toArray();
        res.json(carts);
      } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle GET request to fetch a specific cart item by _id
    app.get('/carts/:_id', async (req, res) => {
      const { _id } = req.params;
      try {
        const objectId = new ObjectId(_id);
        const carts = await cartCollection.findOne({ _id: objectId });
        if (carts) {
          res.json(carts); // Respond with the product details
        } else {
          res.status(404).json({ error: 'Cart item not found' });
        }
      } catch (error) {
        console.error('Error fetching cart item details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Handle DELETE request to delete a cart item by ID
    app.delete('/carts/:_id', async (req, res) => {
      const id = req.params._id; // Extract the _id from URL parameters
      const query = { _id: new ObjectId(id) };
      // Use deleteOne to find and delete the cart item based on _id
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Automotive server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
