# What is this? 
This is Next.js 13 personal website that regenerates on-demand. The website includes a custom CMS that includes Rich text editor and Image uploads.

## Stack
- Next.js 13 with App directory and server functions as the framework.
- Clerk manages authentication. 
- Cloudinary hosts images. 
- MongoDB is the database. 
- Zod for form validation. 

## Workflow
Website's author logs in -> chooses a section to edit -> performs CRUD operations inherent to the section. On form submission, a server action is triggered and performs these actions: 
- input validation
- If there's an image, upload it to Cloudinary, get hosted image url. 
- Save image url and text content to MongoDB.
- Return success/error message to the user. 

## Usage

1. Set up your MongoDB account. 
2. Set up yoour Cloudinary account. 
3. Clone repo. 
4. Create `.env.local` file, copy variables from `.env.example`.
4. `npm run dev` for local dev server
