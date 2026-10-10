function mascara_telefone() {
  var tel = document.getElementById("telefone").value;
  tel = tel.slice(0, 14);
  document.getElementById("telefone").value = tel;

  var tel_formatado = document.getElementById("telefone").value;
  if (tel_formatado[0] != "(") {
    if (tel_formatado[0] != undefined) {
      document.getElementById("telefone").value = "(" + tel_formatado[0];
    }
  }
  if (tel_formatado[3] != ")") {
    if (tel_formatado[3] != undefined) {
      document.getElementById("telefone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
    }
  }
  if (tel_formatado[9] != "-") {
    if (tel_formatado[9] != undefined) {
      document.getElementById("telefone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
    }
  }
}

function mascara_dinheiro_cifrao() {
  var dinheiro_formatado = document.getElementById("dinheiro").value;
  if (dinheiro_formatado[0] != "R") {
    if (dinheiro_formatado[0] != undefined) {
      document.getElementById("dinheiro").value = "R$" + dinheiro_formatado[0];
    }
  }
  if (dinheiro_formatado[1] != "$") {
    if (dinheiro_formatado[1] != undefined) {
      document.getElementById("dinheiro").value = dinheiro_formatado[0] + "$" + dinheiro_formatado[1];
    }
  }
}

function mascara_dinheiro_virgula() {
  var dinheiro_formatado = document.getElementById("dinheiro").value;
  if (dinheiro_formatado[dinheiro_formatado.length - 3] != ",") {
    if (dinheiro_formatado[dinheiro_formatado.length - 2] == ",") {
      document.getElementById("dinheiro").value = dinheiro_formatado + "0";
    } else {
      if (dinheiro_formatado[dinheiro_formatado.length - 1] == ",") {
        document.getElementById("dinheiro").value = dinheiro_formatado + "00";
      } else {
        document.getElementById("dinheiro").value = dinheiro_formatado + ",00";
      }
    }
  }
}

function mascara_cep() {
  var cep_formatado = document.getElementById("cep").value;
  if (cep_formatado[2] != ".") {
    if (cep_formatado[2] != undefined) {
      document.getElementById("cep").value = cep_formatado.slice(0, 2) + "." + cep_formatado[2];
    }
  }
  if (cep_formatado[6] != "-") {
    if (cep_formatado[6] != undefined) {
      document.getElementById("cep").value = cep_formatado.slice(0, 6) + "-" + cep_formatado[6];
    }
  }
}

(function () {
  var selecionar = function (s) { return document.querySelector(s); };

  var ROLES = ['Desenvolvedor Web', 'Técnico de Informática', 'Estudante curioso'];
  var typed = selecionar('#texto-digitando'), r = 0, c = 0, del = false;
  function type() {
    var word = ROLES[r];
    typed.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(type, 90); }
    else if (!del) { del = true; setTimeout(type, 1500); }
    else if (c > 0) { c--; setTimeout(type, 45); }
    else { del = false; r = (r + 1) % ROLES.length; setTimeout(type, 300); }
  }
  type();

  var themeBtn = selecionar('#botao-tema');
  function setTheme(t) {
    document.body.classList.toggle('dark', t === 'dark');
    themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem('tema', t); } catch (e) {}
  }
  var saved = localStorage.getItem('tema');
  setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeBtn.addEventListener('click', function () {
    setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });

  var menu = selecionar('#menu-navegacao'), menuBtn = selecionar('#botao-menu');
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
  });

  var items = document.querySelectorAll('.revelacao');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var modal = selecionar('#modal-detalhes');
  function openModal(title, desc, tech) {
    selecionar('#titulo-modal').textContent = title;
    selecionar('#descricao-modal').textContent = desc;
    selecionar('#tecnologias-modal').textContent = tech || '';
    modal.showModal();
  }
  selecionar('#fechar-modal').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  document.querySelectorAll('.cartao-projeto button').forEach(function (b) {
    b.addEventListener('click', function () { openModal(b.dataset.title, b.dataset.desc, b.dataset.tech); });
  });

  var tel = selecionar('#telefone'), cep = selecionar('#cep'), din = selecionar('#dinheiro');
  tel.addEventListener('input', mascara_telefone);
  cep.addEventListener('input', mascara_cep);
  din.addEventListener('input', mascara_dinheiro_cifrao);
  din.addEventListener('blur', function () { if (din.value) mascara_dinheiro_virgula(); });

  var msgTexto = selecionar('#mensagem');
  msgTexto.addEventListener('input', function () {
    selecionar('#count').textContent = msgTexto.value.length + '/500';
  });

  const enviar = selecionar("#enviar");
  const email = selecionar("#email");
  const mensagem = selecionar("#feedback-mensagem");

  enviar.addEventListener("click", () => {
    if (email.value.includes("@") && email.value.includes(".")) {
        mensagem.textContent = "Obrigado! Entrarei em contato.";
    } else {
        mensagem.textContent = "Digite um e-mail válido.";
    }
  });
})();