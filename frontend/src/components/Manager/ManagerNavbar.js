import { BoxArrowRight } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import resetStorage from '../resetStorage'

export default function NavBar() {
    return <nav className="navbar navbar-expand navbar-dark bg-dark px-5 d-flex justify-content-between">
        <a href="/manager" className="navbar-brand">
            SupermarketCRM
        </a>
        <div className="navbar-nav">
            <li className="nav-item">
                <Link to={"/manager/products"} className="nav-link">
                    Sản phẩm
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/manager/favours"} className="nav-link">
                    Ưu đãi
                </Link>
            </li>
        </div>
        <div className='navbar-nav'>
            <li className="nav-item">
                <Link to={"/"} className="nav-link" onClick={resetStorage}>
                    Đăng xuất <BoxArrowRight size={20} className='ms-2' />
                </Link>
            </li>
        </div>
    </nav>
}