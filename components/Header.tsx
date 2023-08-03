import Link from "next/link";

const headerStyle = {
    marginBottom:"20px",
    borderBottom:"1px solid #000"
}
  
const linkStyle ={
    marginRight:"20px"
}
const Header = () =>{
    return(
        <div style={headerStyle}>
            <Link href="/"> 홈</Link>
            <Link href="/up"> 업로드</Link>
            <Link href="/create"> 생성</Link> 
	    <Link href="/chat"> 챗봇</Link> 
	    <Link href="/api/auth/signin"> 로그인</Link> 
        </div>
    ); 
} 

export default Header;