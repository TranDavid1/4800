import { formatMs } from "@material-ui/core";
import React from "react";
import "./css/styles.css";

const DynamicForm = (props) => {
    return (
        <div className={"dynamic-form"}>
            <input
                onChange={(e) => {
                    const inputData = {
                        formSerial: props.formSerial,
                        value: e.target.value,
                    };
                    props.onChangeComponentData(inputData);
                }}
                placeHolder={"Store Name"}
                type="string"
            />
            <button type="button">Add</button>
            <button type="button">Cancel</button>
        </div>
    );
};
