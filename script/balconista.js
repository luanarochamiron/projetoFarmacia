// ============ STATE ============
let clientes = JSON.parse(localStorage.getItem('farma_clientes') || '[]');
let produtos = JSON.parse(localStorage.getItem('farma_produtos') || '[]');
let receitas = JSON.parse(localStorage.getItem('farma_receitas') || '[]');
let carrinho = [];
 
// ---- Produtos demo ----
if (produtos.length === 0) {
  produtos = [
    { id: uid(), nome: 'Dipirona Sódica 500mg', cat: 'Analgésico', tipo: 'Livre', preco: 8.90, qty: 50, min: 15, fab: 'EMS', val: '2026-03-01', cod: '7891234567890' },
    { id: uid(), nome: 'Amoxicilina 500mg', cat: 'Antibiótico', tipo: 'Receita', preco: 22.50, qty: 8, min: 20, fab: 'Medley', val: '2025-12-01', cod: '7899876543210' },
    { id: uid(), nome: 'Ibuprofeno 600mg', cat: 'Anti-inflamatório', tipo: 'Receita', preco: 14.80, qty: 4, min: 10, fab: 'Eurofarma', val: '2026-06-01', cod: '7895555555555' },
    { id: uid(), nome: 'Vitamina C 1g Efervescente', cat: 'Vitamina', tipo: 'Livre', preco: 19.90, qty: 30, min: 10, fab: 'Bayer', val: '2026-08-01', cod: '7893333333333' },
    { id: uid(), nome: 'Ritalina 10mg', cat: 'Controlado', tipo: 'Controlado', preco: 85.00, qty: 5, min: 5, fab: 'Novartis', val: '2025-11-01', cod: '7891111111111' },
  ];
  salvarStorage();
}
 
function uid() { return '_' + Math.random().toString(36).substr(2, 9); }
function salvarStorage() {
  localStorage.setItem('farma_clientes', JSON.stringify(clientes));
  localStorage.setItem('farma_produtos', JSON.stringify(produtos));
  localStorage.setItem('farma_receitas', JSON.stringify(receitas));
}
 
// ============ CLOCK ============
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR');
  document.getElementById('date-str').textContent = now.toLocaleDateString('pt-BR', {weekday:'long', day:'2-digit', month:'long', year:'numeric'});
}
setInterval(updateClock, 1000); updateClock();
 
// ============ NAV ============
const titles = {
  dashboard: ['Bem-vindo ao FarmaSystem', 'Visão geral do dia'],
  clientes: ['Gestão de Clientes', 'Cadastre e consulte clientes'],
  produtos: ['Estoque de Produtos', 'Consulte preços e quantidades'],
  orcamento: ['Orçamento', 'Monte orçamentos rapidamente'],
  receitas: ['Receitas Médicas', 'Registre e consulte receitas'],
};
function navTo(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  btn.classList.add('active');
  const [t, s] = titles[page];
  document.getElementById('page-title').innerHTML = t.replace('FarmaSystem', '<span>FarmaSystem</span>');
  document.getElementById('page-sub').textContent = s;
  if (page === 'dashboard') atualizarDashboard();
  if (page === 'orcamento') atualizarSelectCliente();
  if (page === 'receitas') { atualizarSelectRx(); renderReceitas(); }
  if (page === 'clientes') renderClientes();
  if (page === 'produtos') renderProdutos();
}
 
