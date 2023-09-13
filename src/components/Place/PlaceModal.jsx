import ReactDOM from 'react-dom';

const PlaceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const onContentClick = (e) => {
    e.stopPropagation(); // This will prevent the event from bubbling up and close the modal when clicking inside
  }

  return ReactDOM.createPortal(
    <div style={OVERLAY_STYLES} onClick={onClose}>
      <div style={MODAL_STYLES} onClick={onContentClick}>
        <button style={BTN_STYLES} onClick={onClose}>Close Modal</button>
        {/* 여기에 위치 정보나 그 외 필요한 정보들을 표시하세요 */}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default PlaceModal;

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
};

const MODAL_STYLES = {
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform:'translate(-50%, -50%)',
   padding:'50px',
   zIndex:'1000',
   background: '#fff'
};

const BTN_STYLES = {
  position: 'absolute',
  top: '-38%',
  background: 'red'
};


