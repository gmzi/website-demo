export async function fetchDbToUpdate(BASE_URL, data){
    const updateDB = await fetch(`${BASE_URL}/server/image`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    })
    if (!updateDB.ok){
        console.log('failed to update image url on DB');
        console.log(updateDB)
        return false
    }
    return true;
}