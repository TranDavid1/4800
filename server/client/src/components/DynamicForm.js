import React from "react";
import "./css/styles.css";

const DynamicForm = (props) => {
    return (
        <div className={"dynamic-form"}>
            <img></img>
            <label>Store name </label>
            <label>Address </label>
            <label>Phone</label>
        </div>
    );
};

export default DynamicForm;
