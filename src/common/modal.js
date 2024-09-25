import { Button, Modal } from "react-bootstrap";

const CustomeModal = ({
  show,
  onHide,
  title,
  subTitle,
  Titlestyle,
  body,
  onConfirm,
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>
        {title}
        <span style={Titlestyle}>{subTitle}</span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      {onConfirm && (
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      )}
    </Modal.Footer>
  </Modal>
);

export default CustomeModal;
