import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Update(props) {
    let session = await getServerSession(authOptions)
    if (session == null) {
        return <div>로그인 하세요.</div>
    } else {

        const db = (await connectDB).db("forum")
        let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
      
        return(
            <div>
                <h2> 수정 페이지</h2>
                <form action="/api/post/update" method="POST">
                    <input style={{display: 'none'}} name="_id" value={props.params.id} />
                    <h4>글 제목</h4>
                    <input name="title" placeholder="글제목" defaultValue ={result.title}/>
                    <h4>글 내용</h4>
                    <input name="content" placeholder="글내용" defaultValue ={result.content}/>
                    <button type="submit">수정</button>
                </form>
            </div>
        )

    }
    
}