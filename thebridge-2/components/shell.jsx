/* global React */
const { useState } = React;

// ---- Icons (inline SVG, thin-line) ----
const Icon = ({ name, size = 16, style }) => {
  const paths = {
    home: <><path d="M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-5H9v5H6a1 1 0 0 1-1-1V9.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    calendar: <><rect x="3" y="5" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M3 8h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
    users: <><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M2 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/><circle cx="14" cy="6.5" r="2.3" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M12.5 12.2c2.4 0 4.5 1.8 4.5 4.3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></>,
    user: <><circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M4 17c0-3 2.7-5.3 6-5.3S16 14 16 17" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></>,
    clock: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/></>,
    alert: <><path d="M10 3 2.5 16h15L10 3z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M10 8v4M10 14v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
    chart: <><path d="M3 16V4M3 16h14M7 12V8M11 12V6M15 12v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/></>,
    message: <><path d="M3 5a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 5v8a1.5 1.5 0 0 1-1.5 1.5H7L3 17V5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    card: <><rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M2.5 9h15" stroke="currentColor" strokeWidth="1.6"/></>,
    cash: <><rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    settings: <><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M10 2v2M10 16v2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M2 10h2M16 10h2M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
    phone: <><path d="M5 3h3l1.5 3.5-2 1.2c1 2 2.3 3.3 4.3 4.3l1.2-2L16.5 11.5v3a1.5 1.5 0 0 1-1.7 1.5C8.5 15.4 4.6 11.5 4 5.2A1.5 1.5 0 0 1 5.5 3.5 1 1 0 0 1 5 3z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    map: <><path d="M3 5v12l4-2 6 2 4-2V3l-4 2-6-2-4 2z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M7 3v12M13 5v12" stroke="currentColor" strokeWidth="1.6"/></>,
    dashboard: <><rect x="3" y="3" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="11" y="3" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="3" y="13" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="11" y="10" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    ops: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    file: <><path d="M5 3h6l4 4v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M11 3v4h4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    eye: <><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.6" fill="none"/><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    edit: <><path d="m12 4 4 4-8 8H4v-4l8-8z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    trash: <><path d="M4 6h12M8 6V4h4v2M6 6l1 10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    plus: <><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    bell: <><path d="M6 8a4 4 0 0 1 8 0v3l1.5 3h-11l1.5-3V8z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M8 17a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    grid: <><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none"/></>,
    chevron: <><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    check: <><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    flag: <><path d="M4 3v14M4 4h10l-2 3.5 2 3.5H4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    download: <><path d="M10 3v10M5 9l5 5 5-5M3 16h14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    upload: <><path d="M10 14V4M5 8l5-5 5 5M3 16h14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    pin: <><path d="M10 2c-3 0-5 2-5 5 0 3.5 5 9 5 9s5-5.5 5-9c0-3-2-5-5-5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><circle cx="10" cy="7" r="1.5" fill="currentColor"/></>,
    filter: <><path d="M3 4h14l-5 7v5l-4 1v-6L3 4z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></>,
    mail: <><rect x="2.5" y="4" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M3 5l7 5 7-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{display:'inline-block', verticalAlign:'middle', ...(style||{})}}>{paths[name] || null}</svg>
  );
};

// ---- Sidebar ----
const navConfig = [
  {
    id: 'home', label: 'Home', icon: 'home',
    children: [
      { id: 'ops', label: 'Ops View' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'map', label: 'Map View' },
    ]
  },
  {
    id: 'appointments', label: 'Appointments', icon: 'calendar',
    children: [
      { id: 'scheduled', label: 'Scheduled' },
      { id: 'recurring', label: 'Recurring' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'resource-calendar', label: 'Resource Calendar' },
    ]
  },
  {
    id: 'clients', label: 'Clients', icon: 'user',
    children: [
      { id: 'list-clients', label: 'List Clients' },
      { id: 'add-client', label: 'Add Client' },
    ]
  },
  {
    id: 'providers', label: 'Providers', icon: 'users',
    children: [
      { id: 'list-providers', label: 'List Providers' },
      { id: 'add-provider', label: 'Add Provider' },
    ]
  },
  {
    id: 'overtime', label: 'Over Time Approval', icon: 'clock', badge: '3',
    children: [
      { id: 'overtime-request', label: 'Overtime Request' },
    ]
  },
  {
    id: 'incident', label: 'Incident Report', icon: 'alert',
    children: [
      { id: 'incident-list', label: 'Incident Report List' },
    ]
  },
  {
    id: 'reports', label: 'Reports', icon: 'chart',
    children: [
      { id: 'service-report', label: 'Service Report' },
      { id: 'customer-report', label: 'Customer Report' },
      { id: 'providers-report', label: 'Providers Reports' },
    ]
  },
  { id: 'messages', label: 'Messages', icon: 'message' },
  { id: 'payments', label: 'Payments', icon: 'card' },
  { id: 'payroll', label: 'Payroll', icon: 'cash' },
  { id: 'admin', label: 'Admin', icon: 'settings' },
  { id: 'dialer', label: 'AWS Connect Dialer', icon: 'phone' },
];

