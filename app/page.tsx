import {getMetadata} from '../lib/getMetadata';
import { Metadata, ResolvingMetadata } from 'next'
import { getLetterAfterSlash } from '@/lib/getLetterAfterSlash'
import Image from 'next/image'
import styles from './page.module.css'

const BASE_URL = process.env.BASE_URL;

// DOCS: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export default async function Home() {

  // const data = await getMetadata();

  return (
    <main className={styles.main}>
      {/* <HomePage page={title} settings={title}/> */}
      <h1>HI</h1>
      {/* <h2>{data?.title}</h2> */}
    </main>
  )
}

