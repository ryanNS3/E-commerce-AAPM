import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const modalStyle = {
  display: 'flex',
  width: '100%',
  padding: '',
  backdropFilter: 'blur(10px)',
  transition: '0.6s',
}

const InnerModal = {
  display: 'flex',
  width: '100%',
  padding: ' 1.5rem',
  justifyContent: 'center',
  zIndex: 10,
}
export function RootModal({
  componentForOpenModal,
  children,
  onCloseCallBack,
}) {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  const handleOpen = () => setIsOpenModal(true)
  const handleClose = () => {
    // setIsHoverButton(false)
    setIsOpenModal(false)
    onCloseCallBack()
  }
  return (
    <>
      <div onClick={handleOpen}>{componentForOpenModal}</div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyle}
      >
        <Box sx={InnerModal}>
          <div className=" animate-ButtonToTop duration-800 flex max-h-[99%] w-full flex-col  overflow-hidden rounded-3xl border-2 border-cinza-100 bg-branco px-5 py-5 md:px-7 md:py-7 lg:px-11 lg:py-11 md:m-auto lg:w-3/4">
            <button className=" self-end" onClick={handleClose}>
              Fechar modal
            </button>
            <div className=" overflow-x-hidden md:max-h-[99%] md:overflow-y-scroll lg:overflow-y-hidden">
              {children}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
