// ============ DATA ============
let produtos = JSON.parse(localStorage.getItem('farma_produtos') || '[]');
let clientes = JSON.parse(localStorage.getItem('farma_clientes') || '[]');

// Demo produtos se vazio
if (produtos.length === 0) {
  produtos = [
    { id:'p1', nome:'Dipirona Sódica 500mg', cat:'Analgésico', tipo:'Livre', preco:8.90, qty:50, min:15, fab:'EMS', cod:'7891234567890' },
    { id:'p2', nome:'Amoxicilina 500mg', cat:'Antibiótico', tipo:'Receita', preco:22.50, qty:8, min:20, fab:'Medley', cod:'7899876543210' },
    { id:'p3', nome:'Ibuprofeno 600mg', cat:'Anti-inflamatório', tipo:'Receita', preco:14.80, qty:20, min:10, fab:'Eurofarma', cod:'7895555555555' },
    { id:'p4', nome:'Vitamina C 1g Efervescente', cat:'Vitamina', tipo:'Livre', preco:19.90, qty:30, min:10, fab:'Bayer', cod:'7893333333333' },
    { id:'p5', nome:'Omeprazol 20mg', cat:'Outro', tipo:'Livre', preco:12.50, qty:25, min:10, fab:'EMS', cod:'7896666666666' },
    { id:'p6', nome:'Paracetamol 750mg', cat:'Analgésico', tipo:'Livre', preco:7.20, qty:45, min:15, fab:'Medley', cod:'7897777777777' },
  ];
}

const CUPONS = { 'FARMA10': 10, 'DESCONTO20': 20, 'VIP15': 15, 'CLIENTE5': 5 };

// STATE
let caixaAberto = false;
let operador = '';
let fundoInicial = 0;
let horaAbertura = null;
let itens = [];
let pagamento = null;
let parcelas = 1;
let cupomDesconto = null; // {codigo, pct}
let clienteAtivo = null;
let totalVendas = 0;
let qtdVendas = 0;
let numCupom = Math.floor(Math.random() * 90000) + 10000;

// ============ CLOCK ============
function updateClocks() {
  const t = new Date().toLocaleTimeString('pt-BR');
  const d = new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  document.getElementById('ab-clock').textContent = t;
  document.getElementById('ab-date').textContent = d;
  const pdvClock = document.getElementById('pdv-clock');
  if (pdvClock) pdvClock.textContent = t;
}
setInterval(updateClocks, 1000); updateClocks();

// ============ ABERTURA ============
function abrirCaixa() {
  operador = document.getElementById('ab-operador').value.trim() || 'Balconista';
  fundoInicial = parseFloat(document.getElementById('ab-fundo').value) || 0;
  horaAbertura = new Date();
  caixaAberto = true;
  document.getElementById('tela-fechado').style.display = 'none';
  document.getElementById('pdv-main').style.display = 'grid';
  document.getElementById('op-nome-top').textContent = operador;
  document.getElementById('barcode-input').focus();
  toast(`Caixa aberto por ${operador} às ${horaAbertura.toLocaleTimeString('pt-BR')}`, 'success');
}

// ============ CLIENTE ============
function formatCPF(input) {
  let v = input.value.replace(/\D/g,'');
  if (v.length > 11) v = v.slice(0,11);
  if (v.length > 9) v = v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6,9)+'-'+v.slice(9);
  else if (v.length > 6) v = v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6);
  else if (v.length > 3) v = v.slice(0,3)+'.'+v.slice(3);
  input.value = v;
}
function buscarCPF() {
  const cpf = document.getElementById('cpf-input').value.replace(/\D/g,'');
  if (!cpf) { toast('Digite o CPF do cliente.', 'error'); return; }
  const cli = clientes.find(c => (c.cpf||'').replace(/\D/g,'') === cpf);
  if (!cli) { toast('CPF não encontrado. Venda sem identificação.', 'info'); return; }
  clienteAtivo = cli;
  document.getElementById('cli-input-area').style.display = 'none';
  document.getElementById('cli-info-wrap').style.display = 'block';
  document.getElementById('cli-nome-show').textContent = '👤 ' + cli.nome;
  document.getElementById('cli-cpf-show').textContent = cli.cpf + (cli.convenio ? ' | ' + cli.convenio : '');
  toast(`Cliente identificado: ${cli.nome}`, 'success');
}
function limparCliente() {
  clienteAtivo = null;
  document.getElementById('cpf-input').value = '';
  document.getElementById('cli-input-area').style.display = 'block';
  document.getElementById('cli-info-wrap').style.display = 'none';
}