// ============ TOAST ============
function toast(msg, tipo = 'success') {
  const w = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = `toast ${tipo}`;
  el.innerHTML = `<span class="toast-icon">${tipo === 'success' ? '✅' : '❌'}</span><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}
 
// ============ MODAL ============
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }
 
// ============ DASHBOARD ============
function atualizarDashboard() {
  document.getElementById('stat-clientes').textContent = clientes.length;
  document.getElementById('stat-produtos').textContent = produtos.length;
  const baixo = produtos.filter(p => p.qty <= p.min);
  document.getElementById('stat-baixo').textContent = baixo.length;
  document.getElementById('stat-receitas').textContent = receitas.length;
  document.getElementById('badge-low').textContent = baixo.length;
 
  // Alertas
  const al = document.getElementById('alerta-estoque');
  if (baixo.length === 0) {
    al.innerHTML = '<p style="color:var(--muted);font-size:.85rem">✅ Nenhum alerta no momento.</p>';
  } else {
    al.innerHTML = baixo.map(p => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,209,102,.05);border-radius:10px;margin-bottom:8px;border:1px solid rgba(255,209,102,.15)">
        <span style="font-size:1.3rem">⚠️</span>
        <div style="flex:1"><strong>${p.nome}</strong> <span style="color:var(--muted);font-size:.8rem">— Estoque: ${p.qty} / Mín: ${p.min}</span></div>
        <span class="badge badge-low">BAIXO</span>
      </div>
    `).join('');
  }
 
  // Últimos clientes
  const uc = document.getElementById('ultimos-clientes');
  if (clientes.length === 0) {
    uc.innerHTML = '<p style="color:var(--muted);font-size:.85rem">Nenhum cliente cadastrado ainda.</p>';
  } else {
    const last = [...clientes].reverse().slice(0, 5);
    uc.innerHTML = `<table><thead><tr><th>Nome</th><th>CPF</th><th>Telefone</th></tr></thead><tbody>
      ${last.map(c => `<tr><td>${c.nome}</td><td>${c.cpf||'—'}</td><td>${c.tel||'—'}</td></tr>`).join('')}
    </tbody></table>`;
  }
}
atualizarDashboard();
 
// ============ CLIENTES ============
function salvarCliente() {
  const nome = document.getElementById('cli-nome').value.trim();
  if (!nome) { toast('Informe o nome do cliente.', 'error'); return; }
  const cli = {
    id: uid(), nome,
    cpf: document.getElementById('cli-cpf').value.trim(),
    nasc: document.getElementById('cli-nasc').value,
    tel: document.getElementById('cli-tel').value.trim(),
    email: document.getElementById('cli-email').value.trim(),
    convenio: document.getElementById('cli-convenio').value.trim(),
    end: document.getElementById('cli-end').value.trim(),
    obs: document.getElementById('cli-obs').value.trim(),
    criado: new Date().toISOString()
  };
  clientes.push(cli);
  salvarStorage();
  renderClientes();
  limparFormCliente();
  toast(`Cliente "${nome}" cadastrado com sucesso!`);
}
function limparFormCliente() {
  ['cli-nome','cli-cpf','cli-nasc','cli-tel','cli-email','cli-convenio','cli-end','cli-obs'].forEach(id => document.getElementById(id).value = '');
}
function renderClientes(filtro = '') {
  const tb = document.getElementById('tabela-clientes');
  const lista = filtro ? clientes.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()) || (c.cpf||'').includes(filtro)) : clientes;
  if (lista.length === 0) { tb.innerHTML = '<tr><td colspan="5" style="color:var(--muted);text-align:center;padding:24px">Nenhum cliente encontrado.</td></tr>'; return; }
  tb.innerHTML = lista.map(c => `
    <tr>
      <td><strong>${c.nome}</strong></td>
      <td style="font-family:'DM Mono',monospace;font-size:.8rem">${c.cpf||'—'}</td>
      <td>${c.tel||'—'}</td>
      <td>${c.convenio||'—'}</td>
      <td><button class="btn btn-secondary btn-sm" onclick="verCliente('${c.id}')">👁 Ver</button>
          <button class="btn btn-danger btn-sm" onclick="removerCliente('${c.id}')">✕</button></td>
    </tr>
  `).join('');
}
function buscarCliente(v) { renderClientes(v); }
function verCliente(id) {
  const c = clientes.find(x => x.id === id);
  if (!c) return;
  document.getElementById('modal-cli-body').innerHTML = `
    <div class="form-grid">
      ${campo('Nome', c.nome)} ${campo('CPF', c.cpf||'—')}
      ${campo('Nascimento', c.nasc ? new Date(c.nasc+'T00:00').toLocaleDateString('pt-BR') : '—')} ${campo('Telefone', c.tel||'—')}
      ${campo('Email', c.email||'—')} ${campo('Convênio', c.convenio||'—')}
      ${campo('Endereço', c.end||'—', true)} ${campo('Observações', c.obs||'—', true)}
    </div>`;
  document.getElementById('modal-cliente').style.display = 'flex';
}
function campo(l, v, full = false) {
  return `<div class="field${full ? ' ' : ''}" style="${full ? 'grid-column:1/-1' : ''}">
    <label>${l}</label>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;font-size:.87rem">${v}</div>
  </div>`;
}
function removerCliente(id) {
  if (!confirm('Remover este cliente?')) return;
  clientes = clientes.filter(c => c.id !== id);
  salvarStorage(); renderClientes(); atualizarDashboard(); toast('Cliente removido.');
}
 
