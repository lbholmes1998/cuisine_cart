import React from "react";
import styles from "./Modal.module.css";
import RootLayout from "@/app/Layout";

const Modal = ({ setIsOpen, props }: { setIsOpen: any; props: any }) => {

    return (
        <RootLayout>
            <div className={'bg-slate-200'} onClick={() => setIsOpen(false)} />
            <div className={''}>
                <div className={''}>
                    <div className={''}>
                        <h5 className={''}>{props.recipeName}</h5>
                    </div>
                    <div className={''}>
                        {props}
                    </div>
                    <div className={''}>
                        <div className={''}>
                            <button
                                className={''}
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};

export default Modal;
