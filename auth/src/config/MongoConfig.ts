import {connect} from 'mongoose';
import {MongoClient} from "mongodb";

export function initMongo(url: string = 'mongodb://mongo:27017/twenti') {
    const client = new MongoClient(url);

    client.connect().then(() => {
        console.log('connected!!')
    }).catch(err => {
        console.log('database is not connected -> ' + err)
    })
    connect(url).then(() => {
        console.log('Mongoose connected');
    });
}