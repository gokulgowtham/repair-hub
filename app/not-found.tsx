import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import notFoundImage from '@/public/images/not-found.png'
export const metadata: Metadata = {
    title: 'Not Found',
    description: 'Could not find requested resource',
}

export default function NotFound() {
    return (
        <div className="px-2 w-full">
            <div className="flex flex-col mx-auto max-w-sm py-4" justify-center items-center gap-4>
            <Image className="m-0 rounded-xl" src={notFoundImage} alt="Not Found" width={300} height={300} priority={true}/>
            <h2 className="text-2xl font-bold">Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
            </div>
        </div>
    )
}