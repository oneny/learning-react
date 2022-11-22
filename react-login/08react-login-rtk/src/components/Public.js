import { Link } from "react-router-dom";

function Public() {

  const content = (
    <section className="public">
      <header>
        <h1>Welcome to Repair Store!</h1>
      </header>
      <main>
        <p>Located in Beautiful Downtown Foo City, Repair Store provider</p>
        <p>$nbsp;</p>
        <address>
          Repair Store<br />
          555 Foo Drive<br />
          Foo City, CA 12345<br />
          <a href="tel:+155555555">(555) 555-555</a>
        </address>
        <footer>
          <Link to="/login">Employee Login</Link>
        </footer>
      </main>
    </section>
  )

  return content;
}

export default Public