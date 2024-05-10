'use server'

import { revalidatePath} from 'next/cache'
import { z } from 'zod'
import createAlphaNumericString from '@/lib/createAlphanumericString';
import { uploadToCloudinary } from './cloudinary';
import { moveToTrash } from './cloudinary';
import { makeSlug } from '@/lib/makeSlug';
import { parseNameAndRole } from '@/lib/parseNameAndRole'
import { Show } from '@/types';
import { updateTest, 
  updateItem, 
  pullItem, 
  pushToArrayCapped,
  updateAbout,
  pushToArray
} from '@/lib/mongo';

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

async function handleInputDataWithNewImageFiles(inputData: any, folderName: string) {
  // store image files in a separate object:
  const imageFiles: {
    [key: string]: string | File | undefined;
  } = {};

  for (const key in inputData) {
    if (key.includes("image_") && key.includes("_file")) {
      // @ts-ignore
      imageFiles[key] = inputData[key];
    }
  }

  // upload new image files to cloudinary, 
  // move old images to trash folder,
  // remove file from inputData object:
  for (const key in imageFiles) {
    const imageFile = imageFiles[key];
    const [, fileNumber] = key.split('_');
    const oldImageUrl = inputData[`image_${fileNumber}_url`];
    // @ts-ignore
    if (imageFile?.size > 0) {
      const imageMetadata = await uploadToCloudinary(imageFile, folderName);
      // @ts-ignore
      inputData[`image_${fileNumber}_url`] = imageMetadata.secure_url;
      // @ts-ignore
      delete inputData[`image_${fileNumber}_file`];
      // move old image to trash:
      // const trashOldImage = moveToTrash(oldImageUrl);
    } else {
      // @ts-ignore
      delete inputData[`image_${fileNumber}_file`];
    }
  }

  return inputData;
}

const nameAndRoleSchema = z.array(
  z.object({
    name: z.optional(z.string()),
    role: z.optional(z.string()),
  })
);

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

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "shows");

    const data = {
      document: "shows",
      entry: "content",
      content: updatedInputData
    }

    const saved = await pushToArray(data.document, data.entry, data.content);
    // const saved = await pushToArrayCapped(data.document, data.entry, data.content);

    revalidatePath(`/(personal)/shows`, 'page');
    revalidatePath(`/(personal)/shows/[slug]`, 'page');
    // revalidatePath('/(editor)/editor', 'page');
    revalidatePath('/(editor)/editor/[index]', 'page');

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
    // const updatedData = await deleteImagesAndUpdateObject(parsedImagesToDelete, inputDataWithNewImages)

    const data = {
      document: "shows",
      entry: "content",
      itemLocator: "content.id",
      newContent: inputDataWithNewImages,
    }

    const updated = await updateItem(
      data.document,
      data.entry,
      data.itemLocator,
      data.newContent
    )

    revalidatePath(`/(personal)/shows`, 'page');
    revalidatePath(`/(personal)/shows/[slug]`, 'page');
    // revalidatePath('/(editor)/editor', 'page');
    revalidatePath('/(editor)/editor/[index]', 'page');

    return { message: `show updated!!!` }
  } catch (e) {
    console.log(e)
    return { message: `${e}` }
  }
}

export async function deleteItem(prevState: any, formData: FormData) {
  try {
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

    const deleted = await pullItem(
      data.document, 
      data.entry, 
      data.keyName, 
      data.valueName
      )

    revalidatePath(`/(personal)/${inputData.document}`, 'page')

    if (inputData.document === 'shows') {
      revalidatePath('/(personal)/shows/[slug]', 'page')
    }

    // revalidatePath('/(editor)/editor', 'page');
    revalidatePath('/(editor)/editor/[index]', 'page');

    return { message: `Item deleted` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editAbout(prevState: any, formData: FormData) {
  try {

    const newImage_1_File = formData.get('new_image_1_file') as File;

    const aboutSchema = z.object({
      contentHtml: z.string(),
      image_1_file: imageSchema,
      image_1_url: z.string()
    })

    const inputData = aboutSchema.parse({
      contentHtml: formData.get('editor_content'),
      image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_1_url: formData.get('image_1_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "about");

    const ID = createAlphaNumericString(5);

    const data = {
      document: "about",
      content_html: { id: ID, content: updatedInputData.contentHtml },
      image_1_url: { id: ID, content: updatedInputData.image_1_url }
    }

    const updated = await updateAbout(data.document, data.content_html, data.image_1_url);

    revalidatePath('/(personal)/', 'page');
    revalidatePath('/(editor)/editor/[index]', 'page');

    return { message: `About updated!!!` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}

export async function editTest(prevState: any, formData: FormData) {
  try {

    const newImage_1_File = formData.get('new_image_1_file') as File;

    const aboutSchema = z.object({
      contentHtml: z.string(),
      image_1_file: imageSchema,
      image_1_url: z.string()
    })

    const inputData = aboutSchema.parse({
      contentHtml: formData.get('editor_content'),
      image_1_file: newImage_1_File.size > 0 ? newImage_1_File : undefined,
      image_1_url: formData.get('image_1_url')
    })

    const updatedInputData = await handleInputDataWithNewImageFiles(inputData, "test");

    const ID = createAlphaNumericString(5);

    const data = {
      document: "test",
      content_html: { id: ID, content: updatedInputData.contentHtml },
      image_1_url: { id: ID, content: updatedInputData.image_1_url }
    }

    const updated = await updateTest(data.document, data.content_html, data.image_1_url);

    revalidatePath('/(personal)/test', 'page');
    // revalidatePath('/(editor)/editor', 'page');
    revalidatePath('/(editor)/editor/[index]', 'page');

    return { message: `Test edit: ${JSON.stringify(updated)}` }

  } catch (e) {
    console.error(e);
    return { message: `${e}` }
  }
}