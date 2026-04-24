/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon */
const { useState: useStateCD } = React;

const DETAIL_TABS = [
  'Service Recipient','Responsible Party','Care Plan','Subscription Details',
  'Provider Preferences','Recurring Appointments','Scheduled Appointments',
  'Device Information','Payment Details','Customer Documents'
];

const CustomerDetail = ({ initialTab = 0, label }) => {
  const [tab, setTab] = useStateCD(initialTab);
  return (
    <div className="ac-screen" data-screen-label={label}>
      <Sidebar activeParent="clients" activeChild="list-clients"/>
      <div className="ac-main">
        <Topbar crumbs={['Clients','Kathy Kettlewell', DETAIL_TABS[tab]]}/>
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
                <span><Icon name="phone" size={12} style={{verticalAlign:'middle'}}/> 9163749976</span>
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
              {DETAIL_TABS.map((t, i) => (
                <div key={t} className={`ac-tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
              ))}
            </div>
            <DetailBody tab={tab}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailBody = ({ tab }) => {
  if (tab === 0) return <ServiceRecipientTab/>;
  if (tab === 1) return <ResponsiblePartyTab/>;
  if (tab === 2) return <CarePlanTab/>;
  if (tab === 4) return <ProviderPrefTab/>;
  if (tab === 5) return <RecurringTab/>;
  if (tab === 6) return <ScheduledApptTab/>;
  if (tab === 7) return <DeviceTab/>;
  if (tab === 8) return <PaymentTab/>;
  if (tab === 9) return <DocumentsTab/>;
  return <div className="ac-empty"><div className="ac-empty-icon">—</div>Subscription details will appear here.</div>;
};

const DetailRow = ({ k, v, empty }) => (
  <div className="ac-detail-row">
    <div className="key">{k}</div>
    <div className={`val ${empty?'empty':''}`}>{v || '—'}</div>
    <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={12}/></button>
  </div>
);

const ServiceRecipientTab = () => (
  <div>
    <SectionHead label="Service Recipient"/>
    <DetailRow k="First Name" v="Kathy"/>
    <DetailRow k="Last Name" v="Kettlewell"/>
    <DetailRow k="Landline Number" v="9163749976"/>
    <DetailRow k="Alt Phone Number" empty v=""/>
    <DetailRow k="SMS Notification Enabled" v="Yes"/>
    <DetailRow k="Gender" v="Female"/>
    <DetailRow k="Weight (kg)" v="0"/>
    <DetailRow k="Date Of Birth" v="01/01/1955"/>
    <DetailRow k="Language" empty v=""/>
    <DetailRow k="Address" v="552 Glide Ct, West Sacramento, CA 95691, USA"/>
    <DetailRow k="City" v="West Sacramento"/>
    <DetailRow k="Pets On Location" v="No Pets"/>
    <DetailRow k="Service Plan" empty v=""/>
    <DetailRow k="Service Zone" v="SMF"/>
    <DetailRow k="Zip Code" v="95691"/>
    <DetailRow k="Customer Notes" v="Map will take you to the storage facility — go out and up to court in your map, last house on the left. Needs sweeping and mopping, prefer female caregiver."/>
    <DetailRow k="Internal Notes" v="No Diana. Prefers female caregiver, uses a walker, not comfortable giving weight info. Will use her car for transport."/>
  </div>
);

const ResponsiblePartyTab = () => (
  <div>
    <SectionHead label="Responsible Party"/>
    <DetailRow k="First Name" v="Kathy"/>
    <DetailRow k="Last Name" v="Kettlewell"/>
    <DetailRow k="Responsible Party Number" v="9163749976"/>
    <DetailRow k="Alt Phone Number" empty v=""/>
    <DetailRow k="Email" v="mayohead@yahoo.com"/>
    <DetailRow k="Relationship" empty v=""/>
    <DetailRow k="Entity Name" empty v=""/>
    <DetailRow k="Billing Code" empty v=""/>
  </div>
);

const SectionHead = ({ label }) => (
  <div style={{padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, background:'var(--ac-navy-50)', display:'flex', alignItems:'center', gap:8}}>
    <span style={{width:3, height:12, background:'var(--ac-orange-500)', borderRadius:2}}/>
    {label}
  </div>
);

const CarePlanTab = () => (
  <div>
    <SectionHead label="Diagnosis"/>
    <DetailRow k="Primary Diagnosis" empty v=""/>
    <DetailRow k="Service Start Date" empty v=""/>
    <SectionHead label="LTC Assessment"/>
    {['Bathing / Showering','Dressing','Getting in or out of bed/chair','Walking','Using the toilet','Eating','Transferring','Services to be performed'].map(k => (
      <DetailRow key={k} k={k} empty v=""/>
    ))}
  </div>
);

const ProviderPrefTab = () => (
  <div>
    <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:3, height:12, background:'var(--ac-red-500)', borderRadius:2}}/>
        Blocked Providers
      </div>
      <button className="ac-btn secondary sm" style={{marginLeft:'auto'}}><Icon name="plus" size={12}/> Add exclusion</button>
    </div>
    <table className="ac-table">
      <thead><tr><th>Provider</th><th>Last Name</th><th style={{textAlign:'right'}}></th></tr></thead>
      <tbody>
        {[['Robin','Hayes'],['Diana','El Sourani'],['Cecilia','Velasco']].map((r,i)=> (
          <tr key={i}>
            <td><div className="name-cell"><Avatar name={`${r[0]} ${r[1]}`} variant={i}/>{r[0]}</div></td>
            <td>{r[1]}</td>
            <td style={{textAlign:'right'}}><button className="ac-icon-btn danger" title="Remove"><Icon name="trash" size={12}/></button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', borderTop:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:3, height:12, background:'var(--ac-green-600)', borderRadius:2}}/>
        Preferred Providers
      </div>
      <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:14}}>
        <span style={{fontSize:11.5, color:'var(--ac-navy-600)', fontWeight:600}}>Assign only preferred:</span>
        <div className="ac-radio"><span className="circle"/>Yes</div>
        <div className="ac-radio active"><span className="circle"/>No</div>
        <button className="ac-btn primary sm"><Icon name="plus" size={12}/> Add preferred</button>
      </div>
    </div>
    <div className="ac-empty"><div className="ac-empty-icon">♡</div>No preferred providers yet. Add one above.</div>
  </div>
);

const RecurringTab = () => (
  <div>
    <FilterInput placeholder="Filter recurring schedules…"/>
    <table className="ac-table">
      <thead><tr><th>Start Date</th><th>Start Time</th><th>Status</th><th>Service Duration</th><th>Frequency</th><th style={{textAlign:'right'}}></th></tr></thead>
      <tbody>
        <tr>
          <td className="mono">01/23/2026</td>
          <td className="mono">07:00</td>
          <td><Pill kind="completed nodot">Active</Pill></td>
          <td>300 min</td>
          <td>Weekly</td>
          <td style={{textAlign:'right'}}>
            <button className="ac-icon-btn" title="View"><Icon name="eye" size={12}/></button>{' '}
            <button className="ac-icon-btn" title="Edit"><Icon name="edit" size={12}/></button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination range="1 – 1 of 1"/>
  </div>
);

const ScheduledApptTab = () => (
  <div>
    <div className="ac-sched-toolbar">
      <div className="ac-date-field"><label>Start</label><input defaultValue="23 / 04 / 2026"/></div>
      <button className="ac-btn navy sm">Today</button>
      <div className="ac-date-field"><label>End</label><input defaultValue="30 / 04 / 2026"/></div>
      <button className="ac-btn secondary sm">+7 Days</button>
      <button className="ac-btn primary sm">Go</button>
    </div>
    <FilterInput placeholder="Filter…"/>
    <table className="ac-table">
      <thead><tr><th>Date</th><th>Start</th><th>First Name</th><th>Last Name</th><th>Provider</th><th>Status</th></tr></thead>
      <tbody>
        {[
          ['04/24/2026','07:00','Oanh','Ta','Nathaniel Luu','cancelled'],
          ['04/24/2026','07:00','Oanh','Ta','Nathaniel Luu','assigned'],
          ['04/25/2026','07:00','Oanh','Ta','Nathaniel Luu','assigned'],
          ['04/27/2026','07:00','Oanh','Ta','Nathaniel Luu','assigned'],
          ['04/28/2026','07:00','Oanh','Ta','Nathaniel Luu','assigned'],
        ].map((r,i)=>(
          <tr key={i}>
            <td className="mono">{r[0]}</td>
            <td className="mono">{r[1]}</td>
            <td>{r[2]}</td>
            <td>{r[3]}</td>
            <td>{r[4]}</td>
            <td><Pill kind={r[5]}>{r[5]==='cancelled'?'Cancelled by customer':r[5]}</Pill></td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination range="1 – 5 of 5"/>
  </div>
);

const DeviceTab = () => (
  <div>
    <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:3, height:12, background:'var(--ac-orange-500)', borderRadius:2}}/>
        Mobile App Details
      </div>
      <button className="ac-btn secondary sm" style={{marginLeft:'auto'}}>Disable</button>
    </div>
    {['App Version','Device Model','Operating System','Device Language','Push Notification','Location Permission'].map(k => (
      <DetailRow key={k} k={k} empty v=""/>
    ))}
    <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', borderTop:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:3, height:12, background:'var(--ac-blue-500)', borderRadius:2}}/>
        App Access Invite Code
      </div>
      <button className="ac-icon-btn" style={{marginLeft:'auto'}} title="Regenerate">⟳</button>
    </div>
    <DetailRow k="Invite Code" v={<span className="mono" style={{background:'var(--ac-navy-50)', padding:'3px 8px', borderRadius:5, border:'1px solid var(--ac-border)'}}>31579471</span>}/>
    <DetailRow k="Code Expiry Date" v="07/30/2026"/>
    <DetailRow k="Invite Redeemed" v={<Pill kind="completed nodot">True</Pill>}/>
  </div>
);

const PaymentTab = () => (
  <div>
    <div style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid var(--ac-border)', background:'var(--ac-navy-50)'}}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--ac-navy-800)', textTransform:'uppercase', letterSpacing:0.5, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:3, height:12, background:'var(--ac-orange-500)', borderRadius:2}}/>
        Payment Details
      </div>
      <button className="ac-btn primary sm" style={{marginLeft:'auto'}}><Icon name="plus" size={12}/> Add payment method</button>
    </div>
    <div style={{padding:18}}>
      <div style={{padding:16, border:'1px solid var(--ac-border)', borderRadius:10, background:'linear-gradient(135deg, #1A365C 0%, #2D4A6F 100%)', color:'#fff', maxWidth:380, boxShadow:'0 6px 20px rgba(26,54,92,0.2)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:0.6, textTransform:'uppercase', opacity:0.7}}>Credit Card on File</div>
          <Icon name="card" size={20}/>
        </div>
        <div className="mono" style={{fontSize:18, letterSpacing:3, marginTop:20, fontWeight:600}}>•••• •••• •••• 3393</div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:16, fontSize:10.5, fontWeight:600, opacity:0.8}}>
          <div>
            <div style={{opacity:0.6, marginBottom:2}}>CARD TYPE</div>
            <div>Visa</div>
          </div>
          <div>
            <div style={{opacity:0.6, marginBottom:2}}>STATUS</div>
            <div>Primary</div>
          </div>
          <button className="ac-icon-btn danger" title="Remove" style={{background:'rgba(255,255,255,0.1)', borderColor:'rgba(255,255,255,0.2)', color:'#fff'}}><Icon name="trash" size={12}/></button>
        </div>
      </div>
    </div>
  </div>
);

const DocumentsTab = () => (
  <div>
    <div style={{padding:18}}>
      <div className="ac-upload">
        <div className="u-icon"><Icon name="upload" size={18}/></div>
        <div className="u-text">
          <strong>Upload new document</strong>
          <div>PDF, DOCX, or image · max 20 MB per file</div>
        </div>
        <button className="ac-btn primary"><Icon name="plus" size={12}/> Select file</button>
      </div>
    </div>
    <div style={{padding:'0 18px'}}>
      <FilterInput placeholder="Filter documents…"/>
    </div>
    <div style={{padding:'4px 18px 18px'}}>
      {[
        ['onsite-visit-mar-11-2026.pdf','Rosalba onsite visit','3/11/26, 2:40 PM'],
        ['Care_Plan_Ta_Oanh_2026-01-20.pdf','Draft Care plan','1/20/26, 3:20 PM'],
        ['CalPERS Billing Alignment.pdf','CalPERS coverage details','1/6/26, 4:05 PM'],
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
            <button className="ac-icon-btn danger" title="Delete"><Icon name="trash" size={12}/></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { CustomerDetail });
