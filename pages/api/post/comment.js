import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res) {

    //서버 기능 안에선 req, res도 같이 있어야됨.
    let session = await getServerSession(req, res, authOptions)
    //console.log(session)
    // if ( session ) {
    //     req.body.author = session.user.email
    // }

    //console.log(session)

    const db = (await connectDB).db("forum")
    
    if (req.method == 'GET') {
        console.log('GET!!!!')
        
        //let parent_id = JSON.stringify(req.query)
        //console.log('parent_id ::: ' + JSON.stringify(req.query))
        let parent_id = req.query.parent_id
        let result = await db.collection('comment').find({ parent_id: new ObjectId(parent_id) }).toArray()
        //console.log('result ::: ' + result)

        res.status(200).json(result)
    }

    if (req.method == 'POST') {
        console.log('POST!!!!')

        req.body = JSON.parse(req.body)
        let 저장할거 = {
            content: req.body.content,
            parent_id: new ObjectId(req.body.parent_id),
            author: session.user.email
        }
        try {
        
        let result = db.collection('comment').insertOne(저장할거)
        console.log('finish')
        
        return res.status(200).json('저장 완료')
        } catch(error) {          
            return res.status(500).json(error)
        }
    }    
}