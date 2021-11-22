import { Link } from "react-router-dom"
export default function NavBar() {
    return <nav className="navbar navbar-expand navbar-dark bg-dark px-5 d-flex justify-content-between">
        <a href="/staff" className="navbar-brand">
            SupermarketCRM
        </a>
        <div className="navbar-nav">
        <li className="nav-item">
                <Link to={"/staff/apc"} className="nav-link">
                    Tư vấn tại chỗ
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/staff/ass"} className="nav-link">
                    Chăm sóc sau bán
                </Link>
            </li>
            {/* <li className="nav-item">
                <Link to={"/staff/lookup"} className="nav-link">
                    Tìm kiếm sản phẩm
                </Link>
            </li> */}
        </div>
    </nav>
}