
export function ContextMenu({ menuPosition, onRename, onDelete, onCloseMenu }) {
  return (
    <div
      className="chat__options-menu"
      style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
      onMouseLeave={onCloseMenu}
    >
      <button onClick={onRename} className="chat__option">
        <span>✏️ Rename</span>
      </button>
      <button onClick={onDelete} className="chat__option">
        <span>🗑️ Delete</span>
      </button>
    </div>
  );
}
