import React from 'react'
import classes from './Layout.css';

const layout = (props) => (
    //empty tags used to allow for adjacent elements, part of react 16
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default layout;