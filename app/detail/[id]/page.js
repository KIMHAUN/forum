import { connectDB } from "@/util/database"
import { ObjectId }from "mongodb"
import Comment from "./Comment"
import { notFound } from "next/navigation"

export default async function Detail(props) {
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
    let comments = await db.collection('comment').find({ parent_id: new ObjectId(props.params.id) }).toArray()

    //console.log('parent_id ::: ' + props.params.id)   
    //console.log('comments :::' + comments)

    if ( result === null) {
        return notFound()
    }
    return (
        <div>
            <h2>상세페이지</h2>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
           <Comment comments= {comments} parent_id = {result._id.toString()}/>
        </div>
    )
}