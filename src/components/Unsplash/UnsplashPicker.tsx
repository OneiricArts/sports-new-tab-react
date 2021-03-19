import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { BackgroundInfo } from '../BackgroundInfo';
import { ErrorBoundary } from '../ErrorBoundary';

const UnsplashPickerModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <OpenModalButton openModal={openModal} />

      {isOpen && (
        // lg vs md size depending on view
        <Modal isOpen={true} toggle={closeModal} size="md">
          <ModalHeader toggle={closeModal}>Background options</ModalHeader>

          <ModalBody>
            <BackgroundInfo />
          </ModalBody>

          <ModalFooter>
            <Button color="primary" outline onClick={closeModal}>
              Done
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

const OpenModalButton: FC<{ openModal: () => void }> = ({ openModal }) => (
  <Button
    color="primary"
    outline
    onClick={openModal}
    style={{ marginLeft: 'auto' }}
  >
    <ResponsiveComponent
      xs={<span>Options</span>}
      md={<span>Background Options</span>}
    />
  </Button>
);

const UnsplashPortal: FC = ({ children }) =>
  createPortal(
    children,
    document.getElementById('background-js-filters') as Element
  );

export const UnsplashPicker = () => (
  <UnsplashPortal>
    <ErrorBoundary>
      <UnsplashPickerModal />
    </ErrorBoundary>
  </UnsplashPortal>
);
