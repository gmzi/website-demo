import { getData } from './getData'
import document from "@/document.json"


const isProd = process.env.NODE_ENV === 'production';

export async function getRemoteOrLocalData(documentName) {
    try {
        let data;
        if (isProd) {
            data = await getData(documentName);
            console.log('data being retrieved from DB', process.env.NODE_ENV.toUpperCase());
        } else {
            data = document[`${documentName}`];
            console.log('data being retrieved from ./document.json: ', process.env.NODE_ENV.toUpperCase());
        }
        return data;
    } catch (e) {
        console.log('failed retrieving data')
        console.log('Node env: ', process.env.NODE_ENV)
        console.log('documentName: ', documentName)
        console.log('data: ', data)
        return [];
    }
}