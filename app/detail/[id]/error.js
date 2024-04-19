'use client'

export default function Error({error, reset}) {
    return (
        <div>

            <h3> 에러남 ㅅㄱ </h3>
            <button onClick={()=>reset()}>reset 버튼 </button>
        </div>
    )

}