import { Link } from 'react-router-dom'
import './index.css';

export default function Footer() {
  return (
    <footer>
      <p>Copyright &copy; 2023</p>
      <Link to='/about'>About</Link>
    </footer>
  )
}