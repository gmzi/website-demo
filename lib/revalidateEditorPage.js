export async function revalidateEditorPage(BASE_URL){
    // const editorPath = '/(editor)/editor/[index]';
    const editorPath = '/(editor)/editor';
    const revalidateEditor = await fetch(`${BASE_URL}/server/revalidate?path=${editorPath}`)
    if (!revalidateEditor.ok){
        console.log(revalidateEditor)
        return false
    }
    return true;
}