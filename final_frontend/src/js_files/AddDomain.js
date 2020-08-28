import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';

import Navbar from './Navbar.js'

class AddDomain extends Component {

   constructor(props){
    super(props)
    this.state = {
      features:[{name:'', id:''}],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  api_add_domain(data){
    const endpoint = 'http://127.0.0.1:8000/domain/';
    let thisComponent = this
    let look_up_options = {
         method: "POST",
         body: JSON.stringify(data)
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
         alert('Domain with name \''+responseData['domain_info']['name']+'\' has been created and has id \''+responseData['domain_info']['id']+'\'')
         thisComponent.props.history.push('/domain');
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
       // console.log(responseData.features_info)
       thisComponent.setState({
         features:responseData.features_info
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
      this.api_all_features()
  }

  handleSubmit(event){
    event.preventDefault()
    const {features} = this.state

    const data = {}
    const feature_id_list = []

    for (let feature of features){
        const cb = document.getElementById(feature.id)
        if (cb.checked === false){
          this.state[feature.id]=false
        }
        else{
          this.state[feature.id]=true
          feature_id_list.push(feature.id)
        }
    }

    data['domain_name'] = this.state.domain_name
    data['feature_id_list'] = feature_id_list


    this.api_add_domain(data)
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render()
  {

    const {features} = this.state

    const feature_list = []

    if (features.length !== 0){
      feature_list.push(
          <div>
          <br></br>
          <div className='form-group'><h4>Features available -> </h4></div></div>
        )
    }

    for (let feature of features){
      feature_list.push(
          <div className='form-group'>
            <label for={feature.id}>
            <input type='checkbox' id={feature.id} className='mr-2 checkbox' onChange={this.handleInputChange}/>
            {feature.name}
            </label>
          </div>
        );
    }


    return(
      <div className='container animate__animated animate__fadeIn'>
      <Navbar/>
      <br></br><br></br><br></br>
      <div className='centercreate'>
        <h1>Create Domain</h1>
      </div>
      <form className='my-5 mx-2' onSubmit={this.handleSubmit}>
        <div className='form-group'>
            <label for='domain_name'><h4>Domain Name -> </h4></label>
            <input type='text' id='domain_name' name='domain_name' className='form-control' placeholder='Enter Domain Name...' onChange={this.handleInputChange} required='required'/>
        </div>

        {feature_list}
           
        <button className='btn btn-primary'>Save</button>
        <button className='btn'><Link className='btn btn-secondary' to={{pathname:'/domain', state:{fromDashboard:false}}}>Cancel</Link></button>
      </form>
      </div>
      )
  }

}

export default withRouter(AddDomain)

