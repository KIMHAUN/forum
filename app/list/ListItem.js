'use client'

import Link from "next/link"

export default function ListItem({result}) {

    
    return (
        <div>
        {
            result.map((a, i)=> 
                <div className="list-item" key={i}>
                  <Link prefetch={false} href={`/detail/${a._id}`}><h4>{result[i].title}</h4></Link>
                  {/* <p>{result[i].content}</p> */}
                  <Link href={`/update/${a._id}`}><h4>✏️</h4></Link>
                  
                  <span onClick={()=>{
                    fetch('/api/post/delete?post_id', { method : 'DELETE', body : a._id })
                    .then((r)=>{
                        if(r.status == 200) {
                          return r.json()
                        } else {
                          //서버가 에러코드전송시 실행할코드
                        }
                      })
                      .then((result)=>{ 
                        //성공시 실행할코드
                      }).catch((error)=>{
                        //인터넷문제 등으로 실패시 실행할코드
                        console.log(error)
                      })
                  }}>🗑🗑️</span>
                  <p>1월 1일</p>
                  
                </div>  
              
            )
          }
          </div>
    )
}