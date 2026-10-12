(function () {
  const M = window.MOTION;
  const P = M.pager;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTRO_KEY = 'kis-intro-seen';

  function applyVars() {
    const s = document.documentElement.style;
    s.setProperty('--ease', M.ease);
    s.setProperty('--intro-duration', M.intro.duration + 'ms');
    s.setProperty('--intro-blur', M.intro.blur + 'px');
    s.setProperty('--intro-distance', M.intro.distance + 'px');
    s.setProperty('--page-out', P.outDuration + 'ms');
    s.setProperty('--page-in', P.inDuration + 'ms');
    s.setProperty('--page-in-delay', P.inDelay + 'ms');
    s.setProperty('--page-blur', P.blur + 'px');
    s.setProperty('--page-distance', P.distance + 'px');
  }


  function seenRecently() {
    if (/[?&]intro\b/.test(location.search)) return false; // ?intro 로 강제 재생
    if (!M.intro.revisitHours) return false;
    try {
      const t = Number(localStorage.getItem(INTRO_KEY));
      return t && Date.now() - t < M.intro.revisitHours * 3600e3;
    } catch (e) {
      return false;
    }
  }

  function markSeen() {
    try { localStorage.setItem(INTRO_KEY, String(Date.now())); } catch (e) {}
  }

  function intro() {
    const items = [...document.querySelectorAll('[data-intro]')];
    if (!items.length) return;

    const done = (el) => setTimeout(() => el.classList.add('is-done'), 0);

    if (reduce || seenRecently()) {
      items.forEach((el) => { el.classList.add('is-in'); done(el); });
      return;
    }
    markSeen();

    let finished = false;
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
    const finish = () => {
      if (finished) return;
      finished = true;
      items.forEach((el) => {
        if (!el.classList.contains('is-in')) {
          el.style.transitionDelay = '0ms';
          el.classList.add('is-in');
        }
      });
      events.forEach((e) => window.removeEventListener(e, finish));
    };

    events.forEach((e) => window.addEventListener(e, finish, { passive: true }));

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        items.forEach((el) => {
          const delay = M.intro.delay + Number(el.dataset.intro) * M.intro.stagger;
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-in');
          setTimeout(() => el.classList.add('is-done'), delay + M.intro.duration + 60);
        });
        const last = M.intro.delay + (items.length - 1) * M.intro.stagger + M.intro.duration;
        setTimeout(finish, last);
      })
    );
  }


  function markMissing(media) {
    if (!media || media.classList.contains('is-missing')) return;
    media.classList.add('is-missing');
    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.setAttribute('aria-hidden', 'true');
    ph.innerHTML = '<b></b><span></span>';
    ph.children[0].textContent = media.dataset.label || '';
    ph.children[1].textContent = media.dataset.path || '';
    media.appendChild(ph);
  }

  function images() {
    document.querySelectorAll('.media img').forEach((img) => {
      const media = img.parentElement;
      const onLoad = () => {
        if (img.naturalWidth) media.style.setProperty('--ratio', `${img.naturalWidth} / ${img.naturalHeight}`);
      };
      if (img.complete) {
        img.naturalWidth ? onLoad() : img.currentSrc && markMissing(media);
      }
      img.addEventListener('load', onLoad);
      img.addEventListener('error', () => markMissing(media));
    });
  }


  const Video = {
    load(v) {
      if (v.dataset.loaded) return;
      v.dataset.loaded = '1';
      v.src = v.dataset.src;
      v.preload = 'auto';
      v.load();
    },
    rewind(v) {
      if (!v.dataset.loaded) return;
      const start = Number(v.dataset.start) || 0;
      if (Math.abs(v.currentTime - start) > 0.05) {
        try { v.currentTime = start; } catch (e) {}
      }
    },
    play(v) {
      Video.load(v);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    },
    setup() {
      document.querySelectorAll('video[data-src]').forEach((v) => {
        const media = v.parentElement;
        const start = Number(v.dataset.start) || 0;
        const end = Number(v.dataset.end) || 0;

        v.muted = true;
        v.playsInline = true;
        v.addEventListener('error', () => {
          const poster = v.getAttribute('poster');
          if (!poster || media.querySelector('img.poster-fallback')) return markMissing(media);
          const img = document.createElement('img');
          img.className = 'poster-fallback';
          img.src = poster;
          img.alt = v.getAttribute('aria-label') || '';
          img.onerror = () => markMissing(media);
          v.hidden = true;
          media.appendChild(img);
        });
        v.addEventListener('loadedmetadata', () => {
          if (v.videoWidth) media.style.setProperty('--ratio', `${v.videoWidth} / ${v.videoHeight}`);
          if (start) v.currentTime = start;
        });

        if (end > start) {
          const check = () => {
            if (v.currentTime >= end || v.currentTime < start - 0.05) v.currentTime = start;
          };
          if ('requestVideoFrameCallback' in v) {
            const tick = () => { check(); v.requestVideoFrameCallback(tick); };
            v.requestVideoFrameCallback(tick);
          } else {
            v.addEventListener('timeupdate', check);
          }
        }

        const toggle = () => {
          v.dataset.userPaused = v.paused ? '' : '1';
          v.paused ? Video.play(v) : v.pause();
        };
        v.addEventListener('click', toggle);
        v.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggle(); }
        });
      });
    },
    timer: 0,
    sync(panels, index, delay = 0) {
      clearTimeout(Video.timer);
      const toPlay = [];
      panels.forEach((panel, i) => {
        panel.querySelectorAll('video[data-src]').forEach((v) => {
          if (i === index) {
            Video.rewind(v);
            Video.load(v);
            if (!reduce && !v.dataset.userPaused) toPlay.push(v);
          } else {
            if (!v.paused) v.pause();
            if (Math.abs(i - index) === 1) Video.load(v);
          }
        });
      });
      const start = () => toPlay.forEach((v) => { Video.rewind(v); Video.play(v); });
      if (delay > 0) Video.timer = setTimeout(start, delay);
      else start();
    },
  };


  function pager() {
    const panels = [...document.querySelectorAll('.panel')];
    if (!panels.length) return;

    let index = 0;
    let busy = false;
    let acc = 0;
    let lastWheel = 0;
    let gestureUsed = false;

    panels.forEach((p, i) => { p.classList.toggle('is-active', i === 0); p.classList.toggle('is-settled', i === 0); });

    const pad = (n) => String(n).padStart(2, '0');
    const counter = document.createElement('div');
    counter.className = 'page-count';
    counter.setAttribute('aria-hidden', 'true');
    document.body.appendChild(counter);
    const count = () => { counter.innerHTML = `<b>${pad(index + 1)}</b> / ${pad(panels.length)}`; };
    count();
    document.documentElement.classList.add('is-paged');
    Video.sync(panels, 0);

    const canScroll = (panel, dir) =>
      dir > 0
        ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2
        : panel.scrollTop > 2;

    function go(next) {
      next = Math.max(0, Math.min(panels.length - 1, next));
      if (next === index || busy) return false;

      const dir = next > index ? 1 : -1;
      const cur = panels[index];
      const nxt = panels[next];

      busy = true;

      cur.classList.remove('is-active', 'is-settled', 'from-below', 'from-above');
      cur.classList.add(dir > 0 ? 'to-above' : 'to-below');

      nxt.classList.remove('to-above', 'to-below');
      nxt.classList.add(dir > 0 ? 'from-below' : 'from-above');
      nxt.scrollTop = dir > 0 ? 0 : nxt.scrollHeight;
      void nxt.offsetWidth;
      nxt.classList.remove('from-below', 'from-above');
      nxt.classList.add('is-active');

      index = next;
      count();
      Video.sync(panels, index, reduce ? 0 : P.inDelay + P.inDuration * 0.6);

      const total = reduce ? 200 : Math.max(P.outDuration, P.inDelay + P.inDuration);
      setTimeout(() => {
        cur.classList.remove('to-above', 'to-below');
        if (panels[index] === nxt) nxt.classList.add('is-settled');
        busy = false;
      }, total);
      return true;
    }

    window.addEventListener(
      'wheel',
      (e) => {
        const now = performance.now();
        if (now - lastWheel > P.gestureGap) { gestureUsed = false; acc = 0; }
        lastWheel = now;

        const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        if (!dy) return;
        const dir = dy > 0 ? 1 : -1;
        const panel = panels[index];

        if (!busy && canScroll(panel, dir)) {
          gestureUsed = true;
          acc = 0;
          return;
        }

        e.preventDefault();
        if (busy || gestureUsed) return;

        if (Math.sign(acc) !== dir) acc = 0;
        acc += dy;
        if (Math.abs(acc) >= P.threshold) {
          acc = 0;
          if (go(index + dir)) gestureUsed = true;
        }
      },
      { passive: false }
    );

    let touchY = null;
    let touchScrolled = false;
    window.addEventListener('touchstart', (e) => {
      touchY = e.touches[0].clientY;
      touchScrolled = false;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (touchY == null) return;
      const dir = touchY - e.touches[0].clientY > 0 ? 1 : -1;
      if (canScroll(panels[index], dir)) { touchScrolled = true; return; }
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (touchY == null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (touchScrolled || Math.abs(dy) < P.swipe) return;
      go(index + (dy > 0 ? 1 : -1));
    });

    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, select')) return;
      const panel = panels[index];
      const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey;
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (down || up) {
        const dir = down ? 1 : -1;
        if (canScroll(panel, dir)) return;
        e.preventDefault();
        go(index + dir);
      } else if (e.key === 'Home') {
        e.preventDefault(); go(0);
      } else if (e.key === 'End') {
        e.preventDefault(); go(panels.length - 1);
      }
    });

    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-go]');
      if (!a) return;
      e.preventDefault();
      go(Number(a.dataset.go));
    });

    document.addEventListener('focusin', (e) => {
      const p = e.target.closest('.panel');
      const i = panels.indexOf(p);
      if (i >= 0 && i !== index) {
        busy = false;
        go(i);
      }
    });
  }


  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    return new Promise((resolve) => resolve(fallbackCopy(text)));
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    if (!ok) throw new Error('copy failed');
  }

  function copy() {
    const toast = document.querySelector('.toast');
    let timer = 0;
    const show = (msg) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-show');
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('is-show'), 1600);
    };
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;
      copyText(btn.dataset.copy)
        .then(() => show(toast ? toast.dataset.msg : ''))
        .catch(() => show('복사하지 못했습니다. 직접 선택해 주세요.'));
    });
  }

  window.Motion = {
    init() {
      applyVars();
      images();
      Video.setup();
      intro();
      pager();
      copy();
    },
  };
})();
