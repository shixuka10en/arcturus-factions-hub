import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { siteConfig } from "@/config/site";
import { CopyServerAddressButton } from "@/components/site/copy-server-address";

function StoreLink({ onClick }: { onClick?: () => void }) {
  return (
    <a href={siteConfig.storeUrl} className="site-nav-store" onClick={onClick}>
      Store
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.brand} home`}
          onClick={closeMenu}
        >
          <img
            src="/assets/logo.png"
            alt="Arcturus Reborn"
            className="size-9 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display text-base uppercase sm:text-lg">
            Arcturus <span className="text-primary">Reborn</span>
          </span>
        </Link>

        <nav className="site-desktop-nav" aria-label="Main navigation">
          <Link to="/vote">Vote</Link>
          <StoreLink />
        </nav>

        <div className="site-header-actions">
          <CopyServerAddressButton variant="outline" compact />
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobile navigation">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/vote" onClick={closeMenu}>
            Vote
          </Link>
          <StoreLink onClick={closeMenu} />
        </nav>
      )}
    </header>
  );
}
