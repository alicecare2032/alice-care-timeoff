/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon */

// ======================= SCHEDULED =======================
const Scheduled = () => (
  <div className="ac-screen" data-screen-label="04 Scheduled">
    <Sidebar activeParent="appointments" activeChild="scheduled"/>
    <div className="ac-main">
      <Topbar crumbs={['Appointments', 'Scheduled']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Scheduled Appointments</div>
            <div className="ac-page-sub">Week of 23 – 30 April 2026</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="ac-btn secondary"><Icon name="download"/> Export</button>
            <button className="ac-btn primary"><Icon name="plus"/> New appointment</button>
          </div>
        </div>

        <div className="ac-card">
          <div className="ac-sched-toolbar">
            <div className="ac-date-field">
              <label>Start date</label>
              <input defaultValue="23 / 04 / 2026"/>
            </div>
            <button className="ac-btn navy sm">Today</button>
            <div className="ac-date-field">
              <label>End date</label>
              <input defaultValue="30 / 04 / 2026"/>
            </div>
            <button className="ac-btn secondary sm">+7 Days</button>
            <button className="ac-btn primary sm">Go</button>
            <div style={{marginLeft:'auto'}}>
              <select className="ac-filter-select" style={{padding:'7px 28px 7px 10px', border:'1px solid var(--ac-border-strong)', borderRadius:7, fontSize:12, fontFamily:'inherit', appearance:'none', background:'#fff url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27 viewBox=%270 0 10 6%27><path d=%27M1 1l4 4 4-4%27 stroke=%27%234A5F7F%27 stroke-width=%271.5%27 fill=%27none%27 stroke-linecap=%27round%27/></svg>") no-repeat right 10px center'}}>
                <option>Status: All</option>
              </select>
            </div>
          </div>
          <FilterInput placeholder="Filter scheduled appointments…"/>
          <table className="ac-table">
            <thead><tr>
              <th>Date</th><th>Start</th><th>Customer</th><th>Provider</th><th>Delivery Status</th><th>Payment</th><th style={{textAlign:'right'}}></th>
            </tr></thead>
            <tbody>
              {[
                ['04/23/2026','07:00','Sharon Dennis','Randall Goins','completed','pending'],
                ['04/23/2026','07:00','Oanh Ta','Nathaniel Luu','cancelled','pending'],
                ['04/23/2026','08:30','Sandra Skaug','Sheila Crawford','completed','pending'],
                ['04/23/2026','08:30','patricia Jepsen','Rosalba Salas','completed','pending'],
                ['04/23/2026','08:00','Deborah Johnson','Virginia Cline','arrived','pending'],
                ['04/23/2026','08:30','Barbara Brincka','Cynthia Rosell','completed','pending'],
                ['04/23/2026','08:00','Nirmalaben Desai','Olivia Ramirez','completed','pending'],
                ['04/23/2026','09:30','Ronald Nesch','Unassigned','cancelled','pending'],
                ['04/23/2026','09:00','Mary Ann Miller','Lucia Diaz','completed','pending'],
                ['04/23/2026','09:00','Mary Clark','Carmen Johnston','completed','pending'],
              ].map((r,i) => (
                <tr key={i}>
                  <td className="mono">{r[0]}</td>
                  <td className="mono">{r[1]}</td>
                  <td><div className="name-cell"><Avatar name={r[2]} variant={i}/>{r[2]}</div></td>
                  <td>{r[3]}</td>
                  <td><Pill kind={r[4]}>{r[4]==='cancelled'?'Cancelled by '+(i%2?'customer':'provider'):r[4]}</Pill></td>
                  <td><Pill kind="pending">Pending</Pill></td>
                  <td style={{textAlign:'right'}}>
                    <button className="ac-icon-btn" title="View"><Icon name="eye" size={13}/></button>{' '}
                    <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={13}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination range="1 – 10 of 308"/>
        </div>
      </div>
    </div>
  </div>
);

// ======================= CALENDAR =======================
const CalendarView = () => {
  const days = ['Sun 19/04','Mon 20/04','Tue 21/04','Wed 22/04','Thu 23/04','Fri 24/04','Sat 25/04'];
  const hours = [];
  for (let h = 6; h <= 18; h++) hours.push(`${String(h).padStart(2,'0')}:00`);
  const events = [
    {day:0, h:2, dur:1, title:'CL: Grace', who:'SP: Diana', time:'08:00 – 09:00'},
    {day:0, h:3, dur:2, title:'CL: Ray', who:'SP: Diana', time:'09:00 – 11:00'},
    {day:0, h:6, dur:1.5, title:'CL: Alice', who:'SP: Diana', time:'12:30 – 14:00'},
    {day:1, h:2, dur:1, title:'CL: Nirmalaben', who:'SP: Diana', time:'08:00 – 09:00'},
    {day:1, h:7, dur:2, title:'CL: Ronald', who:'SP: Diana', time:'13:00 – 15:00'},
    {day:2, h:3.5, dur:1.5, title:'CL: Lucy', who:'SP: Diana', time:'09:30 – 11:00'},
    {day:2, h:7.8, dur:1, title:'CL: Prakash', who:'SP: Diana', time:'13:45 – 14:45'},
    {day:3, h:4, dur:2, title:'CL: Annie', who:'SP: Diana', time:'10:00 – 12:00'},
    {day:3, h:6.5, dur:1.5, title:'CL: Preton & Ray', who:'SP: Diana', time:'12:30 – 14:00'},
    {day:5, h:2, dur:1, title:'CL: Mary', who:'SP: Diana', time:'08:00 – 09:00'},
    {day:5, h:3.5, dur:1.5, title:'CL: Genevieve', who:'SP: Diana', time:'09:30 – 11:00'},
    {day:5, h:5, dur:3, title:'CL: Genevieve', who:'SP: Diana', time:'11:15 – 14:30'},
    {day:5, h:10, dur:1, title:'CL: Grace', who:'SP: Diana', time:'16:00 – 17:00'},
    {day:6, h:2, dur:0.8, title:'CL: Sharon', who:'SP: Diana', time:'08:00 – 08:50'},
    {day:6, h:3, dur:1, title:'CL: Grace', who:'SP: Diana', time:'09:30 – 10:30'},
    {day:6, h:7, dur:1, title:'CL: Alice', who:'SP: CANCELLED', time:'13:30 – 14:30', cancelled:true},
  ];
  const rowHeight = 30;

  return (
    <div className="ac-screen" data-screen-label="05 Calendar">
      <Sidebar activeParent="appointments" activeChild="calendar"/>
      <div className="ac-main">
        <Topbar crumbs={['Appointments','Calendar']}/>
        <div className="ac-content">
          <div className="ac-page-head">
            <div>
              <div className="ac-page-title">Calendar</div>
              <div className="ac-page-sub">Weekly schedule · all providers</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="ac-btn secondary sm"><Icon name="filter" size={12}/> Hide filters</button>
            </div>
          </div>

          <div className="ac-card" style={{marginBottom:16}}>
            <div style={{padding:'14px 18px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
              <div className="ac-field"><label>City</label><input placeholder="—"/></div>
              <div className="ac-field"><label>Service Type</label><input placeholder="—"/></div>
              <div className="ac-field"><label>Status</label><input placeholder="—"/></div>
              <div className="ac-field"><label>Care Recipient</label><input placeholder="—"/></div>
              <div className="ac-field">
                <label>Provider</label>
                <div style={{display:'flex', gap:6, flexWrap:'wrap', padding:'8px 10px', border:'1px solid var(--ac-border-strong)', borderRadius:7, minHeight:38, background:'#fff'}}>
                  <span className="ac-chip orange">Diana El Sourani ×</span>
                </div>
              </div>
              <div className="ac-field"><label>Responsible Party</label><input placeholder="—"/></div>
            </div>
            <div style={{padding:'10px 18px', display:'flex', gap:12, alignItems:'center', borderTop:'1px solid var(--ac-border)'}}>
              <div className="ac-seg">
                <button className="active">Match All</button>
                <button>Match Any</button>
              </div>
              <div style={{marginLeft:'auto', display:'flex', gap:8}}>
                <button className="ac-btn secondary sm">Clear</button>
                <button className="ac-btn primary sm"><Icon name="filter" size={12}/> Apply filters</button>
              </div>
            </div>
          </div>

          <div className="ac-cal">
            <div className="ac-cal-head">
              <button className="arrow">‹</button>
              <button className="arrow">›</button>
              <button className="today">Today</button>
              <div className="range" style={{marginLeft:10}}>19 – 25 Apr 2026</div>
              <div className="view-toggle">
                <button>Month</button>
                <button className="active">Week</button>
                <button>Day</button>
                <button>List</button>
              </div>
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
                  <div key={i}
                       className={`ac-cal-event ${e.cancelled?'cancelled':''}`}
                       style={{gridColumn:e.day+2, gridRow:`2 / span ${hours.length}`, top, height}}>
                    <strong>{e.title}, {e.who}</strong>
                    <span className="time">{e.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Scheduled, CalendarView });
