'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import createAlphaNumericString from '@/lib/createAlphanumericString';
import { uploadToCloudinary } from './cloudinary';
import { moveToTrash } from './cloudinary';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

// @ts-ignore
async function handleNewImage(inputData, folder) {
  try {
    const oldImageUrl = inputData.image_url;
    // save new image to Cloudinary:
    const folderName = `${IMAGE_MAIN_FOLDER}/${folder}`
    const newImageHostingMetadata = await uploadToCloudinary(inputData.image_file, folderName);
    const newImageUrl = newImageHostingMetadata.secure_url;
    delete inputData.image_file;
    inputData.image_url = newImageUrl;
    //move old image to trash:
    const trashOldImage = await moveToTrash(oldImageUrl);
    return inputData;
  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

const MAX_FILE_SIZE = 1024 * 1024 * 4
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const pressArticleSchema = z.object({
  id: z.string(),
  veredict: z.string(),
  quote: z.string(),
  media_organization: z.string(),
  journalist: z.string(),
  date: z.string(),
  article_url: z.string(),
  show: z.string(),
  image_file: z
    .any()
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, 'Max image size is 4MB.')
    .refine(
      (file) => {
        return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
      },
      // "Only .jpg, .jpeg, .png, and .webp formats are supported"
      { message: 'failed to save press article' }
    ),
  image_url: z.string()
})

export async function createPressArticle(prevState: any, formData: FormData) {
  try {
    const inputData = pressArticleSchema.parse({
      id: createAlphaNumericString(20),
      veredict: formData.get('veredict'),
      quote: formData.get('quote'),
      media_organization: formData.get('media_organization'),
      journalist: formData.get('journalist'),
      date: formData.get('date'),
      article_url: formData.get('article_url'),
      show: formData.get('show'),
      image_file: formData.get('image_file'),
      // just for type declaration, will be added after uploadingToCloud
      image_url: ""
    })

    const folderName = `${IMAGE_MAIN_FOLDER}/press`

    const imageHostingMetadata = await uploadToCloudinary(inputData.image_file, folderName);

    const image_url = imageHostingMetadata.secure_url;
    // remove image file from inputData
    delete inputData.image_file;
    // add image url to inputData
    inputData.image_url = image_url;

    const data = {
      document: "press",
      entry: "written_press",
      content: inputData
    }

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
    return { message: `${e}` }
  }
}

export async function editPressArticle(prevState: any, formData: FormData) {
  try {

    const newImageFile = formData.get("new_image_file") as File;
    const isNewImage = newImageFile?.size > 0;

    let inputData;

    if (isNewImage) {
      inputData = pressArticleSchema.parse({
        id: formData.get('id'),
        veredict: formData.get('veredict'),
        quote: formData.get('quote'),
        media_organization: formData.get('media_organization'),
        journalist: formData.get('journalist'),
        date: formData.get('date'),
        article_url: formData.get('article_url'),
        show: formData.get('show'),
        image_file: newImageFile,
        image_url: formData.get('image_url')
      })

      // const oldImageUrl = inputData.image_url;
      // // save new image to Cloudinary:
      // const folderName = `${IMAGE_MAIN_FOLDER}/press`
      // const newImageHostingMetadata = await uploadToCloudinary(inputData.image_file, folderName);
      // const newImageUrl = newImageHostingMetadata.secure_url;
      // delete inputData.image_file;
      // inputData.image_url = newImageUrl;
      // //move old image to trash:
      // const trashOldImage = await moveToTrash(oldImageUrl);

      inputData = await handleNewImage(inputData, 'press')

    } else {
      const pressArticleSchemaNoImage = z.object({
        id: z.string(),
        veredict: z.string(),
        quote: z.string(),
        media_organization: z.string(),
        journalist: z.string(),
        date: z.string(),
        article_url: z.string(),
        show: z.string(),
        image_url: z.string()
      })

      inputData = pressArticleSchemaNoImage.parse({
        id: formData.get('id'),
        veredict: formData.get('veredict'),
        quote: formData.get('quote'),
        media_organization: formData.get('media_organization'),
        journalist: formData.get('journalist'),
        date: formData.get('date'),
        article_url: formData.get('article_url'),
        show: formData.get('show'),
        image_url: formData.get('image_url')
        // continue deleting old, uploading uploading new.
      })
    }

    const data = {
      document: "press",
      entry: "written_press",
      itemLocator: "written_press.id",
      newContent: inputData,
    }

    const updated = await fetch(`${BASE_URL}/server/edit/item`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

// export async function deletePressArticle(prevState: any, formData: FormData) {

//   const schema = z.object({
//     id: z.string(),
//   })

//   const inputData = schema.parse({
//     id: formData.get('id')
//   })

//   const data = {
//     document: "press",
//     entry: "written_press",
//     keyName: "id",
//     valueName: inputData.id,
//   }
//   try {
//     const deleted = await fetch(`${BASE_URL}/server/remove`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       referrerPolicy: 'no-referrer',
//       body: JSON.stringify(data)
//     });

//     revalidatePath('/(editor)/editor', 'page');

//     return { message: `Item deleted` }

//   } catch (e) {
//     console.error(e);
//     return { message: `${e}` }
//   }
// }

export async function deleteItem(prevState: any, formData: FormData) {

  const schema = z.object({
    id: z.string(),
    document: z.string(),
    entry: z.string(),
  })

  const inputData = schema.parse({
    id: formData.get('id'),
    document: formData.get('document'),
    entry: formData.get('entry'),
  })

  const data = {
    document: inputData.document,
    entry: inputData.entry,
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
    return { message: `${e}` }
  }
}

const tourSchema = z.object({
  id: z.string(),
  show_title: z.string(),
  year: z.string(),
  title_or_place: z.string(),
  city: z.string(),
  country: z.string(),
  press_url: z.string(),
  image_file: z
    .any()
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, 'Max image size is 4MB.')
    .refine(
      (file) => {
        return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
      }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
    ),
  image_url: z.string()
})

export async function createTour(prevState: any, formData: FormData) {
  try {
    const inputData = tourSchema.parse({
      id: createAlphaNumericString(20),
      show_title: formData.get('show_title'),
      year: formData.get('year'),
      title_or_place: formData.get('title_or_place'),
      city: formData.get('city'),
      country: formData.get('country'),
      press_url: formData.get('press_url'),
      image_file: formData.get('image_file'),
      // just for type declaration, will be added after uploadingToCloud
      image_url: ""
    })

    const folderName = `${IMAGE_MAIN_FOLDER}/tours`

    const imageHostingMetadata = await uploadToCloudinary(inputData.image_file, folderName);

    const image_url = imageHostingMetadata.secure_url;
    // remove image file from inputData
    delete inputData.image_file;
    // add image url to inputData
    inputData.image_url = image_url;

    const data = {
      document: "tours",
      entry: "content",
      content: inputData
    }

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

    return { message: `tour has been created created` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function editTour(prevState: any, formData: FormData) {
  try {

    const newImageFile = formData.get("new_image_file") as File;
    const isNewImage = newImageFile?.size > 0;

    let inputData;

    if (isNewImage) {
      inputData = tourSchema.parse({
        id: formData.get('id'),
        show_title: formData.get('show_title'),
        year: formData.get('year'),
        title_or_place: formData.get('title_or_place'),
        city: formData.get('city'),
        country: formData.get('country'),
        press_url: formData.get('press_url'),
        image_file: newImageFile,
        image_url: formData.get('image_url')
      })

      // const oldImageUrl = inputData.image_url;
      // // save new image to Cloudinary:
      // const folderName = `${IMAGE_MAIN_FOLDER}/press`
      // const newImageHostingMetadata = await uploadToCloudinary(inputData.image_file, folderName);
      // const newImageUrl = newImageHostingMetadata.secure_url;
      // delete inputData.image_file;
      // inputData.image_url = newImageUrl;
      // //move old image to trash:
      // const trashOldImage = await moveToTrash(oldImageUrl);

      inputData = await handleNewImage(inputData, 'tours');

    } else {
      const tourSchemaNoImage = z.object({
        id: z.string(),
        show_title: z.string(),
        year: z.string(),
        title_or_place: z.string(),
        city: z.string(),
        country: z.string(),
        press_url: z.string(),
        image_url: z.string()
      })

      inputData = tourSchemaNoImage.parse({
        id: formData.get('id'),
        show_title: formData.get('show_title'),
        year: formData.get('year'),
        title_or_place: formData.get('title_or_place'),
        city: formData.get('city'),
        country: formData.get('country'),
        press_url: formData.get('press_url'),
        image_url: formData.get('image_url')
        // continue deleting old, uploading uploading new.
      })
    }

    const data = {
      document: "tours",
      entry: "content",
      itemLocator: "content.id",
      newContent: inputData,
    }

    const updated = await fetch(`${BASE_URL}/server/edit/item`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function saveHtmlContent(contentHtml: string, document: string) {
  try {
    const content = {
      content_html: contentHtml,
      document: document
    }
    const saved = await fetch(`${BASE_URL}/server/text`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(content)
    })
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Content saved` }
    
  } catch (e) {
    console.log(e);
    return { message: `${e}` }
  }
}


export async function editAbout(prevState: any, formData: FormData) {

  const aboutSchema = z.object({
    contentHtml: z.string(),
    image_file: z
      .any()
      .refine((file) => {
        return file?.size <= MAX_FILE_SIZE;
      }, 'Max image size is 4MB.')
      .refine(
        (file) => {
          return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
        }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
      ),
    image_url: z.string()
  })

  try {
    const newImageFile = formData.get("new_image_file") as File;
    const isNewImage = newImageFile?.size > 0;

    let inputData;

    if (isNewImage) {
      inputData = aboutSchema.parse({
        contentHtml: formData.get('editor_content'),
        image_file: newImageFile,
        image_url: formData.get('image_url')
      })

      inputData = await handleNewImage(inputData, 'about');

    } else {
      const aboutSchemaNoImage = z.object({
        contentHtml: z.string(),
        image_url: z.string()
      })

      inputData = aboutSchemaNoImage.parse({
        contentHtml: formData.get('editor_content'),
        image_url: formData.get('image_url')
      })
    }

    const data = {
      document: "about",
      content_html: inputData.contentHtml,
      image_url: inputData.image_url
    }

    const updated = await fetch(`${BASE_URL}/server/about`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(editor)/editor', 'page');

    return { message: `About has been updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editBio(prevState: any, formData: FormData){
  console.log('hi');
  const files = formData.get('new_image_file') as File;
  console.log(files);
  return {message: 'hi'};
}