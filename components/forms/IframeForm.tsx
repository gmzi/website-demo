'use client'

import { useState } from 'react';
import { transformYouTubeUrl } from '@/lib/transformYouTubeUrl';


export function IframeForm() {
    const [sourceUrl, setSourceUrl] = useState<string | null>();

    function handleUrlChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const newSourceUrl = e.currentTarget.value;
        const newEmbedUrl = transformYouTubeUrl(newSourceUrl);

        if (newEmbedUrl) {
            setSourceUrl(newEmbedUrl)
            return;
        }

        setSourceUrl(null);
        return;
    }

    return (
        <>
            <label htmlFor="video_url">Link al video:</label>
            <input
                type="text"
                id="video_url"
                name="video_url"
                onChange={handleUrlChange}
                required
            />
            {sourceUrl && <div className='video-container'><iframe src={sourceUrl}></iframe></div>}
        </>
    )
}

export function IframeEdit({ videoUrl }: { videoUrl: string }) {
    const [sourceUrl, setSourceUrl] = useState<string | null>(videoUrl);

    function handleUrlChange(e: React.FormEvent<HTMLInputElement>): void {
        const newSourceUrl = e.currentTarget.value;
        const newEmbedUrl = transformYouTubeUrl(newSourceUrl);

        if (newEmbedUrl) {
            setSourceUrl(newEmbedUrl)
            return;
        }

        setSourceUrl(null);
        return;
    }

    return (
        <>
            <input type="hidden" name="video_url" value={videoUrl} />

            <label htmlFor="new_video_url">Cambiar link del video:</label>
            <input
                type="text"
                id="new_video_url"
                name="new_video_url"
                onChange={handleUrlChange}
            />
            {sourceUrl && <div className='video-container'><iframe src={sourceUrl}></iframe></div>}
        </>
    )
}
