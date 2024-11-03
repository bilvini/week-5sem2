const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017"; // Change this to your MongoDB URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('yourDatabaseName'); // Replace with your database name

        // Fetch all documents from Employees
        const employees = database.collection('Employees');
        const allEmployees = await employees.find().toArray();
        console.log("All Employees:", allEmployees);

        // Fetch all documents from Orders
        const orders = database.collection('Orders');
        const allOrders = await orders.find().toArray();
        console.log("All Orders:", allOrders);

        // Fetch only FirstName and LastName from Employees
        const names = await employees.find({}, { projection: { FirstName: 1, LastName: 1, _id: 0 }}).toArray();
        console.log("Employee Names:", names);

        // Fetch OrderID and Amount from Orders
        const orderDetails = await orders.find({}, { projection: { OrderID: 1, Amount: 1, _id: 0 }}).toArray();
        console.log("Order Details:", orderDetails);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
