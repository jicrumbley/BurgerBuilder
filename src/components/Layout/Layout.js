import React, { Component } from 'react'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer:false});
    }

    //written to technically toggle the side drawer, but since the button will not be visible when open, it becomes an open only function
    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer} 
        });
    }

    render() {
        return (
            //empty tags used to allow for adjacent elements, part of react 16
            <>
                <Toolbar open={this.openSideDrawerHandler} />
                <SideDrawer show={this.state.showSideDrawer} close={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
};

export default Layout;