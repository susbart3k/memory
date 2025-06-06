document.addEventListener('DOMContentLoaded', () => {

  const paragraphs = document.querySelectorAll('.about-memory p');
  paragraphs.forEach((p, index) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(30px)';
    p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = 'translateY(0)';
    }, index * 500);
  });


  const levelButtons = document.querySelectorAll('.level-button');
  levelButtons.forEach((btn, index) => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(30px)';
    btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, index * 500);
  });
});
