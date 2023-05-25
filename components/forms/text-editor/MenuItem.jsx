import './MenuItem.scss'

const MenuItem = ({
  icon, title, action, isActive = null,
}) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    {icon}
  </button>
)

export default MenuItem;