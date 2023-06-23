import { notFound } from "next/navigation";
import About from "@/components/editors/About";
import Bio from "@/components/editors/Bio";
import Courses from "@/components/editors/Courses";

export default async function EditorMainPage() {

  
  return (
    <>
      <h2>HOME</h2>
      {/* @ts-expect-error Server Component */}
      <About/>
      <br></br>
      <hr></hr>
      <br></br>
      <hr></hr>
      <br></br>
      <hr></hr>
      <h2>BIO</h2>
      {/* @ts-expect-error Server Component */}
      <Bio/>
      <h2>COURSES</h2>
      {/* @ts-expect-error Server Component */}
      <Courses/>
    </>
  )
}