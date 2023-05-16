import {getMetadata} from '../lib/getMetadata';
import Image from 'next/image'
import styles from './page.module.css'

export default async function Home() {

  const data = await getMetadata();

  return (
    <main className={styles.main}>
      {/* <HomePage page={title} settings={title}/> */}
      <h1>HI</h1>
      <h2>{data?.title}</h2>
    </main>
  )
}

