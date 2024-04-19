
'use client'

import { SessionProvider, useSession } from "next-auth/react"
import { useState } from "react";

//import { getServerSession } from "next-auth"
//import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function Write() {
    let [src, setSrc] = useState('')
    let session = <SessionProvider>useSession()</SessionProvider>


    if (session == null) {
        return <SessionProvider>로그인 하세요</SessionProvider>;
    } else {
        return(
            <div>
                {/* <h2>글 작성</h2> */}
                <form action="/api/post/new" method="POST">
                    <h4>글 제목</h4>
                    <input name="title" placeholder="글제목"/>
                    <h4>글 내용</h4>
                    <input name="content" placeholder="글내용"/>
                    <button type="submit">작성</button>
                </form>

                <input type="file" accept="image/*" onChange={
                    async (e) => {
                    let file = e.target.files[0]
                    let filename = encodeURIComponent(file.name)
                    let res = await fetch('/api/post/image?file=' + filename)
                    res = await res.json()
                    
                    //S3 업로드
                    const formData = new FormData()
                    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                        formData.append(key, value)
                    })
                    let 업로드결과 = await fetch(res.url, {
                        method: 'POST',
                        body: formData,
                    })
                    console.log(업로드결과)

                    if (업로드결과.ok) {
                        setSrc(업로드결과.url + '/' + filename)
                    } else {
                        console.log('실패')
                    }
                    
                    }
                } />
                <img />
                
                <img src={src}/>
                
            </div>
        )

    }
    
}