// ヘッダーのスクロール検知
document.addEventListener('DOMContentLoaded', () => {
  // グローバルで使用する要素の取得
  const header = document.querySelector('header');
  const body = document.body;
  
  /**
   * ヒーローセクション
   * 依存要素: #hero-video
   * 使用箇所: hero section
   */
  const initHeroSection = () => {
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      heroVideo.playbackRate = 0.8;
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
    const logoLink = document.querySelector('.logo a');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // スクロールイベント - ヘッダーの背景色を変更
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ロゴリンククリック時のスクロールトップ
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        if (logoLink.getAttribute('href') === '/') {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: isReducedMotion ? 'auto' : 'smooth'
          });
          
          // モバイルメニューが開いていたら閉じる
          if (nav && nav.classList.contains('active')) {
            toggleMobileMenu();
          }
        }
      });
    }

    // モバイルメニュートグル関数
    const toggleMobileMenu = () => {
      mobileMenuToggle.classList.toggle('active');
      
      if (!nav.classList.contains('active')) {
        // メニューを開く
        nav.classList.add('active');
        body.style.overflow = 'hidden';
        
        // アクセシビリティとフォーカス管理
        nav.setAttribute('aria-expanded', 'true');
        const firstNavItem = nav.querySelector('a');
        if (firstNavItem) {
          setTimeout(() => {
            firstNavItem.focus();
          }, 500); // アニメーション完了後にフォーカス
        }
      } else {
        // メニューを閉じる
        if (!isReducedMotion) {
          // アニメーション付きで閉じる
          const navClone = nav.cloneNode(true);
          navClone.style.animation = 'navFadeOut 0.5s ease forwards';
          nav.parentNode.appendChild(navClone);
          
          setTimeout(() => {
            nav.classList.remove('active');
            navClone.parentNode.removeChild(navClone);
            body.style.overflow = '';
            nav.setAttribute('aria-expanded', 'false');
          }, 500);
        } else {
          // アニメーションなしで即時閉じる
          nav.classList.remove('active');
          body.style.overflow = '';
          nav.setAttribute('aria-expanded', 'false');
        }
      }
    };

    // モバイルメニュートグルイベント
    if (mobileMenuToggle && nav) {
      // アクセシビリティ属性を追加
      mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.setAttribute('aria-controls', 'navigation');
      nav.setAttribute('aria-expanded', 'false');
      nav.setAttribute('id', 'navigation');
      
      mobileMenuToggle.addEventListener('click', () => {
        toggleMobileMenu();
      });
      
      // ESCキーでメニューを閉じる
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
          toggleMobileMenu();
          mobileMenuToggle.focus(); // フォーカスをハンバーガーメニューに戻す
        }
      });
      
      // 画面サイズが変わった時の処理
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && nav.classList.contains('active')) {
          nav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          body.style.overflow = '';
          nav.setAttribute('aria-expanded', 'false');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    return { nav, mobileMenuToggle, toggleMobileMenu };
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
      
      // アクセシビリティ属性を追加
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('aria-controls', `faq-answer-${Math.random().toString(36).substring(2, 9)}`);
      answer.setAttribute('id', question.getAttribute('aria-controls'));
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // 現在開いているアイテムを閉じる
        faqItems.forEach(faqItem => {
          if (faqItem !== item && faqItem.classList.contains('active')) {
            faqItem.classList.remove('active');
            const faqQuestion = faqItem.querySelector('.faq-item__question');
            const faqAnswer = faqItem.querySelector('.faq-item__answer');
            faqAnswer.style.maxHeight = null;
            faqQuestion.setAttribute('aria-expanded', 'false');
          }
        });
        
        // クリックしたアイテムの状態を切り替える
        item.classList.toggle('active');
        
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          question.setAttribute('aria-expanded', 'true');
        } else {
          answer.style.maxHeight = null;
          question.setAttribute('aria-expanded', 'false');
        }
      });
      
      // キーボードアクセシビリティ
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  };

  /**
   * スムーズスクロール
   * 依存要素: a[href^="#"], header
   * 使用箇所: 全セクションのアンカーリンク
   */
  const initSmoothScroll = (nav, mobileMenuToggle, toggleMobileMenu) => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // ページ内リンクの場合のみ処理
        if (targetId.startsWith('#') && targetId !== '#') {
          e.preventDefault();
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // モバイルメニューが開いている場合は閉じる
            if (nav.classList.contains('active')) {
              toggleMobileMenu();
            }
            
            // ターゲット位置へスクロール
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: isReducedMotion ? 'auto' : 'smooth'
            });
          }
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
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
      // モーション軽減が有効な場合はアニメーションをスキップ
      animateElements.forEach(element => {
        element.classList.add('animated');
      });
      return;
    }
    
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
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function animateStats() {
      stats.forEach(stat => {
        if (stat.classList.contains('animated')) return;
        
        const targetValue = parseFloat(stat.textContent.replace(/[^0-9.-]+/g, ""));
        const prefix = stat.textContent.startsWith('+') ? '+' : '';
        const suffix = stat.textContent.includes('%') ? '%' : '';
        
        if (isReducedMotion) {
          // アニメーションなしで即時表示
          stat.textContent = `${prefix}${targetValue}${suffix}`;
          stat.classList.add('animated');
          return;
        }
        
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
    
    const casesSection = document.querySelector('.case-studies');
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
  const { nav, mobileMenuToggle, toggleMobileMenu } = initHeaderNavigation(); // ヘッダーナビゲーション
  initFaqAccordion(); // FAQアコーディオン
  initSmoothScroll(nav, mobileMenuToggle, toggleMobileMenu); // スムーズスクロール
  initScrollAnimations(); // スクロールアニメーション
  initStatsAnimation(); // 統計カウントアップアニメーション
}); 