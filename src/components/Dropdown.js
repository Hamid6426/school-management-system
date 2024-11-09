import { useState } from 'react';
import Link from 'next/link';

const Dropdown = ({ buttonLabel, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary w-100 text-start"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        {buttonLabel}
      </button>
      {/* Dropdown menu will be shown/hidden based on the isOpen state */}
      <ul
        className={`position-relative d-flex flex-column dropdown-menu ${isOpen ? 'd-flex' : 'd-none'}`}
        style={{ marginTop: '5px' }}
      >
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.href}
              className="dropdown-item"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
