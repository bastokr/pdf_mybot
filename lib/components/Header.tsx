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
            <Link href="/"><a style={linkStyle}>홈</a></Link>
            <Link href="/about"><a style={linkStyle}>소개</a></Link>
        </div>
    );
}

export default Header;