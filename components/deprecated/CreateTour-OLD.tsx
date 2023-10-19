'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";
import Image from "next/image";
import { EmptyImageIcon } from "../shared/icons";
import sanitizeHtml from 'sanitize-html'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { FormComponentProps } from "./CreateShowFromClient";
import uploadToCloudinary from '@/lib/uploadToCloudinary'
import saveFormDataToDB from "@/lib/saveFormDataToDB";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

interface FormData {
    show_title: string;
    year: string;
    title_or_place: string;
    city: string;
    country: string;
    press_url: string;
    image_url: string;
}

const CreateTour: React.FC<FormComponentProps> = ({ document, entry, section }) => {

    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        show_title: "",
        year: "",
        title_or_place: "",
        city: "",
        country: "",
        press_url: "",
        image_url: ""
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

        const data = {
            document: document,
            entry: entry,
            content: formData
        }
        const savedToDB = await saveFormDataToDB(data);
        // if right, revalidate from here, else return error;
        if (!savedToDB) {
            console.log('error trying to save')
            return;
        }

        console.log('tour created successfully');

        // revalidation goes here:
        const editorRevalidation = await revalidateEditorPage(BASE_URL);
        const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);

        console.log(`Tour creator revalidated editor`, editorRevalidation)
        console.log(`Tour creator revalidated ${section}`, personalRevalidation)

        router.refresh()

        return;
    }

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) {
            console.log('image missing');
            return;
        }

        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 3.99) {
            // setStatus({alert: "default", message: `${text.uploadForm.fileOversize}`})
            console.log('file oversized, max file size 4mb')
            return;
        }

        const imageUrl = await uploadToCloudinary(file, "tours");

        const { name } = e.target;
        const value = imageUrl;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        return;
    }

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid blue' }}>
            <h2>Agregar gira</h2>
            <label>
                Título del espectáculo:
                <input
                    type="text"
                    name="show_title"
                    value={formData.show_title}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Año de la gira:
                <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Nombre del festival o lugar de la función:
                <input
                    type="text"
                    name="title_or_place"
                    value={formData.title_or_place}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Ciudad:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                País:
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Link a artículo de prensa:
                <input
                    type="text"
                    name="press_url"
                    value={formData.press_url}
                    onChange={handleInputChange}
                />
            </label>
            {formData.image_url.length ? (
                <Image
                    src={formData.image_url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '20%', height: 'auto' }}
                    alt="uploaded image"
                />
            ) : <span><EmptyImageIcon /></span>}
            <label>
                Imagen:
                <input
                    type="file"
                    name="image_url"
                    value=''
                    onChange={handleImageUpload}
                    accept="image/*"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateTour;