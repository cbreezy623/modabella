import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';

const linkStyle = {
    fontSize: "1.25rem"
}

const home = <div style={{margin: "1rem"}}><NavLink to="/" style={linkStyle}>Home</NavLink></div>
const items = [
    "customers",
    "products",
    "services",
    "appointments",
    // "sales",
];

class Bar extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    item(name: string){
        const url = "/" + name;
        const title = name.charAt(0).toUpperCase() + name.slice(1);
        return(
            <div style={{margin: "1rem"}} key={name}>
                <NavLink to={url} style={linkStyle}>{title}</NavLink>
            </div>
        );
    }

    render() {
        return (
                <Nav>
                    {home}
                    {items.map((element: string) => 
                        this.item(element)
                    )}
                </Nav>
        );
    }
}

export default Bar;
