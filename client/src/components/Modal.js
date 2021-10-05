import React from "react";
import { Modal } from 'react-bootstrap';

const ModalCustom = ({modalShow, setModalShow, content, title}) => (
    <>
        <Modal
            size="lg"
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
        </Modal>
    </>
);

export default ModalCustom;