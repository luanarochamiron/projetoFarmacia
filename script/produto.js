/* ═══════════════════════════════
   PRODUCT DATABASE (rich data)
═══════════════════════════════ */
const PRODS = [
  {
    id: 1,
    name: "Vitamina C 1000mg",
    price: 24.9,
    old: 32.0,
    cat: "Vitaminas",
    tagCls: "green",
    stars: 4.9,
    rev: 312,
    sale: true,
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
    ],
    shortDesc:
      "Vitamina C de alta concentração para reforço imunológico, antioxidante e síntese de colágeno. Fórmula de liberação prolongada para absorção eficiente ao longo do dia.",
    description:
      "A Vitamina C 1000mg é um suplemento alimentar de alta potência, desenvolvido para auxiliar no fortalecimento do sistema imunológico. Sua fórmula de liberação lenta garante absorção eficiente, minimizando desconfortos gastrointestinais comuns em doses elevadas de ácido ascórbico.",
    benefits: [
      "Fortalece o sistema imunológico",
      "Age como potente antioxidante",
      "Auxilia na síntese de colágeno",
      "Melhora a absorção de ferro",
      "Contribui para a saúde da pele",
    ],
    usage:
      "Tomar 1 cápsula ao dia, preferencialmente junto às refeições. Não exceder a dose recomendada.",
    variants: ["30 cápsulas", "60 cápsulas", "90 cápsulas", "180 cápsulas"],
    activeVariant: 1,
    info: [
      ["Fabricante", "Suplementos Vitale Ltda."],
      ["Registro ANVISA", "6.1234.0001.001-1"],
      ["Princípio Ativo", "Ácido Ascórbico 1000mg"],
      ["Excipientes", "Celulose, estearato de magnésio"],
      ["Forma Farmacêutica", "Cápsula de liberação prolongada"],
      ["Armazenamento", "Local fresco e seco, longe da luz"],
      ["Validade", "24 meses a partir da fabricação"],
      ["Código de Barras", "7891234567890"],
    ],
    reviews: [
      {
        name: "Ana Paula M.",
        color: "#6366f1",
        stars: 5,
        date: "12/03/2026",
        text: "Excelente produto! Tomo há 6 meses e sinto uma diferença enorme na imunidade. Não peguei nem um resfriado esse inverno.",
        verified: true,
        tag: "Compra Verificada",
      },
      {
        name: "Carlos S.",
        color: "#10b981",
        stars: 4,
        date: "28/02/2026",
        text: "Boa qualidade, cápsula fácil de engolir. Entrega foi super rápida também, chegou em 2 dias.",
        verified: true,
        tag: "Compra Verificada",
      },
      {
        name: "Fernanda R.",
        color: "#f97316",
        stars: 5,
        date: "15/01/2026",
        text: "Recomendo muito! Comecei a tomar junto com o Zinco e os resultados são ótimos. Vale cada centavo.",
        verified: false,
        tag: "",
      },
    ],
    ratingBreakdown: [70, 20, 7, 2, 1],
  },
  {
    id: 2,
    name: "Dipirona Monoidratada 500mg",
    price: 8.9,
    old: null,
    cat: "Medicamentos",
    tagCls: "blue",
    stars: 4.8,
    rev: 598,
    sale: false,
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
    ],
    shortDesc:
      "Analgésico e antitérmico indicado para dores de cabeça, musculares, cólicas e estados febris. Apresentação em comprimidos revestidos de fácil deglutição.",
    description:
      "A Dipirona Monoidratada 500mg é um medicamento analgésico e antitérmico amplamente utilizado para alívio de dores moderadas a intensas e redução da febre. Pertence ao grupo dos anti-inflamatórios não esteroidais (AINEs) da classe das pirazolonas.",
    benefits: [
      "Alívio rápido de dores",
      "Redução eficaz da febre",
      "Ação antiespasmódica",
      "Comprimido revestido de fácil deglutição",
    ],
    usage:
      "Adultos: 1 a 2 comprimidos de 4 em 4 horas ou até 3 vezes ao dia. Não exceder 8 comprimidos por dia. Venda sob prescrição médica.",
    variants: ["10 comprimidos", "20 comprimidos", "30 comprimidos"],
    activeVariant: 1,
    info: [
      ["Fabricante", "Laboratório Medpharma S.A."],
      ["Registro ANVISA", "1.0001.0002.001-5"],
      ["Princípio Ativo", "Dipirona Monoidratada 500mg"],
      ["Classe Terapêutica", "Analgésico/Antitérmico"],
      ["Forma Farmacêutica", "Comprimido revestido"],
      ["Necessita Receita", "Não"],
      ["Armazenamento", "Temperatura ambiente, proteger da umidade"],
      ["Validade", "36 meses"],
    ],
    reviews: [
      {
        name: "Marcos T.",
        color: "#2563eb",
        stars: 5,
        date: "01/03/2026",
        text: "Produto de qualidade, genérico que funciona tão bem quanto o original. Preço excelente aqui no site.",
        verified: true,
        tag: "Compra Verificada",
      },
      {
        name: "Lúcia O.",
        color: "#db2777",
        stars: 5,
        date: "20/02/2026",
        text: "Sempre compro aqui. Entrega rápida, produto lacrado e preço muito bom.",
        verified: true,
        tag: "Compra Verificada",
      },
    ],
    ratingBreakdown: [80, 15, 4, 1, 0],
  },
  {
    id: 3,
    name: "Creme Hidratante Facial",
    price: 39.9,
    old: 52.0,
    cat: "Cuidado Pessoal",
    tagCls: "pink",
    stars: 4.7,
    rev: 174,
    sale: true,
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    ],
    shortDesc:
      "Creme facial intensamente hidratante com ácido hialurônico e vitamina E. Fórmula não oleosa para uso diurno e noturno em todos os tipos de pele.",
    description:
      "Formulado com tecnologia de microesferas de ácido hialurônico, este creme penetra nas camadas profundas da pele, proporcionando hidratação de longa duração. Livre de parabenos e testado dermatologicamente.",
    benefits: [
      "Hidratação profunda por até 24h",
      "Suaviza linhas finas",
      "Não obstrui os poros",
      "Testado dermatologicamente",
    ],
    usage:
      "Aplique pequena quantidade no rosto limpo, de manhã e à noite. Evite contato com os olhos.",
    variants: ["30ml", "50ml", "100ml"],
    activeVariant: 1,
    info: [
      ["Fabricante", "DermaCare Cosméticos"],
      ["Registro ANVISA", "25351.000001/2024-50"],
      ["Volume", "50ml"],
      ["Tipo de Pele", "Todos os tipos"],
      ["Fragrância", "Suave"],
      ["Validade", "24 meses"],
      ["Origem", "Brasil"],
    ],
    reviews: [
      {
        name: "Juliana K.",
        color: "#7c3aed",
        stars: 5,
        date: "10/03/2026",
        text: "Melhor hidratante que já usei! A textura é leve e absorve rápido. Minha pele ficou muito mais macia.",
        verified: true,
        tag: "Compra Verificada",
      },
    ],
    ratingBreakdown: [65, 25, 7, 2, 1],
  },
  {
    id: 4,
    name: "Loção Bebê Gentle",
    price: 19.9,
    old: null,
    cat: "Bebê",
    tagCls: "purple",
    stars: 4.9,
    rev: 421,
    sale: false,
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
    ],
    shortDesc:
      "Loção corporal delicada para a pele sensível dos bebês. Fórmula hipoalergênica com extrato de camomila e vitaminas A e E.",
    description:
      "Desenvolvida especialmente para a pele delicada dos bebês, esta loção possui pH neutro e é livre de sulfatos, parabenos e corantes. O extrato de camomila acalma a pele e a vitamina E nutre e protege.",
    benefits: [
      "Fórmula hipoalergênica",
      "pH neutro",
      "Livre de sulfatos e parabenos",
      "Dermatologicamente testada",
      "Suave aroma de camomila",
    ],
    usage:
      "Aplique após o banho em todo o corpinho do bebê, massageando suavemente. Evite contato com os olhos.",
    variants: ["200ml", "400ml"],
    activeVariant: 0,
    info: [
      ["Fabricante", "BabyCare Brasil"],
      ["Registro ANVISA", "25351.000002/2024-11"],
      ["Volume", "200ml"],
      ["Faixa Etária", "Recém-nascidos e acima"],
      ["Alergênicos", "Não contém"],
      ["Validade", "24 meses"],
    ],
    reviews: [
      {
        name: "Roberta F.",
        color: "#10b981",
        stars: 5,
        date: "05/03/2026",
        text: "Uso no meu bebê desde o nascimento. A pele dele é super sensível e nunca tive nenhuma reação. Recomendo demais!",
        verified: true,
        tag: "Compra Verificada",
      },
      {
        name: "Patricia L.",
        color: "#f97316",
        stars: 5,
        date: "18/02/2026",
        text: "Cheirinho maravilhoso e absorção rápida. Minha filha ama a hora da massagem!",
        verified: true,
        tag: "Compra Verificada",
      },
    ],
    ratingBreakdown: [85, 12, 2, 1, 0],
  },
  {
    id: 5,
    name: "Protetor Solar FPS 50",
    price: 44.9,
    old: 59.9,
    cat: "Dermocosméticos",
    tagCls: "orange",
    stars: 4.8,
    rev: 239,
    sale: true,
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    ],
    shortDesc:
      "Protetor solar FPS 50 com proteção UVA/UVB, textura fluida e toque seco. Indicado para uso diário no rosto e corpo.",
    description:
      "Fórmula de última geração com filtros solares de amplo espectro, protege contra raios UVA e UVB. A textura ultrafluida e não oleosa garante conforto para uso diário, sem deixar resíduo branco.",
    benefits: [
      "Proteção UVA/UVB amplo espectro",
      "Toque seco, sem oleosidade",
      "Resistente ao suor",
      "Enriquecido com vitamina E",
    ],
    usage:
      "Aplique generosamente 20 minutos antes da exposição solar. Reaplicar a cada 2 horas ou após nadar/suar.",
    variants: ["FPS 30", "FPS 50", "FPS 70"],
    activeVariant: 1,
    info: [
      ["Fabricante", "SunShield Cosméticos"],
      ["FPS", "50"],
      ["PPD", "≥16"],
      ["Volume", "120ml"],
      ["Tipo de Pele", "Todos os tipos"],
      ["Resistência", "Água e suor"],
      ["Validade", "24 meses"],
    ],
    reviews: [
      {
        name: "Bruno M.",
        color: "#2563eb",
        stars: 5,
        date: "25/02/2026",
        text: "Uso todo dia e não resseca. Melhor custo-benefício que encontrei.",
        verified: true,
        tag: "Compra Verificada",
      },
    ],
    ratingBreakdown: [72, 20, 5, 2, 1],
  },
  {
    id: 6,
    name: "Ômega 3 — 60 cápsulas",
    price: 32.0,
    old: null,
    cat: "Vitaminas",
    tagCls: "green",
    stars: 4.6,
    rev: 187,
    sale: false,
    img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    ],
    shortDesc:
      "Óleo de peixe de alta pureza com EPA e DHA. Sem sabor de peixe, cápsula de fácil deglutição.",
    description:
      "Suplemento de ômega-3 extraído de peixes de águas frias, com alto teor de EPA e DHA. Processo de purificação molecular garante produto livre de mercúrio e contaminantes.",
    benefits: [
      "Saúde cardiovascular",
      "Função cognitiva",
      "Anti-inflamatório natural",
      "Saúde ocular",
    ],
    usage: "2 cápsulas ao dia com as refeições.",
    variants: ["30 cápsulas", "60 cápsulas", "120 cápsulas"],
    activeVariant: 1,
    info: [
      ["Fabricante", "OmegaVitae"],
      ["EPA por dose", "360mg"],
      ["DHA por dose", "240mg"],
      ["Origem", "Óleo de anchova"],
      ["Validade", "24 meses"],
    ],
    reviews: [],
    ratingBreakdown: [60, 25, 10, 4, 1],
  },
  {
    id: 7,
    name: "Ibuprofeno 400mg — 20cp",
    price: 12.5,
    old: null,
    cat: "Medicamentos",
    tagCls: "blue",
    stars: 4.7,
    rev: 344,
    sale: false,
    img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    ],
    shortDesc:
      "Anti-inflamatório, analgésico e antitérmico. Indicado para dores musculares, articulares, dor de cabeça e febre.",
    description:
      "O ibuprofeno é um AINE (Anti-inflamatório não esteroidal) com ação analgésica, antipirética e anti-inflamatória, indicado para tratamento de dores leves a moderadas.",
    benefits: [
      "Ação anti-inflamatória",
      "Alívio de dores musculares",
      "Redução da febre",
      "Início de ação rápido",
    ],
    usage: "1 comprimido a cada 6-8 horas. Tomar com alimentos.",
    variants: ["20 comprimidos", "30 comprimidos"],
    activeVariant: 0,
    info: [
      ["Fabricante", "Genéricos Brasil"],
      ["Princípio Ativo", "Ibuprofeno 400mg"],
      ["Classe", "AINE"],
      ["Validade", "36 meses"],
    ],
    reviews: [],
    ratingBreakdown: [68, 22, 7, 2, 1],
  },
  {
    id: 8,
    name: "Sérum Vitamina E",
    price: 56.0,
    old: 72.0,
    cat: "Dermocosméticos",
    tagCls: "orange",
    stars: 4.9,
    rev: 128,
    sale: true,
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    ],
    shortDesc:
      "Sérum facial concentrado com Vitamina E, niacinamida e ácido hialurônico. Textura levinha que penetra rapidamente.",
    description:
      "Sérum de alta concentração que combina vitamina E, niacinamida e ácido hialurônico para uma ação antioxidante, iluminadora e hidratante poderosa.",
    benefits: [
      "Ação antioxidante intensa",
      "Uniformiza o tom da pele",
      "Hidratação profunda",
      "Reduz manchas",
    ],
    usage:
      "Aplicar 3-5 gotas no rosto após limpeza, antes do hidratante. Usar de manhã e à noite.",
    variants: ["30ml", "50ml"],
    activeVariant: 0,
    info: [
      ["Fabricante", "Glow Science"],
      ["Volume", "30ml"],
      ["Tipo de Pele", "Todos os tipos"],
      ["Validade", "18 meses"],
    ],
    reviews: [],
    ratingBreakdown: [78, 15, 4, 2, 1],
  },
  {
    id: 9,
    name: "Shampoo Infantil",
    price: 18.9,
    old: null,
    cat: "Bebê",
    tagCls: "purple",
    stars: 4.8,
    rev: 265,
    sale: false,
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    ],
    shortDesc:
      "Shampoo infantil de fórmula suave sem lágrimas. pH neutro, livre de parabenos e fragrâncias artificiais.",
    description:
      "Fórmula suave desenvolvida especialmente para os cabelos e couro cabeludo delicados dos bebês. A fórmula sem lágrimas garante que, mesmo que o produto entre em contato com os olhos do bebê, não cause irritação.",
    benefits: [
      "Fórmula sem lágrimas",
      "pH neutro",
      "Suavidade extrema",
      "Não resseca o couro cabeludo",
    ],
    usage:
      "Aplicar pequena quantidade nos cabelos molhados, massagear suavemente e enxaguar.",
    variants: ["200ml", "400ml"],
    activeVariant: 0,
    info: [
      ["Fabricante", "BabyCare Brasil"],
      ["Volume", "200ml"],
      ["Faixa Etária", "0+"],
      ["Validade", "24 meses"],
    ],
    reviews: [],
    ratingBreakdown: [75, 18, 5, 1, 1],
  },
  {
    id: 10,
    name: "Multivitamínico Diário",
    price: 29.9,
    old: 38.0,
    cat: "Vitaminas",
    tagCls: "green",
    stars: 4.7,
    rev: 390,
    sale: true,
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    ],
    shortDesc:
      "Complexo multivitamínico completo com 23 vitaminas e minerais. Uma cápsula por dia para suprir todas as necessidades nutricionais.",
    description:
      "Fórmula completa com 23 vitaminas e minerais essenciais, desenvolvida para complementar a alimentação diária e garantir o aporte nutricional necessário para uma vida saudável e ativa.",
    benefits: [
      "23 vitaminas e minerais",
      "Energia e disposição",
      "Saúde imunológica",
      "Suporte antioxidante",
    ],
    usage: "1 cápsula ao dia com as refeições.",
    variants: ["30 cápsulas", "60 cápsulas", "90 cápsulas"],
    activeVariant: 1,
    info: [
      ["Fabricante", "VitaCompleta"],
      ["Cápsulas", "60"],
      ["Vitaminas", "A,C,D,E,K,B1,B2,B3,B5,B6,B7,B9,B12"],
      ["Minerais", "Ca,Fe,Mg,Zn,Se,Cu,Mn,Cr,Mo"],
      ["Validade", "24 meses"],
    ],
    reviews: [],
    ratingBreakdown: [65, 25, 7, 2, 1],
  },
  {
    id: 11,
    name: "Esmalte Base Fortalecedora",
    price: 16.5,
    old: null,
    cat: "Cuidado Pessoal",
    tagCls: "pink",
    stars: 4.5,
    rev: 112,
    sale: false,
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    ],
    shortDesc:
      "Base fortalecedora para unhas quebradiças e finas. Fórmula com cálcio e proteínas para unhas mais resistentes.",
    description:
      "Base fortalecedora dermatologicamente testada que penetra nas camadas da unha, reforçando sua estrutura com cálcio e proteínas hidrolisadas.",
    benefits: [
      "Fortalece unhas quebradiças",
      "Previne lascamentos",
      "Base para esmalte",
      "Uso em unhas naturais e postiças",
    ],
    usage:
      "Aplicar 1-2 camadas nas unhas limpas. Usar como base antes do esmalte colorido.",
    variants: ["Transparente", "Rosa Nude"],
    activeVariant: 0,
    info: [
      ["Fabricante", "Nail Beauty"],
      ["Volume", "10ml"],
      ["Tipo", "Base fortalecedora"],
      ["Validade", "24 meses"],
    ],
    reviews: [],
    ratingBreakdown: [55, 30, 10, 4, 1],
  },
  {
    id: 12,
    name: "Paracetamol 750mg — 20cp",
    price: 7.5,
    old: null,
    cat: "Medicamentos",
    tagCls: "blue",
    stars: 4.8,
    rev: 617,
    sale: false,
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    ],
    shortDesc:
      "Analgésico e antitérmico de uso amplamente consagrado. Indicado para dores leves e moderadas e estados febris.",
    description:
      "O paracetamol 750mg é o analgésico e antitérmico mais utilizado no mundo, com excelente perfil de segurança quando usado nas doses recomendadas. Age no sistema nervoso central para bloquear os sinais de dor.",
    benefits: [
      "Alívio rápido de dores",
      "Redução da febre",
      "Excelente tolerância gástrica",
      "Indicado para todas as idades (ajuste de dose)",
    ],
    usage:
      "Adultos: 1 comprimido a cada 6-8 horas. Intervalo mínimo de 4 horas entre doses. Não exceder 4g por dia.",
    variants: ["10 comprimidos", "20 comprimidos", "30 comprimidos"],
    activeVariant: 1,
    info: [
      ["Fabricante", "Medley Farmacêutica"],
      ["Princípio Ativo", "Paracetamol 750mg"],
      ["Classe", "Analgésico/Antitérmico"],
      ["Tarja", "Sem tarja"],
      ["Validade", "36 meses"],
    ],
    reviews: [],
    ratingBreakdown: [80, 14, 4, 1, 1],
  },
];

const TAG_MAP = {
  Vitaminas: "green",
  Medicamentos: "blue",
  "Cuidado Pessoal": "pink",
  Bebê: "purple",
  Dermocosméticos: "orange",
};

/* ═══════════════════════════════
   CART — localStorage shared
═══════════════════════════════ */
const CART_KEY = "dl_cart";
let cart = [];
let discount = 0,
  freteValue = null;

function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    cart = [];
  }
  updBadge();
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function openCart() {
  renderCart();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("show");
  document.body.style.overflow = "";
}

function addToCart(id, qty = 1) {
  const p = PRODS.find((x) => x.id === id);
  if (!p) return;
  const ex = cart.find((i) => i.id === id);
  if (ex) ex.qty += qty;
  else
    cart.push({
      id: p.id,
      name: p.name,
      price: p.price,
      img: p.img,
      cat: p.cat,
      qty,
    });
  saveCart();
  updBadge();
  const b = document.getElementById("cartBadge");
  b.classList.remove("pop");
  void b.offsetWidth;
  b.classList.add("pop");
  showToast(`🛒 ${p.name} adicionado ao carrinho!`);
}

function renderCart() {
  const c = document.getElementById("cartItems");
  if (!cart.length) {
    c.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-cart-shopping"></i><p>Seu carrinho está vazio.</p><button onclick="closeCart()">Ver Produtos</button></div>`;
    updSummary();
    return;
  }
  c.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" id="ci-${item.id}">
      <img src="${item.img}" alt="${item.name}">
      <div class="item-info">
        <span class="item-tag">${item.cat}</span>
        <p class="item-name">${item.name}</p>
        <p class="item-price">${brl(item.price)} / un</p>
      </div>
      <div class="item-actions">
        <div class="qty-ctrl">
          <button onclick="chgQty(${item.id},-1)"><i class="fa-solid fa-minus"></i></button>
          <span>${item.qty}</span>
          <button onclick="chgQty(${item.id},1)"><i class="fa-solid fa-plus"></i></button>
        </div>
        <p class="item-total">${brl(item.price * item.qty)}</p>
        <button class="rm-btn" onclick="rmItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`,
    )
    .join("");
  updSummary();
}

function chgQty(id, d) {
  const i = cart.find((x) => x.id === id);
  if (!i) return;
  i.qty += d;
  if (i.qty <= 0) rmItem(id);
  else {
    saveCart();
    renderCart();
  }
}
function rmItem(id) {
  const el = document.getElementById("ci-" + id);
  if (el) {
    el.classList.add("removing");
    setTimeout(() => {
      cart = cart.filter((i) => i.id !== id);
      saveCart();
      renderCart();
      updBadge();
    }, 300);
  }
}
function updBadge() {
  const n = cart.reduce((a, i) => a + i.qty, 0);
  const b = document.getElementById("cartBadge");
  b.textContent = n;
  b.style.display = n === 0 ? "none" : "flex";
  document.getElementById("cartCount").textContent =
    n + (n === 1 ? " item" : " itens");
}
function updSummary() {
  const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const disc = sub * discount;
  const frete = freteValue !== null ? freteValue : 0;
  document.getElementById("subVal").textContent = brl(sub);
  document.getElementById("freteVal").textContent =
    freteValue === null ? "—" : frete === 0 ? "Grátis" : brl(frete);
  document.getElementById("freteVal").className =
    frete === 0 && freteValue !== null ? "frete-tag free" : "frete-tag";
  document.getElementById("totalVal").textContent = brl(
    freteValue === null ? sub - disc : sub - disc + frete,
  );
  const dr = document.getElementById("discRow");
  if (discount > 0) {
    dr.style.display = "flex";
    document.getElementById("discVal").textContent = "— " + brl(disc);
  } else dr.style.display = "none";
  const isFree = sub >= 50;
  document.getElementById("pac-price").textContent = isFree
    ? "Grátis"
    : "R$ 8,90";
  document.getElementById("pac-price").className = isFree
    ? "opt-price free"
    : "opt-price";
  document.querySelectorAll('input[name="frete"]')[0].value = isFree
    ? "0"
    : "8.90";
}
function updTotal() {
  const s = document.querySelector('input[name="frete"]:checked');
  freteValue = s ? parseFloat(s.value) : 0;
  updSummary();
}
function fmtCEP(input) {
  let v = input.value.replace(/\D/g, "");
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
  input.value = v;
}
async function calcFrete() {
  const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
  const [lo, op, er] = ["shipLoad", "shipOpts", "shipErr"].map((id) =>
    document.getElementById(id),
  );
  op.style.display = "none";
  er.style.display = "none";
  if (cep.length !== 8) {
    er.style.display = "flex";
    return;
  }
  lo.style.display = "flex";
  try {
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
      (r) => r.json(),
    );
    lo.style.display = "none";
    if (data.erro) {
      er.style.display = "flex";
      return;
    }
    op.style.display = "flex";
    freteValue = 0;
    document.querySelectorAll('input[name="frete"]')[0].checked = true;
    document.getElementById("cepInput").classList.add("valid");
    updSummary();
    updTotal();
    showToast(`📍 ${data.localidade}/${data.uf} — frete calculado!`);
  } catch {
    lo.style.display = "none";
    er.style.display = "flex";
  }
}
const COUPONS = { SAUDE10: 0.1, FARMA15: 0.15, BEMVINDO: 0.05 };
function applyCoupon() {
  const code = document
    .getElementById("couponInput")
    .value.trim()
    .toUpperCase();
  const msg = document.getElementById("couponMsg");
  if (COUPONS[code]) {
    discount = COUPONS[code];
    msg.textContent = `✅ Cupom aplicado! ${(discount * 100).toFixed(0)}% de desconto.`;
    msg.className = "coupon-msg ok";
  } else {
    discount = 0;
    msg.textContent = "❌ Cupom inválido ou expirado.";
    msg.className = "coupon-msg err";
  }
  updSummary();
}
function checkout() {
  if (!cart.length) return;
  if (freteValue === null) {
    const ci = document.getElementById("cepInput");
    ci.classList.add("shake");
    ci.focus();
    setTimeout(() => ci.classList.remove("shake"), 600);
    showToast("⚠️ Calcule o frete antes de finalizar!");
    return;
  }
  showToast("✅ Pedido realizado! Obrigado pela compra!");
  cart = [];
  discount = 0;
  freteValue = null;
  saveCart();
  renderCart();
  updBadge();
  closeCart();
}

/* ═══════════════════════════════
   PAGE RENDER
═══════════════════════════════ */
let currentProd = null;
let selectedQty = 1;

function renderPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const prod = PRODS.find((p) => p.id === id);

  if (!prod) {
    document.getElementById("pageContent").innerHTML = `
      <div class="not-found">
        <i class="fa-solid fa-box-open"></i>
        <h2>Produto não encontrado</h2>
        <p>O produto que você procura não existe ou foi removido.</p>
        <a href="index.html" style="margin-top:8px;background:var(--blue);color:#fff;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:800;">← Voltar aos Produtos</a>
      </div>`;
    return;
  }

  currentProd = prod;
  document.title = `${prod.name} — Drogas Lícitas`;

  const related = PRODS.filter(
    (p) => p.id !== prod.id && (p.cat === prod.cat || p.sale),
  ).slice(0, 4);
  const pct = prod.old ? Math.round((1 - prod.price / prod.old) * 100) : null;
  const stars5 = renderStars(prod.stars);
  const totalReviews = prod.rev;
  const barTotal = prod.ratingBreakdown.reduce((a, b) => a + b, 0);

  const html = `
    <!-- BREADCRUMB -->
    <nav class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="index.html">Produtos</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="index.html">${prod.cat}</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span>${prod.name}</span>
    </nav>

    <!-- MAIN SECTION -->
    <div class="product-main">

      <!-- GALLERY -->
      <div class="gallery au">
        <div class="gallery-main">
          <img id="mainImg" src="${prod.imgs[0]}" alt="${prod.name}">
          ${prod.sale ? '<div class="gallery-badge-sale">🔥 Oferta</div>' : ""}
          ${pct ? `<div class="gallery-badge-off">−${pct}% OFF</div>` : ""}
          <button class="gallery-wish" id="wishBtn" onclick="toggleWish()"><i class="fa-regular fa-heart"></i></button>
        </div>
        <div class="thumbs">
          ${prod.imgs.map((img, i) => `<img class="thumb ${i === 0 ? "active" : ""}" src="${img}" onclick="switchImg(this,'${img}')" alt="Foto ${i + 1}">`).join("")}
        </div>
      </div>

      <!-- INFO -->
      <div class="prod-info">
        <div class="prod-cat-tag ${prod.tagCls} au"><i class="fa-solid ${getCatIcon(prod.cat)}"></i> ${prod.cat}</div>

        <h1 class="prod-name au d1">${prod.name}</h1>

        <div class="prod-rating-row au d2">
          <div class="stars">${stars5}</div>
          <span class="rating-num">${prod.stars}</span>
          <span class="rating-count">(${prod.rev.toLocaleString("pt-BR")} avaliações)</span>
          <div class="rating-divider"></div>
          <span class="in-stock"><span class="in-stock-dot"></span> Em estoque</span>
        </div>

        <div class="prod-price-block au d2">
          <div>
            <div class="prod-price-main">${brl(prod.price)}</div>
            ${prod.old ? `<div class="prod-price-old">De ${brl(prod.old)}</div>` : ""}
            <div class="prod-installment">ou 3× de ${brl(prod.price / 3)} sem juros</div>
          </div>
          ${pct ? `<div class="prod-discount-pill">−${pct}% OFF</div>` : ""}
        </div>

        <p class="prod-desc-short au d3">${prod.shortDesc}</p>

        ${
          prod.variants && prod.variants.length
            ? `
        <div class="au d3">
          <div class="variants-label">Apresentação</div>
          <div class="variants-row" id="variantsRow">
            ${prod.variants.map((v, i) => `<button class="variant-btn ${i === prod.activeVariant ? "active" : ""}" onclick="selectVariant(this)">${v}</button>`).join("")}
          </div>
        </div>`
            : ""
        }

        <div class="prod-actions au d4">
          <div class="qty-box">
            <button onclick="changeQtyProd(-1)"><i class="fa-solid fa-minus"></i></button>
            <span id="qtyDisplay">1</span>
            <button onclick="changeQtyProd(1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="add-cart-btn" id="addCartBtn" onclick="addProdToCart()">
            <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
          </button>
          <button class="buy-now-btn" onclick="buyNow()">Comprar</button>
        </div>

        <div class="info-pills au d5">
          <div class="info-pill"><i class="fa-solid fa-truck"></i> Frete grátis acima de R$ 50</div>
          <div class="info-pill"><i class="fa-solid fa-rotate-left"></i> Troca em 7 dias</div>
          <div class="info-pill"><i class="fa-solid fa-lock"></i> Compra segura</div>
          <div class="info-pill"><i class="fa-solid fa-award"></i> Produto original</div>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="tabs-section">
      <div class="tab-bar au">
        <button class="tab-btn active" onclick="switchTab(this,'tab-desc')">📋 Descrição</button>
        <button class="tab-btn" onclick="switchTab(this,'tab-info')">📊 Informações</button>
        <button class="tab-btn" onclick="switchTab(this,'tab-reviews')">⭐ Avaliações (${prod.reviews.length + (prod.rev > prod.reviews.length ? prod.rev - prod.reviews.length : 0)})</button>
      </div>

      <!-- DESCRIPTION TAB -->
      <div class="tab-panel active" id="tab-desc">
        <div class="desc-grid au">
          <div class="desc-card">
            <h4><i class="fa-solid fa-circle-info"></i> Sobre o Produto</h4>
            <p>${prod.description}</p>
          </div>
          <div class="desc-card">
            <h4><i class="fa-solid fa-list-check"></i> Benefícios</h4>
            <ul>${prod.benefits.map((b) => `<li>✅ ${b}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="desc-card au d2" style="max-width:600px">
          <h4><i class="fa-solid fa-flask"></i> Modo de Uso</h4>
          <p>${prod.usage}</p>
        </div>
      </div>

      <!-- INFO TAB -->
      <div class="tab-panel" id="tab-info">
        <div class="info-table au">
          ${prod.info.map(([k, v]) => `<div class="info-row"><div class="info-key">${k}</div><div class="info-val">${v}</div></div>`).join("")}
        </div>
      </div>

      <!-- REVIEWS TAB -->
      <div class="tab-panel" id="tab-reviews">
        <div class="reviews-summary au">
          <div style="text-align:center;padding:10px">
            <div class="review-big-num">${prod.stars}</div>
            <div class="review-stars-big">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
            <div class="review-total">${prod.rev.toLocaleString("pt-BR")} avaliações</div>
          </div>
          <div class="review-bars">
            ${[5, 4, 3, 2, 1]
              .map((n, i) => {
                const pctBar = Math.round(
                  (prod.ratingBreakdown[4 - i] / barTotal) * 100,
                );
                return `<div class="review-bar-row">
                <span>${n}</span>
                <div class="review-bar-wrap"><div class="review-bar-fill" style="width:${pctBar}%"></div></div>
                <span>${prod.ratingBreakdown[4 - i]}%</span>
              </div>`;
              })
              .join("")}
          </div>
        </div>
        <div class="reviews-list">
          ${
            prod.reviews.length
              ? prod.reviews
                  .map(
                    (r) => `
            <div class="review-card au">
              <div class="review-header">
                <div class="reviewer">
                  <div class="reviewer-avatar" style="background:${r.color}">${r.name.charAt(0)}</div>
                  <div>
                    <div class="reviewer-name">${r.name}</div>
                    <div class="reviewer-date">${r.date}</div>
                  </div>
                </div>
                <div class="review-stars">${'<i class="fa-solid fa-star"></i>'.repeat(r.stars)}</div>
              </div>
              <p class="review-text">${r.text}</p>
              ${r.verified ? `<div class="verified"><i class="fa-solid fa-circle-check"></i>${r.tag}</div>` : ""}
            </div>`,
                  )
                  .join("")
              : `<div style="text-align:center;padding:40px;color:var(--muted)"><i class="fa-regular fa-comment" style="font-size:40px;color:var(--border);display:block;margin-bottom:12px"></i><p>Seja o primeiro a avaliar este produto!</p></div>`
          }
        </div>
      </div>
    </div>

    <!-- RELATED PRODUCTS -->
    <div class="related-section">
      <h3>Você também pode gostar 💊</h3>
      <div class="related-grid">
        ${related
          .map(
            (r, i) => `
          <div class="rel-card au d${i + 1}" onclick="location.href='produto.html?id=${r.id}'">
            <img class="rel-img" src="${r.img}" alt="${r.name}">
            <div class="rel-tag ${TAG_MAP[r.cat] || "blue"} p-tag">${r.cat}</div>
            <div style="display:flex;align-items:start;justify-content:space-between">
              <p class="rel-name">${r.name}</p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
              <span class="rel-price">${brl(r.price)}</span>
              <button class="rel-add" onclick="event.stopPropagation();addToCart(${r.id})"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;

  document.getElementById("pageContent").innerHTML = html;
}

/* ── HELPERS ── */
function renderStars(rating) {
  let html = "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < full)
      html += `<span class="star filled"><i class="fa-solid fa-star"></i></span>`;
    else if (i === full && half)
      html += `<span class="star half"><i class="fa-solid fa-star-half-stroke"></i></span>`;
    else html += `<span class="star"><i class="fa-regular fa-star"></i></span>`;
  }
  return html;
}

function getCatIcon(cat) {
  const m = {
    Vitaminas: "fa-leaf",
    Medicamentos: "fa-capsules",
    "Cuidado Pessoal": "fa-heart",
    Bebê: "fa-baby",
    Dermocosméticos: "fa-pump-soap",
  };
  return m[cat] || "fa-box";
}

function switchImg(thumb, src) {
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
  const main = document.getElementById("mainImg");
  main.style.animation = "none";
  void main.offsetWidth;
  main.style.animation = "imgIn .35s ease";
  main.src = src;
}

function switchTab(btn, id) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(id).classList.add("active");
}

function selectVariant(btn) {
  document
    .querySelectorAll(".variant-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function changeQtyProd(d) {
  selectedQty = Math.max(1, selectedQty + d);
  document.getElementById("qtyDisplay").textContent = selectedQty;
}

function addProdToCart() {
  if (!currentProd) return;
  addToCart(currentProd.id, selectedQty);
  const btn = document.getElementById("addCartBtn");
  btn.classList.add("added");
  btn.innerHTML = `<i class="fa-solid fa-check"></i> Adicionado!`;
  setTimeout(() => {
    btn.classList.remove("added");
    btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho`;
  }, 2000);
}

function buyNow() {
  if (!currentProd) return;
  addToCart(currentProd.id, selectedQty);
  setTimeout(openCart, 300);
}

function toggleWish() {
  const btn = document.getElementById("wishBtn");
  btn.classList.toggle("active");
  btn.innerHTML = btn.classList.contains("active")
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
  showToast(
    btn.classList.contains("active")
      ? "❤️ Adicionado aos favoritos!"
      : "💔 Removido dos favoritos.",
  );
}

function searchRedirect(q) {
  if (q) window.location.href = `index.html?search=${encodeURIComponent(q)}`;
}

/* ── TOAST ── */
let toastT;
function showToast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2800);
}

function brl(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ── INIT ── */
loadCart();
renderPage();
