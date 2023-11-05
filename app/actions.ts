'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { send } from '@emailjs/browser';
import createAlphaNumericString from '@/lib/createAlphanumericString';
import { uploadToCloudinary } from './cloudinary';
import { moveToTrash } from './cloudinary';
import { transformYouTubeUrl } from '@/lib/transformYouTubeUrl'
import { makeSlug } from '@/lib/makeSlug';
import { parseNameAndRole } from '@/lib/parseNameAndRole'
import { Show } from '@/types';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

const MAX_FILE_SIZE = 1024 * 1024 * 4
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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

function parseImageInput(formData: FormData) {
  const newImageFile = formData.get('new_image_file') as File;

  const imagesSchema = z.object({
    image_file: newImageFile.size > 0
      ? z
        .any()
        .refine((file) => {
          return file?.size <= MAX_FILE_SIZE;
        }, 'Max image size is 4MB.')
        .refine(
          (file) => {
            return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
          }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
        )
      : z.undefined(),
    image_url: z.string()
  })

  const inputData: {
    [key: string]: string | File | undefined;
  } = imagesSchema.parse({
    image_file: newImageFile.size > 0 ? (formData.get('new_image_file') as File) : undefined,
    image_url: formData.get('image_url')
  })

  return inputData;
}

function parseRichTextInput(formData: FormData) {
  const htmlSchema = z.object({
    contentHtml: z.string()
  })

  const inputData: {
    [key: string]: string | File | undefined;
  } = htmlSchema.parse({
    contentHtml: formData.get('editor_content')
  })
  return inputData;
}

