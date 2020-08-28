import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './index.css';

import Home from './js_files/Home.js'
import AllDomains from './js_files/AllDomains.js'
import AllFeatures from './js_files/AllFeatures.js'
import AddDomain from './js_files/AddDomain.js'
import AddFeature from './js_files/AddFeature.js'
import OneDomain from './js_files/OneDomain.js'
import OneFeature from './js_files/OneFeature.js'
import EditDomain from './js_files/EditDomain.js'
import EditFeature from './js_files/EditFeature.js'

function handle404(){
	return (
			<div className='animate__animated animate__fadeIn'><h1>Error - 404!, Page not found</h1>	</div>
		)
}


function App(){
	return (
	<div>
		<Switch>
			<Route exact path='/' component={Home}/>

			<Route exact path='/domain' component={AllDomains}/>
			<Route exact path='/feature' component={AllFeatures}/>

			<Route exact path='/domain/new' component={AddDomain}/>
			<Route exact path='/feature/new' component={AddFeature}/>

			<Route exact path='/domain/:id' component={OneDomain}/>
			<Route exact path='/feature/:id' component={OneFeature}/>

			<Route exact path='/domain/:id/edit' component={EditDomain}/>
			<Route exact path='/feature/:id/edit' component={EditFeature}/>

			<Route component={handle404}/>
		</Switch>
	</div>
	)
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'))


// report bug button




// // done 
// one domain/feature -> edit, delete button
// component did moount not to be used -> api shud not be called again
// return error for no domain/feature -> basic
// cancel button on edit page -> basic
// display domain/feature name while calling get domain/feature api -> basic

// able to edit domain/feature name -> basic


// suggestions

// search function for domain as well as feature - functionality
// caching - optimise
// pagination