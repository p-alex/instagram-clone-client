import { Link } from 'react-router-dom';
import './Logo.scss';
const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">Bubble</Link>
    </div>
  );
};

export default Logo;
