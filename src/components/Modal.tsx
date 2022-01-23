import React, { FC, useState } from "react"
import ReactModal from "react-modal"
import styles from "./Modal.module.scss"
import Icon from "./Icon"

ReactModal.setAppElement("#terraswap")

const Modal: FC<Modal> = ({
  className,
  isOpen,
  close,
  children,
  isCloseBtn = false,
  url,
  name,
}) => (
  <ReactModal
    className={`${styles.modal} ${className || ""}`}
    overlayClassName={`${styles.overlay}`}
    isOpen={isOpen}
    onRequestClose={close}
  >
    {isCloseBtn && (
      <div className={styles.close}>
        <span onClick={close}>
          <Icon name="close" size={30} color={"#0222BA"} />
        </span>
      </div>
    )}
    {children}
  </ReactModal>
)

export default Modal

/* modal */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setURL] = useState("")
  const [name, setName] = useState("")
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setInfo: (url: string, name: string) => {
      setURL(url)
      setName(name)
    },
    url,
    name,
  }
}
