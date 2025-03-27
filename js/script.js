// ヘッダーのスクロール検知
document.addEventListener('DOMContentLoaded', () => {
  // グローバルで使用する要素の取得
  const header = document.querySelector('header');
  
  /**
   * ヒーローセクション
   * 依存要素: #hero-video
   * 使用箇所: hero section
   */
  const initHeroSection = () => {
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      heroVideo.playbackRate = 0.5;
    }
  };

  /**
   * ヘッダーナビゲーション
   * 依存要素: header, .mobile-menu, nav
   * 使用箇所: header section
   */
  const initHeaderNavigation = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    // スクロールイベント
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // モバイルメニュートグル
    if (mobileMenuToggle && nav) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
      });
    }

    return { nav, mobileMenuToggle };
  };

  /**
   * FAQアコーディオン
   * 依存要素: .faq-item, .faq-item__question, .faq-item__answer
   * 使用箇所: FAQ section
   */
  const initFaqAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
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
  };

  /**
   * スムーズスクロール
   * 依存要素: a[href^="#"], header
   * 使用箇所: 全セクションのアンカーリンク
   */
  const initSmoothScroll = (nav, mobileMenuToggle) => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
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
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  /**
   * スクロールアニメーション
   * 依存要素: .animate-on-scroll
   * 使用箇所: アニメーションが必要な全てのセクション
   */
  const initScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  };

  /**
   * 統計カウントアップアニメーション
   * 依存要素: .cases, .stat__number
   * 使用箇所: cases section
   */
  const initStatsAnimation = () => {
    const stats = document.querySelectorAll('.stat__number');
    
    function animateStats() {
      stats.forEach(stat => {
        if (stat.classList.contains('animated')) return;
        
        const targetValue = parseFloat(stat.textContent.replace(/[^0-9.-]+/g, ""));
        const prefix = stat.textContent.startsWith('+') ? '+' : '';
        const suffix = stat.textContent.includes('%') ? '%' : '';
        const duration = 2000;
        const frameDuration = 1000/60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        function updateCount() {
          if (frame === totalFrames) {
            stat.textContent = `${prefix}${targetValue}${suffix}`;
            stat.classList.add('animated');
            return;
          }
          
          frame++;
          const progress = frame / totalFrames;
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
  };

  /**
   * 各機能の初期化
   */
  initHeroSection(); // ヒーローセクション
  const { nav, mobileMenuToggle } = initHeaderNavigation(); // ヘッダーナビゲーション
  initFaqAccordion(); // FAQアコーディオン
  initSmoothScroll(nav, mobileMenuToggle); // スムーズスクロール
  initScrollAnimations(); // スクロールアニメーション
  initStatsAnimation(); // 統計カウントアップアニメーション
}); 