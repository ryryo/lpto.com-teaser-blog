// ヘッダーのスクロール検知
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav');
  const faqItems = document.querySelectorAll('.faq-item');
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  // ヒーロービデオの再生速度を設定
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.playbackRate = 0.5;
  }

  // スクロールイベント
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // モバイルメニュートグル
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // FAQアコーディオン
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // 現在開いているアイテムを閉じる
      faqItems.forEach(faqItem => {
        if (faqItem !== item) {
          faqItem.classList.remove('active');
          const faqAnswer = faqItem.querySelector('.faq-item__answer');
          faqAnswer.style.maxHeight = null;
        }
      });
      
      // クリックしたアイテムの状態を切り替える
      item.classList.toggle('active');
      
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // スムーズスクロール
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // モバイルメニューが開いている場合は閉じる
      if (nav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // ヘッダーの高さを考慮してスクロール位置を調整
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // アニメーション要素の表示検知
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Intersection Observerの設定
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // 一度アニメーションしたら監視を解除
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // 監視対象の要素を登録
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // 統計値のカウントアップアニメーション
  const stats = document.querySelectorAll('.stat__number');
  
  function animateStats() {
    stats.forEach(stat => {
      // 既にアニメーション済みの場合はスキップ
      if (stat.classList.contains('animated')) return;
      
      const targetValue = parseFloat(stat.textContent.replace(/[^0-9.-]+/g, ""));
      const prefix = stat.textContent.startsWith('+') ? '+' : '';
      const suffix = stat.textContent.includes('%') ? '%' : '';
      const duration = 2000; // ミリ秒
      const frameDuration = 1000/60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      // カウントアップのアニメーション処理
      function updateCount() {
        if (frame === totalFrames) {
          stat.textContent = `${prefix}${targetValue}${suffix}`;
          stat.classList.add('animated');
          return;
        }
        
        frame++;
        const progress = frame / totalFrames;
        // イージング関数でよりリアルなアニメーションに
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentValue = targetValue * easedProgress;
        stat.textContent = `${prefix}${currentValue.toFixed(0)}${suffix}`;
        
        requestAnimationFrame(updateCount);
      }
      
      requestAnimationFrame(updateCount);
    });
  }
  
  // 統計セクションの監視
  const casesSection = document.querySelector('.cases');
  if (casesSection) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    statObserver.observe(casesSection);
  }

  // SNSアイコンの追加
  const socialIcons = document.querySelector('.social-icons');
  if (socialIcons) {
    // すでに追加されている場合は処理しない
    if (socialIcons.children.length === 0) {
      const socialLinks = [
        {
          name: 'Twitter',
          url: 'https://twitter.com/example',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>'
        },
        {
          name: 'Facebook',
          url: 'https://facebook.com/example',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/example',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/example',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>'
        },
        {
          name: 'LINE',
          url: 'https://line.me/example',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 5.8 2 10.5c0 2.4 1.1 4.5 2.9 6.1.3.3.7.5.6 1-.1.4-.3.9-.5 1.4-.2.5 0 .7.5.5 1.2-.5 3.2-1.8 4.5-2.5.5-.3.8-.3 1.1-.3 5.5 0 10-3.8 10-8.3C21 5.8 17.5 2 12 2z"></path></svg>'
        }
      ];
      
      socialLinks.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.setAttribute('aria-label', link.name);
        anchor.innerHTML = link.svg;
        
        socialIcons.appendChild(anchor);
      });
    }
  }
}); 