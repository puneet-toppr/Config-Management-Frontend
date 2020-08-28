import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';

import Navbar from './Navbar.js'

class EditFeature extends Component {

   constructor(props){
    super(props)
    this.state = {
      feature_info:{name:'', id:''},
      feature_name:'',
      done_loading_feature: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  api_edit_feature(data){
    const {feature_info} = this.state
    const endpoint = 'http://127.0.0.1:8000/feature/'+feature_info.id+'/';
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
         alert('Feature with name \''+responseData['feature_info']['name']+'\' has been updated and has id \''+responseData['feature_info']['id']+'\'')
         thisComponent.props.history.push(`/feature/${feature_info.id}`);
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
               done_loading_feature: true,
               feature_info:responseData.feature_info
           })}
        })
  }

  componentDidMount(){
    this.setState({
        feature_info:{name:'', id:''},
        done_loading_feature: false,
      })
    if (this.props.match){
      const {id} = this.props.match.params
      this.setState({
        feature_info:{name:'', id:id},
        done_loading_feature: false
      })
      this.api_view_feature(id)
    }
  }

  handleSubmit(event){
    event.preventDefault()
    const {feature_name} = this.state
    const {feature_info} = this.state
    const data = {}

    data['feature_id'] = feature_info.id

    if (feature_name===''){
      data['feature_name'] = feature_info.name
    }
    else{
      data['feature_name'] = feature_name
    }

    this.api_edit_feature(data)
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render()
  {

    const {done_loading_feature} = this.state
    const {feature_info} = this.state

    return(

      <div className='container animate__animated animate__fadeIn'><Navbar/> <br></br><br></br><br></br>
      <div className='centercreate'>
        <h1>Edit Feature</h1>
      </div>
      {(done_loading_feature === true) ? 
        <div>
        {(feature_info.id === null || feature_info.name === null) ? 'Page Not Found' : 

              <form className='my-5 mx-2' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                <label for='feature_name'><h4>Feature Name -></h4></label>
                <input type='text' id='feature_name' name='feature_name' defaultValue={feature_info.name} className='form-control' placeholder='Enter Feature Name...' onChange={this.handleInputChange} required='required'/>
                </div>                   
                <button className='btn btn-primary'>Save</button>
                <button className='btn'><Link className='btn btn-secondary' to={{pathname:`/feature/${feature_info.id}`, state:{fromDashboard:false}}}>Cancel</Link></button>
              </form>
        }
        </div> : <h2 className='animate__animated animate__fadeIn'><br></br><br></br>Loading...</h2>}
      </div>


      )
  }
}


export default withRouter(EditFeature)

