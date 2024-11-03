const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017"; // Change this to your MongoDB URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('yourDatabaseName'); // Replace with your database name

        const employees = database.collection('Employees');
        await employees.insertOne({
            EmployeeID: 1,
            FirstName: "Alice",
            LastName: "Johnson",
            DateOfBirth: new Date("1990-01-15"),
            Department: "HR"
        });

        // Insert multiple orders
        const orders = database.collection('Orders');
        const orderData = [
            {
                OrderID: 1,
                OrderDate: new Date("2024-10-01"),
                CustomerID: 201,
                Amount: 150.00
            },
            {
                OrderID: 2,
                OrderDate: new Date("2024-10-02"),
                CustomerID: 202,
                Amount: 250.50
            },
            {
                OrderID: 3,
                OrderDate: new Date("2024-10-03"),
                CustomerID: 203,
                Amount: 300.75
            },
            {
                OrderID: 4,
                OrderDate: new Date("2024-10-04"),
                CustomerID: 204,
                Amount: 450.25
            },
            {
                OrderID: 5,
                OrderDate: new Date("2024-10-05"),
                CustomerID: 205,
                Amount: 120.00
            }
        ];

        await orders.insertMany(orderData);
        console.log("Employee and orders have been inserted successfully.");
    } finally {
        await client.close();
    }
}

main().catch(console.error);
