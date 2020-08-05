import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";

const LifeCycle = () => {
    // Dong dau tien ... Tuong ung voi Constructor

    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(true);
    const [user, setUser] = useState({});

    // Similar to componentDidMount and componentDidUpdate:
    // Run khi bat ke state nao thay doi
    /*
    useEffect(() => {
        console.log("useEffect run");

        return () => {
            // componentWillUnmout <=> Component sẽ bị remove khỏi cấu trúc DOM 
        }
    });
    */
    useEffect(() => {
        console.log("Lang nghe su thay doi cua hai state counter va visible");
    }, [counter, visible])

    useEffect(() => {
        // DidMount - Chay 1 lan duy nhat sau khi render lan dau tien
        console.log("useEffect - empty deps");
    }, [])

    useEffect(() => {
        console.log("Lang nghe su thay doi cua counter");
    }, [counter]);

    useEffect(() => {
        console.log("Lang nghe su thay doi cua visible");
    }, [visible]);

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