import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Button from "../../../components/Button";

const LifeCycle = () => {
    // Dong dau tien ... Tuong ung voi Constructor
    useMemo(() => {
        console.log("constructor");
    }, []);
    
    const inputFileEl = useRef(null);
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(true);
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Smith'
    });


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

    // Khong duoc lam dung.
    const fullName = useMemo(() => {
        return user.firstName + ' ' + user.lastName
    }, [user]);

    const handleIncreaseCounter = useCallback(() => {
        setCounter(counter + 1);
    }, [counter])

    return (
        <div className="container">
            <h1>Play Ground - Life Cycle - React Hooks {fullName}</h1>
            <button onClick={ handleIncreaseCounter }>Counter Add</button>
            <p>{counter}</p>
            <button onClick={() => {
                    setVisible(false);
                }}>Hide button</button>
            {
                visible && <Button />
            }
            <hr />
            <input ref={inputFileEl}  style={{
                    opacity: 0,
                    visibility: 'hidden',
                    position: "fixed",
                    left: '-1000px'
                }} type="file"/>
            <button 
                onClick={() => {
                    // const input = document.querySelector('input[type="file"') as HTMLInputElement;
                    // input.click();
                    inputFileEl.current.click();
                }}
                className="upload">Upload Image</button>
        </div>
    )
}

export default LifeCycle;