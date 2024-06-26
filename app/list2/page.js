import { connectDB } from "@/util/database"
import Link from 'next/link'
import DetailLink from "./DetailLink"

//export const dynamic = 'force-dynamic'
export const revalidate = 20;

export default async function List() {

  const db = (await connectDB).db("forum")
  let result = await db.collection('post').find().toArray()
  console.log(result)

    return (
        <div className="list-bg">
          {
            result.map((a, i)=> 
                <div className="list-item" key={i}>
                  <Link prefetch={false} href={`/detail/${a._id}`}><h4>{result[i].title}</h4></Link>
                  <p>{result[i].content}</p>
                  <DetailLink/>
                </div>  
            )
          }
      </div>
    )
}