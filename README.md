# What is this? 
This is Next.js 13 App dir website that regenerates on-demand. Content is managed by a built in CMS. 

## Stack and tools:
- [Next.js](https://nextjs.org) 13 with App directory and server functions.
- [clerk](https://clerk.com) manages authentication. 
- [tiptap](https://tiptap.dev) for a rich text editor.
- [Cloudinary](https://cloudinary.com) hosts images. 
- [MongoDB](https://www.mongodb.com/) is the database. 
- [Zod](https://github.com/colinhacks/zod) for form validation. 

## Workflow
Website's author logs in -> chooses a section to edit -> performs CRUD operations inherent to the section. On form submission, a server action is triggered and performs these actions: 
- input validation
- If there's an image, upload it to Cloudinary, get hosted image url. 
- Save image url and text content to MongoDB.
- Return success/error message to the user. 

![graphic](https://www.tldraw.com/s/v2_c_DjX3w5J4jvD--NdxxiT5x?viewport=-492%2C28%2C2215%2C1457&page=page%3AfPRc6lCUrX0zwp2LhXN7A)

## Usage

1. Clone repo. 
2. Create `.env.local` file, copy variables from `.env.example`.
3. run `npm install` for dependencies 
4. `npm run dev` to run local dev server in `http://localhost:3000/` with local data pulled from `local.json`. 


## Contribute
Please clone, fork, contribute in any way you find interesting. I've listed Issues I haven't had the time to fix yet, please feel free to tackle any of them or create new ones. 





