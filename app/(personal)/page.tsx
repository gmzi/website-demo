import { HomePage } from "@/components/pages/home/HomePage"

export default async function IndexRoute() {
    return (
        <>
            {/* @ts-expect-error Server Component */}
            <HomePage/>
        </>
    )
}