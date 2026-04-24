/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon, SystemEventsPanel */
const { useState: useStateV2 } = React;

// Consolidated Sidebar — grouped, no "Add X" items, fewer top-level entries
const navConfigV2 = [
  { group: 'Operate', items: [
    { id: 'today', label: 'Today', icon: 'dashboard', active: true },
    { id: 'map', label: 'Map View', icon: 'map' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'recurring', label: 'Recurring Templates', icon: 'clock' },
  ]},
  { group: 'People', items: [
    { id: 'clients', label: 'Clients', icon: 'user' },
    { id: 'providers', label: 'Providers', icon: 'users' },
    { id: 'messages', label: 'Messages', icon: 'message' },
  ]},
  { group: 'Care Quality', items: [
    { id: 'incidents', label: 'Incidents', icon: 'alert' },
    { id: 'overtime', label: 'Overtime', icon: 'clock', badge: '3' },
    { id: 'reports', label: 'Reports', icon: 'chart' },
  ]},
  { group: 'Money', items: [
    { id: 'payments', label: 'Payments', icon: 'card' },
    { id: 'payroll', label: 'Payroll', icon: 'cash' },
  ]},
  { group: 'Admin', items: [
    { id: 'admin', label: 'Admin', icon: 'settings' },
    { id: 'dialer', label: 'Dialer', icon: 'phone' },
  ]},
];

