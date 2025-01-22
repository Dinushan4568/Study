import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Data Entry System</h1>
            <nav className="navbar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="Register.html">Register</a></li>
                    <li><a href="Find.html">Find</a></li>
                    <li><a href="Update.html">Update</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;