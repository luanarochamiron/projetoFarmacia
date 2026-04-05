function switchTab(tab) {
    document.getElementById('tab-login').classList.toggle('active', tab==='login');
    document.getElementById('tab-register').classList.toggle('active', tab==='register');
    document.getElementById('form-login').classList.toggle('active', tab==='login');
    document.getElementById('form-register').classList.toggle('active', tab==='register');
    // reset success states
    document.getElementById('login-success').style.display='none';
    document.getElementById('register-success').style.display='none';
  }

  /* ── TOGGLE PASSWORD ── */
  function togglePw(id, btn) {
    const input = document.getElementById(id);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = show ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
  }

  /* ── MASKS ── */
  function maskCPF(el) {
    let v = el.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 9)       v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/,'$1.$2.$3-$4');
    else if (v.length > 6)  v = v.replace(/(\d{3})(\d{3})(\d{0,3})/,'$1.$2.$3');
    else if (v.length > 3)  v = v.replace(/(\d{3})(\d{0,3})/,'$1.$2');
    el.value = v;
    validateCPF(v);
  }

  function maskDate(el) {
    let v = el.value.replace(/\D/g,'').slice(0,8);
    if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d{0,4})/,'$1/$2/$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,2})/,'$1/$2');
    el.value = v;
  }

  function maskPhone(el) {
    let v = el.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/,'($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/,'($1) $2');
    el.value = v;
  }

  function maskCEP(el) {
    let v = el.value.replace(/\D/g,'').slice(0,8);
    if (v.length > 5) v = v.slice(0,5)+'-'+v.slice(5);
    el.value = v;
  }

  /* ── CPF VALIDATION ── */
  function validateCPF(val) {
    const note = document.getElementById('cpf-note');
    const raw = val.replace(/\D/g,'');
    if (raw.length < 11) { note.textContent=''; note.className='field-note'; return; }
    const valid = checkCPF(raw);
    note.textContent = valid ? '✅ CPF válido' : '❌ CPF inválido';
    note.className = valid ? 'field-note ok' : 'field-note err';
  }

  function checkCPF(c) {
    if (/^(\d)\1+$/.test(c)) return false;
    let s=0; for(let i=0;i<9;i++) s+=parseInt(c[i])*(10-i);
    let r=11-(s%11); if(r>=10) r=0; if(r!==parseInt(c[9])) return false;
    s=0; for(let i=0;i<10;i++) s+=parseInt(c[i])*(11-i);
    r=11-(s%11); if(r>=10) r=0; return r===parseInt(c[10]);
  }

  /* ── EMAIL VALIDATION ── */
  function validateEmail(el) {
    const note = document.getElementById('email-note');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    if (!el.value) { note.textContent=''; return; }
    note.textContent = ok ? '✅ E-mail válido' : '❌ Formato inválido';
    note.className = ok ? 'field-note ok' : 'field-note err';
  }

  /* ── PASSWORD STRENGTH ── */
  function checkStrength(el) {
    const v = el.value;
    let score = 0;
    if (v.length >= 8)              score++;
    if (/[A-Z]/.test(v))            score++;
    if (/[0-9]/.test(v))            score++;
    if (/[^A-Za-z0-9]/.test(v))     score++;
    const bars = document.querySelectorAll('.pw-bar');
    const labels = ['','Fraca 😟','Razoável 😐','Boa 😊','Forte 💪'];
    const cls = ['','s1','s2','s3','s3'];
    bars.forEach((b,i) => { b.className='pw-bar'; if(i<score) b.classList.add(cls[score]); });
    const note = document.getElementById('pw-note');
    note.textContent = v ? labels[score]||'' : '';
    note.className = score >= 3 ? 'field-note ok' : 'field-note err';
  }

  function checkMatch() {
    const pw = document.getElementById('r-pw').value;
    const pw2 = document.getElementById('r-pw2').value;
    const note = document.getElementById('pw2-note');
    if (!pw2) { note.textContent=''; return; }
    const ok = pw === pw2;
    note.textContent = ok ? '✅ Senhas conferem' : '❌ Senhas não conferem';
    note.className = ok ? 'field-note ok' : 'field-note err';
  }

  /* ── CEP LOOKUP ── */
  async function buscarCEP() {
    const cep = document.getElementById('r-cep').value.replace(/\D/g,'');
    const note = document.getElementById('cep-note');
    const btn  = document.getElementById('cepBtn');
    if (cep.length !== 8) { note.textContent='❌ CEP inválido'; note.className='field-note err'; return; }
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Buscando...';
    btn.disabled = true;
    note.textContent = ''; note.className = 'field-note';
    try {
      const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r=>r.json());
      btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Buscar';
      btn.disabled = false;
      if (data.erro) { note.textContent='❌ CEP não encontrado'; note.className='field-note err'; return; }
      document.getElementById('r-street').value = data.logradouro || '';
      document.getElementById('r-neigh').value  = data.bairro     || '';
      document.getElementById('r-city').value   = data.localidade || '';
      document.getElementById('r-state').value  = data.uf         || 'SP';
      document.getElementById('r-num').focus();
      note.textContent = `✅ ${data.logradouro}, ${data.bairro} — ${data.localidade}/${data.uf}`;
      note.className = 'field-note ok';
      showToast('📍 Endereço preenchido automaticamente!', 'ok');
    } catch {
      btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Buscar';
      btn.disabled = false;
      note.textContent = '❌ Erro ao buscar CEP. Tente novamente.';
      note.className = 'field-note err';
    }
  }

  /* ── LOGIN ── */
  function doLogin() {
    const email = document.getElementById('l-email').value.trim();
    const pw    = document.getElementById('l-pw').value;
    if (!email || !pw) { showToast('⚠️ Preencha e-mail e senha.','err'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('❌ E-mail inválido.','err'); return; }
    if (pw.length < 6) { showToast('❌ Senha muito curta.','err'); return; }
    // simulate async login
    const btn = document.querySelector('#form-login .submit-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.style.display = 'none';
      document.getElementById('login-success').style.display = 'flex';
      showToast('✅ Login realizado com sucesso!', 'ok');
      setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    }, 1400);
  }

  /* ── REGISTER ── */
  function doRegister() {
    const req = [
      ['r-name',  'Nome completo'],
      ['r-cpf',   'CPF'],
      ['r-birth', 'Data de nascimento'],
      ['r-phone', 'Telefone'],
      ['r-email', 'E-mail'],
      ['r-pw',    'Senha'],
      ['r-pw2',   'Confirmação de senha'],
      ['r-cep',   'CEP'],
      ['r-street','Logradouro'],
      ['r-num',   'Número'],
      ['r-neigh', 'Bairro'],
      ['r-city',  'Cidade'],
    ];
    for (const [id, lbl] of req) {
      if (!document.getElementById(id).value.trim()) {
        document.getElementById(id).focus();
        showToast(`⚠️ Preencha o campo: ${lbl}`, 'err'); return;
      }
    }
    const cpfRaw = document.getElementById('r-cpf').value.replace(/\D/g,'');
    if (!checkCPF(cpfRaw)) { showToast('❌ CPF inválido.','err'); return; }
    const pw  = document.getElementById('r-pw').value;
    const pw2 = document.getElementById('r-pw2').value;
    if (pw !== pw2) { showToast('❌ As senhas não conferem.','err'); return; }
    if (pw.length < 8) { showToast('❌ Senha deve ter ao menos 8 caracteres.','err'); return; }
    if (!document.getElementById('r-terms').checked) { showToast('⚠️ Aceite os Termos de Uso para continuar.','err'); return; }
    // simulate async register
    const btn = document.querySelector('#form-register .submit-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Criando conta...';
    btn.disabled = true;
    setTimeout(() => {
      btn.style.display = 'none';
      document.getElementById('register-success').style.display = 'flex';
      showToast('🎉 Conta criada! Bem-vindo à Drogas Lícitas!', 'ok');
    }, 1600);
  }

  /* ── GOOGLE LOGIN ── */
  function loginGoogle() {
    showToast('🔄 Redirecionando para o Google...', 'ok');
    // In production: window.location.href = '/auth/google'
  }

  /* ── FORGOT PW ── */
  function forgotPw(e) {
    e.preventDefault();
    const email = document.getElementById('l-email').value.trim();
    if (!email) { showToast('⚠️ Informe seu e-mail primeiro.','err'); document.getElementById('l-email').focus(); return; }
    showToast(`✅ Link de recuperação enviado para ${email}`, 'ok');
  }

  /* ── TOAST ── */
  let toastT;
  function showToast(msg, type='ok') {
    const t = document.getElementById('toast');
    t.className = `toast ${type}`;
    t.querySelector('i').className = type === 'ok'
      ? 'fa-solid fa-circle-check'
      : 'fa-solid fa-circle-exclamation';
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ── CEP on Enter ── */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('r-cep').addEventListener('keydown', e => {
      if (e.key === 'Enter') buscarCEP();
    });
    document.getElementById('l-pw').addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });