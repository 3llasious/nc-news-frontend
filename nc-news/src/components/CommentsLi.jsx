function Threads({ isOpen, closePopup }) {
  if (isOpen) {
    return (
      <div
        className="pop-up"
        onClick={(e) => {
          closePopup();
        }}
      >
        placeholder
      </div>
    );
  }
}

export default Threads;
