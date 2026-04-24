/* global React, Sidebar, Topbar, Pill, Pagination, CardHead, FilterInput, Avatar, Icon */

// ======================= CLIENTS LIST =======================
const ClientsList = () => (
  <div className="ac-screen" data-screen-label="06 Clients List">
    <Sidebar activeParent="clients" activeChild="list-clients"/>
    <div className="ac-main">
      <Topbar crumbs={['Clients','List']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Clients</div>
            <div className="ac-page-sub">1,234 active care recipients</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="ac-btn secondary"><Icon name="download"/> Export CSV</button>
            <button className="ac-btn primary"><Icon name="plus"/> Add client</button>
          </div>
        </div>
        <div className="ac-card">
          <CardHead title="Customer List" count="1,234" actions={
            <select style={{padding:'5px 24px 5px 10px', border:'1px solid var(--ac-border-strong)', borderRadius:6, fontSize:11.5, fontFamily:'inherit', appearance:'none', background:'#fff url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5"><path d="M1 1l3 3 3-3" stroke="%234A5F7F" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>\') no-repeat right 8px center'}}>
              <option>Active</option><option>Inactive</option><option>All</option>
            </select>
          }/>
          <FilterInput placeholder="Filter by name, phone, address…"/>
          <table className="ac-table">
            <thead><tr>
              <th>Customer</th><th>Responsible Party</th><th>Email</th><th>Phone</th><th>Address</th><th>Group</th><th>Zone</th><th>Status</th>
            </tr></thead>
            <tbody>
              {[
                ['Robert(jim)','Edwards','Stan lee(tani)','Edwards','tan1944@gmail.com','9163749976','5387 Hale Ct','Group1','SMF'],
                ['Kathy','Kettlewell','Kathy','Kettlewell','mayohead@yahoo.com','9163749976','552 Glide Ct, West Sacramento, CA','Group1','SMF'],
                ['William','Schmechel','Elizabeth','Ward','elizabethtaward@gmail.com','3077608038','2705 San Marcos Dr, Rocklin, CA','Group1','SMF'],
                ['Helen','Chow','Christine','Kuratomi','chowcrchard@yahoo.com','','6232 Eureka Rd','Group1','SMF'],
                ['Lenore','Donovan','Carol','Sanchez','sanchez-carol@att.net','','108 Terrazo Ct','Group1','SMF'],
                ['Win','Whitehead','Gerry','Sloan','gsloan33@yahoo.com','9164345445','2155 Hidden Hills Ln, Lincoln, CA','Group1','SMF'],
                ['Beatrice','Reffs','Julie','Thernka','jewels.marie01@gmail.com','9169955290','9525 Castle Ln, Newcastle, CA','Group1','SMF'],
                ['Donna','Barricklow','Donna','Barricklow','dbarrc901@comcast.net','','6713 Judictine Dr','Group1','SMF'],
                ['Patricia','Davis','Patrick','Richards','prichards84@yahoo.com','','2221 Wingfield Way','Group1','SMF'],
                ['Sonia','Bailey','Julie & Dennis','Pearson','dennis.k.pearson@gmail.com','','Apt #C-176, 5200 Arden Way','Group1','SMF'],
              ].map((r,i) => (
                <tr key={i}>
                  <td>
                    <div className="name-cell">
                      <Avatar name={`${r[0]} ${r[1]}`} variant={i}/>
                      <div>
                        <div style={{fontWeight:600}}>{r[0]} {r[1]}</div>
                      </div>
                    </div>
                  </td>
                  <td>{r[2]} {r[3]}</td>
                  <td className="muted">{r[4]}</td>
                  <td className="mono muted">{r[5] || '—'}</td>
                  <td className="muted" style={{maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r[6]}</td>
                  <td><span className="ac-chip">{r[7]}</span></td>
                  <td><span className="ac-chip">{r[8]}</span></td>
                  <td><Pill kind="completed nodot">Active</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination range="1 – 10 of 1,234"/>
        </div>
      </div>
    </div>
  </div>
);

// ======================= ADD CLIENT =======================
const AddClient = () => (
  <div className="ac-screen" data-screen-label="07 Add Client">
    <Sidebar activeParent="clients" activeChild="add-client"/>
    <div className="ac-main">
      <Topbar crumbs={['Clients','Add Client']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Create customer</div>
            <div className="ac-page-sub">Collect recipient, responsible party and billing details</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="ac-btn secondary">Cancel</button>
            <button className="ac-btn primary"><Icon name="check"/> Save client</button>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 280px', gap:16, alignItems:'start'}}>
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            <div className="ac-card">
              <CardHead title="Care Recipient"/>
              <div className="ac-form-grid">
                <div className="ac-field"><label>First Name <span className="req">*</span></label><input placeholder="Jane"/></div>
                <div className="ac-field"><label>Last Name <span className="req">*</span></label><input placeholder="Doe"/></div>
                <div className="ac-field full"><label>Address <span className="req">*</span></label><input placeholder="Street, City, State, ZIP"/></div>
                <div className="ac-field"><label>Email <span className="req">*</span></label><input placeholder="jane@example.com"/></div>
                <div className="ac-field"><label>Phone Number <span className="req">*</span></label><input placeholder="(555) 000-0000"/></div>
                <div className="ac-field"><label>Landline</label><input placeholder="Optional"/></div>
                <div className="ac-field"><label>Date of Birth</label><input placeholder="MM / DD / YYYY"/></div>
                <div className="ac-field"><label>Gender <span className="req">*</span></label>
                  <select><option>Select…</option><option>Female</option><option>Male</option><option>Non-binary</option></select>
                </div>
                <div className="ac-field"><label>Weight (kg)</label><input placeholder="e.g. 72"/></div>
                <div className="ac-field"><label>Language</label><input placeholder="English"/></div>
                <div className="ac-field full"><label>Pets on Location</label>
                  <select><option>None</option><option>Dog (friendly)</option><option>Cat</option><option>Other</option></select>
                </div>
              </div>
            </div>

            <div className="ac-card">
              <CardHead title="Responsible Party"/>
              <div className="ac-form-grid">
                <div className="ac-field"><label>First Name</label><input/></div>
                <div className="ac-field"><label>Last Name</label><input/></div>
                <div className="ac-field"><label>Phone Number</label><input/></div>
                <div className="ac-field"><label>Landline</label><input/></div>
                <div className="ac-field"><label>Relationship</label>
                  <select><option>Select…</option><option>Spouse</option><option>Child</option><option>Other</option></select>
                </div>
                <div className="ac-field"><label>Entity Name</label><input placeholder="If company-paid"/></div>
                <div className="ac-field full"><label>Tax ID</label><input placeholder="EIN / SSN"/></div>
              </div>
            </div>
          </div>

          {/* Side: progress & tips */}
          <div style={{display:'flex', flexDirection:'column', gap:12, position:'sticky', top:0}}>
            <div className="ac-card">
              <div style={{padding:16}}>
                <div style={{fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:'var(--ac-navy-500)', marginBottom:10}}>Progress</div>
                {[
                  ['Recipient details', true, 8, 11],
                  ['Responsible party', false, 0, 7],
                  ['Care plan', false, 0, 5],
                  ['Billing', false, 0, 4],
                ].map((s,i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom: i<3?'1px solid var(--ac-border)':'none'}}>
                    <div style={{width:22, height:22, borderRadius:'50%', background: s[1]?'var(--ac-orange-500)':'var(--ac-navy-100)', color: s[1]?'#fff':'var(--ac-navy-500)', display:'grid', placeItems:'center', fontSize:10, fontWeight:700}}>
                      {s[1] ? '•' : i+1}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12, fontWeight:600, color:'var(--ac-navy-800)'}}>{s[0]}</div>
                      <div style={{fontSize:10.5, color:'var(--ac-navy-500)'}}>{s[2]} of {s[3]} fields</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ac-card" style={{background:'linear-gradient(135deg, #FFF9F0, #FFF3E8)', borderColor:'var(--ac-orange-300)'}}>
              <div style={{padding:14}}>
                <div style={{fontSize:11, fontWeight:700, color:'var(--ac-orange-700)', textTransform:'uppercase', letterSpacing:0.5, marginBottom:6}}>Tip</div>
                <div style={{fontSize:11.5, color:'var(--ac-navy-700)', lineHeight:1.5}}>
                  Required fields are marked with an orange asterisk. You can save a draft any time and complete billing later.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ======================= PROVIDERS =======================
const ProvidersList = () => (
  <div className="ac-screen" data-screen-label="08 Providers">
    <Sidebar activeParent="providers" activeChild="list-providers"/>
    <div className="ac-main">
      <Topbar crumbs={['Providers','List']}/>
      <div className="ac-content">
        <div className="ac-page-head">
          <div>
            <div className="ac-page-title">Providers</div>
            <div className="ac-page-sub">46 active caregivers · drag to reorder dispatch priority</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="ac-btn secondary">Reset order</button>
            <button className="ac-btn navy"><Icon name="check"/> Save order</button>
            <button className="ac-btn primary"><Icon name="plus"/> Add provider</button>
          </div>
        </div>
        <div className="ac-card">
          <CardHead title="Provider List" count="46"/>
          <FilterInput placeholder="Filter by name, emp ID, address…"/>
          <table className="ac-table">
            <thead><tr>
              <th>Emp</th><th>Provider</th><th>Address</th><th>Phone</th><th>Email</th><th>Group</th><th>Zone</th><th>Status</th><th style={{textAlign:'right'}}>Order</th>
            </tr></thead>
            <tbody>
              {[
                ['298','Berthe Dadi Kouadio','150 Lincoln Blvd 104 143, Lincoln, CA 95648','9453409972','berthedad.313@gmail.com','Group1','SMF'],
                ['308','Valentin Amastia','1290 Hillwood Loop, Lincoln, CA 95648','9163164080','valentinamastia@gmail.com','Group1','SMF'],
                ['306','Sabria McClelland','12683 Patagonian Wy, Rancho Cordova, CA 95742','9169800238','sabriamcclelland@gmail.com','Group1','SMF'],
                ['301','Jacinta Kinyua','10365 Doyle Way, Rancho Cordova, CA 95670','9168077647','jacintak850@gmail.com','Group1','SMF'],
                ['307','Diana Brent','3645 Rollins Way, Antelope, CA 95843','9163456151','diana.brent@gmail.com','Group1','SMF'],
                ['311','Melissa Latimer','3250 Laurelhurst Dr apt 112, Rancho Cordova, CA 95670','9165823974','melandclare@gmail.com','Group1','SMF'],
                ['312','Debra Garcia','6749 Alamar Way, Elk Grove, CA 95758, USA','6198385202','hwabits777@yahoo.com','Group1','SMF'],
                ['310','Kimleang Seng','8361 Franklin Blvd, Sacramento, CA 95823','5105851842','kimleangseng1@gmail.com','Group1','SMF'],
                ['309','Nathaniel Luu','5984 Silver Shadow Cir, Sacramento, CA 95823','7814888108','nathanielvluu@gmail.com','Group1','SMF'],
                ['221','Cecilia Velasco','8058 Aztec Way, Antelope, CA 95843','9165885580','cici.velasco@yahoo.com','Group1','SMF'],
              ].map((r,i) => (
                <tr key={i}>
                  <td className="mono muted">#{r[0]}</td>
                  <td><div className="name-cell"><Avatar name={r[1]} variant={i}/><div><div style={{fontWeight:600}}>{r[1]}</div></div></div></td>
                  <td className="muted" style={{maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r[2]}</td>
                  <td className="mono muted">{r[3]}</td>
                  <td className="muted">{r[4]}</td>
                  <td><span className="ac-chip">{r[5]}</span></td>
                  <td><span className="ac-chip">{r[6]}</span></td>
                  <td><Pill kind="completed nodot">Active</Pill></td>
                  <td style={{textAlign:'right'}}>
                    <button className="ac-icon-btn" title="Move up">↑</button>{' '}
                    <button className="ac-icon-btn" title="Move down">↓</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination range="1 – 10 of 46"/>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ClientsList, AddClient, ProvidersList });
