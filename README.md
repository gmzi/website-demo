# What is this? 
This is Next.js 13 App dir website that regenerates on-demand. Content is managed by a built in CMS. 

Sta
- Authentication using [clerk]()
- Rich text editor with [tiptap-forms]()

## Stack and tools:
- Next.js 13 (App directory) and server functions.
- [clerk]() manages authentication. 
- [tiptap-form]() for a rich text editor.
- [Cloudinary]() hosts images. 
- [MongoDB]() is the database. 
- [Zod] for form validation. 

## Workflow
Website's author logs in -> chooses a section to edit -> performs CRUD operations inherent to the section. On form submission, a server action is triggered and performs these actions: 
- input validation
- If there's an image, upload it to Cloudinary, get hosted image url. 
- Save image url and text content to MongoDB.
- Return success/error message to the user. 

![graphic](https://www.tldraw.com/s/v2_c_DjX3w5J4jvD--NdxxiT5x?viewport=-492%2C28%2C2215%2C1457&page=page%3AfPRc6lCUrX0zwp2LhXN7A)

## Usage

1. Set up your MongoDB account. 
2. Set up yoour Cloudinary account. 
3. Clone repo. 
4. Create `.env.local` file, copy variables from `.env.example`.
4. run `npm install` for dependencies 
5. `npm run dev` to run local dev server.
7. go to 'localhost:3000' to see the first page with local data pulled from 'document.json'. Deploy your own data on database for prod environment.

## Contribute
Please clone, fork, contribute in any way you find interesting. I've listed Issues I haven't had the time to fix yet, please feel free to tackle any of them or create new ones. 





