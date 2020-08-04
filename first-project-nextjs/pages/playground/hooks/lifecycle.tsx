import React, { useState } from "react";

const LifeCycle = () => {
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(true);

    return (
        <div className="container">
            <h1>Play Ground - Life Cycle - React Hooks</h1>
            <button onClick={() => {
                    setCounter(counter+1)
                    // partial -> Một phần của state
                }}>Counter Add</button>
            <p>{counter}</p>
        </div>
    )
}

export default LifeCycle;