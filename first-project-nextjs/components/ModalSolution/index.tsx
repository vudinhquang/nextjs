import React, { useEffect, useState } from "react";
import "./modal.scss";

type ModalProps = {
    isVisible?: boolean;
}
const ModalSolution: React.FC<ModalProps>= ({children, isVisible}) => {
    let classDefault = "tcl-modal__wrapper";
    
    if(isVisible === true) {
        classDefault += " show";
        // document.querySelector("body").classList.add("tcl-modal__open");
    } else {
        // document.querySelector("body").classList.remove("tcl-modal__open");
    }

    return (
        <div className={classDefault}>
            <div className="tcl-mask"></div>
            <div className="tcl-dialog">
                <div className="tcl-modal__content">   
                    <div className="tcl-modal__header">
                        Title demo
                        <button className="tcl-modal__close">X</button>
                    </div>                 
                    <div className="tcl-modal__body">
                        {children}
                    </div>

                    <div className="tcl-modal__footer">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSolution;