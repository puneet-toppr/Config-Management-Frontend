import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';

import Navbar from './Navbar.js'

class EditDomain extends Component {

   constructor(props){
    super(props)
    this.state = {
      domain_info:{name:'', id:'', feature_id_list:[]},
      domain_name:'',
      features_info:[{name:'', id:''}],
      done_loading_domain: false,
      done_loading_feature: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  api_edit_domain(data){
  	const {domain_info} = this.state
    const endpoint = 'http://127.0.0.1:8000/domain/'+domain_info.id+'/';
    let thisComponent = this
    let look_up_options = {
         method: "PUT",
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
         alert('Domain with name \''+responseData['domain_info']['name']+'\' has been updated and has id \''+responseData['domain_info']['id']+'\'')
         thisComponent.props.history.push(`/domain/${domain_info.id}`);
       }
    })

  }

  api_view_domain(domain){
    const view_endpoint = 'http://127.0.0.1:8000/domain/'+domain+'/'
    let thisComponent = this
    let view_look_up_options = {
          method: 'GET',
          headers: {
             'content-type': 'application/json'
      }
      }
        fetch(view_endpoint, view_look_up_options)
        .then(function(response){
          if(response.status === 404){
            alert('PAGE NOT FOUND')
            thisComponent.props.history.push('/domain');
          }
          else{
            return response.json()
          }
          return response.json()
        }).then(function(responseData){
           // console.log(responseData)
           if (responseData['error_message']){
             alert(responseData['error_message'])
             thisComponent.props.history.push('/domain');
           }
           else{
           thisComponent.setState({
               done_loading_domain: true,
               domain_info:responseData.domain_info
           })}
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
       thisComponent.setState({
       	 done_loading_feature: true, 
         features_info:responseData.features_info
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
  	this.setState({
        id: null,
        domain: null
      })
    if (this.props.match){
      const {id} = this.props.match.params
      this.setState({
        id: id,
        done_loading_domain: false,
        done_loading_feature: false
      })
      this.api_view_domain(id)
      this.api_all_features()
    }
  }

  handleSubmit(event){
    event.preventDefault()

    const data = {}
    let feature_id_list = []
    const {domain_info} = this.state
    const {domain_name} = this.state
  	const {features_info} = this.state

    for (let feature of features_info){
        const cb = document.getElementById(feature.id)
        if (cb.checked === false){
          console.log('')
        }
        else{
          this.state[feature.id]=true
          feature_id_list.push(feature.id)
        }
    }

    data['domain_id'] = domain_info.id
    if (domain_name===''){
      data['domain_name'] = domain_info.name
    }
    else{
      data['domain_name'] = domain_name
    }
    data['feature_id_list'] = feature_id_list

    this.api_edit_domain(data)
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render()
  {

  	const {done_loading_feature} = this.state
  	const {done_loading_domain} = this.state
  	const {domain_info} = this.state
  	const {features_info} = this.state
    const feature_list = []

    if (features_info.length !== 0){
      feature_list.push(
          <div>
          <br></br>
          <div className='form-group'><h4>Features available -> </h4></div></div>
        )
    }

    const feature_id_list = []
    for (let feature of domain_info.feature_id_list){
      feature_id_list.push(feature.id)
    }

    for (let feature of features_info){
    	if ((feature_id_list).includes(feature.id)){
	      	feature_list.push(
	          <div className='form-group'>
	            <label for={feature.id}>
	            <input type='checkbox' id={feature.id} defaultChecked='checked' className='mr-2 checkbox' onChange={this.handleInputChange}/>
	            {feature.name}
	            </label>
	          </div>
	        );
    	}
    	else{
    		feature_list.push(
	          <div className='form-group'>
	            <label for={feature.id}>
	            <input type='checkbox' id={feature.id} className='mr-2 checkbox' onChange={this.handleInputChange}/>
	            {feature.name}
	            </label>
	          </div>
	        );
    	}
    }



    return(

      <div className='container animate__animated animate__fadeIn'><Navbar/><br></br><br></br><br></br>
      <div className='centercreate'>
        <h1>Edit Domain</h1>
      </div> 
      {(done_loading_domain === true && done_loading_feature === true) ? 
      	<div>
        {(domain_info === null) ? 'Page Not Found' : 
        

        			<form className='my-5 mx-2' onSubmit={this.handleSubmit}>
				        <div className='form-group'>
                <label for='domain_name'><h4>Domain Name -></h4></label>
                <input type='text' id='domain_name' name='domain_name' defaultValue={domain_info.name} className='form-control' placeholder='Enter Domain Name...' onChange={this.handleInputChange} required='required'/>
				        </div>

				        {feature_list}
				           
				        <button className='btn btn-primary'>Save</button>
                <button className='btn'><Link className='btn btn-secondary' to={{pathname:`/domain/${domain_info.id}`, state:{fromDashboard:false}}}>Cancel</Link></button>
				    </form>
                  }
                  </div> : <h2 className='animate__animated animate__fadeIn'><br></br><br></br>Loading...</h2>}</div>


      )
  }
}


export default withRouter(EditDomain)

