import Link from 'next/link'
import stylesheet from './style.scss'

const Footer = () => (
  <div>
    <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
    <div className="footer-r row">
      <div className="col-xs-12 col-sm-5 col-lg-3">
        <div className="content">
          <h4>Fruits</h4>
          <ul className="menu">
            <li><a href="/terms-and-conditions">Terminos y condiciones</a></li>
            <li><a href="/libro-de-reclamaciones">Libro de reclamaciones</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Footer
