/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon, SystemEventsPanel */

// ======================= DASHBOARD =======================
const Dashboard = () => {
  const kpis = [
    {label:'Total', value:'1,024', pct:100, kind:'total', sub:'Percentage 100%'},
    {label:'Assigned', value:'716', pct:70, kind:'assigned', sub:'Percentage 70%'},
    {label:'Unassigned', value:'308', pct:30, kind:'unassigned', sub:'Percentage 30%'},
    {label:'Enroute', value:'0', pct:0, kind:'enroute', sub:'Percentage 0%'},
    {label:'Arrived', value:'6', pct:1, kind:'arrived', sub:'Percentage 1%'},
    {label:'Completed', value:'62', pct:6, kind:'completed', sub:'Percentage 6%'},
    {label:'Cancelled', value:'68', pct:7, kind:'cancelled', sub:'Percentage 7%'},
  ];
  return (
    <div className="ac-screen" data-screen-label="02 Dashboard">
      <Sidebar activeParent="home" activeChild="dashboard"/>
      <div className="ac-main">
        <Topbar crumbs={['Home', 'Dashboard']}/>
        <div className="ac-content">
          <div className="ac-page-head">
            <div>
              <div className="ac-page-title">Dashboard</div>
              <div className="ac-page-sub">Today, 23 April 2026 · Sacramento Metro</div>
            </div>
            <div className="ac-seg">
              <button className="active">Today</button>
              <button>Week</button>
              <button>Month</button>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:10, marginBottom:16}}>
            {kpis.map((k,i) => (
              <div key={i} className={`ac-kpi ${k.kind}`}>
                <div className="ac-kpi-label">{k.label}</div>
                <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                  <div className="ac-kpi-val">{k.value}</div>
                  <div className="ac-kpi-sub">{k.pct}%</div>
                </div>
                <div className="ac-kpi-bar"><div className="ac-kpi-bar-fill" style={{width: (k.pct || 1) + '%'}}/></div>
              </div>
            ))}
          </div>

          <div style={{display:'grid', gridTemplateColumns:'340px 1fr', gap:16, alignItems:'start'}}>
            <SystemEventsPanel/>

            <div className="ac-card">
              <CardHead title="Unassigned Appointments" count="1,024" countKind="warn" actions={
                <>
                  <button className="ac-icon-btn" title="Filter"><Icon name="filter" size={13}/></button>
                  <button className="ac-btn secondary sm"><Icon name="download" size={12}/> Export</button>
                </>
              }/>
              <FilterInput placeholder="Search unassigned appointments…"/>
              <table className="ac-table">
                <thead><tr><th>Date</th><th>Time</th><th>Client</th><th>Provider</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    ['05/21/2026','14:00','Alice McMeniman','','unassigned'],
                    ['05/28/2026','09:30','Floyd Clark','','unassigned'],
                    ['05/28/2026','12:30','George Morrow','Olivia Ramirez','assigned'],
                    ['05/28/2026','14:30','Alice McMeniman','','unassigned'],
                    ['05/21/2026','07:00','Oanh Ta','Nathaniel Luu','assigned'],
                    ['05/21/2026','08:30','Deborah Johnson','Virginia Cline','assigned'],
                    ['05/21/2026','09:00','Lawrence Hendrix','Valentin Amastia','assigned'],
                    ['05/21/2026','11:30','Dionne LeGare','Rosalba Salas','assigned'],
                    ['05/21/2026','17:00','patricia Jepsen','Arshpreet Kaur','assigned'],
                    ['05/21/2026','22:00','Mary Clark','','unassigned'],
                  ].map((r,i) => (
                    <tr key={i}>
                      <td className="mono">{r[0]}</td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i}/>{r[2]}</div></td>
                      <td>{r[3] ? <div className="name-cell"><Avatar name={r[3]} variant={i+3}/>{r[3]}</div> : <span className="muted">—</span>}</td>
                      <td><Pill kind={r[4]}>{r[4]}</Pill></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination range="1 – 10 of 1,024"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================= MAP VIEW =======================
const MapView = () => (
  <div className="ac-screen" data-screen-label="03 Map View">
    <Sidebar activeParent="home" activeChild="map"/>
    <div className="ac-main">
      <Topbar crumbs={['Home', 'Map View']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Map View</div>
            <div className="ac-page-sub">Visualize client and provider locations across the service zone</div>
          </div>
        </div>

        <div className="ac-card" style={{marginBottom:16}}>
          <div className="ac-radio-row">
            <div className="ac-radio active"><span className="circle"/>Show All Locations</div>
            <div className="ac-radio"><span className="circle"/>Show Customer Locations</div>
            <div className="ac-radio"><span className="circle"/>Show Provider Locations</div>
            <div style={{marginLeft:'auto'}}>
              <button className="ac-btn secondary sm"><Icon name="filter" size={12}/> Hide filters</button>
            </div>
          </div>

          <div style={{padding:'14px 18px', display:'grid', gridTemplateColumns:'180px 1fr 1fr 1fr auto', gap:12, alignItems:'end', borderBottom:'1px solid var(--ac-border)'}}>
            <div className="ac-field">
              <label>Appointment Date</label>
              <input type="text" defaultValue="04/23/2026"/>
            </div>
            <div className="ac-field">
              <label>City</label>
              <input placeholder="Filter by city"/>
            </div>
            <div className="ac-field">
              <label>Care Recipient</label>
              <input placeholder="Client name"/>
            </div>
            <div className="ac-field">
              <label>Provider</label>
              <input placeholder="Provider name"/>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="ac-btn secondary">Clear</button>
              <button className="ac-btn primary">Apply</button>
            </div>
          </div>

          <div style={{padding:'14px 18px'}}>
            <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:12, color:'var(--ac-navy-700)', fontWeight:500}}>
              <input type="checkbox" style={{accentColor:'#F57600'}}/>
              Show unassigned appointment locations
            </label>
          </div>

          <div style={{padding:'0 18px 18px'}}>
            <MapFrame/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MapFrame = () => {
  // Generate deterministic pin positions
  const clients = [];
  const providers = [];
  for (let i = 0; i < 28; i++) {
    const x = 15 + ((i * 37) % 70);
    const y = 20 + ((i * 23) % 60);
    clients.push({x, y, name: ['Kathy', 'Helen', 'Win', 'Beatrice', 'Donna', 'Patricia', 'Sonia', 'Robert'][i%8]});
  }
  for (let i = 0; i < 18; i++) {
    const x = 20 + ((i * 41) % 65);
    const y = 25 + ((i * 29) % 55);
    providers.push({x, y, name: 'Provider ' + (i+1)});
  }
  return (
    <div className="ac-map-frame">
      <svg className="ac-map-svg" viewBox="0 0 800 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-map" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C3D7E4" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="800" height="440" fill="#D8E8F2"/>
        <rect width="800" height="440" fill="url(#grid-map)"/>
        {/* fake landmasses / parks */}
        <path d="M 100 50 L 250 40 L 320 110 L 280 180 L 150 200 L 80 130 Z" fill="#C7DED1" opacity="0.8"/>
        <path d="M 450 60 L 620 70 L 680 150 L 600 230 L 480 220 L 420 140 Z" fill="#C7DED1" opacity="0.8"/>
        <path d="M 180 280 L 340 270 L 420 340 L 360 400 L 200 410 L 130 350 Z" fill="#C7DED1" opacity="0.8"/>
        <path d="M 520 320 L 680 310 L 730 380 L 650 420 L 530 410 L 480 370 Z" fill="#C7DED1" opacity="0.8"/>
        {/* roads */}
        <path d="M 0 220 L 800 220" stroke="#fff" strokeWidth="3" opacity="0.6"/>
        <path d="M 400 0 L 400 440" stroke="#fff" strokeWidth="3" opacity="0.6"/>
        <path d="M 0 110 L 800 330" stroke="#fff" strokeWidth="2" opacity="0.5"/>
        <path d="M 0 330 L 800 110" stroke="#fff" strokeWidth="2" opacity="0.5"/>
        {/* water */}
        <circle cx="650" cy="110" r="42" fill="#8AB6D6" opacity="0.6"/>
        <ellipse cx="140" cy="350" rx="60" ry="25" fill="#8AB6D6" opacity="0.6"/>
      </svg>

      {clients.map((p, i) => (
        <div key={'c'+i} className="ac-map-pin client" style={{left: p.x + '%', top: p.y + '%'}}>
          <svg viewBox="0 0 24 28" width="24" height="28">
            <path d="M 12 0 C 5.4 0 0 5.4 0 12 C 0 19.5 12 28 12 28 C 12 28 24 19.5 24 12 C 24 5.4 18.6 0 12 0 Z" fill="#1D4ED8"/>
            <circle cx="12" cy="12" r="4" fill="#fff"/>
          </svg>
        </div>
      ))}
      {providers.map((p, i) => (
        <div key={'p'+i} className="ac-map-pin provider" style={{left: p.x + '%', top: p.y + '%'}}>
          <svg viewBox="0 0 24 28" width="24" height="28">
            <path d="M 12 0 C 5.4 0 0 5.4 0 12 C 0 19.5 12 28 12 28 C 12 28 24 19.5 24 12 C 24 5.4 18.6 0 12 0 Z" fill="#059669"/>
            <circle cx="12" cy="12" r="4" fill="#fff"/>
          </svg>
        </div>
      ))}

      <div className="ac-map-controls">
        <button>+</button>
        <button>−</button>
        <button>⛶</button>
      </div>

      <div className="ac-map-legend">
        <span><span className="swatch" style={{background:'#1D4ED8'}}/>Clients · 28</span>
        <span><span className="swatch" style={{background:'#059669'}}/>Providers · 18</span>
      </div>
    </div>
  );
};

Object.assign(window, { Dashboard, MapView });
