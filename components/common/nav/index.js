// import Search from '../Search'
import stylesheet from './style.scss'
import Link from 'next/link'

const Header = () => (
  <nav>
    <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
    <ul>
      <li>
        <Link href="/" prefetch>Orders</Link>
      </li>
      <li>
        <Link href="/plataform/users" prefetch>Team</Link>
      </li>
      <li>
        <Link href="/plataform/admin/caja" prefetch>Flujo de Caja</Link>
      </li>
    </ul>
  </nav>
);

export default Header