// ============ PRODUTOS ============
function salvarProduto() {
  const nome = document.getElementById('prod-nome').value.trim();
  const preco = parseFloat(document.getElementById('prod-preco').value);
  const qty = parseInt(document.getElementById('prod-qty').value);
  if (!nome) { toast('Informe o nome do produto.', 'error'); return; }
  if (isNaN(preco) || preco < 0) { toast('Informe um preço válido.', 'error'); return; }
  if (isNaN(qty) || qty < 0) { toast('Informe a quantidade.', 'error'); return; }
  const prod = {
    id: uid(), nome, preco, qty,
    cat: document.getElementById('prod-cat').value,
    tipo: document.getElementById('prod-tipo').value,
    min: parseInt(document.getElementById('prod-min').value) || 10,
    fab: document.getElementById('prod-fab').value.trim(),
    val: document.getElementById('prod-val').value,
    cod: document.getElementById('prod-cod').value.trim(),
  };
  produtos.push(prod);
  salvarStorage(); renderProdutos(); limparFormProd();
  toast(`"${nome}" adicionado ao estoque!`);
}
function limparFormProd() {
  ['prod-nome','prod-preco','prod-qty','prod-min','prod-fab','prod-val','prod-cod'].forEach(id => document.getElementById(id).value = '');
}
function statusEstoque(p) {
  if (p.qty === 0) return '<span class="badge badge-out">SEM ESTOQUE</span>';
  if (p.qty <= p.min) return '<span class="badge badge-low">BAIXO</span>';
  return '<span class="badge badge-ok">OK</span>';
}
function tipoBadge(tipo) {
  if (tipo === 'Livre') return '<span class="badge badge-free">LIVRE</span>';
  if (tipo === 'Controlado') return '<span class="badge badge-rx">CONTROLADO</span>';
  return '<span class="badge badge-rx">RECEITA</span>';
}
function renderProdutos(filtro = '') {
  const tb = document.getElementById('tabela-produtos');
  const lista = filtro ? produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()) || (p.cod||'').includes(filtro)) : produtos;
  if (lista.length === 0) { tb.innerHTML = '<tr><td colspan="7" style="color:var(--muted);text-align:center;padding:24px">Nenhum produto encontrado.</td></tr>'; return; }
  tb.innerHTML = lista.map(p => `
    <tr>
      <td><strong>${p.nome}</strong>${p.fab ? `<br><small style="color:var(--muted)">${p.fab}</small>` : ''}</td>
      <td>${p.cat}</td>
      <td>${tipoBadge(p.tipo)}</td>
      <td style="font-family:'DM Mono',monospace;color:var(--accent)">R$ ${p.preco.toFixed(2)}</td>
      <td style="font-family:'DM Mono',monospace">${p.qty} un</td>
      <td>${statusEstoque(p)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="verProduto('${p.id}')">👁</button>
        <button class="btn btn-secondary btn-sm" onclick="ajustarEstoque('${p.id}')">±</button>
        <button class="btn btn-danger btn-sm" onclick="removerProduto('${p.id}')">✕</button>
      </td>
    </tr>
  `).join('');
}
function buscarProduto(v) { renderProdutos(v); }
function verProduto(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-prod-body').innerHTML = `
    <div class="form-grid three">
      ${campo('Nome', p.nome)} ${campo('Fabricante', p.fab||'—')} ${campo('Código', p.cod||'—')}
      ${campo('Categoria', p.cat)} ${campo('Tipo', p.tipo)} ${campo('Validade', p.val ? new Date(p.val+'T00:00').toLocaleDateString('pt-BR') : '—')}
      ${campo('Preço', 'R$ '+p.preco.toFixed(2))} ${campo('Estoque Atual', p.qty+' un')} ${campo('Estoque Mínimo', p.min+' un')}
    </div>`;
  document.getElementById('modal-produto').style.display = 'flex';
}
function ajustarEstoque(id) {
  const p = produtos.find(x => x.id === id);
  const v = prompt(`Ajustar estoque de "${p.nome}" (atual: ${p.qty})\nInforme a nova quantidade:`);
  if (v === null) return;
  const n = parseInt(v);
  if (isNaN(n) || n < 0) { toast('Quantidade inválida.', 'error'); return; }
  p.qty = n;
  salvarStorage(); renderProdutos(); atualizarDashboard();
  toast(`Estoque de "${p.nome}" atualizado para ${n} unidades.`);
}
function removerProduto(id) {
  if (!confirm('Remover este produto?')) return;
  produtos = produtos.filter(p => p.id !== id);
  salvarStorage(); renderProdutos(); atualizarDashboard(); toast('Produto removido.');
}
renderProdutos();
 
// ============ ORÇAMENTO ============
function atualizarSelectCliente() {
  const sel = document.getElementById('orc-cliente');
  sel.innerHTML = '<option value="">— Selecione ou deixe em branco —</option>' +
    clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
}
function filtrarOrcamento(v) {
  const res = document.getElementById('orc-resultados');
  const tb = document.getElementById('orc-lista-prod');
  if (!v.trim()) { res.style.display = 'none'; return; }
  const lista = produtos.filter(p => p.nome.toLowerCase().includes(v.toLowerCase()));
  res.style.display = 'block';
  if (lista.length === 0) { tb.innerHTML = '<tr><td colspan="4" style="color:var(--muted);text-align:center;padding:14px">Nenhum produto.</td></tr>'; return; }
  tb.innerHTML = lista.map(p => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td style="font-family:'DM Mono',monospace;color:var(--accent)">R$ ${p.preco.toFixed(2)}</td>
      <td>${p.qty} un</td>
      <td><button class="btn btn-primary btn-sm" onclick="addCarrinho('${p.id}')">+ Adicionar</button></td>
    </tr>
  `).join('');
}
function addCarrinho(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  const exist = carrinho.find(x => x.id === id);
  if (exist) { exist.qty++; }
  else { carrinho.push({ id: p.id, nome: p.nome, preco: p.preco, qty: 1 }); }
  renderCarrinho();
  toast(`${p.nome} adicionado ao orçamento.`);
}
function renderCarrinho() {
  const div = document.getElementById('orc-carrinho');
  const tot = document.getElementById('orc-total-wrap');
  if (carrinho.length === 0) {
    div.innerHTML = '<p style="color:var(--muted);font-size:.85rem;text-align:center;padding:20px">Adicione produtos ao orçamento.</p>';
    tot.style.display = 'none'; return;
  }
  const total = carrinho.reduce((s, i) => s + i.preco * i.qty, 0);
  div.innerHTML = carrinho.map(item => `
    <div class="orc-item">
      <div class="orc-name">${item.nome}</div>
      <div class="orc-qty">
        <button style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1rem" onclick="qtyCarrinho('${item.id}', -1)">-</button>
        ${item.qty}
        <button style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1rem" onclick="qtyCarrinho('${item.id}', 1)">+</button>
      </div>
      <div class="orc-price">R$ ${(item.preco * item.qty).toFixed(2)}</div>
      <button class="btn btn-danger btn-sm" onclick="removerCarrinho('${item.id}')">✕</button>
    </div>
  `).join('');
  tot.style.display = 'flex';
  document.getElementById('orc-total').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
}
function qtyCarrinho(id, d) {
  const i = carrinho.find(x => x.id === id);
  if (!i) return;
  i.qty = Math.max(1, i.qty + d);
  renderCarrinho();
}
function removerCarrinho(id) {
  carrinho = carrinho.filter(x => x.id !== id);
  renderCarrinho();
}
function limparCarrinho() { carrinho = []; renderCarrinho(); }
function finalizarOrcamento() {
  if (carrinho.length === 0) { toast('Adicione produtos ao orçamento.', 'error'); return; }
  const total = carrinho.reduce((s, i) => s + i.preco * i.qty, 0);
  const itens = carrinho.map(i => `• ${i.nome} (${i.qty}x) — R$ ${(i.preco * i.qty).toFixed(2)}`).join('\n');
  alert(`ORÇAMENTO\n${'─'.repeat(40)}\n${itens}\n${'─'.repeat(40)}\nTOTAL: R$ ${total.toFixed(2)}`);
  toast('Orçamento gerado com sucesso!');
}
 
