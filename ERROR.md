whenever i try to signup another user i got this message

MongoServerError: E11000 duplicate key error collection: RestaurantApp.users index: googleId_1 dup key: { googleId: null }
    at C:\Users\HP\Desktop\RestaurantApi\node_modules\mongoose\node_modules\mongodb\lib\operations\insert.js:50:33
    at C:\Users\HP\Desktop\RestaurantApi\node_modules\mongoose\node_modules\mongodb\lib\operations\command.js:84:64
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  index: 0,
  code: 11000,
  keyPattern: { googleId: 1 },
  keyValue: { googleId: null },
  [Symbol(errorLabels)]: Set(0) {}
}


The error message indicates that there is already a document in the collection with a googleId of null, and MongoDB is preventing the insertion of another document with the same googleId value.


Handling GoogleId Uniqueness:
Ensure that the googleId field is unique only when it exists. I modified my schema to handle this by adding the sparse attribute:


googleId: {
  type: String,
  unique: true,
  sparse: true, // Allows multiple documents that lack the indexed field
},
With this change, the googleId field will be unique only for documents that have a googleId. Documents with a null or undefined googleId won't trigger a duplicate key error.



Update Existing Documents:
If you already have documents in your MongoDB collection where googleId is null, you should update them to set the googleId field to a unique non-null value or remove the googleId field entirely.

Remove Existing Index:
If you have an existing index on the googleId field that does not include the sparse option, you may need to remove it and then recreate it with the correct options. To do this, you can either delete the field manually or run the following commands in the MongoDB shell:


// Drop the existing index
db.users.dropIndex("googleId_1")

// Recreate the index with the correct options
db.users.createIndex({ googleId: 1 }, { unique: true, sparse: true })
Please replace users with the actual name of your collection.