import { HomePage } from "@/components/pages/home/HomePage"

export default async function IndexRoute() {
    return (
        <div>
            {/* @ts-expect-error Server Component */}
            <HomePage/>
        </div>
    )
}