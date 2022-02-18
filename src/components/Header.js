import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onShow,show}) => {
    const location = useLocation()
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={show?'grey':'green'} text={show?'Close':'Add'} onClick={onShow}/>}

        </header>
    )
}
Header.defaultProps = {
    title:"Task Tracker"
  }
export default Header
