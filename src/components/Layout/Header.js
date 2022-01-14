import React from "react";
import meansImage from '../../assets/meals.jpg';
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return <React.Fragment>

        <header className={classes.header}>
            <h1>Tro Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
        </header>

        <div className={classes['main-image']}>
            <img src={meansImage} alt={'Look at that spread'}/>
        </div>
    </React.Fragment>
};

export default Header;
