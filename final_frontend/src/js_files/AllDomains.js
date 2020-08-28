import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';


import Navbar from './Navbar.js'

class AllDomains extends Component {

  constructor(props){
    super(props)
    this.state = {
        domains:[{name:'', id:''}],
        done_loading_domains:false,
        search_name : ''
    }
    this.editSearchTerm = this.editSearchTerm.bind(this)
    this.dynamicSearch = this.dynamicSearch.bind(this)
    this.alert_delete_domain = this.alert_delete_domain.bind(this)
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
             thisComponent.setState(prevState => ({domains:prevState.domains.filter(domain => domain.id!==domain_id)}))
           }
      })

  }

  api_all_domains(){
    let thisComponent = this
    const endpoint = 'http://127.0.0.1:8000/domain/';
    let look_up_options = {
         method: "GET"
    }

    fetch(endpoint, look_up_options)
    .then(function(response){
       return response.json()
    }).then(function(responseData){
       thisComponent.setState({
         domains:responseData.domains_info,
         done_loading_domains:true
       })
    }).catch(function(error){
       console.log("error", error)
    })

  }

  componentDidMount(){
    this.api_all_domains()
  }

  editSearchTerm(event){
    this.setState({
      search_name:event.target.value
    })
  }

  dynamicSearch(event){
    return this.state.domains.filter(domain => domain.name.includes(this.state.search_name.toLowerCase()))
  }

  render(){

    const domains = this.dynamicSearch()
    const {done_loading_domains} = this.state

    if(done_loading_domains===true){
      const domain_list = []
      if (domains.length===0){
        return (
          <div className='container'>
            <Navbar/>
            <br></br><br></br><br></br>
            <div className='center'>
              <h1>Domains</h1>
              <br></br><br></br>
            </div>
            <div class="input-group">
              <Link className='btn btn-success' to={{pathname:'/domain/new', state:{fromDashboard:false}}}>Add a new domain</Link>
              <hr></hr>
            <div className='search'>
              <input type='text' id='search_name' name='search_name' className='form-control' placeholder='Enter Domain Name to search for...' onChange={this.editSearchTerm} value={this.state.search_name}/>
            </div>
          </div>
          <br></br>
          <hr></hr>
          No Domains available!
          </div> 
        )
      }
      else{
        for (let domain of domains){
          domain_list.push(
            <div>
              <h4> {domain.name}</h4>
              <div>
              <Link className='btn btn-primary' to={{pathname:`/domain/${domain.id}`, state:{fromDashboard:false}}}>View Domain</Link>
              <button className='btn'><Link className='btn btn-primary' to={{pathname:`/domain/${domain.id}/edit`, state:{fromDashboard:false}}}>Edit Domain</Link></button>
              <button className='btn btn-danger'  onClick={() => this.alert_delete_domain(domain.id, domain.name)}>Delete Domain</button>
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
          <h1>Domains</h1>
          <br></br><br></br>
        </div>
        <div class="input-group">
          <Link className='btn btn-success' to={{pathname:'/domain/new', state:{fromDashboard:false}}}>Add a new domain</Link>
          <hr></hr>
          <div className='search'>
            <input type='text' id='search_name' name='search_name' className='form-control' placeholder='Enter Domain Name to search for...' onChange={this.editSearchTerm} value={this.state.search_name}/>
          </div>
        </div>
        <br></br>
        <hr></hr>
        {domain_list}
      </div>
      )
      
    }
    else{
      return (<div className='container animate__animated animate__fadeIn'><Navbar/><br></br><h2>Loading...</h2></div>)
    }
  }
}

export default withRouter(AllDomains)

