import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Navbar from './Navbar.js'

class OneFeature extends Component{

  constructor(props){
    super(props)
    this.state={
      id: null,
      feature: {domain_id_list:[]},
      done_loading: false
    }
    // this.api_view_feature  = this.api_view_feature.bind(this)
  }

  componentDidMount(){
    this.setState({
        id: null,
        feature: {domain_id_list:[]}
      })
    if (this.props.match){
      const {id} = this.props.match.params
      this.setState({
        id: id,
        done_loading: false
      })
      this.api_view_feature(id)
    }
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
             thisComponent.props.history.push('/feature');
           }
      })

  }

   api_view_feature(feature){
    const view_endpoint = 'http://127.0.0.1:8000/feature/'+feature+'/'
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
           // console.log(responseData.status)
           if (responseData['error_message']){
             alert(responseData['error_message'])
             thisComponent.props.history.push('/feature');
           }
           else{
           thisComponent.setState({
               done_loading: true,
               feature:responseData.feature_info
           })}
        })
  }

  render(){
    const {id} = this.state
    const {done_loading} = this.state
    const {feature} = this.state
    const domain_list = []

    if (done_loading===true){

    if (feature.domain_id_list.length===0){
        domain_list.push(
          <div><h4>No domain has '{feature.name}' associated to it</h4></div>)
    }
    else{
      domain_list.push(<div><b><h4>Domains having '{feature.name}' associated to them -></h4></b><br></br></div>)
      for (let domain of (feature.domain_id_list)){
        domain_list.push(
          <div><ul><li>
            <h5>
            {domain.name}
            </h5>
          </li></ul></div>
        )
      }
    }
    }

    return (
              <div className='container animate__animated animate__fadeIn'><Navbar/> <br></br><br></br><br></br>
            <div className='centercreate'>
              <h1>View Feature</h1>
            </div>
            {(done_loading === true) ? <div>
                  {(feature === null) ? 'Page Not Found' :
                  <div> 
                  <div><br></br><br></br><br></br><h4><b>Feature Name</b> -> {feature.name}</h4><hr></hr><h4> <b>Feature ID</b> -> {feature.id}</h4> <hr></hr>{domain_list}<br></br></div>
                  <Link className='btn btn-secondary' to={{pathname:`/feature`, state:{fromDashboard:false}}}>Back</Link>
                  <button className='btn'><Link className='btn btn-primary' to={{pathname:`/feature/${feature.id}/edit`, state:{fromDashboard:false}}}>Edit Name</Link></button>
                  <button className='btn btn-danger'  onClick={() => this.alert_delete_feature(feature.id, feature.name)}>Delete Feature</button>
                  </div>
                  }
                  </div> : <h2 className='animate__animated animate__fadeIn'><br></br><br></br>Loading...</h2>}</div>
            )
  }

}

export default OneFeature