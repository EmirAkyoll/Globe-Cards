import React from 'react'
import styles from './Navbar.module.css'
import { navbar } from './Navbar.style';

function Navbar() {
  return (
    <div style={navbar}>
      <h1 style={{marginBottom: '0'}}>GLOBE CARDS</h1>
      <b style={{marginTop: '0', fontSize: '18px'}}>Whole World</b>
    </div>
  )
}

export default Navbar;
