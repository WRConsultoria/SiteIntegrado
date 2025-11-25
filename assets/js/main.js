
// Main JS for landing page
document.addEventListener('DOMContentLoaded', function(){
  const yearEl = document.getElementById('year-js');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // WhatsApp quick link with prefilled message
  const whatsappBtn = document.getElementById('whatsapp-btn');
  if(whatsappBtn){
    whatsappBtn.addEventListener('click', function(e){
      e.preventDefault();
      const phone = '+5511933444385';
      const text = encodeURIComponent('Olá, quero consultoria online - tenho interesse no plano.');
      window.open('https://wa.me/' + phone.replace('+','') + '?text=' + text, '_blank');
    });
  }
});
