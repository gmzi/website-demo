// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import ImageUpload from "../forms/ImageUpload";
import { HeroImage, HeroText, AvailableCourses, CreateCourse, CourseReviews, CreateCourseReview, Testimonials, CreateTestimonial, EditLogistics } from "../forms/EditCourses";
import { Edit } from "../forms/Edit";

export default async function Courses() {
    const data = await getData("courses")
    const documentName = "courses"
    const sectionName = "courses"
    const folderName="courses"

    const contentHtml = data.content_html;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';

    const goals = data?.goals || []
    const FAQ = data?.FAQ || [];

    const availableCourses = data?.available_courses || [];

    const reviews = data?.reviews || [];
    const testimonials = data?.testimonials || [];
    const logistics = data?.logistics || {};

    
    return (
        <div>
            <h2>Courses</h2>
            <HeroImage imageUrl={image1Url}/>
            <HeroText contentHtml={contentHtml}/>
            <AvailableCourses courses={availableCourses}/>
            <CreateCourse/>
            <CourseReviews reviews={reviews}/>
            <CreateCourseReview/>
            <Testimonials testimonials={testimonials}/>
            <CreateTestimonial/>
            <EditLogistics title={logistics.title} contentHtml={logistics.content_html} imageUrl={logistics.image_url} />

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