'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import InputEditor from "../forms/text-editor/InputEditor";
import InputEditorString from '../forms/text-editor/InputEditorString';
import TextEditorIndex from '../forms/text-editor/InputEditor';
import ImageUpload from "../forms/ImageUpload";
import document from '@/document.json'
import type { Show } from "@/app/(personal)/shows/page";
import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';

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
    title: string;
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

interface WholeCast {
    data: string;
}



const AddShow: React.FC<FormComponentProps> = ({ document, entry, section }) => {

    const [formData, setFormData] = useState<FormData>({
        title: "My tit",
        opening_date: "2023-01-12",
        content_html: "my content",
        image_1_url: "https://res.cloudinary.com/imagesgmzi/image/upload/v1687897400/website-fer/shows/oi0mlaebaor351cqlbzd.webp",
        image_2_url: "",
        image_3_url: "",
        seasons: [{ year: '2021', theater: "el camarin" }],
        theatre: "a theatre",
        sinopsis: "a sinopsis",
        castAndCreative: {
            cast: [{ name: "john doe", role: "the pianist" }, { name: "mix max", role: "the cellist" }],
            creative: [{ name: "trimti", role: "director" }, { name: "siux", role: "lighting designer" }],
            musicians: [],
            dancers: []
        },
        wholeCast: "",
        wholeCreativeTeam: ""
    });

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

    const handleWholeCast =() => {
        const contentString = formData.wholeCast.trim();
        const namesAndRolesArray = contentString.split(",")

        const addNamesAndRoles = namesAndRolesArray.forEach(element=>{
            const nameAndRole = element.split(":");
            const name = nameAndRole[0]?.trim() || 'default';
            const role = nameAndRole[1]?.trim() || 'default';
            setFormData((prevState) => ({
                ...prevState, 
                castAndCreative: {
                    ...prevState.castAndCreative,
                    cast: [{name: name, role: role}, ...prevState.castAndCreative.cast,]
                },
                wholeCast: ""
            }));
            return;
        })   
    }

    const handleWholeCreativeTeam =() => {
        const contentString = formData.wholeCreativeTeam.trim();
        const namesAndRolesArray = contentString.split(",")

        const addNamesAndRoles = namesAndRolesArray.forEach(element=>{
            const nameAndRole = element.split(":");
            const name = nameAndRole[0]?.trim() || 'default';
            const role = nameAndRole[1]?.trim() || 'default';
            setFormData((prevState) => ({
                ...prevState, 
                castAndCreative: {
                    ...prevState.castAndCreative,
                    creative: [{name: name, role: role}, ...prevState.castAndCreative.creative]
                },
                wholeCreativeTeam: ""
            }));
            return;
        })   
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
            <label>
                Image 1 URL:
                <input
                    type="text"
                    name="image_1_url"
                    value={formData.image_1_url}
                    onChange={handleInputChange}
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
                <input
                    type="text"
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleInputChange}
                />
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
                    style={{padding: '1em', width: '60%'}}
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
                    style={{padding: '1em', width: '60%'}}
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

export default AddShow;