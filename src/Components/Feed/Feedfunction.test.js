import { createPhotoCardHandlers } from "./Feedfunction";

describe("createPhotoCardHandlers", () => {
  it("navigates to the detail page when the card is clicked", () => {
    const navigate = jest.fn();
    const handlers = createPhotoCardHandlers({ navigate, id: "photo-1" });

    handlers.handleCardClick();

    expect(navigate).toHaveBeenCalledWith("/photos", { state: { id: "photo-1" } });
  });

  it("stops propagation and reports the action for buttons", () => {
    const onAction = jest.fn();
    const handlers = createPhotoCardHandlers({ onAction, id: "photo-1" });
    const event = { stopPropagation: jest.fn() };

    handlers.handleActionClick(event, "like");

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith({ id: "photo-1", action: "like" });
  });
});
