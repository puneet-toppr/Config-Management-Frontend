import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar.js'

class AllFeatures extends Component {
	constructor(props){
    super(props)
    this.state = {
        features:[{name:'', id:''}],
        done_loading_features:false,
        search_name : ''
    }
    this.editSearchTerm = this.editSearchTerm.bind(this)
    this.dynamicSearch = this.dynamicSearch.bind(this)
    this.alert_delete_feature = this.alert_delete_feature.bind(this)
  }

  alert_delete_feature(feature_id, feature_name){
    let confirmation = window.confirm('Are you sure you want to delete feature \''+feature_name+'\' having id \''+feature_id+'\'?')
    if (confirmation === true){
      this.api_delete_confirm(feature_id, feature_name)
    }
  }
  
  api_delete_confirm(feature_id, feature_name){
    const endpoint = 'http://127.0.0.1:8000/feature/'+feature_id+'/';
    let thisComponent=this
    let look_up_options = {
         method: "DELETE",
         headers: {
             'content-type': 'application/json'
      }
      }
      fetch(endpoint, look_up_options)
      .then(function(response){
         return response.json()
      }).then(function(responseData){
         console.log(responseData)
              if (responseData['error_message']){
             alert(responseData['error_message'])
           }
           else{
             alert('Feature with name \''+feature_name+'\' and id \''+feature_id+'\' has been deleted.')
             thisComponent.setState(prevState => ({features:prevState.features.filter(feature => feature.id!==feature_id)}))
           }
      })

  }

  api_all_features(){
  	let thisComponent = this
    const endpoint = 'http://127.0.0.1:8000/feature/';
    let look_up_options = {
         method: "GET"
    }

    fetch(endpoint, look_up_options)
    .then(function(response){
       return response.json()
    }).then(function(responseData){
       // console.log(responseData)
       // console.log(responseData.features_info)
       thisComponent.setState({
       	features:responseData.features_info,
        done_loading_features:true
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
      this.api_all_features()
  }

  editSearchTerm(event){
    this.setState({
      search_name:event.target.value
    })
  }

  dynamicSearch(event){
    return this.state.features.filter(feature => feature.name.includes(this.state.search_name.toLowerCase()))
  }

  render(){

    const features = this.dynamicSearch()
    const {done_loading_features} = this.state

    if(done_loading_features===true){
      const feature_list = []
      if (features.length===0){
        return (
          <div className='container'>
            <Navbar/>
            <br></br><br></br><br></br>
            <div className='center'>
              <h1>Features</h1>
              <br></br><br></br>
            </div>
            <div class="input-group">
              <Link className='btn btn-success' to={{pathname:'/feature/new', state:{fromDashboard:false}}}>Add a new feature</Link>
              <hr></hr>
            <div className='search'>
              <input type='text' id='search_name' name='search_name' className='form-control' placeholder='Enter Feature Name to search for...' onChange={this.editSearchTerm} value={this.state.search_name}/>
            </div>
          </div>
          <br></br>
          <hr></hr>
          No Features available!
          </div> 
        )
      }
      else{
        for (let feature of features){
          feature_list.push(
            <div>
              <h4> {feature.name}</h4>
              <div>
              <Link className='btn btn-primary' to={{pathname:`/feature/${feature.id}`, state:{fromDashboard:false}}}>View Feature</Link>
              <button className='btn'><Link className='btn btn-primary' to={{pathname:`/feature/${feature.id}/edit`, state:{fromDashboard:false}}}>Edit Feature</Link></button>
              <button className='btn btn-danger'  onClick={() => this.alert_delete_feature(feature.id, feature.name)}>Delete Feature</button>
              </div>
              <hr></hr>  
            </div>
            )
        }
      }

      return(
      <div className='container animate__animated animate__fadeIn'>
        <Navbar/>
        <br></br><br></br><br></br>
        <div className='center'>
          <h1>Features</h1>
          <br></br><br></br>
        </div>
        <div class="input-group">
          <Link className='btn btn-success' to={{pathname:'/feature/new', state:{fromDashboard:false}}}>Add a new feature</Link>
          <hr></hr>
          <div className='search'>
            <input type='text' id='search_name' name='search_name' className='form-control' placeholder='Enter Feature Name to search for...' onChange={this.editSearchTerm} value={this.state.search_name}/>
          </div>
        </div>
        <br></br>
        <hr></hr>
        {feature_list}
      </div>
      )
      
    }
    else{
      return (<div className='container animate__animated animate__fadeIn'><Navbar/><br></br><h2>Loading...</h2></div>)
    }
  }
}

export default withRouter(AllFeatures)
