import React from "react"; 
import PropTypes from "prop-types";

const Header = (props) =>  (
        <header className="top">
                <h1>
                    Catch 
                    <span class="ofThe">
                        <span class="of">Of</span>
                        <span class="the">The</span>
                    </span> 
                    Day
                    </h1>
                
                <h3 className="tagline">
                <span>{props.tagline}</span>
                </h3>
            </header>
    );

    Header.propTypes = {
        tagline: PropTypes.string.isRequired
    }

    export default Header;