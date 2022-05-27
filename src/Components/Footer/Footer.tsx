import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social">
        <a
          href="https://github.com/p-alex"
          target="_blank"
          rel="noopener noreferrer"
          title="My Github profile"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/alexandru-daniel-pistol/"
          target="_blank"
          rel="noopener noreferrer"
          title="My Linkedin profile"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/p-alex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alex Daniel
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
