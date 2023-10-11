'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";
import Image from "next/image";
import { EmptyImageIcon } from "../shared/icons";
import sanitizeHtml from 'sanitize-html'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { Show } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

interface FormData {
    spotify_url: string;
    apple_url: string;
}

interface FormComponentProps {
    spotify_url: string;
    apple_url: string;
    document: string;
    section: string;
}

const EditLinks: React.FC<FormComponentProps> = ({ spotify_url, apple_url, document, section }) => {

    const [formData, setFormData] = useState<FormData>({
        spotify_url: spotify_url,
        apple_url: apple_url
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let data;

        // @ts-ignore
        const name = e.target.name;

        if (name === 'spotify'){
            data = {
                document: document,
                entry: "spotify_url",
                content: formData.spotify_url
            }
        }

        if (name === 'apple'){
            data = {
                document: document,
                entry: "apple_url",
                content: formData.apple_url
            }
        }

        try {
            const saved = await fetch(`${BASE_URL}/server/edit/input`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': DATA_API_KEY
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });

            if (!saved.ok) {
                console.log('Failed to save new show:');
                console.log(saved);
                return;
            }

            console.log('Link edited successfully!');
            // revalidation goes here:
            const editorRevalidation = await revalidateEditorPage(BASE_URL);
            const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);

            console.log(`Link editor revalidated editor`, editorRevalidation)
            console.log(`Link editor revalidated ${section}`, personalRevalidation)

            // a 'success' status would go here

            return;
        } catch (error) {
            console.log('An error occurred while saving a show:');
            console.log(error);
        }
    }

    return (
        <div>
            <form name="spotify" style={{ border: '1px solid blue' }}>
                <label>
                    Spotify link:
                    <input
                        type="text"
                        name="spotify_url"
                        value={formData.spotify_url}
                        onChange={handleInputChange}
                    />
                </label>
                <button name="spotify" onClick={handleSubmit}>save</button>
                <label>
                    Apple link:
                    <input
                        type="text"
                        name="apple_url"
                        value={formData.apple_url}
                        onChange={handleInputChange}
                    />
                </label>
                <button name="apple" onClick={handleSubmit}>save</button>
            </form>
        </div>
    )
}

export default EditLinks;