import { Navbar } from '../../components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { Analytics } from '@vercel/analytics/react'
import Social from '@/components/global/Social'

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Navbar/>
      <main>
        {children}
        {/* <Analytics/> */}
      </main>
      <Footer/>
    </>
  )
}
