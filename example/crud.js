const { MongoClient, ObjectId } = require("mongodb");
const readline = require("readline");

// Connection URI
const uri =
  "mongodb://postgres:PASSWORD_TO_CHANGE@DOMAIN_TO_CHANGE/ferretdb?authMechanism=PLAIN";

// Database Name
const dbName = "ferretdb";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to MongoDB
async function connectToDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Function to insert a document
async function insertDocument(collectionName, document) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log("Inserted document:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  }
}

// Function to find documents
async function findDocuments(collectionName, query) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const cursor = collection.find(query);
    const results = await cursor.toArray();
    console.log("Found documents:", results);
  } catch (error) {
    console.error("Error finding documents:", error);
  }
}

// Function to update a document
async function updateDocument(collectionName, filter, update) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log("Updated document:", result.modifiedCount);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

// Function to delete a document
async function deleteDocument(collectionName, filter) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log("Deleted document:", result.deletedCount);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

// Function to read user input from command line
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

// Connect to MongoDB and perform CRUD operations
(async () => {
  await connectToDB();

  const operation = await prompt(
    "Enter operation (insert, find, update, delete): "
  );

  const collectionName = "users";

  switch (operation) {
    case "insert":
      const name = await prompt("Enter name: ");
      const age = await prompt("Enter age: ");
      await insertDocument(collectionName, { name, age: parseInt(age) });
      break;
    case "find":
      await findDocuments(collectionName, {});
      break;
    case "update":
      const documentIdToUpdate = await prompt("Enter document ID to update: ");
      const newAge = await prompt("Enter new age: ");
      await updateDocument(
        collectionName,
        { _id: ObjectId(documentIdToUpdate) },
        { age: parseInt(newAge) }
      );
      break;
    case "delete":
      const documentIdToDelete = await prompt("Enter document ID to delete: ");
      await deleteDocument(collectionName, {
        _id: ObjectId(documentIdToDelete),
      });
      break;
    default:
      console.log("Invalid operation");
  }

  // Close the connection
  await client.close();
  process.exit(0);
})();
