import { Link } from "react-router-dom"
import logo from "@src/assets/images/logo/logo.png"

const Logo = () => {
  return (
    <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
      <div className="logo">
        <img
          className="fallback-logo"
          src={logo}
          width="41px"
          height="15px"
          alt="logo"
        />
        <h2 className="logo-text brand-text">MALINA</h2>
      </div>
    </Link>
  )
}

export default Logo
