// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import { HeroImage, HeroText, AvailableCourses, CreateCourse, CourseReviews, CreateCourseReview, Testimonials, CreateTestimonial, EditLogistics, EditImageGrid_A } from "../forms/EditCourses";
import { ImageGridInput } from "../forms/ImageInput";
import Link from "next/link";

export default async function Courses() {
    const data = await getData("courses")
    const documentName = "courses"
    const sectionName = "courses"
    const folderName="courses"

    const contentHtml = data.content_html;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const image4Url = data?.image_4_url || '';
    const image5Url = data?.image_5_url || '';
    const image6Url = data?.image_6_url || '';
    const image7Url = data?.image_7_url || '';
    const image8Url = data?.image_8_url || '';

    const grid_A = [{id: 2, url: image2Url}, {id: 3, url: image3Url}];
    const grid_2 = [image4Url, image5Url];
    const grid_3 = [image6Url, image7Url];

    const goals = data?.goals || []
    const FAQ = data?.FAQ || [];

    const availableCourses = data?.available_courses || [];
    const availableCourses_writing = data?.available_courses_writing || [];
    const availableCourses_acting = data?.available_courses_acting || [];

    const reviews = data?.reviews || [];
    const testimonials = data?.testimonials || [];
    const logistics = data?.logistics || {};

    
    return (
        <div>
            <h2>Editar cursos</h2>
            <HeroImage imageUrl={image1Url}/>
            <HeroText contentHtml={contentHtml}/>
            <Link href={`/contact`} target="_blank">
                <button className="btnWhatsapp">Editar numero de contacto</button>
            </Link>
            <EditImageGrid_A images={grid_A}/>
            <AvailableCourses courses={availableCourses_acting} entry="available_courses_acting"/>
            {/* <CreateCourse/> */}
            {/* <CourseReviews reviews={reviews}/> */}
            {/* <CreateCourseReview/> */}
            {/* <Testimonials testimonials={testimonials}/> */}
            {/* <CreateTestimonial/> */}
            {/* <EditLogistics title={logistics.title} contentHtml={logistics.content_html} imageUrl={logistics.image_url} /> */}
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