const Sidebar = ({ activeParent, activeChild }) => {
  return (
    <aside className="ac-sidebar">
      <div className="ac-brand">
        <div className="ac-brand-mark">a</div>
        <div>
          <div className="ac-brand-text">alice<span className="dot">.</span>care</div>
          <div className="ac-brand-sub">Operations Console</div>
        </div>
        <div className="ac-collapse"><Icon name="chevron" size={10}/></div>
      </div>

      <nav className="ac-nav">
        <div className="ac-nav-group">Main</div>
        {navConfig.map(group => {
          const isActiveParent = activeParent === group.id;
          const isOpen = isActiveParent && !!group.children;
          return (
            <div key={group.id}>
              <div className={`ac-nav-item ${isActiveParent ? (group.children ? 'open' : 'active-parent') : ''}`}>
                <span className="icon"><Icon name={group.icon}/></span>
                <span>{group.label}</span>
                {group.badge && <span className="badge">{group.badge}</span>}
                {group.children && <span className="caret"><Icon name="chevron" size={10}/></span>}
              </div>
              {isOpen && (
                <div className="ac-nav-sub">
                  {group.children.map(child => (
                    <div key={child.id} className={`ac-nav-subitem ${activeChild === child.id ? 'active' : ''}`}>
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="ac-sidebar-footer">
        <div className="ac-user-card">
          <div className="ac-avatar">TE</div>
          <div style={{flex:1, minWidth:0}}>
            <div className="name">Tommaso Esmanech</div>
            <div className="role">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ---- Topbar ----
const Topbar = ({ crumbs }) => (
  <div className="ac-topbar">
    <div className="ac-zone">
      <label>Service Zone</label>
      <select defaultValue="SMF">
        <option>SMF — Sacramento Metro</option>
        <option>SFO — San Francisco Bay</option>
        <option>LAX — Greater LA</option>
      </select>
    </div>

    <div className="ac-crumbs" style={{marginLeft:16}}>
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep"><Icon name="chevron" size={10}/></span>}
          {i === crumbs.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
        </React.Fragment>
      ))}
    </div>

    <div className="ac-top-actions">
      <div className="ac-search">
        <input placeholder="Search clients, providers, appointments…"/>
      </div>
      <div className="ac-top-icon"><Icon name="bell"/><span className="dot-badge"/></div>
      <div className="ac-top-icon" title="English"><span style={{fontSize:14}}>🇺🇸</span></div>
      <div className="ac-top-icon"><Icon name="grid"/></div>
      <div className="ac-user">
        <div className="avatar-sm">TE</div>
        <div>
          <div className="name">Tommaso Esmanech</div>
          <div className="role">Admin · SMF</div>
        </div>
      </div>
    </div>
  </div>
);

// ---- Shared small helpers ----
const Pill = ({ kind, children }) => (
  <span className={`ac-pill ${kind}`}>{children}</span>
);

const Pagination = ({ range = "1 – 10 of 1,024", total = 103 }) => (
  <div className="ac-pagination">
    <div className="per-page">
      Items per page
      <select defaultValue="10"><option>10</option><option>25</option><option>50</option></select>
    </div>
    <div>{range}</div>
    <div className="nav">
      <button disabled>«</button>
      <button disabled>‹</button>
      <button>›</button>
      <button>»</button>
    </div>
  </div>
);

const CardHead = ({ title, count, countKind = '', actions }) => (
  <div className="ac-card-head">
    <div className="ac-card-title"><span className="accent"/>{title}</div>
    {count != null && <span className={`ac-card-count ${countKind}`}>{count}</span>}
    {actions && <div className="ac-card-actions">{actions}</div>}
  </div>
);

const FilterInput = ({ placeholder = 'Filter…', right }) => (
  <div className="ac-filter">
    <input placeholder={placeholder}/>
    {right}
  </div>
);

const Avatar = ({ name, variant = 0 }) => {
  const initials = name.split(' ').filter(Boolean).slice(0,2).map(p => p[0]).join('');
  const v = ((variant % 5) + 5) % 5 + 1;
  return <span className={`avatar-xs v${v}`}>{initials}</span>;
};

// Register globals
Object.assign(window, { Icon, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, navConfig });
