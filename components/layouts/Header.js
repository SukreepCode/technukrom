import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import React from 'react'
import { FaGithub } from 'react-icons/fa';


export default class Header extends React.Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <nav className="navbar is-fixed-top is-link"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img src="/static/logo-banner.png" />
          </a>
          <div className={`navbar-burger burger ${this.state.isActive ? "is-active" : ""}`} onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              ล่าสุด
            </a>
            <hr class="navbar-divider" />

          </div>

          <div className="navbar-end">
            <div className="navbar-item">
            <input class="input is-rounded" placeholder="ค้นหา " />
            </div>
           
            <a href="https://github.com/TechNukrom/" className="navbar-item">
              <FaGithub size="1.5rem" />
            </a>
            <Link href="/contribution">
              <a className="navbar-item">
                ช่วยพัฒนา
              </a>
            </Link>
            <Link href="/about">
              <a className="navbar-item">
                เกี่ยวกับเรา
              </a>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

