export async function revalidatePersonalPage(section, BASE_URL){
    let personalPath = `/(personal)/${section}`;
    if (section === '/'){
      personalPath = '/';
    }

    const revalidatePersonal = await fetch(`${BASE_URL}/server/revalidate?path=${personalPath}`)

    if (!revalidatePersonal.ok){
        const error = await revalidatePersonal.json()
        return error;
    }
    
    return true;
}