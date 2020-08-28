import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import '../css_files/Home.css'

class Home extends Component {

  constructor(props){
    super(props)
    this.clicked_domain = this.clicked_domain.bind(this)
    this.clicked_feature = this.clicked_feature.bind(this)
  }

  clicked_domain(){
    this.props.history.push('/domain');
  }

  clicked_feature(){
    this.props.history.push('/feature')
  }

  render(){
  	return (
  		<div className="row no-gutters animate__animated animate__fadeIn">
            
              <section className="col-md-6" onClick={this.clicked_domain} style={{cursor: 'pointer'}}>              
                <div className="leftside d-flex justify-content-center align-items-center" style={{backgroundImage: "url(https://i.pinimg.com/originals/92/2b/8a/922b8afdbf2a8aa799377b155bd91874.jpg)"}}>
                  <p className="serif">Domains</p>                                                                                                                                    
                </div>              
              </section>

              <section className="col-md-6" onClick={this.clicked_feature} style={{cursor: 'pointer'}}>              
                <div className="rightside d-flex justify-content-center align-items-center" style={{backgroundImage: "url(https://i.pinimg.com/originals/1a/cc/af/1accaf88c4ce3d0fd89a7cde0e960653.jpg)"}}>
                  <p className="serif">Features</p>
                </div>
              </section>

      </div>
  		)
  }
}

export default withRouter(Home)
