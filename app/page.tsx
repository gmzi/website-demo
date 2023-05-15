import {getDBData} from '../lib/getDBData';
import Image from 'next/image'
import styles from './page.module.css'

export default async function Home() {
  const data = await getDBData();
  const {title, about} = data

  return (
    <main className={styles.main}>
      <h1>HI</h1>
      <h2>{title}</h2>
      <h2>{about}</h2>
    </main>
  )
}

