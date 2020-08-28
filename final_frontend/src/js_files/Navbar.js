import React from 'react'
import '../css_files/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar(){
	return (
			<ul class="menu-bar" style={{display: 'flex'}}>
			    <Link to={{pathname:'/domain', state:{fromDashboard:false}}}><li style={{display: 'flex'}}>DOMAIN</li></Link>
			    <Link to={{pathname:'/', state:{fromDashboard:false}}}><li style={{display: 'flex'}}>HOME</li></Link>
			    <Link to={{pathname:'/feature', state:{fromDashboard:false}}}><li style={{display: 'flex'}}>FEATURE</li></Link>
			</ul>
		)
}

export default Navbar