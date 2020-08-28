import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Navbar from './Navbar.js'

class OneDomain extends Component{

  constructor(props){
    super(props)
    this.state={
      id: null,
      domain: null,
      done_loading: false
    }
    this.alert_delete_domain = this.alert_delete_domain.bind(this)
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
        done_loading: false
      })
      this.api_view_domain(id)
    }
  }

  alert_delete_domain(domain_id, domain_name){
  let confirmation = window.confirm('Are you sure you want to delete domain \''+domain_name+'\' having id \''+domain_id+'\'?')
    if (confirmation === true){
      this.api_delete_confirm(domain_id, domain_name)
    }
  }
  
  api_delete_confirm(domain_id, domain_name){
    const endpoint = 'http://127.0.0.1:8000/domain/'+domain_id+'/';
    let thisComponent = this
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
             alert('Domain with name \''+domain_name+'\' and id \''+domain_id+'\' has been deleted.')
             thisComponent.props.history.push('/domain');
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
               done_loading: true,
               domain:responseData.domain_info
           })}
        })
  }

	render(){
		const {id} = this.state
    const {done_loading} = this.state
    const {domain} = this.state
    const feature_list = []

    if (done_loading===true){

    if (domain.feature_id_list.length===0){
        feature_list.push(
          <div><h4>No features are associated to '{domain.name}'</h4></div>)
    }
    else{
      feature_list.push(<div><b><h4>Features associated to '{domain.name}' -></h4></b><br></br></div>)
      for (let feature of (domain.feature_id_list)){
        feature_list.push(
          <div><ul><li>
            <h5>
            {feature.name}
            </h5>
          </li></ul></div>
        )
      }
    }
    }

    return (
              <div className='container animate__animated animate__fadeIn'><Navbar/><br></br><br></br><br></br>
            <div className='centercreate'>
              <h1>View Domain</h1>
            </div>
             {(done_loading === true) ? <div>
                  {(domain === null) ? 'Page Not Found' : 
                  <div>
                  <div><br></br><br></br><br></br><h4><b>Domain Name</b> -> {domain.name} </h4><hr></hr><h4> <b>Domain ID</b> -> {domain.id} </h4><hr></hr> {feature_list}<br></br></div>
                  <Link className='btn btn-secondary' to={{pathname:`/domain`, state:{fromDashboard:false}}}>Back</Link>
                  <button className='btn'><Link className='btn btn-primary' to={{pathname:`/domain/${domain.id}/edit`, state:{fromDashboard:false}}}>Edit Domain</Link></button>
                  <button className='btn btn-danger'  onClick={() => this.alert_delete_domain(domain.id, domain.name)}>Delete Domain</button>                  
                  </div>
                  }
                  </div> : <h2 className='animate__animated animate__fadeIn'><br></br><br></br>Loading...</h2>}</div>
            )
  }

}

export default OneDomain