async function handleInputDataWithNewImageFiles(inputData: any, folderName: string) {
  const imageFiles: {
    [key: string]: string | File | undefined;
  } = {};

  for (const key in inputData) {
    if (key.includes("image_") && key.includes("_file")) {
      // @ts-ignore
      imageFiles[key] = inputData[key];
    }
  }

  for (const key in imageFiles) {
    const imageFile = imageFiles[key];
    const [, fileNumber] = key.split('_');
    // @ts-ignore
    if (imageFile?.size > 0) {
      const imageMetadata = await uploadToCloudinary(imageFile, folderName);
      // @ts-ignore
      inputData[`image_${fileNumber}_url`] = imageMetadata.secure_url;
      // @ts-ignore
      delete inputData[`image_${fileNumber}_file`];
    } else {
      // @ts-ignore
      delete inputData[`image_${fileNumber}_file`];
    }
  }
  return inputData;
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

// handles multiple image inputs, saves them to cloudinary if there's 
// new files, or returns old image_urls if not.
async function handleImagesInput(formData: FormData) {
  const newImageFile0 = formData.get('new_image_file_0') as File;
  const newImageFile1 = formData.get('new_image_file_1') as File;
  const newImageFile2 = formData.get('new_image_file_2') as File;

  const imagesSchema = z.object({
    image_file_0: newImageFile0.size > 0
      ? z
        .any()
        .refine((file) => {
          return file?.size <= MAX_FILE_SIZE;
        }, 'Max image size is 4MB.')
        .refine(
          (file) => {
            return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
          }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
        )
      : z.undefined(),
    image_file_1: newImageFile1.size > 0
      ? z
        .any()
        .refine((file) => {
          return file?.size <= MAX_FILE_SIZE;
        }, 'Max image size is 4MB.')
        .refine(
          (file) => {
            return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
          }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
        )
      : z.undefined(),
    image_file_2: newImageFile2.size > 0
      ? z
        .any()
        .refine((file) => {
          return file?.size <= MAX_FILE_SIZE;
        }, 'Max image size is 4MB.')
        .refine(
          (file) => {
            return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
          }, "Only .jpg, .jpeg, .png, and .webp formats are supported"
        )
      : z.undefined(),
    image_url_0: z.string(),
    image_url_1: z.string(),
    image_url_2: z.string(),
  })

  const inputData: {
    [key: string]: string | File | undefined;
  } = imagesSchema.parse({
    image_file_0: newImageFile0.size > 0 ? (formData.get('new_image_file_0') as File) : undefined,
    image_file_1: newImageFile1.size > 0 ? (formData.get('new_image_file_1') as File) : undefined,
    image_file_2: newImageFile2.size > 0 ? (formData.get('new_image_file_2') as File) : undefined,
    image_url_0: formData.get('image_url_0'),
    image_url_1: formData.get('image_url_1'),
    image_url_2: formData.get('image_url_2')
  })

  // store image  files only:
  const imageFiles: {
    [key: string]: string | File | undefined;
  } = {};

  // loop over inputData and store image files only:
  for (const key in inputData) {
    if (key.includes('image_file_')) {
      imageFiles[key] = inputData[key];
    }
  }

  // upload image files to Cloudinary:
  for (const key in imageFiles) {
    const imageFile = imageFiles[key];
    if (imageFile) {
      const idx = key.split('image_file_')[1];
      const imageMetadata = await uploadToCloudinary(imageFile, 'bio');
      // store image url in inputData:
      // deletion of old image would go here: await moveToTrash(oldImageUrl);
      const oldImageUrl = inputData[`image_url_${idx}`];
      const deleteOldImage = await moveToTrash(oldImageUrl);
      inputData[`image_url_${idx}`] = imageMetadata.secure_url;
    }
  }
  return inputData;
}

const pressArticleSchema = z.object({
  id: z.string(),
  veredict: z.string(),
  quote: z.string(),
  media_organization: z.string(),
  journalist: z.string(),
  date: z.string(),
  article_url: z.string(),
  show: z.string(),
})

export async function createPressVideo(prevState: any, formData: FormData) {
  try {

    const videoUrlInput = formData.get('video_url');

    if (!videoUrlInput) {
      throw new Error("video url is required")
    }

    const embedUrl = transformYouTubeUrl(videoUrlInput);

    const pressVideoSchema = z.object({
      id: z.string(),
      show: z.string(),
      video_url: embedUrl ?
        z.string() :
        z.any()
          .refine((file) => {
            return embedUrl === "condition"
          }, "invalid youtube link"),
      title: z.string(),
      description: z.string(),
      source_organization: z.string(),
    })

    const inputData = pressVideoSchema.parse({
      id: createAlphaNumericString(20),
      show: formData.get('show'),
      video_url: embedUrl,
      title: formData.get('title'),
      description: formData.get('description'),
      source_organization: formData.get('source_organization'),
    })

    const data = {
      document: "press",
      entry: "video_press",
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

    revalidatePath('/(personal)/press', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `video press added` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}
export async function editPressVideo(prevState: any, formData: FormData) {
  try {
    const newVideoUrl = formData.get('new_video_url');

    const pressVideoSchema = z.object({
      id: z.string(),
      show: z.string(),
      video_url: z.string(),
      title: z.string(),
      description: z.string(),
      source_organization: z.string(),
    })

    const inputData = pressVideoSchema.parse({
      id: formData.get('id'),
      show: formData.get('show'),
      video_url: newVideoUrl?.length ? transformYouTubeUrl(newVideoUrl) : formData.get('video_url') as string,
      title: formData.get('title'),
      description: formData.get('description'),
      source_organization: formData.get('source_organization'),
    })

    const data = {
      document: "press",
      entry: "video_press",
      itemLocator: "video_press.id",
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

    revalidatePath('/(personal)/press', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

async function deleteImagesAndUpdateObject(imagesArray: { url: string, index: number }[], inputData: any) {
  for (const imageObject of imagesArray) {
    const index = imageObject.index
    const trashOldImage = await moveToTrash(imageObject.url);
    inputData[`image_${index}_url`] = "";
  }
  return inputData;
}

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
// const nameAndRoleSchema = z.object({
//   name: z.string(),
//   role: z.string()
// })



// @ts-ignore
// const optionalImageSchema = z.custom((data: File | undefined | {}) => {
//   if (!data.size) { return true }
//   else if (data.size > MAX_FILE_SIZE) {
//     throw new Error("Max image size is 4MB")
//   } else if (!ACCEPTED_IMAGE_MIME_TYPES.includes(data?.type)) {
//     throw new Error("Only .jpg, .jpeg, .png, and .webp formats are supported")
//   } else {
//     return true;
//   }
// });

// @ts-ignore
const optionalImageSchemaBackup = z.any().refine((data: File | undefined | {}) => {
  // @ts-ignore
  if (!data.size) { return true }
  // @ts-ignore
  else if (data?.size > MAX_FILE_SIZE) {
    throw new Error("Max image size is 4MB")
    // @ts-ignore
  } else if (!ACCEPTED_IMAGE_MIME_TYPES.includes(data?.type)) {
    throw new Error("Only .jpg, .jpeg, .png, and .webp formats are supported")
  } else {
    return true;
  }
}, "check optionalImageSchema");

const nameAndRoleSchema = z.array(
  z.object({
    name: z.optional(z.string()),
    role: z.optional(z.string()),
  })
);

const optionalNameAndRoleSchemaOld = z.union([
  z.array(
    z.object({
      name: z.optional(z.string()),
      role: z.optional(z.string()),
    }),
  ),
  z.undefined()
]);

const imageSchema = z.union([
  z.any()
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, "Max image size is 4MB.")
    .refine((file) => {
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type);
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported")
    .refine((file) => {
      return file?.size !== 0;
    }, "plase attach an image file"),
  z.undefined()
])

const optionalNameAndRoleSchema = z.array(
  z.optional(
    z.object({
      name: z.optional(z.string()),
      role: z.optional(z.string()),
    })
  )
)

const showSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  opening_date: z.string(),
  theatre: z.string(),
  sinopsis: z.string(),
  cast: nameAndRoleSchema,
  creative: optionalNameAndRoleSchema,
  musicians: optionalNameAndRoleSchema,
  dancers: optionalNameAndRoleSchema,
  // image_1_file: z
  //   .any()
  //   .refine((file) => {
  //     return file?.size <= MAX_FILE_SIZE;
  //   }, 'Max image size is 4MB.')
  //   .refine(
  //     (file) => {
  //       return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)
  //     },
  //     "Only .jpg, .jpeg, .png, and .webp formats are supported"
  //   ),
  image_1_file: imageSchema,
  image_2_file: imageSchema,
  image_3_file: imageSchema,
  image_1_url: z.string(),
  image_2_url: z.string(),
  image_3_url: z.string(),
})

export async function createShow(prevState: any, formData: FormData) {
  try {
    const castTeam = parseNameAndRole(formData.get('cast'))
    const creativeTeam = parseNameAndRole(formData.get('creative'))
    const musiciansTeam = parseNameAndRole(formData.get('musicians'))
    const dancersTeam = parseNameAndRole(formData.get('dancers'))
    const image_1_file = formData.get('image_1_file') as File;
    const image_2_file = formData.get('image_2_file') as File;
    const image_3_file = formData.get('image_3_file') as File;

    const inputData = showSchema.parse({
      id: createAlphaNumericString(20),
      title: formData.get('title'),
      slug: makeSlug(formData.get('title')),
      opening_date: formData.get('opening_date'),
      theatre: formData.get('theatre'),
      sinopsis: formData.get('editor_content'),
      // image_1_file: formData.get('image_1_file'),
      // image_2_file: formData.get('image_2_file'),
      // image_3_file: formData.get('image_3_file'),
      image_1_file: image_1_file,
      image_2_file: image_2_file.size > 0 ? image_2_file : undefined,
      image_3_file: image_3_file.size > 0 ? image_3_file : undefined,
      cast: castTeam,
      creative: creativeTeam.length > 0 ? creativeTeam : [],
      musicians: musiciansTeam.length > 0 ? musiciansTeam : [],
      dancers: dancersTeam.length > 0 ? dancersTeam : [],
      image_1_url: "",
      image_2_url: "",
      image_3_url: "",
    }) as Show;

    //   const imageFiles : {
    //     [key: string]: string | File | undefined;
    //   } = {};

    //   for (const key in inputData) {
    //     if (key.includes("image_") && key.includes("_file")) {
    //       // @ts-ignore
    //       imageFiles[key] = inputData[key];
    //     }
    //   }

    //   for (const key in imageFiles) {
    //     const imageFile = imageFiles[key];
    //     const [, fileNumber] = key.split('_');
    //     // @ts-ignore
    //     if (imageFile?.size > 0){
    //       const imageMetadata = await uploadToCloudinary(imageFile, 'shows');
    //       // @ts-ignore
    //       inputData[`image_${fileNumber}_url`] = imageMetadata.secure_url; 
    //       // @ts-ignore
    //       delete inputData[`image_${fileNumber}_file`];
    //   } else {
    //     // @ts-ignore
    //     delete inputData[`image_${fileNumber}_file`];
    //   }
    // }

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "shows");

    const data = {
      document: "shows",
      entry: "content",
      content: updatedInputData
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

    revalidatePath(`/(personal)/shows/${inputData.slug}`, 'page');

    revalidatePath('/(editor)/editor', 'page');

    return { message: `show added!!!` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function editShow(prevState: any, formData: FormData) {
  try {
    const imagesToDelete = formData.get("delete_image_urls");

    const parsedImagesToDelete = JSON.parse(imagesToDelete as string);

    const newImage_1_File = formData.get("new_image_1_file") as File;
    const newImage_2_File = formData.get("new_image_2_file") as File;
    const newImage_3_File = formData.get("new_image_3_file") as File;

    const castTeamInput = formData.get('cast') as string;
    const castTeamParsed = JSON.parse(castTeamInput);

    const creativeTeamInput = formData.get('creative') as string;
    const creativeTeamParsed = JSON.parse(creativeTeamInput);

    const musiciansTeamInput = formData.get('musicians') as string;
    const musiciansTeamParsed = JSON.parse(musiciansTeamInput);

    const dancersTeamInput = formData.get('dancers') as string;
    const dancersTeamParsed = JSON.parse(dancersTeamInput);

    const inputData = showSchema.parse({
      id: formData.get('id'),
      title: formData.get('title'),
      slug: formData.get('slug'),
      opening_date: formData.get('opening_date'),
      theatre: formData.get('theatre'),
      sinopsis: formData.get('editor_content'),
      image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_2_file: newImage_2_File.size > 0 ? newImage_2_File : undefined,
      image_3_file: newImage_3_File.size > 0 ? newImage_3_File : undefined,
      cast: castTeamParsed,
      creative: creativeTeamParsed,
      musicians: musiciansTeamParsed,
      dancers: dancersTeamParsed,
      image_1_url: formData.get('image_1_url'),
      image_2_url: formData.get('image_2_url'),
      image_3_url: formData.get('image_3_url'),
    }) as Show;


    // mutate inputData to load new images:
    const inputDataWithNewImages = await handleInputDataWithNewImageFiles(inputData, "shows");

    // mutate inputData to delete images removed by client:
    const inputDataDeletedImages = await deleteImagesAndUpdateObject(parsedImagesToDelete, inputDataWithNewImages)

    const data = {
      document: "shows",
      entry: "content",
      itemLocator: "content.id",
      newContent: inputDataDeletedImages,
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

    revalidatePath(`/(personal)/shows/${inputData.slug}`, 'page');

    revalidatePath('/(editor)/editor', 'page');

    return { message: `show updated!!!` }
  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function createPressArticle(prevState: any, formData: FormData) {
  try {
    const inputData = pressArticleSchema.parse({
      id: createAlphaNumericString(20),
      veredict: formData.get('veredict'),
      quote: formData.get('editor_content'),
      media_organization: formData.get('media_organization'),
      journalist: formData.get('journalist'),
      date: formData.get('date'),
      article_url: formData.get('article_url'),
      show: formData.get('show'),
    })

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

    revalidatePath('/(personal)/press', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `article added` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function editPressArticle(prevState: any, formData: FormData) {
  try {
    const inputData = pressArticleSchema.parse({
      id: formData.get('id'),
      veredict: formData.get('veredict'),
      quote: formData.get('editor_content'),
      media_organization: formData.get('media_organization'),
      journalist: formData.get('journalist'),
      date: formData.get('date'),
      article_url: formData.get('article_url'),
      show: formData.get('show'),
    })

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

    revalidatePath('/(personal)/press', 'page');

    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

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
  image_1_file: imageSchema,
  image_1_url: z.string()
})

export async function createTour(prevState: any, formData: FormData) {
  try {

    const image_1_file = formData.get('image_1_file') as File;

    const inputData = tourSchema.parse({
      id: createAlphaNumericString(20),
      show_title: formData.get('show_title'),
      year: formData.get('year'),
      title_or_place: formData.get('title_or_place'),
      city: formData.get('city'),
      country: formData.get('country'),
      press_url: formData.get('press_url'),
      image_1_file: image_1_file.size > 0 ? image_1_file : undefined,
      // just for type declaration, will be added after uploadingToCloud
      image_1_url: ""
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, 'tours');

    const data = {
      document: "tours",
      entry: "content",
      content: updatedInputData
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

    revalidatePath('/(personal)/tours', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `tour has been created` }

  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function editTour(prevState: any, formData: FormData) {
  try {

    const newImage_1_File = formData.get("new_image_1_file") as File;

    const inputData = tourSchema.parse({
      id: formData.get('id'),
      show_title: formData.get('show_title'),
      year: formData.get('year'),
      title_or_place: formData.get('title_or_place'),
      city: formData.get('city'),
      country: formData.get('country'),
      press_url: formData.get('press_url'),
      image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_1_url: formData.get('image_1_url'),
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "tours");

    const data = {
      document: "tours",
      entry: "content",
      itemLocator: "content.id",
      newContent: updatedInputData,
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

    revalidatePath('/(personal)/tours', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Item updated!!!` }

  } catch (e) {
    console.error(e);
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

    const ID = createAlphaNumericString(5);

    const data = {
      document: "about",
      // content_html: `${ID}D--${inputData.contentHtml}`,
      content_html: {id: ID, content: inputData.contentHtml},
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

    revalidatePath('/(personal)/', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `About has been updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editBio(prevState: any, formData: FormData) {
  try {
    const newImage_1_File = formData.get('new_image_1_file') as File;
    const newImage_2_File = formData.get('new_image_2_file') as File;
    const newImage_3_File = formData.get('new_image_3_file') as File;
    const newImage_4_File = formData.get('new_image_4_file') as File;
    const newImage_5_File = formData.get('new_image_5_file') as File;
    const newImage_6_File = formData.get('new_image_6_file') as File;
    const newImage_7_File = formData.get('new_image_7_file') as File;

    const bioSchema = z.object({
      contentHtml_1: z.string(),
      contentHtml_2: z.string(),
      image_1_file: imageSchema,
      image_2_file: imageSchema,
      image_3_file: imageSchema,
      image_4_file: imageSchema,
      image_5_file: imageSchema,
      image_6_file: imageSchema,
      image_7_file: imageSchema,
      image_1_url: z.string(),
      image_2_url: z.string(),
      image_3_url: z.string(),
      image_4_url: z.string(),
      image_5_url: z.string(),
      image_6_url: z.string(),
      image_7_url: z.string(),
    })

    const inputData: {
      [key: string]: string | File | undefined;
    } = bioSchema.parse({
      contentHtml_1: formData.get('editor_content_1'),
      contentHtml_2: formData.get('editor_content_2'),
      image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_2_file: newImage_2_File.size > 0 ? newImage_2_File : undefined,
      image_3_file: newImage_3_File.size > 0 ? newImage_3_File : undefined,
      image_4_file: newImage_4_File.size > 0 ? newImage_4_File : undefined,
      image_5_file: newImage_5_File.size > 0 ? newImage_5_File : undefined,
      image_6_file: newImage_6_File.size > 0 ? newImage_6_File : undefined,
      image_7_file: newImage_7_File.size > 0 ? newImage_7_File : undefined,
      image_1_url: formData.get('image_1_url'),
      image_2_url: formData.get('image_2_url'),
      image_3_url: formData.get('image_3_url'),
      image_4_url: formData.get('image_4_url'),
      image_5_url: formData.get('image_5_url'),
      image_6_url: formData.get('image_6_url'),
      image_7_url: formData.get('image_7_url'),
    })


    // mutate inputData to load new images:
    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "bio");

    const data = {
      document: "bio",
      content_html_1: updatedInputData.contentHtml_1,
      content_html_2: updatedInputData.contentHtml_2,
      image_1_url: updatedInputData.image_1_url,
      image_2_url: updatedInputData.image_2_url,
      image_3_url: updatedInputData.image_3_url,
      image_4_url: updatedInputData.image_4_url,
      image_5_url: updatedInputData.image_5_url,
      image_6_url: updatedInputData.image_6_url,
      image_7_url: updatedInputData.image_7_url
    }

    const updated = await fetch(`${BASE_URL}/server/bio`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath(`/(personal)/bio`, 'page');

    revalidatePath('/(editor)/editor', 'page');

    return { message: `Bio has been updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

const heroImageSchema = z.object({
  image_1_file: imageSchema,
  image_1_url: z.string()
})

export async function editCoursesHeroImage(prevState: any, formData: FormData) {
  try {
    const newImage_1_File = formData.get('new_image_1_file') as File;

    // const heroSchema = z.object({
    //   image_1_file: imageSchema,
    //   image_1_url: z.string()
    // })

    const inputData: {
      [key: string]: string | File | undefined;
    } = heroImageSchema.parse({
      // image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_1_file: newImage_1_File,
      image_1_url: formData.get('image_1_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "courses");

    const data = {
      document: "courses",
      entry: "image_1_url",
      content: updatedInputData.image_1_url
    }

    const updated = await fetch(`${BASE_URL}/server/courses`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Courses main image has been updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editImageGrid_A(prevState: any, formData: FormData) {
  try {

    const newImage_2_File = formData.get('new_image_2_file') as File;
    const newImage_3_File = formData.get('new_image_3_file') as File;

    const gridSchema_A = z.object({
      image_2_file: imageSchema,
      image_3_file: imageSchema,
      image_2_url: z.string(),
      image_3_url: z.string()
    })

    const inputData: {
      [key: string]: string | File | undefined;
    } = gridSchema_A.parse({
      image_2_file: newImage_2_File.size > 0 ? newImage_2_File : undefined,
      image_3_file: newImage_3_File.size > 0 ? newImage_3_File : undefined,
      image_2_url: formData.get('image_2_url'),
      image_3_url: formData.get('image_3_url')
    })
    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "courses");

    for (const key in updatedInputData) {
      // console.log(`${key}: ${updatedInputData[key]}`)
      const data = {
        document: "courses",
        entry: key,
        content: updatedInputData[key]
      }
      const updated = await fetch(`${BASE_URL}/server/courses`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': DATA_API_KEY
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
    }
    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: "images 2 and 3 updated" };

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }

}

export async function editImageGrid_B(prevState: any, formData: FormData) {
  try {

    const newImage_4_File = formData.get('new_image_4_file') as File;
    const newImage_5_File = formData.get('new_image_5_file') as File;

    const gridSchema_A = z.object({
      image_4_file: imageSchema,
      image_5_file: imageSchema,
      image_4_url: z.string(),
      image_5_url: z.string()
    })

    const inputData: {
      [key: string]: string | File | undefined;
    } = gridSchema_A.parse({
      image_4_file: newImage_4_File.size > 0 ? newImage_4_File : undefined,
      image_5_file: newImage_5_File.size > 0 ? newImage_5_File : undefined,
      image_4_url: formData.get('image_4_url'),
      image_5_url: formData.get('image_5_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "courses");

    for (const key in updatedInputData) {
      const data = {
        document: "courses",
        entry: key,
        content: updatedInputData[key]
      }
      const updated = await fetch(`${BASE_URL}/server/courses`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': DATA_API_KEY
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
    }

    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: "images 4 and 5 updated" };

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }

}

export async function editPressHeroImage(prevState: any, formData: FormData) {
  try {
    const newImage_1_File = formData.get('new_image_1_file') as File;

    const inputData = heroImageSchema.parse({
      image_1_file: newImage_1_File,
      image_1_url: formData.get('image_1_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "press");

    const data = {
      document: "press",
      entry: "image_1_url",
      content: updatedInputData.image_1_url
    }

    const updated = await fetch(`${BASE_URL}/server/input`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(personal)/press', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Press hero image updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editToursHeroImage(prevState: any, formData: FormData) {
  try {
    const newImage_1_File = formData.get('new_image_1_file') as File;

    const inputData = heroImageSchema.parse({
      image_1_file: newImage_1_File,
      image_1_url: formData.get('image_1_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "tours");

    // in order to prevent MongoDB to cache an image already uploaded, generate
    // a random string to append to the image URL, that will be stripped afterwards
    // on the client.
    const ID = createAlphaNumericString(5);

    const data = {
      document: "tours",
      entry: "image_1_url",
      content: `${ID}D--${updatedInputData.image_1_url}`
    }

    const updated = await fetch(`${BASE_URL}/server/input`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(personal)/tours', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Tour hero image updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editCoursesHeroText(prevState: any, formData: FormData) {
  try {
    const inputData = parseRichTextInput(formData);

    const data = {
      document: "courses",
      entry: "content_html",
      content: inputData.contentHtml
    }

    const updated = await fetch(`${BASE_URL}/server/courses`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Hero text has been updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editFAQ(prevState: any, formData: FormData) {
  try {
    const inputData = parseRichTextInput(formData);

    const data = {
      document: "courses",
      entry: "FAQ",
      content: inputData.contentHtml
    }

    const updated = await fetch(`${BASE_URL}/server/courses`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Preguntas frecuentes actualizadas!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editAvailableCourse(prevState: any, formData: FormData) {
  try {
    const courseSchema = z.object({
      id: z.string(),
      name: z.string(),
      entry: z.string(),
      description: z.string(),
    })

    const inputData = courseSchema.parse({
      id: formData.get("id"),
      entry: formData.get("entry"),
      name: formData.get('editor_content'),
      description: ''
    })

    const data = {
      document: "courses",
      entry: inputData.entry,
      // itemLocator: "available_courses.id",
      itemLocator: `${inputData.entry}.id`,
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

    revalidatePath('/(personal)/courses', 'page');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `Available course text has been updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}


export async function createCourse(prevState: any, formData: FormData) {
  try {
    const courseSchema = z.object({
      id: z.string(),
      name: z.string(),
      entry: z.string(),
      description: z.string(),
    })

    const inputData = courseSchema.parse({
      id: createAlphaNumericString(20),
      entry: formData.get("entry"),
      name: formData.get('editor_content'),
      description: ''
    })

    const data = {
      document: "courses",
      entry: inputData.entry,
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

    revalidatePath('/(personal)/courses');
    revalidatePath('/(editor)/editor', 'page');

    return { message: `a course has been created created` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function createCourseReview(prevState: any, formData: FormData) {
  try {
    const reviewText = parseRichTextInput(formData);

    const courseReviewSchema = z.object({
      id: z.string(),
      content: z.string(),
      author: z.string(),
    })

    const inputData = courseReviewSchema.parse({
      id: createAlphaNumericString(20),
      content: reviewText.contentHtml,
      author: formData.get("reviewAuthor"),
    })

    const data = {
      document: "courses",
      entry: "reviews",
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

    return { message: `a course review has been created created` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editCourseReview(prevState: any, formData: FormData) {
  try {
    const reviewText = parseRichTextInput(formData);

    const courseReviewSchema = z.object({
      id: z.string(),
      content: z.string(),
      author: z.string(),
    })

    const inputData = courseReviewSchema.parse({
      id: formData.get("id"),
      content: reviewText.contentHtml,
      author: formData.get("reviewAuthor"),
    })

    const data = {
      document: "courses",
      entry: "reviews",
      itemLocator: "reviews.id",
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

    return { message: `Review has been updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function createTestimonial(prevState: any, formData: FormData) {
  try {
    const testimonialText = parseRichTextInput(formData);

    const testimonialSchema = z.object({
      id: z.string(),
      content: z.string(),
      author: z.string(),
    })

    const inputData = testimonialSchema.parse({
      id: createAlphaNumericString(20),
      content: testimonialText.contentHtml,
      author: formData.get("testimonialAuthor"),
    })

    const data = {
      document: "courses",
      entry: "testimonials",
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

    return { message: `a testimonial has been created created` }
  }
  catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editTestimonial(prevState: any, formData: FormData) {
  try {
    const testimonialText = parseRichTextInput(formData);

    const testimonialSchema = z.object({
      id: z.string(),
      content: z.string(),
      author: z.string(),
    })

    const inputData = testimonialSchema.parse({
      id: formData.get("id"),
      content: testimonialText.contentHtml,
      author: formData.get("testimonialAuthor"),
    })

    const data = {
      document: "courses",
      entry: "testimonials",
      itemLocator: "testimonials.id",
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
    return { message: `Testimonial has been updated!!!` }
  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editCourseLogistics(prevState: any, formData: FormData) {
  try {
    let imageInput = parseImageInput(formData);

    if (imageInput.image_file) {
      imageInput = await handleNewImage(imageInput, 'courses');
    }

    const imageUrl = imageInput.image_url;
    const content = parseRichTextInput(formData);

    const courseLogisticsSchema = z.object({
      title: z.string(),
      content_html: z.string(),
      image_url: z.string(),
    })

    const inputData = courseLogisticsSchema.parse({
      title: formData.get("title"),
      content_html: content.contentHtml,
      image_url: imageUrl,
    })

    const data = {
      document: "courses",
      entry: "logistics",
      content: inputData
    }

    const updated = await fetch(`${BASE_URL}/server/courses`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(editor)/editor', 'page');
    return { message: `Course logistics has been updated!!!` }
  }
  catch (e) {
    console.error(e);
    return { message: `${e}` }
  }

}

export async function createSection(prevState: any, formData: FormData) {
  // REUSE FUNCTIONALITY FROM ARRAY MODIFICATION IN MONGODB
  try {

    console.log(formData)

    return { message: 'hi' }
    const sectionSchema = z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    })

    const inputData = sectionSchema.parse({
      id: createAlphaNumericString(20),
      name: formData.get("section_name"),
      description: formData.get("section_description")
    })

    const data = {
      document: "courses",
      entry: "sections",
      content: inputData
    }

    const saved = fetch(`${BASE_URL}/server/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    revalidatePath('/(editor)/editor', 'page');
    return { message: `a section has been created created` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}