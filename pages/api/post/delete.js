import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { useSearchParams } from "next/navigation"
export default async function handler(req, res) {

    //서버 기능 안에선 req, res도 같이 있어야됨.
    //let session = await getServerSession(req, res, authOptions)
    //console.log(session)
    // if ( session ) {
    //     req.body.author = session.user.email
    // }

   
    console.log('post_id ::: ' + JSON.stringify(req.query))
    let post_id = req.query.post_id

    const db = (await connectDB).db("forum")  
    let result = db.collection('post').remove({ _id: new ObjectId(post_id) })   
    
    res.status(200).json('삭제완료')


 
}