const SidebarV2 = ({ active }) => (
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
      {navConfigV2.map(sec => (
        <div key={sec.group}>
          <div className="ac-nav-group">{sec.group}</div>
          {sec.items.map(it => (
            <div key={it.id} className={`ac-nav-item ${active === it.id ? 'active-parent' : ''}`}
              style={active === it.id ? { background:'rgba(245,118,0,0.14)', color:'#fff' } : {}}>
              <span className="icon"><Icon name={it.icon}/></span>
              <span>{it.label}</span>
              {it.badge && <span className="badge">{it.badge}</span>}
              {active === it.id && <span style={{position:'absolute', left:-10, top:'50%', transform:'translateY(-50%)', width:3, height:18, background:'#F57600', borderRadius:2}}/>}
            </div>
          ))}
        </div>
      ))}
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

// ============== TODAY (Ops + Dashboard merged) ==============
const TodayView = () => (
  <div className="ac-screen" data-screen-label="01 Today (Ops + Dashboard)">
    <SidebarV2 active="today"/>
    <div className="ac-main">
      <Topbar crumbs={['Today']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Today</div>
            <div className="ac-page-sub">Thu, 23 April 2026 · Sacramento Metro · Live operations</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <div className="ac-seg"><button className="active">Today</button><button>Week</button><button>Month</button></div>
            <button className="ac-btn secondary"><Icon name="download"/> Export</button>
            <button className="ac-btn primary"><Icon name="plus"/> New appointment</button>
          </div>
        </div>

        {/* Unified KPI + triage strip */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:10, marginBottom:14}}>
          {[
            {label:'Total', value:'84', pct:100, kind:'total', sub:''},
            {label:'Completed', value:'62', pct:74, kind:'completed', sub:'74%'},
            {label:'In Progress', value:'6', pct:7, kind:'arrived', sub:'Currently'},
            {label:'Unassigned', value:'1', pct:1, kind:'unassigned', sub:'Needs dispatch'},
            {label:'Delayed', value:'4', pct:5, kind:'cancelled', sub:'Triage now', alert:true},
            {label:'Cancellations', value:'4', pct:5, kind:'cancelled', sub:'Today', alert:true},
            {label:'Enroute', value:'3', pct:4, kind:'enroute', sub:''},
          ].map((k,i) => (
            <div key={i} className={`ac-kpi ${k.kind}`} style={k.alert?{borderColor:'var(--ac-red-300)', background:'linear-gradient(180deg, var(--ac-red-50), #fff 60%)'}:{}}>
              <div className="ac-kpi-label" style={k.alert?{color:'var(--ac-red-600)'}:{}}>{k.label}</div>
              <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <div className="ac-kpi-val" style={k.alert?{color:'var(--ac-red-600)'}:{}}>{k.value}</div>
                <div className="ac-kpi-sub">{k.sub}</div>
              </div>
              <div className="ac-kpi-bar"><div className="ac-kpi-bar-fill" style={{width: (k.pct || 1) + '%'}}/></div>
            </div>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16, alignItems:'start'}}>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {/* Needs attention — combines delayed + cancellations + unassigned */}
            <div className="ac-card">
              <CardHead title="Needs attention" count="9" countKind="crit" actions={
                <div className="ac-seg">
                  <button className="active">All (9)</button>
                  <button>Delayed (4)</button>
                  <button>Cancelled (4)</button>
                  <button>Unassigned (1)</button>
                </div>
              }/>
              <table className="ac-table">
                <thead><tr>
                  <th>Issue</th><th>Time</th><th>Client</th><th>Provider</th><th>Reason</th><th style={{textAlign:'right'}}>Action</th>
                </tr></thead>
                <tbody>
                  <tr>
                    <td><Pill kind="unassigned">Unassigned</Pill></td>
                    <td className="mono">22:00</td>
                    <td><div className="name-cell"><Avatar name="Mary Clark" variant={0}/>Mary Clark</div></td>
                    <td><span className="muted">—</span></td>
                    <td className="muted">Overnight companion</td>
                    <td style={{textAlign:'right'}}><button className="ac-btn primary sm">Assign</button></td>
                  </tr>
                  {[
                    ['delayed','14:27','Lawrence Hendrix','Valentin Amastia','Completion delayed 45m'],
                    ['delayed','13:57','Pamela Carter','Geoffrey Carter','Enroute delayed'],
                    ['delayed','13:12','Donna Sims','Olivia Millhouse','Completion delayed'],
                    ['delayed','11:40','Ray Morrow','Carmen Johnston','No check-in'],
                  ].map((r,i)=>(
                    <tr key={'d'+i}>
                      <td><Pill kind="delayed">Delayed</Pill></td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i+1}/>{r[2]}</div></td>
                      <td>{r[3]}</td>
                      <td className="muted">{r[4]}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="ac-icon-btn orange" title="Call"><Icon name="phone" size={13}/></button>{' '}
                        <button className="ac-icon-btn" title="View"><Icon name="eye" size={13}/></button>
                      </td>
                    </tr>
                  ))}
                  {[
                    ['2026-05-16','09:30','Mary Clark','Carmen Johnston','Sick leave'],
                    ['2026-05-09','09:30','Mary Clark','Carmen Johnston','Personal'],
                    ['2026-05-02','09:30','Mary Clark','Carmen Johnston','Car trouble'],
                    ['2026-04-30','09:30','Mary Clark','Carmen Johnston','Sick leave'],
                  ].map((r,i)=>(
                    <tr key={'c'+i}>
                      <td><Pill kind="cancelled nodot">Cancelled</Pill></td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i+2}/>{r[2]}</div></td>
                      <td>{r[3]}</td>
                      <td className="muted">{r[4]}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="ac-icon-btn" title="Reassign"><Icon name="users" size={13}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* In progress */}
            <div className="ac-card">
              <CardHead title="In Progress" count="6" countKind="ok"/>
              <table className="ac-table">
                <thead><tr><th>Time</th><th>Client</th><th>Provider</th><th>Status</th><th style={{textAlign:'right'}}>Duration</th></tr></thead>
                <tbody>
                  {[
                    ['08:00','Deborah Johnson','Virginia Cline','arrived','2h 14m'],
                    ['10:00','Helen Watkins','Jeddalyn Reyes','arrived','14m'],
                    ['10:30','Earl Clark','Kimleang Seng','arrived','8m'],
                    ['13:00','Annette Morehouse','Carmen Johnston','arrived','—'],
                    ['13:15','Nancy Morrow','Olivia Ramirez','arrived','—'],
                    ['14:00','Pamela Carter','Geoffrey Carter','arrived','—'],
                  ].map((r,i) => (
                    <tr key={i}>
                      <td className="mono">{r[0]}</td>
                      <td><div className="name-cell"><Avatar name={r[1]} variant={i+1}/>{r[1]}</div></td>
                      <td>{r[2]}</td>
                      <td><Pill kind="arrived">{r[3]}</Pill></td>
                      <td style={{textAlign:'right'}} className="muted mono">{r[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <SystemEventsPanel/>
        </div>
      </div>
    </div>
  </div>
);

// ============== APPOINTMENTS (table ⇄ calendar toggle) ==============
const AppointmentsV2 = ({ view = 'table' }) => {
  const label = view === 'calendar' ? '02 Appointments (Calendar)' : '02 Appointments (Table)';
  const days = ['Sun 19/04','Mon 20/04','Tue 21/04','Wed 22/04','Thu 23/04','Fri 24/04','Sat 25/04'];
  const hours = []; for (let h = 6; h <= 18; h++) hours.push(`${String(h).padStart(2,'0')}:00`);
  const events = [
    {day:0, h:2, dur:1, title:'CL: Grace', who:'SP: Diana', time:'08:00 – 09:00'},
    {day:1, h:2, dur:1, title:'CL: Nirmalaben', who:'SP: Diana', time:'08:00 – 09:00'},
    {day:3, h:4, dur:2, title:'CL: Annie', who:'SP: Diana', time:'10:00 – 12:00'},
    {day:5, h:3.5, dur:1.5, title:'CL: Genevieve', who:'SP: Diana', time:'09:30 – 11:00'},
    {day:5, h:5, dur:3, title:'CL: Genevieve', who:'SP: Diana', time:'11:15 – 14:30'},
    {day:6, h:7, dur:1, title:'CL: Alice', who:'CANCELLED', time:'13:30 – 14:30', cancelled:true},
  ];
  const rowHeight = 30;
  return (
    <div className="ac-screen" data-screen-label={label}>
      <SidebarV2 active="appointments"/>
      <div className="ac-main">
        <Topbar crumbs={['Appointments']}/>
        <div className="ac-content">
          <div className="ac-page-head">
            <div>
              <div className="ac-page-title">Appointments</div>
              <div className="ac-page-sub">Week of 23 – 30 April 2026 · 308 scheduled</div>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <div className="ac-seg">
                <button className={view==='table'?'active':''}><Icon name="grid" size={12}/> Table</button>
                <button className={view==='calendar'?'active':''}><Icon name="calendar" size={12}/> Calendar</button>
                <button><Icon name="users" size={12}/> Resource</button>
              </div>
              <button className="ac-btn secondary"><Icon name="filter"/> Filters</button>
              <button className="ac-btn primary"><Icon name="plus"/> New appointment</button>
            </div>
          </div>

          {view === 'table' && (
            <div className="ac-card">
              <div className="ac-sched-toolbar">
                <div className="ac-date-field"><label>Start</label><input defaultValue="23 / 04 / 2026"/></div>
                <button className="ac-btn navy sm">Today</button>
                <div className="ac-date-field"><label>End</label><input defaultValue="30 / 04 / 2026"/></div>
                <button className="ac-btn secondary sm">+7 Days</button>
                <div style={{marginLeft:'auto', display:'flex', gap:6}}>
                  <span className="ac-chip orange">Diana El Sourani ×</span>
                  <span className="ac-chip">Status: All ▾</span>
                </div>
              </div>
              <FilterInput placeholder="Filter appointments…"/>
              <table className="ac-table">
                <thead><tr>
                  <th>Date</th><th>Start</th><th>Customer</th><th>Provider</th><th>Status</th><th>Payment</th><th style={{textAlign:'right'}}></th>
                </tr></thead>
                <tbody>
                  {[
                    ['04/23/2026','07:00','Sharon Dennis','Randall Goins','completed'],
                    ['04/23/2026','07:00','Oanh Ta','Nathaniel Luu','cancelled'],
                    ['04/23/2026','08:30','Sandra Skaug','Sheila Crawford','completed'],
                    ['04/23/2026','08:00','Deborah Johnson','Virginia Cline','arrived'],
                    ['04/23/2026','08:30','Barbara Brincka','Cynthia Rosell','completed'],
                    ['04/23/2026','08:00','Nirmalaben Desai','Olivia Ramirez','completed'],
                    ['04/23/2026','09:30','Ronald Nesch','Unassigned','unassigned'],
                    ['04/23/2026','09:00','Mary Ann Miller','Lucia Diaz','completed'],
                    ['04/23/2026','09:00','Mary Clark','Carmen Johnston','completed'],
                  ].map((r,i) => (
                    <tr key={i}>
                      <td className="mono">{r[0]}</td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i}/>{r[2]}</div></td>
                      <td>{r[3]}</td>
                      <td><Pill kind={r[4]}>{r[4]}</Pill></td>
                      <td><Pill kind="pending">Pending</Pill></td>
                      <td style={{textAlign:'right'}}>
                        <button className="ac-icon-btn" title="View"><Icon name="eye" size={13}/></button>{' '}
                        <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={13}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination range="1 – 9 of 308"/>
            </div>
          )}

          {view === 'calendar' && (
            <div className="ac-cal">
              <div className="ac-cal-head">
                <button className="arrow">‹</button>
                <button className="arrow">›</button>
                <button className="today">Today</button>
                <div className="range" style={{marginLeft:10}}>19 – 25 Apr 2026</div>
              </div>
              <div className="ac-cal-grid" style={{gridTemplateRows:`auto repeat(${hours.length}, ${rowHeight}px)`}}>
                <div className="ac-cal-day-head" style={{gridColumn:1}}> </div>
                {days.map((d, i) => (
                  <div key={d} className={`ac-cal-day-head ${i===4?'today':''}`} style={{gridColumn:i+2}}>
                    {d.split(' ')[0]}<span className="date-num">{d.split(' ')[1]}</span>
                  </div>
                ))}
                {hours.map((h, i) => (
                  <React.Fragment key={h}>
                    <div className="ac-cal-hour" style={{gridColumn:1, gridRow:i+2}}>{h}</div>
                    {days.map((d, di) => (
                      <div key={d+i} className={`ac-cal-day ${di===4?'today':''}`} style={{gridColumn:di+2, gridRow:i+2}}/>
                    ))}
                  </React.Fragment>
                ))}
                {events.map((e, i) => {
                  const top = e.h * rowHeight + 2;
                  const height = e.dur * rowHeight - 4;
                  return (
                    <div key={i} className={`ac-cal-event ${e.cancelled?'cancelled':''}`}
                         style={{gridColumn:e.day+2, gridRow:`2 / span ${hours.length}`, top, height}}>
                      <strong>{e.title}, {e.who}</strong>
                      <span className="time">{e.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============== CUSTOMER DETAIL — 5 tabs ==============
const TABS_V2 = ['Profile','Care','Schedule','Device','Billing'];

const CustomerDetailV2 = ({ initialTab = 0 }) => {
  const [tab, setTab] = useStateV2(initialTab);
  const label = `05 Customer · ${TABS_V2[initialTab]}`;
  return (
    <div className="ac-screen" data-screen-label={label}>
      <SidebarV2 active="clients"/>
      <div className="ac-main">
        <Topbar crumbs={['Clients','Kathy Kettlewell', TABS_V2[tab]]}/>
        <div className="ac-content">
          <div className="ac-cust-header">
            <div className="ac-cust-avatar">KK</div>
            <div className="ac-cust-meta">
              <div className="name">Kathy Kettlewell</div>
              <div className="sub">
                <span><Pill kind="completed nodot">Active</Pill></span>
                <span className="sep">·</span>
                <span>Responsible Party: <a href="#">Kathy Kettlewell</a></span>
                <span className="sep">·</span>
                <span><Icon name="phone" size={12}/> 9163749976</span>
                <span className="sep">·</span>
                <span>West Sacramento, CA · Zone SMF</span>
              </div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="ac-btn secondary"><Icon name="calendar" size={12}/> Appointment</button>
              <button className="ac-btn primary"><Icon name="plus" size={12}/> Linked customer</button>
            </div>
          </div>

          <div className="ac-card">
            <div className="ac-tabs">
              {TABS_V2.map((t, i) => (
                <div key={t} className={`ac-tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
              ))}
            </div>
            {tab === 0 && <ProfileTabV2/>}
            {tab === 1 && <CareTabV2/>}
            {tab === 2 && <ScheduleTabV2/>}
            {tab === 3 && <DeviceTabV2/>}
            {tab === 4 && <BillingTabV2/>}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectHeadV2 = ({ label, accent='var(--ac-orange-500)', action }) => (
  <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
    <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
      <span style={{width:3, height:12, background:accent, borderRadius:2}}/>
      {label}
    </div>
    {action && <div style={{marginLeft:'auto'}}>{action}</div>}
  </div>
);

const Row = ({ k, v, empty }) => (
  <div className="ac-detail-row">
    <div className="key">{k}</div>
    <div className={`val ${empty?'empty':''}`}>{v || '—'}</div>
    <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={12}/></button>
  </div>
);

// Profile merges Service Recipient + Responsible Party (2-col layout)
const ProfileTabV2 = () => (
  <div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid var(--ac-border)'}}>
      <div style={{borderRight:'1px solid var(--ac-border)'}}>
        <SectHeadV2 label="Service Recipient"/>
        <Row k="Full Name" v="Kathy Kettlewell"/>
        <Row k="Date of Birth" v="01/01/1955 · 71"/>
        <Row k="Gender" v="Female"/>
        <Row k="Landline" v="9163749976"/>
        <Row k="SMS Notifications" v="Enabled"/>
        <Row k="Address" v="552 Glide Ct, West Sacramento, CA 95691"/>
        <Row k="Service Zone" v="SMF"/>
        <Row k="Pets On Location" v="No pets"/>
      </div>
      <div>
        <SectHeadV2 label="Responsible Party" accent="var(--ac-blue-500)"/>
        <Row k="Full Name" v="Kathy Kettlewell (self)"/>
        <Row k="Phone" v="9163749976"/>
        <Row k="Email" v="mayohead@yahoo.com"/>
        <Row k="Relationship" empty v=""/>
        <Row k="Entity Name" empty v=""/>
        <Row k="Billing Code" empty v=""/>
        <div style={{padding:'14px 18px'}}>
          <button className="ac-btn secondary sm"><Icon name="plus" size={12}/> Add additional contact</button>
        </div>
      </div>
    </div>
    <SectHeadV2 label="Notes"/>
    <div style={{padding:'14px 18px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div>
        <div style={{fontSize:10.5, fontWeight:700, color:'var(--ac-navy-500)', textTransform:'uppercase', letterSpacing:0.5, marginBottom:6}}>Customer-Facing</div>
        <div style={{fontSize:12.5, color:'var(--ac-navy-800)', lineHeight:1.55, padding:12, background:'var(--ac-navy-50)', borderRadius:8, border:'1px solid var(--ac-border)'}}>Map will take you to the storage facility — go out and up to court, last house on the left. Needs sweeping and mopping, prefer female caregiver.</div>
      </div>
      <div>
        <div style={{fontSize:10.5, fontWeight:700, color:'var(--ac-orange-600)', textTransform:'uppercase', letterSpacing:0.5, marginBottom:6}}>Internal</div>
        <div style={{fontSize:12.5, color:'var(--ac-navy-800)', lineHeight:1.55, padding:12, background:'var(--ac-orange-50)', borderRadius:8, border:'1px solid var(--ac-orange-300)'}}>No Diana. Prefers female caregiver, uses a walker, not comfortable giving weight info. Will use her car for transport.</div>
      </div>
    </div>
  </div>
);

// Care merges Care Plan + Provider Preferences + Subscription
const CareTabV2 = () => (
  <div>
    <SectHeadV2 label="Subscription & Plan"/>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
      <div style={{borderRight:'1px solid var(--ac-border)'}}>
        <Row k="Service Plan" empty v=""/>
        <Row k="Primary Diagnosis" empty v=""/>
        <Row k="Service Start" empty v=""/>
      </div>
      <div>
        <Row k="Weekly Hours" v="25 hrs"/>
        <Row k="Language" empty v=""/>
        <Row k="Weight (kg)" v="Not disclosed"/>
      </div>
    </div>

    <SectHeadV2 label="LTC Assessment (ADL)"/>
    <div style={{padding:'14px 18px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
      {[
        ['Bathing','Assist'],['Dressing','Independent'],['Toileting','Assist'],['Eating','Independent'],
        ['Transferring','Assist'],['Walking','Walker'],['In/Out Bed','Assist'],['Services','Homemaking'],
      ].map(([k,v],i) => (
        <div key={i} style={{padding:10, border:'1px solid var(--ac-border)', borderRadius:8, background:'#fff'}}>
          <div style={{fontSize:10, fontWeight:700, color:'var(--ac-navy-500)', textTransform:'uppercase', letterSpacing:0.4}}>{k}</div>
          <div style={{fontSize:13, fontWeight:600, color:'var(--ac-navy-800)', marginTop:2}}>{v}</div>
        </div>
      ))}
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid var(--ac-border)'}}>
      <div style={{borderRight:'1px solid var(--ac-border)'}}>
        <SectHeadV2 label="Preferred Providers" accent="var(--ac-green-600)" action={<button className="ac-btn primary sm"><Icon name="plus" size={12}/> Add</button>}/>
        <div style={{padding:'10px 18px', display:'flex', flexDirection:'column', gap:6}}>
          <span style={{fontSize:11.5, color:'var(--ac-navy-500)'}}>Assign only preferred: <strong style={{color:'var(--ac-navy-800)'}}>No</strong></span>
          <div className="ac-empty" style={{padding:20}}>
            <div className="ac-empty-icon" style={{fontSize:16}}>♡</div>No preferred providers yet
          </div>
        </div>
      </div>
      <div>
        <SectHeadV2 label="Blocked Providers" accent="var(--ac-red-500)" action={<button className="ac-btn secondary sm"><Icon name="plus" size={12}/> Block</button>}/>
        <table className="ac-table">
          <tbody>
            {[['Robin','Hayes'],['Diana','El Sourani'],['Cecilia','Velasco']].map((r,i)=> (
              <tr key={i}>
                <td><div className="name-cell"><Avatar name={`${r[0]} ${r[1]}`} variant={i}/>{r[0]} {r[1]}</div></td>
                <td style={{textAlign:'right'}}><button className="ac-icon-btn danger" title="Remove"><Icon name="trash" size={12}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Schedule merges Recurring + Scheduled
const ScheduleTabV2 = () => (
  <div>
    <SectHeadV2 label="Recurring Schedules" action={<button className="ac-btn primary sm"><Icon name="plus" size={12}/> New recurring</button>}/>
    <table className="ac-table">
      <thead><tr><th>Start Date</th><th>Time</th><th>Status</th><th>Duration</th><th>Frequency</th><th style={{textAlign:'right'}}></th></tr></thead>
      <tbody>
        <tr>
          <td className="mono">01/23/2026</td>
          <td className="mono">07:00</td>
          <td><Pill kind="completed nodot">Active</Pill></td>
          <td>300 min</td>
          <td>Weekly · Mon/Wed/Fri</td>
          <td style={{textAlign:'right'}}>
            <button className="ac-icon-btn" title="View"><Icon name="eye" size={12}/></button>{' '}
            <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={12}/></button>
          </td>
        </tr>
      </tbody>
    </table>
    <SectHeadV2 label="Upcoming Appointments" accent="var(--ac-blue-500)" action={
      <div style={{display:'flex', gap:8}}>
        <div className="ac-date-field"><label>Range</label><input defaultValue="23/04 – 30/04" style={{width:150}}/></div>
        <button className="ac-btn secondary sm">+7 Days</button>
      </div>
    }/>
    <table className="ac-table">
      <thead><tr><th>Date</th><th>Start</th><th>Provider</th><th>Status</th><th style={{textAlign:'right'}}></th></tr></thead>
      <tbody>
        {[
          ['04/24/2026','07:00','Nathaniel Luu','cancelled'],
          ['04/24/2026','07:00','Nathaniel Luu','assigned'],
          ['04/25/2026','07:00','Nathaniel Luu','assigned'],
          ['04/27/2026','07:00','Nathaniel Luu','assigned'],
          ['04/28/2026','07:00','Nathaniel Luu','assigned'],
        ].map((r,i)=>(
          <tr key={i}>
            <td className="mono">{r[0]}</td>
            <td className="mono">{r[1]}</td>
            <td>{r[2]}</td>
            <td><Pill kind={r[3]}>{r[3]==='cancelled'?'Cancelled':r[3]}</Pill></td>
            <td style={{textAlign:'right'}}><button className="ac-icon-btn" title="View"><Icon name="eye" size={12}/></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DeviceTabV2 = () => (
  <div>
    <SectHeadV2 label="Mobile App" action={<button className="ac-btn secondary sm">Disable</button>}/>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
      <div style={{borderRight:'1px solid var(--ac-border)'}}>
        {['App Version','Device Model','Operating System'].map(k => <Row key={k} k={k} empty v=""/>)}
      </div>
      <div>
        {['Device Language','Push Notifications','Location Permission'].map(k => <Row key={k} k={k} empty v=""/>)}
      </div>
    </div>
    <SectHeadV2 label="Invite Code" accent="var(--ac-blue-500)" action={<button className="ac-icon-btn" title="Regenerate">⟳</button>}/>
    <Row k="Invite Code" v={<span className="mono" style={{background:'var(--ac-navy-50)', padding:'3px 8px', borderRadius:5, border:'1px solid var(--ac-border)'}}>31579471</span>}/>
    <Row k="Expiry" v="07/30/2026"/>
    <Row k="Redeemed" v={<Pill kind="completed nodot">Yes</Pill>}/>
  </div>
);

// Billing merges Payment + Documents
const BillingTabV2 = () => (
  <div>
    <SectHeadV2 label="Payment Method" action={<button className="ac-btn primary sm"><Icon name="plus" size={12}/> Add method</button>}/>
    <div style={{padding:18}}>
      <div style={{padding:16, borderRadius:10, background:'linear-gradient(135deg, #1A365C 0%, #2D4A6F 100%)', color:'#fff', maxWidth:380, boxShadow:'0 6px 20px rgba(26,54,92,0.2)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:0.6, textTransform:'uppercase', opacity:0.7}}>Card on File</div>
          <Icon name="card" size={20}/>
        </div>
        <div className="mono" style={{fontSize:18, letterSpacing:3, marginTop:20, fontWeight:600}}>•••• •••• •••• 3393</div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:16, fontSize:10.5, fontWeight:600, opacity:0.85}}>
          <div><div style={{opacity:0.6, marginBottom:2}}>TYPE</div>Visa</div>
          <div><div style={{opacity:0.6, marginBottom:2}}>STATUS</div>Primary</div>
        </div>
      </div>
    </div>
    <SectHeadV2 label="Documents" accent="var(--ac-blue-500)" action={<button className="ac-btn secondary sm"><Icon name="upload" size={12}/> Upload</button>}/>
    <div style={{padding:'14px 18px'}}>
      {[
        ['onsite-visit-mar-11-2026.pdf','Rosalba onsite visit','3/11/26'],
        ['Care_Plan_Ta_Oanh_2026-01-20.pdf','Draft Care plan','1/20/26'],
        ['CalPERS Billing Alignment.pdf','CalPERS coverage details','1/6/26'],
      ].map((d,i) => (
        <div key={i} className="ac-doc">
          <div className="ficon">PDF</div>
          <div>
            <div className="fname">{d[0]}</div>
            <div className="fdesc">{d[1]}</div>
          </div>
          <div className="fdate">{d[2]}</div>
          <div style={{display:'flex', gap:6}}>
            <button className="ac-icon-btn" title="View"><Icon name="eye" size={12}/></button>
            <button className="ac-icon-btn" title="Download"><Icon name="download" size={12}/></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { SidebarV2, TodayView, AppointmentsV2, CustomerDetailV2 });
