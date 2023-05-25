import './MenuItem.scss'
// import 'remixicon/fonts/remixicon.css'
// import 'remixicon/fonts/remixicon.symbol.svg'
import {bold as Bold} from '@/components/shared/icons'

export default ({
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