import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Write() {
    let session = await getServerSession(authOptions)
    if (session == null) {
        return <div>로그인 하세요.</div>
    } else {
        return(
            <div>
                <h4>글 작성</h4>
                <form action="/api/post/new" method="POST">
                    <h2>글 제목</h2>
                    <input name="title" placeholder="글제목"/>
                    <h2>글 내용</h2>
                    <input name="content" placeholder="글내용"/>
                    <button type="submit">작성</button>
                </form>
            </div>
        )

    }
    
}