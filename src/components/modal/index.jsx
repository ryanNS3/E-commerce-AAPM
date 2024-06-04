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
          <div className=" flex max-h-[99%] w-full flex-col overflow-y-scroll rounded-3xl border-2 border-cinza-100 bg-branco px-11 py-11 md:h-2/4 md:overflow-hidden md:m-auto lg:w-3/4">
            <button className=" self-end" onClick={handleClose}>
              Fechar modal
            </button>
            <div>{children}</div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
