// ═══════════════ STATE ═══════════════
let produtos = JSON.parse(localStorage.getItem('farma_produtos')||'[]');
let funcionarios = JSON.parse(localStorage.getItem('farma_func')||'[]');
let entradasPend = JSON.parse(localStorage.getItem('farma_pend')||'[]');
let vendas = JSON.parse(localStorage.getItem('farma_vendas')||'[]');
let periodAtual = 'dia';
const META_MES = 30000;
 
function uid(){return '_'+Math.random().toString(36).substr(2,9);}
function save(){
  localStorage.setItem('farma_produtos',JSON.stringify(produtos));
  localStorage.setItem('farma_func',JSON.stringify(funcionarios));
  localStorage.setItem('farma_pend',JSON.stringify(entradasPend));
  localStorage.setItem('farma_vendas',JSON.stringify(vendas));
}
function hide(id){document.getElementById(id).style.display='none';}
function show(id){document.getElementById(id).style.display='flex';}
function fmtCPF(el){
  let v=el.value.replace(/\D/g,'').slice(0,11);
  if(v.length>9)v=v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6,9)+'-'+v.slice(9);
  else if(v.length>6)v=v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6);
  else if(v.length>3)v=v.slice(0,3)+'.'+v.slice(3);
  el.value=v;
}
function fmtMoeda(v){return'R$ '+v.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
 
// Demo data
if(!produtos.length){
  produtos=[
    {id:'p1',nome:'Dipirona Sódica 500mg',cat:'Analgésico',tipo:'Livre',preco:8.90,qty:50,min:15,fab:'EMS',val:'2026-06-01',cod:'7891234567890'},
    {id:'p2',nome:'Amoxicilina 500mg',cat:'Antibiótico',tipo:'Receita',preco:22.50,qty:8,min:20,fab:'Medley',val:'2025-12-01',cod:'7899876543210'},
    {id:'p3',nome:'Ibuprofeno 600mg',cat:'Anti-inflamatório',tipo:'Receita',preco:14.80,qty:4,min:10,fab:'Eurofarma',val:'2026-03-01',cod:'7895555555555'},
    {id:'p4',nome:'Vitamina C 1g',cat:'Vitamina',tipo:'Livre',preco:19.90,qty:30,min:10,fab:'Bayer',val:'2026-09-01',cod:'7893333333333'},
    {id:'p5',nome:'Omeprazol 20mg',cat:'Outro',tipo:'Livre',preco:12.50,qty:0,min:10,fab:'EMS',val:'2026-04-01',cod:'7896666666666'},
    {id:'p6',nome:'Paracetamol 750mg',cat:'Analgésico',tipo:'Livre',preco:7.20,qty:45,min:15,fab:'Medley',val:'2026-07-01',cod:'7897777777777'},
    {id:'p7',nome:'Ritalina 10mg',cat:'Controlado',tipo:'Controlado',preco:85.00,qty:5,min:5,fab:'Novartis',val:'2025-11-01',cod:'7891111111111'},
    {id:'p8',nome:'Loratadina 10mg',cat:'Outro',tipo:'Livre',preco:11.90,qty:22,min:8,fab:'EMS',val:'2026-08-01',cod:'7892222222222'},
  ];
}
if(!funcionarios.length){
  funcionarios=[
    {id:'f1',nome:'Ana Paula Souza',cpf:'123.456.789-00',nasc:'1990-05-12',tel:'(11)98765-4321',email:'ana@farma.com',cargo:'Farmacêutica',status:'Ativo',adm:'2019-03-01',sal:4800,turno:'Manhã',obs:'CRF/SP 12345',vendas:142,avatar:'AP',cor:'#3b8bff'},
    {id:'f2',nome:'Carlos Eduardo Lima',cpf:'987.654.321-00',nasc:'1995-08-22',tel:'(11)97654-3210',email:'carlos@farma.com',cargo:'Balconista',status:'Ativo',adm:'2021-06-15',sal:2200,turno:'Tarde',obs:'',vendas:98,avatar:'CE',cor:'#00e5b0'},
    {id:'f3',nome:'Fernanda Costa',cpf:'456.789.123-00',nasc:'1998-01-30',tel:'(11)96543-2109',email:'fer@farma.com',cargo:'Caixa',status:'Ativo',adm:'2022-02-10',sal:2000,turno:'Manhã',obs:'',vendas:215,avatar:'FC',cor:'#ffd166'},
    {id:'f4',nome:'Roberto Alves',cpf:'321.654.987-00',nasc:'1985-11-05',tel:'(11)95432-1098',email:'rob@farma.com',cargo:'Estoquista',status:'Férias',adm:'2020-09-20',sal:2100,turno:'Integral',obs:'Retorno: 30/04',vendas:0,avatar:'RA',cor:'#fb923c'},
    {id:'f5',nome:'Juliana Martins',cpf:'654.321.098-00',nasc:'1993-07-14',tel:'(11)94321-0987',email:'ju@farma.com',cargo:'Balconista',status:'Inativo',adm:'2018-01-08',sal:0,turno:'—',obs:'Encerrado 12/2024',vendas:67,avatar:'JM',cor:'#c084fc'},
  ];
}
 
// Gerar vendas demo se vazio
if(!vendas.length){
  const pags=['PIX','Dinheiro','Débito','Crédito'];
  const ops=['Carlos Eduardo Lima','Fernanda Costa','Ana Paula Souza'];
  const now=new Date();
  for(let d=0;d<365;d++){
    const dt=new Date(now); dt.setDate(dt.getDate()-d);
    const qd=Math.floor(Math.random()*8)+1;
    for(let q=0;q<qd;q++){
      const itens=Math.floor(Math.random()*4)+1;
      const total=parseFloat((Math.random()*280+20).toFixed(2));
      vendas.push({
        id:uid(),
        data:new Date(dt.getTime()-Math.random()*86400000).toISOString(),
        cliente:Math.random()>.4?['Maria Silva','João Pereira','Ana Lima','Pedro Costa'][Math.floor(Math.random()*4)]:'—',
        operador:ops[Math.floor(Math.random()*ops.length)],
        itens,pagamento:pags[Math.floor(Math.random()*pags.length)],
        desconto:Math.random()>.7?parseFloat((total*.1).toFixed(2)):0,
        total
      });
    }
  }
  save();
}
 
// Entradas pendentes demo
if(!entradasPend.length){
  entradasPend=[
    {id:'e1',prodId:'p2',prodNome:'Amoxicilina 500mg',qty:50,lote:'L2025-001',val:'2026-12-01',forn:'Distribuidora Central',nf:'NF-e 123456',obs:'',balconista:'Carlos Eduardo Lima',data:new Date().toISOString()},
    {id:'e2',prodId:'p3',prodNome:'Ibuprofeno 600mg',qty:30,lote:'L2025-002',val:'2026-06-01',forn:'FarmaDistrib',nf:'NF-e 123457',obs:'Chegou com embalagem ok',balconista:'Carlos Eduardo Lima',data:new Date(Date.now()-3600000).toISOString()},
    {id:'e3',prodId:'p5',prodNome:'Omeprazol 20mg',qty:100,lote:'L2025-003',val:'2026-09-01',forn:'Distribuidora Central',nf:'NF-e 123458',obs:'',balconista:'Ana Paula Souza',data:new Date(Date.now()-7200000).toISOString()},
  ];
  save();
}
 
// ═══════════════ CLOCK ═══════════════
function tick(){
  const n=new Date();
  document.getElementById('tb-clock').textContent=n.toLocaleTimeString('pt-BR');
  document.getElementById('tb-date').textContent=n.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});
}
setInterval(tick,1000);tick();
 