// ============ SCANNER / BUSCA ============
function scanItem() {
  const q = document.getElementById('barcode-input').value.trim();
  if (!q) return;
  let prod = null;
  // busca por código de barras exato
  prod = produtos.find(p => p.cod === q);
  // se não, busca por nome parcial
  if (!prod) prod = produtos.find(p => p.nome.toLowerCase().includes(q.toLowerCase()));
  if (!prod) { toast(`Produto "${q}" não encontrado no estoque.`, 'error'); return; }
  if (prod.qty === 0) { toast(`"${prod.nome}" sem estoque!`, 'error'); return; }
  adicionarItem(prod);
  document.getElementById('barcode-input').value = '';
  document.getElementById('barcode-input').focus();
}
function adicionarItem(prod) {
  const exist = itens.find(i => i.id === prod.id);
  if (exist) {
    if (exist.qty >= prod.qty) { toast('Quantidade máxima em estoque atingida.', 'error'); return; }
    exist.qty++;
  } else {
    itens.push({ id: prod.id, nome: prod.nome, tipo: prod.tipo, preco: prod.preco, qty: 1, maxQty: prod.qty });
  }
  renderItens();
  toast(`${prod.nome} adicionado`, 'success');
}
function renderItens() {
  const body = document.getElementById('itens-body');
  document.getElementById('itens-count').textContent = itens.reduce((s,i) => s+i.qty, 0);
  if (itens.length === 0) {
    body.innerHTML = `<div class="itens-vazio"><div class="vazio-icon">📦</div><span>Nenhum item adicionado</span><small style="font-size:.75rem">Use o leitor ou busca acima</small></div>`;
    atualizarTotais(); return;
  }
  body.innerHTML = itens.map((item, idx) => `
    <div class="item-row">
      <div class="item-seq">${idx+1}</div>
      <div class="item-nome">
        ${item.nome}
        <small>${item.tipo !== 'Livre' ? `<span class="badge badge-rx">${item.tipo.toUpperCase()}</span>` : ''} R$ ${item.preco.toFixed(2)} un</small>
      </div>
      <div class="item-qty-ctrl">
        <button class="qty-btn" onclick="qtyItem('${item.id}',-1)">−</button>
        <span class="item-qty">${item.qty}</span>
        <button class="qty-btn" onclick="qtyItem('${item.id}',1)">+</button>
      </div>
      <div class="item-total">R$ ${(item.preco*item.qty).toFixed(2)}</div>
      <button class="item-del" onclick="removerItem('${item.id}')">🗑</button>
    </div>
  `).join('');
  atualizarTotais();
}
function qtyItem(id, d) {
  const i = itens.find(x => x.id === id);
  if (!i) return;
  const nova = i.qty + d;
  if (nova < 1) { removerItem(id); return; }
  if (nova > i.maxQty) { toast('Sem estoque suficiente.', 'error'); return; }
  i.qty = nova;
  renderItens();
}
function removerItem(id) {
  itens = itens.filter(x => x.id !== id);
  renderItens();
}
function limparVenda() {
  itens = [];
  cupomDesconto = null;
  pagamento = null;
  clienteAtivo = null;
  parcelas = 1;
  document.getElementById('cupom-input').value = '';
  document.getElementById('cupom-ok').style.display = 'none';
  document.getElementById('btn-rem-cupom').style.display = 'none';
  document.getElementById('row-desconto').style.display = 'none';
  document.querySelectorAll('.pag-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('parcelas-wrap').style.display = 'none';
  document.getElementById('pix-wrap').style.display = 'none';
  document.getElementById('troco-wrap').style.display = 'none';
  document.getElementById('recebido-input').value = '';
  document.getElementById('troco-val').style.display = 'none';
  limparCliente();
  renderItens();
}

// ============ TOTAIS ============
function subtotal() { return itens.reduce((s,i) => s + i.preco*i.qty, 0); }
function totalComDesconto() {
  const sub = subtotal();
  if (!cupomDesconto) return sub;
  return sub * (1 - cupomDesconto.pct / 100);
}
function atualizarTotais() {
  const sub = subtotal();
  const tot = totalComDesconto();
  const desc = sub - tot;
  document.getElementById('val-subtotal').textContent = 'R$ ' + sub.toFixed(2).replace('.',',');
  document.getElementById('val-total').textContent = 'R$ ' + tot.toFixed(2).replace('.',',');
  if (desc > 0) {
    document.getElementById('row-desconto').style.display = 'flex';
    document.getElementById('val-desconto').textContent = '− R$ ' + desc.toFixed(2).replace('.',',');
  }
  // atualizar pix valor
  document.getElementById('pix-valor').textContent = 'R$ ' + tot.toFixed(2).replace('.',',');
  // botão finalizar
  document.getElementById('btn-finalizar').disabled = !(itens.length > 0 && pagamento);
}

// ============ CUPOM DESCONTO ============
function aplicarCupom() {
  const cod = document.getElementById('cupom-input').value.trim().toUpperCase();
  if (!cod) return;
  if (cupomDesconto) { toast('Já há um cupom aplicado.', 'error'); return; }
  const pct = CUPONS[cod];
  if (!pct) { toast(`Cupom "${cod}" inválido ou expirado.`, 'error'); return; }
  cupomDesconto = { codigo: cod, pct };
  document.getElementById('cupom-ok').style.display = 'flex';
  document.getElementById('cupom-desc-text').textContent = `${cod} — ${pct}% OFF`;
  document.getElementById('btn-rem-cupom').style.display = 'block';
  document.getElementById('cupom-input').value = '';
  atualizarTotais();
  toast(`Cupom ${cod} aplicado — ${pct}% de desconto! 🎉`, 'success');
}
function removerCupom() {
  cupomDesconto = null;
  document.getElementById('cupom-ok').style.display = 'none';
  document.getElementById('btn-rem-cupom').style.display = 'none';
  document.getElementById('row-desconto').style.display = 'none';
  atualizarTotais();
  toast('Cupom removido.');
}

// ============ PAGAMENTO ============
function selecionarPag(tipo, btn) {
  pagamento = tipo;
  document.querySelectorAll('.pag-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('parcelas-wrap').style.display = tipo === 'credito' ? 'block' : 'none';
  document.getElementById('pix-wrap').style.display = tipo === 'pix' ? 'block' : 'none';
  document.getElementById('troco-wrap').style.display = tipo === 'dinheiro' ? 'block' : 'none';
  if (tipo === 'credito') renderParcelas();
  atualizarTotais();
}
function renderParcelas() {
  const grid = document.getElementById('parcelas-grid');
  grid.innerHTML = [1,2,3,4,5,6,8,10,12].map(n => {
    const tot = totalComDesconto();
    const val = (tot/n).toFixed(2);
    return `<div class="parc-btn ${parcelas===n?'sel':''}" onclick="selecionarParcela(${n})">${n}x<br><small style="font-size:.65rem">R$${val}</small></div>`;
  }).join('');
}
function selecionarParcela(n) {
  parcelas = n;
  renderParcelas();
}
function calcTroco() {
  const rec = parseFloat(document.getElementById('recebido-input').value) || 0;
  const tot = totalComDesconto();
  const troco = rec - tot;
  const el = document.getElementById('troco-val');
  const num = document.getElementById('troco-num');
  if (rec > 0) {
    el.style.display = 'block';
    num.textContent = troco >= 0 ? 'R$ ' + troco.toFixed(2).replace('.',',') : '— valor insuficiente';
    num.style.color = troco >= 0 ? 'var(--success)' : 'var(--danger)';
  } else { el.style.display = 'none'; }
}

// ============ FINALIZAR ============
function finalizarVenda() {
  if (itens.length === 0 || !pagamento) return;
  if (pagamento === 'dinheiro') {
    const rec = parseFloat(document.getElementById('recebido-input').value) || 0;
    if (rec < totalComDesconto()) { toast('Valor recebido insuficiente.', 'error'); return; }
  }
  // descontar estoque
  itens.forEach(item => {
    const p = produtos.find(x => x.id === item.id);
    if (p) p.qty = Math.max(0, p.qty - item.qty);
  });
  localStorage.setItem('farma_produtos', JSON.stringify(produtos));

  const tot = totalComDesconto();
  totalVendas += tot;
  qtdVendas++;
  numCupom++;
  abrirCupom();
}
function abrirCupom() {
  const now = new Date();
  const hora = now.getHours();
  let saudacao, emoji;
  if (hora < 12) { saudacao = 'Bom dia! Obrigado pela compra!'; emoji = '☀️'; }
  else if (hora < 18) { saudacao = 'Boa tarde! Obrigado pela compra!'; emoji = '🌤️'; }
  else { saudacao = 'Boa noite! Obrigado pela compra!'; emoji = '🌙'; }

  document.getElementById('cupom-data-hora').textContent = now.toLocaleString('pt-BR');
  document.getElementById('cupom-num').textContent = numCupom;
  document.getElementById('cupom-emoji').textContent = emoji;
  document.getElementById('cupom-msg').textContent = saudacao;
  document.getElementById('cupom-sub').textContent = 'Volte sempre — FarmaSystem 💊';

  // cliente
  const cliLinha = document.getElementById('cupom-cliente-linha');
  if (clienteAtivo) {
    cliLinha.innerHTML = `<div class="cupom-linha"><span>CLIENTE</span><span>${clienteAtivo.nome}</span></div><div class="cupom-linha"><span>CPF</span><span>${clienteAtivo.cpf}</span></div>`;
  } else { cliLinha.innerHTML = ''; }

  // itens
  document.getElementById('cupom-itens').innerHTML = itens.map(i =>
    `<div class="cupom-linha"><span style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.nome.slice(0,22)}</span><span>${i.qty}x R$${i.preco.toFixed(2)} = R$${(i.qty*i.preco).toFixed(2)}</span></div>`
  ).join('');

  // totais
  const sub = subtotal();
  const tot = totalComDesconto();
  let totHtml = `<div class="cupom-linha"><span>Subtotal</span><span>R$ ${sub.toFixed(2)}</span></div>`;
  if (cupomDesconto) totHtml += `<div class="cupom-linha" style="color:var(--success)"><span>Desconto (${cupomDesconto.codigo})</span><span>− R$ ${(sub-tot).toFixed(2)}</span></div>`;
  totHtml += `<div class="cupom-linha bold"><span>TOTAL</span><span>R$ ${tot.toFixed(2)}</span></div>`;
  document.getElementById('cupom-totais').innerHTML = totHtml;

  // pagamento
  const pagLabels = { pix:'PIX', dinheiro:'Dinheiro', debito:'Débito', credito:`Crédito ${parcelas}x` };
  document.getElementById('cupom-pag').textContent = pagLabels[pagamento] || pagamento;

  // troco
  const trocoEl = document.getElementById('cupom-troco-linha');
  if (pagamento === 'dinheiro') {
    const rec = parseFloat(document.getElementById('recebido-input').value) || 0;
    const troco = rec - tot;
    trocoEl.innerHTML = `<div class="cupom-linha"><span>Recebido</span><span>R$ ${rec.toFixed(2)}</span></div><div class="cupom-linha" style="color:var(--success)"><span>Troco</span><span>R$ ${troco.toFixed(2)}</span></div>`;
  } else { trocoEl.innerHTML = ''; }

  document.getElementById('pix-valor').textContent = 'R$ ' + tot.toFixed(2).replace('.',',');
  document.getElementById('modal-cupom').style.display = 'flex';
}
function imprimirCupom() { window.print(); }
function novaVenda() {
  fecharModal('modal-cupom');
  limparVenda();
  document.getElementById('barcode-input').focus();
}

// ============ FECHAMENTO ============
function abrirFechamento() {
  const now = new Date();
  document.getElementById('f-abertura').textContent = horaAbertura ? horaAbertura.toLocaleTimeString('pt-BR') : '—';
  document.getElementById('f-fechamento').textContent = now.toLocaleTimeString('pt-BR');
  document.getElementById('f-vendas').textContent = qtdVendas;
  document.getElementById('f-total').textContent = 'R$ ' + totalVendas.toFixed(2).replace('.',',');
  document.getElementById('f-fundo').textContent = 'R$ ' + fundoInicial.toFixed(2).replace('.',',');
  document.getElementById('f-caixa').textContent = 'R$ ' + (fundoInicial + totalVendas).toFixed(2).replace('.',',');
  document.getElementById('modal-fechamento').style.display = 'flex';
}
function confirmarFechamento() {
  fecharModal('modal-fechamento');
  document.getElementById('pdv-main').style.display = 'none';
  document.getElementById('tela-fechado').style.display = 'flex';
  // reset
  caixaAberto = false; itens = []; pagamento = null; cupomDesconto = null; clienteAtivo = null;
  totalVendas = 0; qtdVendas = 0; horaAbertura = null;
  toast('Caixa fechado com sucesso. Até logo!', 'success');
}

// ============ TOAST ============
function toast(msg, tipo='success') {
  const w = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = `toast ${tipo}`;
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  el.innerHTML = `<span style="font-size:1.1rem">${icons[tipo]||'ℹ️'}</span><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }

// fechar modal clicando fora
document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => {
  if (e.target === m && m.id !== 'modal-cupom') m.style.display = 'none';
}));

// ENTER no scanner
document.addEventListener('keydown', e => {
  if (e.key === 'F2') { document.getElementById('barcode-input').focus(); }
});