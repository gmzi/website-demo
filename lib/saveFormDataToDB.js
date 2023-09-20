const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';

export default function saveFormDataToDB(data){
    return new Promise(async (resolve, reject) => {
        try{
            const saved = await fetch(`${BASE_URL}/server/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': DATA_API_KEY
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });

            if (!saved.ok) {
                console.log('There is an error saving in DB');
                console.log(await saved.json());
                reject(new Error('save to DB failed'));
            } else {
                resolve(true)
            }
        } catch(e){
            console.error('An error occured trying to save to DB:', e);
            reject(e);
        }
    })

}