// ============ RECEITAS ============
function atualizarSelectRx() {
  const sel = document.getElementById('rx-cliente');
  sel.innerHTML = '<option value="">— Selecione —</option>' +
    clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
}
function nomeArquivo(input) {
  if (input.files.length > 0) {
    document.getElementById('rx-fn-text').textContent = input.files[0].name;
    document.getElementById('rx-file-nome').style.display = 'inline-flex';
  }
}
function salvarReceita() {
  const cliId = document.getElementById('rx-cliente').value;
  const meds = document.getElementById('rx-meds').value.trim();
  if (!cliId) { toast('Selecione o cliente.', 'error'); return; }
  if (!meds) { toast('Informe os medicamentos prescritos.', 'error'); return; }
  const rx = {
    id: uid(), cliId,
    cliNome: clientes.find(c => c.id === cliId)?.nome || '—',
    medico: document.getElementById('rx-medico').value.trim(),
    crm: document.getElementById('rx-crm').value.trim(),
    data: document.getElementById('rx-data').value,
    tipo: document.getElementById('rx-tipo').value,
    num: document.getElementById('rx-num').value.trim(),
    meds, obs: document.getElementById('rx-obs').value.trim(),
    arquivo: document.getElementById('rx-file').files[0]?.name || '',
    criado: new Date().toISOString()
  };
  receitas.push(rx);
  salvarStorage(); renderReceitas(); limparReceita(); atualizarDashboard();
  toast('Receita registrada com sucesso!');
}
function limparReceita() {
  ['rx-medico','rx-crm','rx-data','rx-num','rx-meds','rx-obs'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('rx-cliente').value = '';
  document.getElementById('rx-tipo').value = 'Simples';
  document.getElementById('rx-file').value = '';
  document.getElementById('rx-file-nome').style.display = 'none';
}
function renderReceitas(filtro = '') {
  const tb = document.getElementById('tabela-receitas');
  const lista = filtro
    ? receitas.filter(r => r.cliNome.toLowerCase().includes(filtro.toLowerCase()) || (r.medico||'').toLowerCase().includes(filtro.toLowerCase()))
    : receitas;
  if (lista.length === 0) { tb.innerHTML = '<tr><td colspan="6" style="color:var(--muted);text-align:center;padding:24px">Nenhuma receita encontrada.</td></tr>'; return; }
  const tipos = { 'Simples': 'badge-rx', 'Especial': 'badge-low', 'Azul': 'badge-ok', 'Amarelo': 'badge-out' };
  tb.innerHTML = [...lista].reverse().map(r => `
    <tr>
      <td><strong>${r.cliNome}</strong></td>
      <td>${r.medico||'—'} ${r.crm ? `<small style="color:var(--muted)">(${r.crm})</small>` : ''}</td>
      <td style="font-family:'DM Mono',monospace;font-size:.8rem">${r.data ? new Date(r.data+'T00:00').toLocaleDateString('pt-BR') : '—'}</td>
      <td><span class="badge ${tipos[r.tipo]||'badge-rx'}">${r.tipo.toUpperCase()}</span></td>
      <td style="max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.meds}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removerReceita('${r.id}')">✕</button></td>
    </tr>
  `).join('');
}
function buscarReceita(v) { renderReceitas(v); }
function removerReceita(id) {
  if (!confirm('Remover esta receita?')) return;
  receitas = receitas.filter(r => r.id !== id);
  salvarStorage(); renderReceitas(); atualizarDashboard(); toast('Receita removida.');
}
 
// Fechar modal clicando fora
document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => { if (e.target === m) m.style.display = 'none'; }));