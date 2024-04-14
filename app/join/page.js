export default function Write() {
    return(
        <div>
            <h4>회원가입</h4>
            <form method="POST" action="/api/auth/join">
            <input name="name" type="text" placeholder="이름" /> 
            <input name="email" type="text" placeholder="이메일" />
            <input name="password" type="password" placeholder="비번" />
            <button type="submit">id/pw 가입요청</button>
            </form>
        </div>
    )
}