// import Search from '../Search'
import stylesheet from './style.scss'
import Link from 'next/link'

const Header = () => (
  <nav>
    <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
    <ul>
      <li>
        <Link href="/" prefetch>Inicio</Link>
      </li>
      <li>
        <Link href="/about" prefetch>About Us</Link>
      </li>
      <li>
        <Link href="/contactos" prefetch>Contact Us</Link>
      </li>
    </ul>
  </nav>
);

export default Header
