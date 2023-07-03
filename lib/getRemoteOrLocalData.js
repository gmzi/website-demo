import {getData} from './getData'
import document from "@/document.json"


const isProd = process.env.NODE_ENV === 'production';

export async function getRemoteOrLocalData(documentName){
    let data;
    if (isProd){
        data = await getData(documentName);
    } else {
        data = document.shows;
    }
    return data;
}