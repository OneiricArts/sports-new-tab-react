import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { SearchKeywordFilter } from './SearchKeywordFilter';
import { ErrorBoundary } from '../ErrorBoundary';
import { TopicsPicker } from './TopicsPicker';
import { ResponsiveComponent } from '../ResponsiveComponent';

const UnsplashPickerModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const [activeTab, setActiveTab] = useState<'topic' | 'keyword'>('topic');

  return (
    <>
      <OpenModalButton openModal={openModal} />

      {isOpen && (
        <Modal isOpen={true} toggle={closeModal} size="md">
          <ModalHeader toggle={closeModal}>Background options</ModalHeader>

          <ModalBody>
            <Nav tabs className="mb-2">
              <NavItem>
                <NavLink
                  href="#"
                  active={activeTab === 'topic'}
                  onClick={() => setActiveTab('topic')}
                >
                  Topic
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="#"
                  active={activeTab === 'keyword'}
                  onClick={() => setActiveTab('keyword')}
                >
                  Keyword filter
                </NavLink>
              </NavItem>
            </Nav>

            {activeTab === 'topic' && <TopicsPicker />}
            {activeTab === 'keyword' && <SearchKeywordFilter />}
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

const UnsplashPortal: FC<{ children?: ReactNode }> = ({ children }) =>
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
