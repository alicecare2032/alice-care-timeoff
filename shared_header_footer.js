/**
 * alice.care Shared Header/Footer Component
 * 
 * This script dynamically injects consistent header and footer across all alice.care portals.
 * Include this script in any HTML page to automatically add the branded header and footer.
 * 
 * USAGE:
 * <script src="shared_header_footer.js"></script>
 * 
 * The script will:
 * 1. Look for elements with id="site-header" and id="site-footer"
 * 2. If found, replace their contents with the branded version
 * 3. If not found, create and prepend/append the header/footer
 * 
 * CUSTOMIZATION:
 * - Set window.ALICE_PORTAL_CONFIG before loading this script to customize:
 *   - portalName: Name shown in header banner
 *   - showNav: Whether to show navigation links
 *   - navLinks: Array of {label, href} for navigation
 *   - showUserMenu: Whether to show user avatar/menu
 */

(function() {
  'use strict';

  // ============ CONFIGURATION ============
  const DEFAULT_CONFIG = {
    portalName: 'Employee Portal',
    showNav: true,
    navLinks: [
      { label: 'News', href: '#news' },
      { label: 'Newsletter', href: '#newsletter' },
      { label: 'Employee of the Month', href: '#employee-of-month' },
      { label: 'My Schedule', href: '#my-schedule' },
      { label: 'Resources', href: '#useful-links' }
    ],
    showUserMenu: true,
    logoUrl: 'https://www.alice.care/wp-content/uploads/2025/04/AliceCare-RGB_Primary-Logo-1.png',
    mainSiteUrl: 'https://www.alice.care'
  };

  const CONFIG = { ...DEFAULT_CONFIG, ...(window.ALICE_PORTAL_CONFIG || {}) };

  // ============ STYLES ============
  const STYLES = `
    <style id="alice-shared-styles">
      /* Header Styles */
      .alice-header {
        background: #FFFFFF;
        box-shadow: 0 4px 20px rgba(26, 54, 92, 0.08);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .alice-header-top {
        background: #1A365C;
        padding: 8px 0;
        text-align: center;
      }

      .alice-header-top p {
        color: white;
        font-size: 13px;
        font-weight: 500;
        margin: 0;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-header-main {
        max-width: 1280px;
        margin: 0 auto;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .alice-logo {
        height: 48px;
        transition: transform 0.3s ease;
      }

      .alice-logo:hover {
        transform: scale(1.02);
      }

      .alice-header-nav {
        display: flex;
        align-items: center;
        gap: 32px;
      }

      .alice-nav-link {
        color: #2D2D2D;
        text-decoration: none;
        font-weight: 500;
        font-size: 15px;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        transition: all 0.3s ease;
        position: relative;
      }

      .alice-nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #1A365C;
        transition: width 0.3s ease;
      }

      .alice-nav-link:hover::after {
        width: 100%;
      }

      .alice-nav-link:hover {
        color: #1A365C;
      }

      .alice-user-menu {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .alice-user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1A365C, #F57600);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-user-avatar:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 30px rgba(26, 54, 92, 0.12);
      }

      .alice-btn-logout {
        padding: 8px 16px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        background: transparent;
        color: #5A5A5A;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-btn-logout:hover {
        color: #F29F07;
      }

      /* Footer Styles - Alice Care Brand */
      .alice-footer {
        background: #1A365C;
        color: white;
        padding: 60px 24px 32px;
        margin-top: auto;
      }

      .alice-footer-content {
        max-width: 1280px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 48px;
      }

      .alice-footer-brand {
        max-width: 320px;
      }

      .alice-footer-logo {
        display: flex;
        align-items: baseline;
        margin-bottom: 20px;
      }

      .alice-footer-logo .logo-alice {
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 700;
        font-size: 32px;
        color: white;
        letter-spacing: -0.5px;
      }

      .alice-footer-logo .logo-care {
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 400;
        font-size: 32px;
        color: #F57600;
        letter-spacing: -0.5px;
      }

      .alice-footer-brand p {
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        line-height: 1.7;
        margin: 0;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-footer-section h4 {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 20px;
        color: #F57600;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .alice-footer-links li {
        margin-bottom: 12px;
      }

      .alice-footer-links a {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        font-size: 14px;
        transition: color 0.3s ease;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-footer-links a:hover {
        color: #F57600;
      }

      .alice-footer-bottom {
        max-width: 1280px;
        margin: 48px auto 0;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: rgba(255,255,255,0.6);
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .alice-footer-social {
        display: flex;
        gap: 12px;
      }

      .alice-footer-social a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 14px;
      }

      .alice-footer-social a:hover {
        background: #F57600;
        transform: translateY(-3px);
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .alice-header-nav {
          display: none;
        }

        .alice-footer-content {
          grid-template-columns: 1fr;
          gap: 32px;
          text-align: center;
        }

        .alice-footer-brand {
          max-width: none;
        }

        .alice-footer-logo {
          justify-content: center;
        }

        .alice-footer-bottom {
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        .alice-footer-social {
          justify-content: center;
        }
      }

      @media (max-width: 480px) {
        .alice-footer {
          padding: 40px 16px 24px;
        }

        .alice-footer-logo .logo-alice,
        .alice-footer-logo .logo-care {
          font-size: 26px;
        }

        .alice-footer-section h4 {
          font-size: 12px;
        }

        .alice-footer-links a {
          font-size: 13px;
        }
      }
    </style>
  `;

  // ============ HEADER HTML ============
  function generateHeader() {
    const navHtml = CONFIG.showNav ? `
      <nav class="alice-header-nav">
        ${CONFIG.navLinks.map(link => `
          <a href="${link.href}" class="alice-nav-link">${link.label}</a>
        `).join('')}
      </nav>
    ` : '';

    const userMenuHtml = CONFIG.showUserMenu ? `
      <div class="alice-user-menu" id="aliceUserMenu" style="display: none;">
        <div class="alice-user-avatar" id="aliceUserAvatar" title="Account">
          <span id="aliceUserInitials">--</span>
        </div>
        <button class="alice-btn-logout" onclick="window.aliceSignOut && window.aliceSignOut()">Sign Out</button>
      </div>
    ` : '';

    return `
      <div class="alice-header-top">
        <p>🏠 ${CONFIG.portalName} — Welcome to the alice.care Team!</p>
      </div>
      <div class="alice-header-main">
        <a href="${CONFIG.mainSiteUrl}">
          <img src="${CONFIG.logoUrl}" alt="alice.care" class="alice-logo">
        </a>
        ${navHtml}
        ${userMenuHtml}
      </div>
    `;
  }

  // ============ FOOTER HTML ============
  function generateFooter() {
    return `
      <div class="alice-footer-content">
        <div class="alice-footer-brand">
          <div class="alice-footer-logo">
            <span class="logo-alice">alice.</span><span class="logo-care">care</span>
          </div>
          <p>Your Home. Your Care. Our Commitment.<br>Flexible, reliable in-home care — from quick tasks to continuous support, when you need it.</p>
        </div>
        <div class="alice-footer-section">
          <h4>Company</h4>
          <ul class="alice-footer-links">
            <li><a href="https://www.alice.care/story/">Our Story</a></li>
            <li><a href="https://www.alice.care/vision/">Our Vision</a></li>
            <li><a href="https://www.alice.care/team/">Leadership</a></li>
            <li><a href="https://www.alice.care/careers/">Careers</a></li>
          </ul>
        </div>
        <div class="alice-footer-section">
          <h4>Support</h4>
          <ul class="alice-footer-links">
            <li><a href="https://www.alice.care/contact-us/">Contact Us</a></li>
            <li><a href="https://www.alice.care/help/">Help Center</a></li>
            <li><a href="https://www.alice.care/faq/">FAQ</a></li>
          </ul>
        </div>
        <div class="alice-footer-section">
          <h4>Contact</h4>
          <ul class="alice-footer-links">
            <li><a href="tel:9162928820">(916) 292-8820</a></li>
            <li>8146 Greenback Lane, Suite #106</li>
            <li>Fair Oaks, CA 95628</li>
          </ul>
        </div>
      </div>
      <div class="alice-footer-bottom">
        <p>© ${new Date().getFullYear()} alice.care — California Licensed HCO #344700080</p>
        <div class="alice-footer-social">
          <a href="https://www.facebook.com/alicecareapp" title="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCw9f7Tn7ctWO6XDlSLUGjWw" title="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/alice-care/" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
    `;
  }

  // ============ INITIALIZATION ============
  function init() {
    // Inject styles
    if (!document.getElementById('alice-shared-styles')) {
      document.head.insertAdjacentHTML('beforeend', STYLES);
    }

    // Handle header
    let header = document.getElementById('site-header');
    if (header) {
      header.className = 'alice-header';
      header.innerHTML = generateHeader();
    } else {
      header = document.createElement('header');
      header.id = 'site-header';
      header.className = 'alice-header';
      header.innerHTML = generateHeader();
      document.body.insertBefore(header, document.body.firstChild);
    }

    // Handle footer
    let footer = document.getElementById('site-footer');
    if (footer) {
      footer.className = 'alice-footer';
      footer.innerHTML = generateFooter();
    } else {
      footer = document.createElement('footer');
      footer.id = 'site-footer';
      footer.className = 'alice-footer';
      footer.innerHTML = generateFooter();
      document.body.appendChild(footer);
    }
  }

  // ============ PUBLIC API ============
  window.AliceHeaderFooter = {
    init: init,
    updateConfig: function(newConfig) {
      Object.assign(CONFIG, newConfig);
      init();
    },
    showUserMenu: function(name, initials) {
      const menu = document.getElementById('aliceUserMenu');
      const initialsEl = document.getElementById('aliceUserInitials');
      if (menu) {
        menu.style.display = 'flex';
        if (initialsEl) {
          initialsEl.textContent = initials || name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        }
      }
    },
    hideUserMenu: function() {
      const menu = document.getElementById('aliceUserMenu');
      if (menu) {
        menu.style.display = 'none';
      }
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
