import { useState } from "react";

export function ChatForm({ onSubmit, onClose, title }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("Both first name and last name are required.");
      return;
    }

    onSubmit({ firstName, lastName });
    setFirstName("");
    setLastName("");
    setError("");
    onClose();
  };

  return (
    <div className="chat-form">
      <div className="chat-form__overlay" onClick={onClose}></div>
      <div className="chat-form__content">
        <h2 className="chat-form__title">{title}</h2>
        <form onSubmit={handleSubmit} className="chat-form__form">
          <div className="chat-form__field">
            <label htmlFor="firstName" className="chat-form__label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="chat-form__input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div className="chat-form__field">
            <label htmlFor="lastName" className="chat-form__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="chat-form__input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          {error && <div className="chat-form__error">{error}</div>}

          <div className="chat-form__actions">
            <button
              type="button"
              className="chat-form__cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="chat-form__submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
