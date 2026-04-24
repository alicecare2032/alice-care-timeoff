/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon */

// ======================= OPS VIEW =======================
const OpsView = () => (
  <div className="ac-screen" data-screen-label="01 Ops View">
    <Sidebar activeParent="home" activeChild="ops"/>
    <div className="ac-main">
      <Topbar crumbs={['Home', 'Ops View']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Operations View</div>
            <div className="ac-page-sub">Live signal on today's field operations — Sacramento Metro zone</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="ac-btn secondary"><Icon name="download"/> Export</button>
            <button className="ac-btn primary"><Icon name="plus"/> New appointment</button>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:16}}>
          {[
            {label:'Delayed', value:'4', sub:'Needs triage', kind:'red'},
            {label:'Provider Cancellations', value:'4', sub:'Today', kind:'red'},
            {label:'Unassigned', value:'1', sub:'Awaiting dispatch', kind:'amber'},
            {label:'In Progress', value:'6', sub:'Currently on visit', kind:'blue'},
            {label:'Completed Today', value:'62', sub:'of 84 total', kind:'green'},
          ].map((s,i) => (
            <div key={i} className={`ac-stat ${s.kind}`}>
              <div className="ac-stat-label">{s.label}</div>
              <div className="ac-stat-value">{s.value}</div>
              <div className="ac-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16, alignItems:'start'}}>
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            {/* Delayed */}
            <div className="ac-card">
              <CardHead title="Delayed Appointments" count="0" actions={
                <button className="ac-btn secondary sm"><Icon name="filter" size={12}/> Filters</button>
              }/>
              <FilterInput/>
              <div className="ac-empty">
                <div className="ac-empty-icon">✓</div>
                No delays right now. Nice work.
              </div>
            </div>

            {/* Provider cancellations */}
            <div className="ac-card">
              <CardHead title="Provider Cancellations" count="4" countKind="crit"/>
              <FilterInput/>
              <table className="ac-table">
                <thead><tr>
                  <th></th><th>Date</th><th>Time</th><th>Client</th><th>Provider</th><th>Reason</th><th style={{textAlign:'right'}}>Actions</th>
                </tr></thead>
                <tbody>
                  {[
                    ['2026-05-16','09:30','Mary Clark','Carmen Johnston','Sick leave'],
                    ['2026-05-09','09:30','Mary Clark','Carmen Johnston','Personal'],
                    ['2026-05-02','09:30','Mary Clark','Carmen Johnston','Car trouble'],
                    ['2026-04-30','09:30','Mary Clark','Carmen Johnston','Sick leave'],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td><Pill kind="cancelled nodot">Cancelled</Pill></td>
                      <td className="mono">{r[0]}</td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i}/>{r[2]}</div></td>
                      <td>{r[3]}</td>
                      <td className="muted">{r[4]}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="ac-icon-btn" title="View"><Icon name="eye" size={13}/></button>{' '}
                        <button className="ac-icon-btn orange" title="Call back"><Icon name="phone" size={13}/></button>{' '}
                        <button className="ac-icon-btn" title="Reassign"><Icon name="users" size={13}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination range="1 – 4 of 4"/>
            </div>

            {/* Unassigned */}
            <div className="ac-card">
              <CardHead title="Unassigned Appointments" count="1" countKind="warn"/>
              <FilterInput/>
              <table className="ac-table">
                <thead><tr><th>Date</th><th>Time</th><th>Client</th><th>Service</th><th>Provider</th><th style={{textAlign:'right'}}>Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td className="mono">04/23/2026</td>
                    <td className="mono">22:00</td>
                    <td><div className="name-cell"><Avatar name="Mary Clark" variant={0}/>Mary Clark</div></td>
                    <td>Overnight companion</td>
                    <td><Pill kind="unassigned">Unassigned</Pill></td>
                    <td style={{textAlign:'right'}}>
                      <button className="ac-btn primary sm">Assign now</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination range="1 – 1 of 1"/>
            </div>

            {/* In progress */}
            <div className="ac-card">
              <CardHead title="Appointments In Progress" count="6" countKind="ok"/>
              <FilterInput/>
              <table className="ac-table">
                <thead><tr><th>Date</th><th>Time</th><th>Client</th><th>Provider</th><th>Status</th><th style={{textAlign:'right'}}>Started</th></tr></thead>
                <tbody>
                  {[
                    ['04/23/2026','08:00','Deborah Johnson','Virginia Cline','arrived','2h 14m'],
                    ['04/23/2026','10:00','Helen Watkins','Jeddalyn Reyes','arrived','14m'],
                    ['04/23/2026','10:30','Earl Clark','Kimleang Seng','arrived','8m'],
                    ['04/23/2026','13:15','Nancy Morrow','Olivia Ramirez','arrived','—'],
                    ['04/23/2026','13:00','Annette Morehouse','Carmen Johnston','arrived','—'],
                    ['04/23/2026','14:00','Pamela Carter','Geoffrey Carter','arrived','—'],
                  ].map((r,i) => (
                    <tr key={i}>
                      <td className="mono">{r[0]}</td>
                      <td className="mono">{r[1]}</td>
                      <td><div className="name-cell"><Avatar name={r[2]} variant={i+1}/>{r[2]}</div></td>
                      <td>{r[3]}</td>
                      <td><Pill kind="arrived">{r[4]}</Pill></td>
                      <td style={{textAlign:'right'}} className="muted mono">{r[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination range="1 – 6 of 6"/>
            </div>
          </div>

          {/* Right: System events */}
          <SystemEventsPanel/>
        </div>
      </div>
    </div>
  </div>
);

// ======================= SYSTEM EVENTS PANEL =======================
const SystemEventsPanel = () => {
  const events = [
    ['info','15:27:30','UNASSIGNED','Reginald'],
    ['info','15:07:28','COMPLETED','Valentin Amastia · Lawrence'],
    ['info','15:00:04','ASSIGNED','Diana El Sourani · Genevieve'],
    ['info','14:58:24','COMPLETED','Sheila Crawford · Sandra'],
    ['info','14:46:05','ASSIGNED','Diana El Sourani · Genevieve'],
    ['info','14:46:19','ASSIGNED','Diana El Sourani · Genevieve'],
    ['info','14:44:36','ASSIGNED','Jeddalyn Reyes · Helen'],
    ['info','14:43:47','ASSIGNED','Jeddalyn Reyes · Helen'],
    ['info','14:41:47','ASSIGNED','Jeddalyn Reyes · Helen'],
    ['critical','14:27:06','COMPLETION DELAYED','Valentin Amastia · Lawrence'],
    ['info','14:23:05','ASSIGNED','Carmen Johnston · Grace'],
    ['critical','14:12:38','COMPLETION DELAYED','Valentin Amastia · Lawrence'],
    ['info','14:00:44','ARRIVED','Geoffrey Carter · Pamela'],
    ['info','14:00:25','ENROUTE','Geoffrey Carter · Pamela'],
    ['critical','13:57:09','ENROUTE DELAYED','Geoffrey Carter · Pamela'],
    ['critical','13:57:39','COMPLETION DELAYED','Valentin Amastia · Lawrence'],
    ['critical','13:42:38','COMPLETION DELAYED','Valentin Amastia · Lawrence'],
    ['info','13:20:57','COMPLETED','Rosalba Salas · patricia'],
    ['info','13:18:10','COMPLETED','Olivia Millhouse · Donna'],
    ['critical','13:12:38','COMPLETION DELAYED','Olivia Millhouse · Donna'],
  ];
  return (
    <div className="ac-card ac-events">
      <CardHead title="System Events" actions={
        <button className="ac-icon-btn" title="Settings"><Icon name="settings" size={13}/></button>
      }/>
      <FilterInput placeholder="Filter events…"/>
      <div className="ac-events-list">
        {events.map((e, i) => (
          <div key={i} className={`ac-event ${e[0]}`}>
            <div className="ac-event-head">
              <span className="ac-event-kind">{e[0]}</span>
              <span className="ac-event-time">04/23/2026 · {e[1]}</span>
            </div>
            <div className="ac-event-body">
              <span className="ac-event-verb">{e[2]}</span>
              <span className="ac-event-subj">{e[3]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { OpsView, SystemEventsPanel });
