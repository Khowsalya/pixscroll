export function createPhotoCardHandlers({ navigate, id, onAction }) {
  const handleCardClick = () => {
    if (navigate) {
      navigate("/photos", { state: { id } });
    }
  };

  const handleActionClick = (event, action) => {
    event?.stopPropagation?.();
    onAction?.({ id, action });
  };

  return {
    handleCardClick,
    handleActionClick,
  };
}
