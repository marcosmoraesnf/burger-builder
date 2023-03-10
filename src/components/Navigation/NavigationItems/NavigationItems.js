import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>

      {props.isAuthenticated ? (
        <>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem action={props.logout} link="/logout">
            Logout
          </NavigationItem>
        </>
      ) : (
        <NavigationItem link="/sign-in">Sign in</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
