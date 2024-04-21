import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const session = await getToken({req: request})
    //console.log('세션 ::: ' + session)
    // if ( request.nextUrl.pathname.startsWith('/write')) {
    //     if (session == null) {
    //         //return NextResponse.redirect(new URL('/api/auth/signin'), request.url)
    //         return NextResponse.redirect(new URL('http://localhost:3000/api/auth/signin'), request.url)
    //     }
    // }
    
    if ( request.nextUrl.pathname === '/list') {
        //console.log(new Date())
        console.log(request.headers.get('sec-ch-ua-platform'))
        return NextResponse.next() //별일 없으니 통과.이 페이지 유지

    }

    // console.log(request.nextUrl)
    // console.log(request.cookies)
    // console.log(request.headers)

    // NextResponse.next()//너 통과
    // NextResponse.redirect() //다른 페이지로 강제 이동(주소창도 변경)
    // NextResponse.rewrite() // 다른 페이지로 강제 이동하지만 현재 URL은 유지됨.
  
} 