'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { getData } from "@/lib/getData";
import TextEditor2 from "./text-editor/TextEditor2";
import TextEditorEntry from "./text-editor/TextEditorEntry";
import InputEditor from "./text-editor/InputEditor";
import InputEditorString from './text-editor/InputEditorString';
import TextEditorIndex from './text-editor/InputEditor';
import ImageUpload from "./ImageUpload";
import document from '@/document.json'
import type { Show } from "@/app/(personal)/shows/page";
import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";
import Image from "next/image";
import { EmptyImageIcon } from "../shared/icons";
import sanitizeHtml from 'sanitize-html'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '@/components/forms/text-editor/MenuBar'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

interface Season {
    year: string;
    theater: string;
}

interface CastMember {
    name: string;
    role: string;
}

interface CreativeMember {
    name: string;
    role: string;
}

interface Musician {
    name: string;
    instrument: string;
}

interface Dancer {
    name: string;
    role: string;
}

interface FormData {
    showID: string;
    title: string;
    slug: string;
    opening_date: string;
    content_html: string;
    image_1_url: string;
    image_2_url: string;
    image_3_url: string;
    seasons: Season[];
    theatre: string;
    sinopsis: string;
    castAndCreative: {
        cast: CastMember[];
        creative: CreativeMember[];
        musicians: Musician[];
        dancers: Dancer[];
    };
    wholeCast: string;
    wholeCreativeTeam: string;
}

interface FormComponentProps {
    document: string;
    entry: string;
    section: string;
}

const createAlphaNumericString = (length: number) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };


const CreateShow: React.FC<FormComponentProps> = ({ document, entry, section }) => {

    const [formData, setFormData] = useState<FormData>({
        showID: "",
        title: "",
        slug: "",
        opening_date: "",
        content_html: "",
        image_1_url: "",
        image_2_url: "",
        image_3_url: "",
        seasons: [{ year: '', theater: "" }],
        theatre: "",
        sinopsis: "",
        castAndCreative: {
            cast: [],
            creative: [],
            musicians: [],
            dancers: []
        },
        wholeCast: "",
        wholeCreativeTeam: ""
    });

    const editor = useEditor({
        extensions: [
            // Color.configure({ types: [TextStyle.name, ListItem.name] }),
            // TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                history: false,
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: formData.sinopsis,
        onTransaction({ editor, transaction }) {
            const html = editor?.getHTML();
            const cleanHtml = sanitizeHtml(html)
            const name = "sinopsis";
            const value = cleanHtml
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
            return
        },
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSeasonChange = (
        index: number,
        field: keyof Season,
        value: string
    ) => {
        setFormData((prevState) => {
            const seasons = [...prevState.seasons];
            seasons[index] = {
                ...seasons[index],
                [field]: value
            };
            return {
                ...prevState,
                seasons
            };
        });
    };

    const handleCastAndCreativeChange = (
        type: keyof FormData["castAndCreative"],
        index: number,
        field: keyof CastMember | keyof CreativeMember,
        value: string
    ) => {
        setFormData((prevState) => {
            const castAndCreative = { ...prevState.castAndCreative };
            castAndCreative[type][index] = {
                ...castAndCreative[type][index],
                [field]: value
            };
            return {
                ...prevState,
                castAndCreative
            };
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        formData.showID = createAlphaNumericString(20);

        formData.slug = formData.title.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "-").toLowerCase();

        const data = {
            document: document,
            entry: entry,
            content: formData
        }

        try {
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
                console.log('Failed to save new show:');
                console.log(saved);
                return;
            }
            console.log('show saved successfully!');
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
    }

    const handleWholeCast = () => {
        const contentString = formData.wholeCast.trim();
        const namesAndRolesArray = contentString.split(",")

        const addNamesAndRoles = namesAndRolesArray.forEach(element => {
            const nameAndRole = element.split(":");
            const name = nameAndRole[0]?.trim() || 'default';
            const role = nameAndRole[1]?.trim() || 'default';
            setFormData((prevState) => ({
                ...prevState,
                castAndCreative: {
                    ...prevState.castAndCreative,
                    cast: [...prevState.castAndCreative.cast, { name: name, role: role }]
                },
                wholeCast: ""
            }));
            return;
        })
    }

    const handleWholeCreativeTeam = () => {
        const contentString = formData.wholeCreativeTeam.trim();
        const namesAndRolesArray = contentString.split(",")

        const addNamesAndRoles = namesAndRolesArray.forEach(element => {
            const nameAndRole = element.split(":");
            const name = nameAndRole[0]?.trim() || 'default';
            const role = nameAndRole[1]?.trim() || 'default';
            setFormData((prevState) => ({
                ...prevState,
                castAndCreative: {
                    ...prevState.castAndCreative,
                    creative: [...prevState.castAndCreative.creative, { name: name, role: role }]
                },
                wholeCreativeTeam: ""
            }));
            return;
        })
    }

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) {
            // setStatus({ alert: "default", message: `${text.uploadForm.fileMissing}`})
            console.log('file missing')
            return;
        }

        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 3.99) {
            // setStatus({alert: "default", message: `${text.uploadForm.fileOversize}`})
            console.log('file oversized, max file size 4mb')
            return;
        }

        const formData = new FormData();

        const folderName = `${IMAGE_MAIN_FOLDER}/shows`

        formData.append("file", file);
        formData.append("folder", folderName)

        // UPLOAD IMAGE:
        const upload = await fetch(`${BASE_URL}/api/image/upload`, {
            method: 'POST',
            body: formData
        })

        if (!upload.ok) {
            console.log('theres an error in upload')
            console.log(upload)
            console.log(upload.json())
            return;
        }
        const image = await upload.json();

        const imageUrl = image.metadata.secure_url;

        const { name } = e.target;
        const value = imageUrl

        // const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid blue' }}>
            <h2>Add a show</h2>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Fecha de estreno:
                <input
                    type="text"
                    name="opening_date"
                    value={formData.opening_date}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Content HTML:
                <input
                    type="text"
                    name="content_html"
                    value={formData.content_html}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            {formData.image_1_url.length ? (
                <Image
                    src={formData.image_1_url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '20%', height: 'auto' }}
                    alt="uploaded image"
                />
            ) : <span><EmptyImageIcon /></span>}
            <label>
                Image 1 URL:
                {/* <input
                    type="text"
                    name="image_1_url"
                    value={formData.image_1_url}
                    onChange={handleInputChange}
                /> */}
                <input
                    type="file"
                    name="image_1_url"
                    value=''
                    onChange={handleImageUpload}
                    accept="image/*"
                />
            </label>
            <br />
            <label>
                Image 2 URL:
                <input
                    type="text"
                    name="image_2_url"
                    value={formData.image_2_url}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Image 3 URL:
                <input
                    type="text"
                    name="image_3_url"
                    value={formData.image_3_url}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Theatre:
                <input
                    type="text"
                    name="theatre"
                    value={formData.theatre}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Sinopsis:
                {/* <input
                    type="text"
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleInputChange}
                /> */}
                <div className="editor">
                    {/* <MenuBar editor={editor}/> */}
                    <EditorContent className="editor__content" editor={editor} />
                </div>
            </label>
            <br />
            <label>Seasons:</label>
            {formData.seasons.map((season, index) => (
                <div key={index}>
                    <label>
                        Year:
                        <input
                            type="text"
                            value={season.year}
                            onChange={(e) =>
                                handleSeasonChange(index, "year", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Theater:
                        <input
                            type="text"
                            value={season.theater}
                            onChange={(e) =>
                                handleSeasonChange(index, "theater", e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        seasons: [
                            ...prevState.seasons,
                            { year: "", theater: "" }
                        ]
                    }))
                }
            >
                Add Season
            </button>
            <br />
            <h2>Cast</h2>
            <label>
                add whole cast
                <input
                    type="text"
                    name="wholeCast"
                    value={formData.wholeCast}
                    onChange={handleInputChange}
                    style={{ padding: '1em', width: '60%' }}
                />
            </label>
            <button
                type="button"
                onClick={handleWholeCast}
            >
                add whole cast
            </button>
            {formData.castAndCreative.cast.map((cast, index) => (
                <div key={index}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={cast.name}
                            onChange={(e) =>
                                handleCastAndCreativeChange("cast", index, "name", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            value={cast.role}
                            onChange={(e) =>
                                handleCastAndCreativeChange("cast", index, "role", e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        castAndCreative: {
                            ...prevState.castAndCreative,
                            cast: [...prevState.castAndCreative.cast, { name: "", role: "" }]
                        }
                    }))
                }
            >
                Add Cast Member
            </button>
            <br />

            <h2>Creative Team</h2>
            <label>
                add whole team
                <input
                    type="text"
                    name="wholeCreativeTeam"
                    value={formData.wholeCreativeTeam}
                    onChange={handleInputChange}
                    style={{ padding: '1em', width: '60%' }}
                />
            </label>
            <button
                type="button"
                onClick={handleWholeCreativeTeam}
            >
                add whole team
            </button>
            {formData.castAndCreative.creative.map((creative, index) => (
                <div key={index}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={creative.name}
                            onChange={(e) =>
                                handleCastAndCreativeChange("creative", index, "name", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            value={creative.role}
                            onChange={(e) =>
                                handleCastAndCreativeChange("creative", index, "role", e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        castAndCreative: {
                            ...prevState.castAndCreative,
                            creative: [...prevState.castAndCreative.creative, { name: "", role: "" }]
                        }
                    }))
                }
            >
                Add Creative Team Member
            </button>
            <br />
            <label>Musicians:</label>
            {formData.castAndCreative.musicians.map((musician, index) => (
                <div key={index}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={musician.name}
                            onChange={(e) =>
                                handleCastAndCreativeChange("musicians", index, "name", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Instrument:
                        <input
                            type="text"
                            value={musician.instrument}
                            onChange={(e) =>
                                handleCastAndCreativeChange("musicians", index, "role", e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        castAndCreative: {
                            ...prevState.castAndCreative,
                            musicians: [...prevState.castAndCreative.musicians, { name: "", instrument: "" }]
                        }
                    }))
                }
            >
                Add Musician
            </button>
            <br />
            <label>Dancers:</label>
            {formData.castAndCreative.dancers.map((dancer, index) => (
                <div key={index}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={dancer.name}
                            onChange={(e) =>
                                handleCastAndCreativeChange("dancers", index, "name", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            value={dancer.role}
                            onChange={(e) =>
                                handleCastAndCreativeChange("dancers", index, "role", e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        castAndCreative: {
                            ...prevState.castAndCreative,
                            dancers: [...prevState.castAndCreative.dancers, { name: "", role: "" }]
                        }
                    }))
                }
            >
                Add Dancer
            </button>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateShow;