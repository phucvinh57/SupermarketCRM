import { Link } from "react-router-dom"
export default function NavBar() {
    return <nav className="navbar navbar-expand navbar-dark bg-dark px-5 d-flex justify-content-between">
        <a href="/customer" className="navbar-brand">
            SupermarketCRM
        </a>
        <div className="navbar-nav">
            <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                    Cá nhân
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/customer/notifications"} className="nav-link">
                    Thông báo
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/customer/feedback"} className="nav-link">
                    Phản hồi
                </Link>
            </li>
        </div>
    </nav>
}