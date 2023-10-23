import { getData } from './getData'
import document from "@/document.json"
import { auth } from '@clerk/nextjs';


const isProd = process.env.NODE_ENV === 'production';

export async function enableAuthIfProd() {
    try {
        if (isProd) {
            const {orgRole} = auth();
            return orgRole;
        } else {
            const orgRole = 'admin';
            return orgRole;
        }
    } catch (e) {
        console.log('failed enabling auth at lib/EnableAuth')
        console.log('Node env: ', process.env.NODE_ENV)
        return false;
    }
}