import { revalidatePath } from 'next/cache'
import { sql } from '@vercel/postgres'
import { z } from 'zod'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';


export async function addPressArticle(prevState: any, formData: FormData) {

    const schema = z.object({
        veredict: z.string(),
        quote: z.string(), 
        media_organization: z.string(),
        journalist: z.string(), 
        date: z.string(), 
        article_url: z.string(), 
        image_url: z.string(),
        show: z.string(),
      })

      const inputData = schema.parse({
        veredict: formData.get('veredict'),
        quote: formData.get('quote'),
        media_organization: formData.get('media_organization'),
        journalist: formData.get('journalist'),
        date: formData.get('date'),
        article_url: formData.get('article_url'),
        image_url: formData.get('image_url'),
        show: formData.get('show')
      })

      const data = {
        document: "press",
        entry: "written_press", 
        content: inputData
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

        console.log(saved)

        // for some weird reason, revalidation is happening, both in local build and in prod, 
        // without calling the function. When calling:
        // revalidatePath('/press')
        // console shows this error: "Error: Invariant: static generation store missing in revalidateTag _N_T_/press"

        return { message: `article added` }

    } catch (e) {
        console.log(e)
        return {message: 'failed to save press article'}
    }
}

