'use client';

import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ButtonParams {
  text: string;
  document: string;
  entry: string;
  keyName: string;
  valueName: string;
  section: string;
}



const ButtonDelete: React.FC<ButtonParams> = ({text, document, entry, keyName, valueName, section }) => {

  const handleDelete = async () => {
    
    const data = {
        document: document,
        entry: entry,
        keyName: keyName,
        valueName: valueName
    }

    try {
        const deleted = await fetch(`${BASE_URL}/server/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        if (!deleted.ok) {
            console.log('Failed to save new show:');
            console.log(deleted);
            return;
        }
        console.log('show deleted successfully!');
        // revalidation goes here:
        const editorRevalidation = await revalidateEditorPage(BASE_URL);
        const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);
        console.log(`Show creator revalidated editor`, editorRevalidation)
        console.log(`Show creator revalidated ${section}`, personalRevalidation)
        // a 'success' status would go here
        return;
    } catch (error) {
        console.log('An error occurred while saving a show:');
        console.log(error);
    }
  };

  return (
    <button onClick={handleDelete}>{text}</button>
  );
};

export default ButtonDelete;