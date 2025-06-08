import React from 'react';
import { useScroll } from '../../context/ScrollContext';
import { useApp } from '../../context/AppContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export default function Navigation() {
  const { scrolled } = useScroll();
  const { activeSection, updateActiveSection } = useApp();
  const scrollToSection = useScrollToSection();

  const handleSectionClick = (e, section) => {
    e.preventDefault();
    updateActiveSection(section);
    scrollToSection(section);
  };

  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'cv', label: 'cv' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`portfolio-nav desktop-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <span className="nav-name">Simon Schnetzer</span>
        </div>
        <div className="nav-center">
          {navItems.slice(0, 3).map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => handleSectionClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          {navItems.slice(3).map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => handleSectionClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`portfolio-nav mobile-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="mobile-nav-scroll">
          <div className="mobile-nav-content">
            {navItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleSectionClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
} 