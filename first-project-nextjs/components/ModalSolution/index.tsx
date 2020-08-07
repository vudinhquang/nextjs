import React, { useEffect, useState } from "react";
import "./modal.scss";
import { type } from "os";

type ModalProps = {
    isVisible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    renderFooter?: () => JSX.Element;
}

const CLASS_DEFAULT = "tcl-modal__wrapper";

const ModalSolution: React.FC<ModalProps>= ({
    children, 
    isVisible,
    onOk,
    onCancel,
    renderFooter
}) => {
    const [className, setClassName] = useState(CLASS_DEFAULT);

    useEffect(() => {
        if(isVisible === true) {
            // setClassName(CLASS_DEFAULT + " show");
            setClassName((oldClass) => oldClass + " show");
            document.querySelector("body").classList.add("tcl-modal__open");
        } else {
            setClassName(CLASS_DEFAULT);
            document.querySelector("body").classList.remove("tcl-modal__open");
        }
    }, [ isVisible ])

    const _renderFooter = (): JSX.Element => {
        if(renderFooter) {
            return renderFooter();
        }

        return (
            <>
                <button className="tcl-modal__cancel" onClick={onCancel}>Cancel</button>
                <button className="tcl-modal__ok" onClick={onOk}>Ok</button>
            </>
        )
    }

    return (
        <div className={className}>
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
                        { _renderFooter() }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSolution;