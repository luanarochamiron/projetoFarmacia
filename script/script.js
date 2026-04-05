 // =========================================================
    //  CART STATE
    // =========================================================
    let cart = [
      {
        id: 1,
        name: 'Daily Multivitamin Caps',
        price: 14.99,
        qty: 1,
        tag: 'Vitamins',
        img: 'https://images.unsplash.com/photo-1544991875-5dc1b05f607d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        id: 2,
        name: 'Allergy Relief Tablets',
        price: 12.00,
        qty: 1,
        tag: 'Medicines',
        img: 'https://images.unsplash.com/photo-1631980837307-a8f78d71f97c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      }
    ];

    let discount = 0;
    let freteValue = null; // null = não calculado

    // =========================================================
    //  OPEN / CLOSE
    // =========================================================
    function openCart() {
      renderCart();
      document.getElementById('cartDrawer').classList.add('open');
      document.getElementById('cartOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      document.getElementById('cartDrawer').classList.remove('open');
      document.getElementById('cartOverlay').classList.remove('show');
      document.body.style.overflow = '';
    }

    // =========================================================
    //  ADD TO CART
    // =========================================================
    function addToCart(name, price, img, tag) {
      const existing = cart.find(i => i.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id: Date.now(), name, price, qty: 1, img, tag });
      }
      updateBadge();
      showAddedFeedback();
      openCart();
    }

    function showAddedFeedback() {
      const badge = document.getElementById('cartBadge');
      badge.classList.add('pop');
      setTimeout(() => badge.classList.remove('pop'), 300);
    }

    // =========================================================
    //  RENDER ITEMS
    // =========================================================
    function renderCart() {
      const container = document.getElementById('cartItems');

      if (cart.length === 0) {
        container.innerHTML = `
          <div class="cart-empty">
            <i class="fa-solid fa-cart-shopping"></i>
            <p>Seu carrinho está vazio.</p>
            <button onclick="closeCart()">Ver Produtos</button>
          </div>`;
        updateSummary();
        return;
      }

      container.innerHTML = cart.map(item => `
        <div class="cart-item" id="item-${item.id}">
          <img src="${item.img}" alt="${item.name}" />
          <div class="item-info">
            <span class="item-tag">${item.tag}</span>
            <p class="item-name">${item.name}</p>
            <p class="item-price">${formatBRL(item.price)}</p>
          </div>
          <div class="item-actions">
            <div class="qty-control">
              <button onclick="changeQty(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <p class="item-total">${formatBRL(item.price * item.qty)}</p>
            <button class="remove-btn" onclick="removeItem(${item.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('');

      updateSummary();
    }

    // =========================================================
    //  QTY & REMOVE
    // =========================================================
    function changeQty(id, delta) {
      const item = cart.find(i => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) removeItem(id);
      else renderCart();
    }

    function removeItem(id) {
      const el = document.getElementById('item-' + id);
      if (el) {
        el.classList.add('removing');
        setTimeout(() => {
          cart = cart.filter(i => i.id !== id);
          renderCart();
          updateBadge();
        }, 300);
      }
    }

    // =========================================================
    //  SUMMARY
    // =========================================================
    function getSubtotal() {
      return cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    }

    function updateSummary() {
      const sub = getSubtotal();
      const disc = sub * discount;
      const frete = freteValue !== null ? freteValue : 0;
      const total = sub - disc + (freteValue !== null ? frete : 0);

      document.getElementById('subtotalVal').textContent = formatBRL(sub);
      document.getElementById('freteVal').textContent = freteValue === null ? '—' : (frete === 0 ? 'Grátis' : formatBRL(frete));
      document.getElementById('freteVal').className = frete === 0 && freteValue !== null ? 'frete-tag free' : 'frete-tag';
      document.getElementById('totalVal').textContent = freteValue === null ? formatBRL(sub - disc) : formatBRL(total);

      if (discount > 0) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discountVal').textContent = '— ' + formatBRL(disc);
      } else {
        document.getElementById('discountRow').style.display = 'none';
      }

      // PAC grátis se subtotal >= 50
      const isPACFree = sub >= 50;
      document.getElementById('pac-price').textContent = isPACFree ? 'Grátis' : 'R$ 8,90';
      document.getElementById('pac-price').className = isPACFree ? 'option-price free' : 'option-price';

      // Atualiza o input do radio PAC
      document.querySelectorAll('input[name="frete"]')[0].value = isPACFree ? '0' : '8.90';

      updateBadge();
      updateCartCount();
    }

    function updateTotal() {
      const selected = document.querySelector('input[name="frete"]:checked');
      freteValue = selected ? parseFloat(selected.value) : 0;
      updateSummary();
    }

    function updateBadge() {
      const total = cart.reduce((acc, i) => acc + i.qty, 0);
      const badge = document.getElementById('cartBadge');
      badge.textContent = total;
      badge.style.display = total === 0 ? 'none' : 'flex';
    }

    function updateCartCount() {
      const total = cart.reduce((acc, i) => acc + i.qty, 0);
      document.getElementById('cartCount').textContent = total + (total === 1 ? ' item' : ' itens');
    }

    // =========================================================
    //  FRETE
    // =========================================================
    function formatCEP(input) {
      let v = input.value.replace(/\D/g, '');
      if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
      input.value = v;
    }

    async function calcularFrete() {
      const cep = document.getElementById('cepInput').value.replace(/\D/g, '');
      const loading = document.getElementById('shippingLoading');
      const options = document.getElementById('shippingOptions');
      const error = document.getElementById('shippingError');

      options.style.display = 'none';
      error.style.display = 'none';

      if (cep.length !== 8) {
        error.style.display = 'flex';
        return;
      }

      loading.style.display = 'flex';

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        loading.style.display = 'none';

        if (data.erro) {
          error.style.display = 'flex';
          return;
        }

        // CEP válido — mostra opções
        options.style.display = 'flex';
        freteValue = 0; // PAC selecionado por default
        document.querySelectorAll('input[name="frete"]')[0].checked = true;
        updateSummary();
        updateTotal();

        // Feedback visual do endereço
        const cepInput = document.getElementById('cepInput');
        cepInput.setAttribute('title', `${data.logradouro}, ${data.bairro} — ${data.localidade}/${data.uf}`);
        cepInput.classList.add('valid-cep');

      } catch (e) {
        loading.style.display = 'none';
        error.style.display = 'flex';
      }
    }

    // =========================================================
    //  CUPOM
    // =========================================================
    const COUPONS = { 'SAUDE10': 0.10, 'FARMA15': 0.15, 'BEMVINDO': 0.05 };

    function applyCoupon() {
      const code = document.getElementById('couponInput').value.trim().toUpperCase();
      const msg = document.getElementById('couponMsg');

      if (COUPONS[code]) {
        discount = COUPONS[code];
        msg.textContent = `✅ Cupom aplicado! ${(discount * 100).toFixed(0)}% de desconto.`;
        msg.className = 'coupon-msg success';
      } else {
        discount = 0;
        msg.textContent = '❌ Cupom inválido ou expirado.';
        msg.className = 'coupon-msg error';
      }
      updateSummary();
    }

    // =========================================================
    //  CHECKOUT
    // =========================================================
    function checkout() {
      if (cart.length === 0) return;
      if (freteValue === null) {
        document.getElementById('cepInput').focus();
        document.getElementById('cepInput').classList.add('shake');
        setTimeout(() => document.getElementById('cepInput').classList.remove('shake'), 600);
        return;
      }
      alert('✅ Pedido realizado com sucesso!\nObrigado por comprar na Drogas Lícitas!');
      cart = [];
      discount = 0;
      freteValue = null;
      renderCart();
      updateBadge();
      closeCart();
    }

    // =========================================================
    //  UTILS
    // =========================================================
    function formatBRL(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Inicializa badge
    updateBadge();