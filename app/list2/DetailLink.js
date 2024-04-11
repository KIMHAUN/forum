'use client'

import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function DetailLink() {
    let router = useRouter()
    //let a = usePathname() //현재 URL 출력
    //let b = useSearchParams() //Search parameters query string
    return (
        <button onClick={()=>{router.push('/list')}}>버튼</button>
    )
}