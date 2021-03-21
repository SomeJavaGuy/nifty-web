import React, { useEffect } from "react";
import { Portal } from "react-portal";
import OutsideClick from "../OutsideClick";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

interface ModalProps {
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.add("modal-open");

    return () => {
      body?.classList.remove("modal-open");
    };
  }, []);

  return (
    <Portal>
      <ModalWrapper>
        <OutsideClick onTrigger={onClose}>{children}</OutsideClick>
      </ModalWrapper>
    </Portal>
  );
};

export default Modal;
