// http://localhost:3000/editor/metadata

import { getData } from "@/lib/getData";
import { HeroImage, HeroText, AvailableCourses, CreateCourse, CourseReviews, CreateCourseReview, Testimonials, CreateTestimonial, EditLogistics } from "../forms/EditCourses";

export default async function Metadata() {
    // const websiteMetadata = await getData("metadata");
    // const contactData = await getData("contact-info");
    
    return (
        <div>
            <h2>Edit metadata</h2>
            <h2>Metadata editor goes here</h2>
        </div>
    )
  }

/* 
<label>faq editor:</label>
<TextEditorEntry contentHtml={FAQ} document={documentName} entry={'FAQ'} section={sectionName}/>
<label>online add editor:</label>
<TextEditorEntry contentHtml={onlineDescription} document={documentName} entry={'online.description'} section={sectionName}/>
<TextEditorEntry contentHtml={onlineLogistics} document={documentName} entry={'online.logistics'} section={sectionName}/>
<label>Content html editor:</label>
<TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
<ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
<ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
<ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/> 
*/