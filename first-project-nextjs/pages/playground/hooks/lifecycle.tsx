import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";

const LifeCycle = () => {
    // Dong dau tien ... Tuong ung voi Constructor

    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log("useEffect run");
    });

    console.log("Truoc khi return(render)");
    return (
        <div className="container">
            <h1>Play Ground - Life Cycle - React Hooks</h1>
            <button onClick={() => {
                    setCounter(counter+1)
                    // partial -> Một phần của state
                }}>Counter Add</button>
            <p>{counter}</p>
            <button onClick={() => {
                    setVisible(false);
                }}>Hide button</button>
            {
                visible && <Button />
            }
        </div>
    )
}

export default LifeCycle;