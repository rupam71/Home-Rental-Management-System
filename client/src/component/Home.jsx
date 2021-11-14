import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    state = {  }
    
    render() { 
        return ( 
            <div>
                Home
                <br/>
                <i className="fas fa-users"></i>
            </div>
         );
    }
}
 
const mapStateToProps = (state) => {
    return {
        user : state.auth.user
    }
}
export default connect(mapStateToProps,{})(Home);