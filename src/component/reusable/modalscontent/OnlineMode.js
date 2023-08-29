import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import "./modalscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { offlineMode } from "../../../redux/reducers/userReducer";

export default function OnlineMode({ closeModal }) {
    const dispatch = useDispatch();

    function goOnline() {

        dispatch(offlineMode(false))
        closeModal()

    }

    return (
        <div
            className="modal-screen px-5 py-1 my-3"
            isOpen={true}
            onRequestClose={closeModal}
        >
            <div className="">
                <button className="btn close-button" onClick={closeModal}>
                    <Icon icon="icons8:cancel" className="close-icon" />
                </button>

                <div className="d-flex flex-column align-items-center modal-content">
                    <Icon icon="carbon:network-public" className="network-icon" />
                    <p className="mt-2 text-center no-network">NeTwork Detected</p>
                    <span className="mt-2 mb-5 text-center">
                        You are currently using offline mode. Network detected<br />
                        You can now switch to online mode.{" "}

                    </span>

                    <button className="btn modal-button my-4" onClick={goOnline}>
                        Leave Offline Mode
                    </button>
                </div>
            </div>
        </div>
    );
}