// ═══════════════ NAV ═══════════════
const phData={
  dashboard:['📊','Dashboard Gerencial','Visão consolidada da farmácia'],
  vendas:['💰','Relatório de Vendas','Análise por período'],
  estoque:['📦','Gestão de Estoque','Controle e aprovação de entradas'],
  equipe:['👥','Gestão de Equipe','Funcionários e desempenho'],
};
function ir(page,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  btn.classList.add('active');
  const [ico,tit,sub]=phData[page];
  document.getElementById('ph-ico').textContent=ico;
  document.getElementById('ph-title').textContent=tit;
  document.getElementById('ph-sub').textContent=sub;
  if(page==='dashboard')renderDashboard();
  if(page==='vendas')renderVendas();
  if(page==='estoque'){renderEstoque();renderPendentes();}
  if(page==='equipe'){renderEquipe();renderEqStats();}
}
 
// ═══════════════ HELPERS ═══════════════
function toast(msg,tipo='s'){
  const w=document.getElementById('toasts');
  const el=document.createElement('div');
  el.className=`toast ${tipo}`;
  const ico={s:'✅',e:'❌',i:'ℹ️'};
  el.innerHTML=`<span style="font-size:1.1rem">${ico[tipo]||'ℹ️'}</span><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(()=>el.remove(),3500);
}
 
function statusBadge(p){
  if(p.qty===0)return'<span class="badge b-out">SEM ESTOQUE</span>';
  if(p.qty<=p.min)return'<span class="badge b-low">BAIXO</span>';
  return'<span class="badge b-ok">OK</span>';
}
 
function cargoColor(cargo){
  const m={Gerente:'#c084fc',Farmacêutica:'#00e5b0',Farmacêutico:'#00e5b0',Balconista:'#3b8bff',Caixa:'#ffd166',Estoquista:'#fb923c',Auxiliar:'#6b7a99'};
  return m[cargo]||'#6b7a99';
}
function cargoBadge(c){
  const m={Gerente:'b-ger',Farmacêutica:'b-aprov',Farmacêutico:'b-aprov',Balconista:'b-balc',Caixa:'b-cx',Estoquista:'b-pend',Auxiliar:'b-inativo'};
  return`<span class="badge ${m[c]||'b-inativo'}">${c.toUpperCase()}</span>`;
}
 
// Filtrar vendas por período
function filtrarVendas(de,ate){
  return vendas.filter(v=>{
    const d=new Date(v.data);
    return d>=de && d<=ate;
  });
}
function periodoRange(p){
  const n=new Date();
  let de,ate=new Date(n.getFullYear(),n.getMonth(),n.getDate(),23,59,59);
  if(p==='dia'){de=new Date(n.getFullYear(),n.getMonth(),n.getDate());}
  else if(p==='semana'){de=new Date(n);de.setDate(de.getDate()-6);de.setHours(0,0,0);}
  else if(p==='mes'){de=new Date(n.getFullYear(),n.getMonth(),1);}
  else{de=new Date(n.getFullYear(),0,1);}
  return{de,ate};
}
 
// ═══════════════ DASHBOARD ═══════════════
function renderDashboard(){
  const{de:dH,ate:aH}=periodoRange('dia');
  const{de:dS,ate:aS}=periodoRange('semana');
  const{de:dM,ate:aM}=periodoRange('mes');
  const{de:dA,ate:aA}=periodoRange('ano');
 
  const vH=filtrarVendas(dH,aH),vS=filtrarVendas(dS,aS),vM=filtrarVendas(dM,aM),vA=filtrarVendas(dA,aA);
  const sum=arr=>arr.reduce((s,v)=>s+v.total,0);
 
  document.getElementById('sd-hoje').textContent=fmtMoeda(sum(vH));
  document.getElementById('sd-hoje-n').textContent=vH.length+' transações';
  document.getElementById('sd-sem').textContent=fmtMoeda(sum(vS));
  document.getElementById('sd-sem-n').textContent=vS.length+' transações';
  document.getElementById('sd-mes').textContent=fmtMoeda(sum(vM));
  document.getElementById('sd-ano').textContent=fmtMoeda(sum(vA));
 
  const pct=Math.min(100,Math.round(sum(vM)/META_MES*100));
  document.getElementById('sd-mes-pct').textContent=pct+'% da meta';
  document.getElementById('sd-mes-pct').className='sc-trend '+(pct>=80?'trend-up':'trend-dn');
 
  // Meta ring
  const circ=251,offset=circ-(pct/100*circ);
  document.getElementById('meta-circle').style.strokeDashoffset=offset;
  document.getElementById('meta-circle').style.stroke=pct>=100?'var(--success)':pct>=60?'var(--accent)':'var(--warn)';
  document.getElementById('meta-pct').textContent=pct+'%';
  document.getElementById('meta-real').textContent=fmtMoeda(sum(vM));
  document.getElementById('meta-falt').textContent=fmtMoeda(Math.max(0,META_MES-sum(vM)));
 
  // Chart 7 dias
  renderChart7dias();
 
  // Top produtos (simulado por vendas)
  const topData=[
    {nome:'Dipirona 500mg',v:Math.floor(Math.random()*200+100)},
    {nome:'Paracetamol 750mg',v:Math.floor(Math.random()*180+80)},
    {nome:'Loratadina 10mg',v:Math.floor(Math.random()*120+60)},
    {nome:'Vitamina C 1g',v:Math.floor(Math.random()*100+40)},
    {nome:'Omeprazol 20mg',v:Math.floor(Math.random()*80+30)},
  ];
  const maxT=Math.max(...topData.map(x=>x.v));
  document.getElementById('top-prods').innerHTML=topData.map(t=>`
    <div class="prog-item">
      <div class="prog-lbl" title="${t.nome}">${t.nome}</div>
      <div class="prog-bar"><div class="prog-fill" style="width:${Math.round(t.v/maxT*100)}%"></div></div>
      <div class="prog-val">${t.v} un</div>
    </div>
  `).join('');
 
  // Pendências no dash
  const dp=document.getElementById('dash-pend');
  document.getElementById('nb-pend').textContent=entradasPend.length;
  if(!entradasPend.length){dp.innerHTML='<div style="padding:20px;color:var(--muted2);font-size:.84rem;text-align:center">✅ Nenhuma pendência.</div>';return;}
  dp.innerHTML=entradasPend.slice(0,3).map(e=>`
    <div class="pend-item">
      <div class="pend-icon" style="background:rgba(255,209,102,.1)">📦</div>
      <div class="pend-info">
        <div class="pend-nome">${e.prodNome}</div>
        <div class="pend-det">${e.forn} • ${e.balconista} • ${new Date(e.data).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
      <div class="pend-qty">+${e.qty}</div>
      <div class="pend-btns">
        <button class="btn btn-xs btn-primary" onclick="aprovarEntrada('${e.id}')">✓</button>
        <button class="btn btn-xs btn-danger" onclick="rejeitarEntrada('${e.id}')">✕</button>
      </div>
    </div>
  `).join('');
}
 
function renderChart7dias(){
  const bars=document.getElementById('chart-bars');
  const yax=document.getElementById('chart-y');
  const dias=[];
  const n=new Date();
  for(let i=6;i>=0;i--){
    const d=new Date(n);d.setDate(d.getDate()-i);d.setHours(0,0,0,0);
    const df=new Date(d);df.setHours(23,59,59);
    const tot=filtrarVendas(d,df).reduce((s,v)=>s+v.total,0);
    const lbl=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()];
    dias.push({lbl,tot,today:i===0});
  }
  const maxV=Math.max(...dias.map(d=>d.tot),1);
  yax.innerHTML=['','R$'+Math.round(maxV*.75/100)*100,'R$'+Math.round(maxV*.5/100)*100,'R$'+Math.round(maxV*.25/100)*100,'R$0'].map(v=>`<span>${v}</span>`).join('');
  bars.innerHTML=dias.map(d=>{
    const h=Math.round((d.tot/maxV)*140)+4;
    return`<div class="bar-col">
      <div class="bar-fill${d.today?' highlight':''}" style="height:${h}px" data-tip="${fmtMoeda(d.tot)}"></div>
      <div class="bar-lbl">${d.lbl}</div>
    </div>`;
  }).join('');
}
 
// ═══════════════ VENDAS ═══════════════
function setPeriod(p,btn){
  periodAtual=p;
  document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  // Set date inputs
  const{de,ate}=periodoRange(p);
  document.getElementById('v-de').value=de.toISOString().split('T')[0];
  document.getElementById('v-ate').value=ate.toISOString().split('T')[0];
  renderVendas();
}
 
function renderVendas(){
  const deIn=document.getElementById('v-de').value;
  const ateIn=document.getElementById('v-ate').value;
  let de,ate;
  if(deIn&&ateIn){
    de=new Date(deIn+'T00:00:00');
    ate=new Date(ateIn+'T23:59:59');
  }else{
    const r=periodoRange(periodAtual);
    de=r.de;ate=r.ate;
    document.getElementById('v-de').value=de.toISOString().split('T')[0];
    document.getElementById('v-ate').value=ate.toISOString().split('T')[0];
  }
 
  const lista=filtrarVendas(de,ate);
  const total=lista.reduce((s,v)=>s+v.total,0);
  const desc=lista.reduce((s,v)=>s+v.desconto,0);
  const ticket=lista.length?total/lista.length:0;
 
  const labels={dia:'Hoje',semana:'Esta Semana',mes:'Este Mês',ano:'Este Ano'};
  document.getElementById('v-period-lbl').textContent=labels[periodAtual]||'Período selecionado';
  document.getElementById('v-count-lbl').textContent=lista.length+' transações';
 
  // Stats
  document.getElementById('v-stats').innerHTML=`
    <div class="stat-card" style="--c:var(--accent)"><div class="sc-lbl">Total Vendido</div><div class="sc-val td-g">${fmtMoeda(total)}</div><div class="sc-sub">${lista.length} transações</div><div class="sc-ico">💰</div></div>
    <div class="stat-card" style="--c:var(--a2)"><div class="sc-lbl">Ticket Médio</div><div class="sc-val">${fmtMoeda(ticket)}</div><div class="sc-sub">por venda</div><div class="sc-ico">🎫</div></div>
    <div class="stat-card" style="--c:var(--success)"><div class="sc-lbl">Transações</div><div class="sc-val">${lista.length}</div><div class="sc-sub">no período</div><div class="sc-ico">🔢</div></div>
    <div class="stat-card" style="--c:var(--danger)"><div class="sc-lbl">Descontos</div><div class="sc-val" style="color:var(--danger)">${fmtMoeda(desc)}</div><div class="sc-sub">concedidos</div><div class="sc-ico">🏷️</div></div>
  `;
 
  // Gráfico barras por dia/hora
  renderVChart(lista,de,ate);
 
  // Pagamentos
  const pags={};
  lista.forEach(v=>{pags[v.pagamento]=(pags[v.pagamento]||0)+v.total;});
  const maxP=Math.max(...Object.values(pags),1);
  document.getElementById('v-pagamentos').innerHTML=Object.entries(pags).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`
    <div class="prog-item">
      <div class="prog-lbl">${k}</div>
      <div class="prog-bar"><div class="prog-fill" style="width:${Math.round(v/maxP*100)}%;background:var(--g2)"></div></div>
      <div class="prog-val">${fmtMoeda(v)}</div>
    </div>
  `).join('')||'<span style="color:var(--muted2);font-size:.83rem">Sem dados.</span>';
 
  // Categorias (simuladas)
  const cats={'Analgésico':Math.round(total*.28),'Antibiótico':Math.round(total*.22),'Vitamina':Math.round(total*.18),'Outro':Math.round(total*.32)};
  const maxC=Math.max(...Object.values(cats),1);
  document.getElementById('v-categorias').innerHTML=Object.entries(cats).map(([k,v])=>`
    <div class="prog-item">
      <div class="prog-lbl">${k}</div>
      <div class="prog-bar"><div class="prog-fill" style="width:${Math.round(v/maxC*100)}%;background:var(--g3)"></div></div>
      <div class="prog-val">${fmtMoeda(v)}</div>
    </div>
  `).join('');
 
  // Tabela
  const sorted=[...lista].sort((a,b)=>new Date(b.data)-new Date(a.data));
  const tbody=document.getElementById('v-tbody');
  if(!sorted.length){tbody.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--muted2);padding:24px">Nenhuma venda no período.</td></tr>';return;}
  tbody.innerHTML=sorted.slice(0,100).map((v,i)=>`
    <tr>
      <td class="td-m">#${String(i+1).padStart(3,'0')}</td>
      <td class="td-m">${new Date(v.data).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</td>
      <td>${v.cliente}</td>
      <td style="font-size:.78rem;color:var(--muted2)">${v.operador}</td>
      <td class="td-m" style="text-align:center">${v.itens}</td>
      <td><span class="badge b-pend">${v.pagamento}</span></td>
      <td class="td-r">${v.desconto>0?'- '+fmtMoeda(v.desconto):'—'}</td>
      <td class="td-g">${fmtMoeda(v.total)}</td>
    </tr>
  `).join('');
}
 
function renderVChart(lista,de,ate){
  const bars=document.getElementById('v-chart-bars');
  const yax=document.getElementById('v-chart-y');
  const diff=(ate-de)/86400000;
  let buckets=[];
 
  if(diff<=1){
    // por hora
    for(let h=0;h<24;h++){
      const tot=lista.filter(v=>new Date(v.data).getHours()===h).reduce((s,v)=>s+v.total,0);
      buckets.push({lbl:h%3===0?h+'h':'',tot,hi:new Date().getHours()===h});
    }
  } else if(diff<=7){
    for(let d=0;d<=diff;d++){
      const day=new Date(de.getTime()+d*86400000);
      const tot=lista.filter(v=>{const vd=new Date(v.data);return vd.toDateString()===day.toDateString();}).reduce((s,v)=>s+v.total,0);
      buckets.push({lbl:['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][day.getDay()],tot,hi:day.toDateString()===new Date().toDateString()});
    }
  } else if(diff<=35){
    for(let d=0;d<=Math.min(diff,31);d++){
      const day=new Date(de.getTime()+d*86400000);
      const tot=lista.filter(v=>{const vd=new Date(v.data);return vd.toDateString()===day.toDateString();}).reduce((s,v)=>s+v.total,0);
      buckets.push({lbl:day.getDate()%5===0||day.getDate()===1?day.getDate()+'':'',tot,hi:false});
    }
  } else {
    const months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    for(let m=0;m<12;m++){
      const tot=lista.filter(v=>new Date(v.data).getMonth()===m).reduce((s,v)=>s+v.total,0);
      buckets.push({lbl:months[m],tot,hi:new Date().getMonth()===m});
    }
  }
 
  const maxV=Math.max(...buckets.map(b=>b.tot),1);
  yax.innerHTML=['',Math.round(maxV*.75),Math.round(maxV*.5),Math.round(maxV*.25),'0'].map(v=>`<span style="font-size:.6rem">${v>0?'R$'+v:v}</span>`).join('');
  bars.innerHTML=buckets.map(b=>{
    const h=Math.round((b.tot/maxV)*140)+2;
    return`<div class="bar-col" style="min-width:8px">
      <div class="bar-fill${b.hi?' highlight':''}" style="height:${h}px;border-radius:4px 4px 0 0" data-tip="${fmtMoeda(b.tot)}"></div>
      <div class="bar-lbl">${b.lbl}</div>
    </div>`;
  }).join('');
}
 
function exportarCSV(){
  const{de,ate}=periodoRange(periodAtual);
  const lista=filtrarVendas(de,ate);
  const header='Data,Cliente,Operador,Itens,Pagamento,Desconto,Total\n';
  const rows=lista.map(v=>`${new Date(v.data).toLocaleString('pt-BR')},${v.cliente},${v.operador},${v.itens},${v.pagamento},${v.desconto.toFixed(2)},${v.total.toFixed(2)}`).join('\n');
  const blob=new Blob(['\uFEFF'+header+rows],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='vendas_farma.csv';a.click();
  toast('CSV exportado com sucesso!');
}
 
// ═══════════════ ESTOQUE ═══════════════
function renderEstoque(){
  const q=document.getElementById('es-search').value.toLowerCase();
  const f=document.getElementById('es-filter').value;
  const baixo=produtos.filter(p=>p.qty>0&&p.qty<=p.min);
  const sem=produtos.filter(p=>p.qty===0);
  document.getElementById('es-total').textContent=produtos.length;
  document.getElementById('es-low').textContent=baixo.length;
  document.getElementById('es-out').textContent=sem.length;
 
  let lista=produtos.filter(p=>p.nome.toLowerCase().includes(q)||(p.fab||'').toLowerCase().includes(q));
  if(f==='ok')lista=lista.filter(p=>p.qty>p.min);
  if(f==='low')lista=lista.filter(p=>p.qty>0&&p.qty<=p.min);
  if(f==='out')lista=lista.filter(p=>p.qty===0);
 
  const tb=document.getElementById('es-tbody');
  if(!lista.length){tb.innerHTML='<tr><td colspan="9" style="text-align:center;color:var(--muted2);padding:24px">Nenhum produto encontrado.</td></tr>';return;}
  tb.innerHTML=lista.map(p=>`
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td style="color:var(--muted2);font-size:.8rem">${p.fab||'—'}</td>
      <td style="font-size:.8rem">${p.cat}</td>
      <td class="td-g">${fmtMoeda(p.preco)}</td>
      <td class="td-m" style="text-align:center;font-size:.95rem;font-weight:700;color:${p.qty===0?'var(--danger)':p.qty<=p.min?'var(--warn)':'var(--text)'}">${p.qty}</td>
      <td class="td-m" style="text-align:center;color:var(--muted2)">${p.min}</td>
      <td class="td-m">${p.val?new Date(p.val+'T00:00').toLocaleDateString('pt-BR'):'—'}</td>
      <td>${statusBadge(p)}</td>
      <td style="display:flex;gap:6px;">
        <button class="btn btn-xs btn-warn" onclick="abrirAjuste('${p.id}')">⚖️ Ajustar</button>
      </td>
    </tr>
  `).join('');
}
 
function renderPendentes(){
  const badge=document.getElementById('pend-count-badge');
  badge.textContent=entradasPend.length;
  document.getElementById('nb-pend').textContent=entradasPend.length;
  const el=document.getElementById('pend-list');
  if(!entradasPend.length){
    el.innerHTML='<div style="padding:24px;text-align:center;color:var(--muted2);font-size:.84rem;">✅ Nenhuma entrada pendente de aprovação.</div>';
    return;
  }
  el.innerHTML=entradasPend.map(e=>`
    <div class="pend-item">
      <div class="pend-icon" style="background:rgba(255,209,102,.1);">📦</div>
      <div class="pend-info">
        <div class="pend-nome">${e.prodNome} <span class="badge b-pend" style="font-size:.63rem">+${e.qty} unidades</span></div>
        <div class="pend-det">Lote ${e.lote||'—'} • Val. ${e.val?new Date(e.val+'T00:00').toLocaleDateString('pt-BR'):'—'} • ${e.forn||'—'} • NF: ${e.nf||'—'}</div>
        <div class="pend-det" style="margin-top:2px;">Registrado por <strong style="color:var(--text)">${e.balconista}</strong> em ${new Date(e.data).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</div>
        ${e.obs?`<div class="pend-det" style="color:var(--accent2)">Obs: ${e.obs}</div>`:''}
      </div>
      <div class="pend-btns">
        <button class="btn btn-sm btn-primary" onclick="aprovarEntrada('${e.id}')">✓ Aprovar</button>
        <button class="btn btn-sm btn-danger" onclick="rejeitarEntrada('${e.id}')">✕ Rejeitar</button>
      </div>
    </div>
  `).join('');
}
 
function aprovarEntrada(id){
  const e=entradasPend.find(x=>x.id===id);
  if(!e)return;
  const p=produtos.find(x=>x.id===e.prodId);
  if(p){p.qty+=e.qty;if(e.val)p.val=e.val;}
  entradasPend=entradasPend.filter(x=>x.id!==id);
  save();
  renderPendentes();
  renderEstoque();
  toast(`Entrada de ${e.qty} unidades de "${e.prodNome}" aprovada!`);
}
function rejeitarEntrada(id){
  const e=entradasPend.find(x=>x.id===id);
  if(!e)return;
  if(!confirm(`Rejeitar entrada de "${e.prodNome}"?`))return;
  entradasPend=entradasPend.filter(x=>x.id!==id);
  save();renderPendentes();renderEstoque();
  toast(`Entrada de "${e.prodNome}" rejeitada.`,'i');
}
function aprovarTodos(){
  if(!entradasPend.length){toast('Sem pendências para aprovar.','i');return;}
  if(!confirm(`Aprovar todas as ${entradasPend.length} entradas pendentes?`))return;
  entradasPend.forEach(e=>{
    const p=produtos.find(x=>x.id===e.prodId);
    if(p){p.qty+=e.qty;if(e.val)p.val=e.val;}
  });
  const n=entradasPend.length;
  entradasPend=[];
  save();renderPendentes();renderEstoque();
  toast(`${n} entradas aprovadas com sucesso!`);
}
 
function abrirModalEntrada(){
  const sel=document.getElementById('en-prod');
  sel.innerHTML='<option value="">— Selecione —</option>'+produtos.map(p=>`<option value="${p.id}">${p.nome} (estoque: ${p.qty})</option>`).join('');
  ['en-qty','en-lote','en-val','en-forn','en-nf','en-obs'].forEach(id=>document.getElementById(id).value='');
  show('modal-entrada');
}
function registrarEntrada(){
  const prodId=document.getElementById('en-prod').value;
  const qty=parseInt(document.getElementById('en-qty').value);
  if(!prodId||!qty||qty<1){toast('Selecione o produto e quantidade válida.','e');return;}
  const p=produtos.find(x=>x.id===prodId);
  const entrada={
    id:uid(),prodId,prodNome:p.nome,qty,
    lote:document.getElementById('en-lote').value,
    val:document.getElementById('en-val').value,
    forn:document.getElementById('en-forn').value,
    nf:document.getElementById('en-nf').value,
    obs:document.getElementById('en-obs').value,
    balconista:'Gerente',
    data:new Date().toISOString()
  };
  // Gerente aprova diretamente
  p.qty+=qty;
  if(entrada.val)p.val=entrada.val;
  save();hide('modal-entrada');renderEstoque();
  toast(`Entrada de ${qty} unidades de "${p.nome}" registrada e aprovada!`);
}
 
function abrirAjuste(id){
  const p=produtos.find(x=>x.id===id);
  document.getElementById('aj-id').value=id;
  document.getElementById('aj-nome').value=p.nome;
  document.getElementById('aj-qty').value=p.qty;
  document.getElementById('aj-obs').value='';
  show('modal-ajuste');
}
function confirmarAjuste(){
  const id=document.getElementById('aj-id').value;
  const qty=parseInt(document.getElementById('aj-qty').value);
  if(isNaN(qty)||qty<0){toast('Quantidade inválida.','e');return;}
  const p=produtos.find(x=>x.id===id);
  const old=p.qty;
  p.qty=qty;
  save();hide('modal-ajuste');renderEstoque();
  toast(`"${p.nome}" ajustado: ${old} → ${qty} un (${document.getElementById('aj-motivo').value})`);
}
 
// ═══════════════ EQUIPE ═══════════════
function renderEqStats(){
  document.getElementById('eq-total').textContent=funcionarios.length;
  document.getElementById('eq-ativos').textContent=funcionarios.filter(f=>f.status==='Ativo').length;
  document.getElementById('eq-ferias').textContent=funcionarios.filter(f=>f.status==='Férias').length;
  const cargos=new Set(funcionarios.map(f=>f.cargo));
  document.getElementById('eq-cargos').textContent=cargos.size;
}
function renderEquipe(){
  renderEqStats();
  const q=document.getElementById('eq-search').value.toLowerCase();
  const f=document.getElementById('eq-filter').value;
  let lista=funcionarios.filter(func=>func.nome.toLowerCase().includes(q)||(func.cargo||'').toLowerCase().includes(q));
  if(f)lista=lista.filter(func=>func.status===f);
 
  const grid=document.getElementById('func-grid');
  if(!lista.length){grid.innerHTML='<p style="color:var(--muted2);font-size:.85rem;grid-column:1/-1;text-align:center;padding:40px">Nenhum funcionário encontrado.</p>';return;}
 
  grid.innerHTML=lista.map(func=>{
    const cor=func.cor||cargoColor(func.cargo);
    const statusMap={'Ativo':'b-ativo','Férias':'b-ferias','Inativo':'b-inativo'};
    return`
      <div class="func-card" style="--fc:${cor}">
        <div class="fc-top">
          <div class="fc-av" style="background:${cor}">${func.avatar||func.nome.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
          <div>
            <div class="fc-nome">${func.nome}</div>
            <div class="fc-cargo">${func.cargo} • Turno ${func.turno}</div>
            <div style="margin-top:5px;display:flex;gap:5px;flex-wrap:wrap">
              ${cargoBadge(func.cargo)}
              <span class="badge ${statusMap[func.status]||'b-inativo'}">${func.status.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div class="fc-stats">
          <div class="fcs"><div class="fcs-lbl">Admissão</div><div class="fcs-val" style="font-size:.75rem;color:var(--muted2)">${func.adm?new Date(func.adm+'T00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'}):'—'}</div></div>
          <div class="fcs"><div class="fcs-lbl">Vendas</div><div class="fcs-val">${func.vendas||0}</div></div>
          <div class="fcs"><div class="fcs-lbl">Salário</div><div class="fcs-val" style="font-size:.72rem">${func.sal?'R$'+func.sal.toLocaleString('pt-BR'):'—'}</div></div>
        </div>
        <div style="font-size:.75rem;color:var(--muted2);margin-bottom:10px;font-family:'DM Mono',monospace;">${func.email||''}</div>
        ${func.obs?`<div style="font-size:.73rem;color:var(--a4);margin-bottom:10px;background:rgba(255,209,102,.05);border:1px solid rgba(255,209,102,.15);border-radius:7px;padding:6px 9px">📝 ${func.obs}</div>`:''}
        <div class="fc-btns">
          <button class="btn btn-xs btn-info" onclick="editarFunc('${func.id}')">✏️ Editar</button>
          <button class="btn btn-xs btn-sec" onclick="verFunc('${func.id}')">👁 Detalhes</button>
          <button class="btn btn-xs btn-danger" style="margin-left:auto" onclick="removerFunc('${func.id}')">🗑</button>
        </div>
      </div>
    `;
  }).join('');
}
 
function abrirModalFunc(){
  document.getElementById('mf-id').value='';
  document.getElementById('mf-title').textContent='👤 Novo Funcionário';
  ['mf-nome','mf-cpf','mf-nasc','mf-tel','mf-email','mf-adm','mf-sal','mf-obs'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('mf-cargo').value='Balconista';
  document.getElementById('mf-status').value='Ativo';
  document.getElementById('mf-turno').value='Manhã';
  show('modal-func');
}
function editarFunc(id){
  const f=funcionarios.find(x=>x.id===id);
  if(!f)return;
  document.getElementById('mf-id').value=f.id;
  document.getElementById('mf-title').textContent='✏️ Editar Funcionário';
  document.getElementById('mf-nome').value=f.nome;
  document.getElementById('mf-cpf').value=f.cpf||'';
  document.getElementById('mf-nasc').value=f.nasc||'';
  document.getElementById('mf-tel').value=f.tel||'';
  document.getElementById('mf-email').value=f.email||'';
  document.getElementById('mf-cargo').value=f.cargo;
  document.getElementById('mf-status').value=f.status;
  document.getElementById('mf-adm').value=f.adm||'';
  document.getElementById('mf-sal').value=f.sal||'';
  document.getElementById('mf-turno').value=f.turno||'Manhã';
  document.getElementById('mf-obs').value=f.obs||'';
  show('modal-func');
}
function salvarFunc(){
  const nome=document.getElementById('mf-nome').value.trim();
  if(!nome){toast('Informe o nome do funcionário.','e');return;}
  const id=document.getElementById('mf-id').value;
  const cargo=document.getElementById('mf-cargo').value;
  const dados={
    nome,cpf:document.getElementById('mf-cpf').value,nasc:document.getElementById('mf-nasc').value,
    tel:document.getElementById('mf-tel').value,email:document.getElementById('mf-email').value,
    cargo,status:document.getElementById('mf-status').value,
    adm:document.getElementById('mf-adm').value,sal:parseFloat(document.getElementById('mf-sal').value)||0,
    turno:document.getElementById('mf-turno').value,obs:document.getElementById('mf-obs').value,
    cor:cargoColor(cargo),
    avatar:nome.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(),
  };
  if(id){
    const idx=funcionarios.findIndex(x=>x.id===id);
    funcionarios[idx]={...funcionarios[idx],...dados};
    toast(`"${nome}" atualizado!`);
  } else {
    funcionarios.push({id:uid(),vendas:0,...dados});
    toast(`"${nome}" cadastrado!`);
  }
  save();hide('modal-func');renderEquipe();
}
function removerFunc(id){
  const f=funcionarios.find(x=>x.id===id);
  if(!confirm(`Remover "${f.nome}" da equipe?`))return;
  funcionarios=funcionarios.filter(x=>x.id!==id);
  save();renderEquipe();toast(`"${f.nome}" removido.`,'i');
}
function verFunc(id){
  const f=funcionarios.find(x=>x.id===id);
  if(!f)return;
  alert(`👤 ${f.nome}\nCargo: ${f.cargo}\nStatus: ${f.status}\nAdmissão: ${f.adm?new Date(f.adm+'T00:00').toLocaleDateString('pt-BR'):'—'}\nSalário: R$ ${(f.sal||0).toLocaleString('pt-BR')}\nTurno: ${f.turno}\nEmail: ${f.email||'—'}\nTel: ${f.tel||'—'}\nObs: ${f.obs||'—'}`);
}
 
// Fechar modais clicando fora
document.querySelectorAll('.modal-bg').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.style.display='none';}));
 
// Inicializar
setPeriod('dia',document.querySelector('.ptab'));
renderDashboard();
renderEstoque();
renderPendentes();
renderEquipe();