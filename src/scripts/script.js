document.addEventListener('DOMContentLoaded', () => {
  // Inicializa AOS para animações
  AOS.init({
      duration: 1000,
      once: true,
  });

  // Mobile Menu Toggle
  const toggleButton = document.querySelector('.toggle-button');
  const navbarLinks = document.querySelector('.navbar-links');
  if (toggleButton && navbarLinks) {
      toggleButton.addEventListener('click', () => {
          navbarLinks.classList.toggle('active');
      });
  }

  // Scroll Animations com Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-animation').forEach(el => {
      observer.observe(el);
  });

  // Carrossel de Projetos
  let currentSlide = 0;
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  function moveToSlide(index) {
      if (index < 0) index = totalItems - 1;
      if (index >= totalItems) index = 0;
      if (track) {
          track.style.transform = `translateX(-${index * 100}%)`;
      }
      currentSlide = index;
  }

  // Auto-play do carrossel (em mobile)
  let autoPlayInterval;
  if (window.innerWidth <= 768) {
      autoPlayInterval = setInterval(() => moveToSlide(currentSlide + 1), 5000);
      [nextButton, prevButton].forEach(btn => {
          if (btn) {
              btn.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
              btn.addEventListener('mouseleave', () => {
                  autoPlayInterval = setInterval(() => moveToSlide(currentSlide + 1), 5000);
              });
          }
      });
      if (nextButton) {
          nextButton.addEventListener('click', () => moveToSlide(currentSlide + 1));
      }
      if (prevButton) {
          prevButton.addEventListener('click', () => moveToSlide(currentSlide - 1));
      }
  }

  // Tela de carregamento
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
      setTimeout(() => {
          loadingScreen.style.display = 'none';
      }, 1000);
  }

  // Feedback no envio do formulário
  const form = document.querySelector('form');
  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerText = 'Mensagem enviada com sucesso!';
          form.appendChild(successMessage);
          setTimeout(() => successMessage.remove(), 3000);
      });
  }

  // Efeito de rastro do mouse
  document.addEventListener('mousemove', (e) => {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = e.pageX - 5 + 'px';
      trail.style.top = e.pageY - 5 + 'px';
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 500);
  });

  // Preload de imagens dinâmicas do Unsplash
  window.addEventListener('load', () => {
      const images = [
          'https://image.freepik.com/vetores-gratis/fundo-de-tecnologia-futura-do-mundo-laranja-cyber-circuito_42077-3612.jpg',
          'https://img.freepik.com/fotos-premium/fundo-laranja-e-preto-com-fundo-preto_265515-11912.jpg',
          'https://img.freepik.com/fotos-premium/papel-de-parede-preto-e-laranja-com-fundo-preto-e-laranja_1340-27295.jpg'
      ];
      images.forEach(img => {
          new Image().src = img;
      });
  });

  // Efeito de digitação com suporte a tags HTML
  function typeEffect(element, speed) {
      const html = element.getAttribute('data-original-html');
      element.innerHTML = '';
      let i = 0;
      function type() {
          if (i < html.length) {
              if (html[i] === '<') {
                  let tag = '';
                  while (i < html.length && html[i] !== '>') {
                      tag += html[i];
                      i++;
                  }
                  tag += '>';
                  i++;
                  element.innerHTML += tag;
                  type();
              } else {
                  element.innerHTML += html[i];
                  i++;
                  setTimeout(type, speed);
              }
          }
      }
      type();
  }

  const animatedText = document.querySelector('.animated-text');
  if (animatedText) {
      if (window.innerWidth < 768) {
          animatedText.innerHTML = animatedText.getAttribute('data-original-html');
      } else {
          typeEffect(animatedText, 100);
      }
  }

  // Chatbot
  const chatbotButton = document.querySelector('.chatbot-button');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotClose = document.querySelector('.chatbot-close');

  if (chatbotButton && chatbotContainer && chatbotClose) {
      chatbotButton.addEventListener('click', () => {
          chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
      });

      chatbotClose.addEventListener('click', () => {
          chatbotContainer.style.display = 'none';
      });
  }

  // Efeito de partículas no clique
  document.addEventListener('click', (e) => {
      const particleCount = 10;
      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = e.pageX + 'px';
          particle.style.top = e.pageY + 'px';
          particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
          document.body.appendChild(particle);

          const angle = Math.random() * 360;
          const velocity = Math.random() * 10 + 5;
          const vx = velocity * Math.cos(angle * Math.PI / 180);
          const vy = velocity * Math.sin(angle * Math.PI / 180);

          let x = e.pageX;
          let y = e.pageY;

          const animateParticle = () => {
              x += vx;
              y += vy;
              particle.style.left = x + 'px';
              particle.style.top = y + 'px';
              if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
                  particle.remove();
              } else {
                  requestAnimationFrame(animateParticle);
              }
          };

          animateParticle();
      }
  });

  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
      const scrollProgress = document.querySelector('.scroll-progress');
      if (scrollProgress) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / scrollHeight) * 100;
          scrollProgress.style.width = progress + '%';
      }
  });

  // Parallax Effect with Mouse Movement
  document.addEventListener('mousemove', (e) => {
      const parallaxBg = document.querySelector('.parallax-bg');
      if (parallaxBg) {
          const mouseX = e.clientX / window.innerWidth;
          const mouseY = e.clientY / window.innerHeight;
          parallaxBg.style.transform = `translate(-${mouseX * 20}px, -${mouseY * 20}px)`;
      }
  });
});