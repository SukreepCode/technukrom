import Link from 'next/link'
import { FaSearch, FaGithub } from 'react-icons/fa'
import React from 'react'


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
        <div className="container is-offset-6-desktop">
          <div className="navbar-brand">
            <a href="/" className="navbar-item">
              <img src="/static/logo-banner.png" />
            </a>
            <Link href="/new">
              <a className="navbar-item">
                ล่าสุด
              </a>
            </Link>


            <Link href="/contribution">
              <a className="navbar-item is-hidden-desktop">
                <FaSearch size="1.2rem" />
              </a>
            </Link>
            <a href="https://github.com/TechNukrom/" className="navbar-item is-hidden-desktop">
              <FaGithub size="1.2rem" />
            </a>

            <div className={`navbar-burger burger ${this.state.isActive ? "is-active" : ""}`} onClick={this.toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={`navbar-menu ${this.state.isActive ? "is-active" : ""}`}>
            <div className="navbar-start">

              <hr class="navbar-divider" />

            </div>

            <div className="navbar-end">
              <Link href="/contribution">
                <a className="navbar-item is-hidden-touch is-hidden-desktop-only">
                  <FaSearch size="1.2rem" />
                </a>
              </Link>


              <a href="https://github.com/TechNukrom/" className="navbar-item is-hidden-touch is-hidden-desktop-only">
                <FaGithub size="1.2rem" />
              </a>


              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  อื่นๆ
                </a>

                <div class="navbar-dropdown">
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

            </div>
          </div>


        </div>
      </nav>
    )
  }
}

