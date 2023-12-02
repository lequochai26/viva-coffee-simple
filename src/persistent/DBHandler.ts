import { config } from "dotenv";
import { Collection, Db, Document, MongoClient, WithId } from "mongodb";

// .env configuration
config();

// DB Info:
const host: string = process.env.DB_HOST as string;
const port: string = process.env.DB_PORT as string;
const dbName: string = process.env.DB_NAME as string;
const url: string = `mongodb://${host}:${port}/`;

// Interfaces:
interface AccessCollectionResult {
    connection: MongoClient;
    db: Db;
    collection: Collection<Document>;
}

// Functions:
export async function getAll<T>(collectionName: string, pattern: T): Promise<T[]> {
    // Try connecting to db
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try getting all
    try {
        var all: WithId<Document>[] = await collection.find().toArray();
    }
    catch (error: any) {
        connection.close();
        throw error;
    }

    // Result initialization
    const result: T[] = [];

    // Converting from all to result
    all.forEach(
        function (document: WithId<Document>) {
            result.push(documentConvert(document, pattern));
        }
    );

    // Close connection
    connection.close();

    // Return result
    return result;
}

export async function getByFilter<T>(collectionName: string, filter: any, pattern: T): Promise<T[]> {
    // Try accessing collection with given collection name
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try getting documents by filter
    try {
        var documents: WithId<Document>[] = await collection.find(filter).toArray();
    }
    catch (error: any) {
        throw error;
    }

    // Result initialization
    const result: T[] = [];

    // Converting a list of data record into list of entities
    documents.forEach(
        function (document: WithId<Document>) {
            result.push(
                documentConvert(document, pattern)
            )
        }
    );

    // Close connection
    connection.close();

    // Return result
    return result;
}

export async function get<T>(collectionName: string, filter: any, pattern: T): Promise<T | undefined> {
    // Accessing to collection
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try getting target
    try {
        var document: WithId<Document> | null = await collection.findOne(filter);
    }
    catch (error: any) {
        connection.close();
        throw error;
    }

    // Close connection
    connection.close();

    // Exit if document not found
    if (!document) {
        return;
    }

    // Converting document into T and returning
    return documentConvert(document, pattern);
}

export async function insert(collectionName: string, target: any): Promise<void> {
    // Try accessing to collection
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try inserting target into db
    try {
        await collection.insertOne(target);
    }
    catch (error: any) {
        connection.close();
        throw error;
    }

    // Close connection
    connection.close();
}

export async function update(collectionName: string, target: any, filter: any): Promise<void> {
    // Try accessing to collection
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try updating target with given filter
    try {
        await collection.updateOne(filter, {$set: target});
    }
    catch (error: any) {
        connection.close();
        throw error;
    }

    // Close connection
    connection.close();
}

export async function remove(collectionName: string, filter: any): Promise<void> {
    // Try accessing to collection
    try {
        var { connection, collection }: AccessCollectionResult = await accessToCollection(collectionName);
    }
    catch (error: any) {
        throw error;
    }

    // Try deleting
    try {
        await collection.deleteOne(filter);
    }
    catch (error: any) {
        connection.close();
        throw error;
    }

    // Close connection
    connection.close();
}

// Local functions:
async function accessToCollection(collectionName: string): Promise<AccessCollectionResult> {
    // Try connecting to db
    try {
        var connection: MongoClient = await MongoClient.connect(url);
    }
    catch (error: any) {
        throw error;
    }

    // Access to DB
    const db: Db = connection.db(dbName);

    // Access to collection
    const collection: Collection<Document> = db.collection(collectionName);

    // Create result and return
    return { connection: connection, db: db, collection: collection };
}

function documentConvert(document: any, pattern: any): any {
    const result: any = {};
    for (let fieldName in pattern) {
        result[fieldName] = document[fieldName];
    }
    return result;
}