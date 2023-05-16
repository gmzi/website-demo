export function getLetterAfterSlash(url:string){
    const lastSlashIndex = url.lastIndexOf('/');
    const lettersAfterLastSlash = url.substring(lastSlashIndex + 1);
    return `@${lettersAfterLastSlash}`
}