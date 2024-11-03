const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017"; // Change this to your MongoDB URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('yourDatabaseName'); // Replace with your database name
        const menuItems = database.collection('MenuItems');
        const orders = database.collection('Orders');
        const reservations = database.collection('Reservations');

        // Example: Insert Menu Items
        await menuItems.insertMany([
            { ItemID: 1, Name: "Spring Rolls", Category: "Appetizers", Price: 5.99 },
            { ItemID: 2, Name: "Caesar Salad", Category: "Appetizers", Price: 7.99 },
            { ItemID: 3, Name: "Grilled Chicken", Category: "Entrees", Price: 12.99 },
            { ItemID: 4, Name: "Spaghetti Bolognese", Category: "Entrees", Price: 11.99 },
            { ItemID: 5, Name: "Chocolate Cake", Category: "Desserts", Price: 6.50 }
        ]);

        // Example: Query Menu Items by Category
        const appetizers = await menuItems.find({ Category: "Appetizers" }).toArray();
        console.log("Appetizers:", appetizers);

        // Example: Update Order Status
        await orders.updateOne(
            { OrderID: 123 }, // Replace with the actual order ID
            { $set: { Status: "Prepared" } }
        );

        // Example: Delete Canceled Reservations
        await reservations.deleteMany({ Status: "Canceled" });

        // Example: Filter Orders by Customer or Order Date
        const filteredOrders = await orders.find({
            $or: [
                { CustomerID: "customer123" }, // Replace with actual CustomerID
                { OrderDate: { $gte: new Date("2023-01-01") } } // Filter by date
            ]
        }).toArray();
        console.log("Filtered Orders:", filteredOrders);

    } finally {
        await client.close();
    }
}

main().catch(console.error);
