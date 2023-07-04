import React from 'react';
import { Redirect } from 'react-router-dom';


class ProtectedRoute extends React.Component {
    isAuthenticated = true;
    componentDidMount() {
        
    }
    render() {
        const Component = this.props.component;
        
        const redirect = !!localStorage.getItem('PMAtoken') ? '/' : this.props.redirect;
        
        const uid = localStorage.getItem('PMAuserId');
        
        const utoken = localStorage.getItem('PMAtoken');
        
        if((uid != '' && uid != undefined)&& (utoken != '' && utoken != undefined)) {
            console.log('REDIRECTION' , this.props.redirect);
            return Component ? <Component /> : <Redirect to={{ pathname: '/admin/index' }} />;
            // return <Redirect to={{ pathname: redirect }} />;
        } else {
            
            return <Redirect to={{ pathname: redirect }} />;
        }
    }
}


export default ProtectedRoute;