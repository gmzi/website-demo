'use server'

import { revalidatePath } from 'next/cache'
import { sql } from '@vercel/postgres'
import { z } from 'zod'
import createAlphaNumericString from '@/lib/createAlphanumericString';

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
    id: z.string()
  })

  const inputData = schema.parse({
    veredict: formData.get('veredict'),
    quote: formData.get('quote'),
    media_organization: formData.get('media_organization'),
    journalist: formData.get('journalist'),
    date: formData.get('date'),
    article_url: formData.get('article_url'),
    image_url: formData.get('image_url'),
    show: formData.get('show'),
    id: createAlphaNumericString(20)
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

    revalidatePath('/(editor)/editor', 'page');

    return { message: `article added` }

  } catch (e) {
    console.log(e)
    return { message: 'failed to save press article' }
  }
}

export async function deletePressArticle(prevState: any, formData: FormData) {

  const schema = z.object({
    id: z.string(),
  })

  const inputData = schema.parse({
    id: formData.get('id')
  })

  const data = {
    document: "press",
    entry: "written_press",
    keyName: "id",
    valueName: inputData.id,
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

    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item deleted` }

  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete item' }
  }
}

export async function editPressArticle(prevState: any, formData: FormData) {

  const schema = z.object({
    id: z.string(),
    veredict: z.string()
  })

  const inputData = schema.parse({
    id: formData.get('id'),
    veredict: formData.get('veredict')
  })

  const data = {
    document: "press",
    entry: "written_press",
    itemLocator: "written_press.id",
    newContent: inputData,
  }
  try {
    const updated = await fetch(`${BASE_URL}/server/edit/item`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    console.log(await updated.json())


    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: 'Failed to update item' }
  }
}