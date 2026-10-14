(function () {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function Panel(inner, { id = '', cls = '', label = '', fit = '', vr = '', nav = '', group = '' } = {}) {
    const style = [fit && `--fit-h:${fit}`, vr && `--vr:${esc(vr)}`].filter(Boolean).join(';');
    return `
      <section class="panel ${cls}" ${id ? `id="${id}"` : ''} ${label ? `aria-label="${esc(label)}"` : ''}
               data-nav="${esc(nav || label)}" data-group="${esc(group || id || nav || label)}"
               ${style ? `style="${style}"` : ''}>
        <div class="wrap panel-inner">${inner}</div>
      </section>`;
  }

  function SectionHead(site, key) {
    return `<header class="section-head"><h2 class="h2">${esc(site.sections[key].title)}</h2></header>`;
  }

  function Video(v) {
    return `
      <div class="media" style="--ratio:${esc(v.ratio || '16 / 9')}" data-label="${esc(v.title)}" data-path="${esc(v.src)}">
        <video
          data-src="${esc(v.src)}"
          ${v.poster ? `poster="${esc(v.poster)}"` : ''}
          data-start="${Number(v.start) || 0}"
          data-end="${Number(v.end) || 0}"
          muted playsinline loop preload="none"
          disablepictureinpicture disableremoteplayback
          tabindex="0"
          aria-label="${esc(v.title)}"></video>
        ${v.sound ? SoundButton() : ''}
      </div>`;
  }

  function SoundButton() {
    return `
      <button type="button" class="sound" aria-label="소리 켜기" aria-pressed="false">
        <svg class="sound-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        <svg class="sound-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>`;
  }

  const lines = (text) => String(text).split(/(?<=[.!?])\s+/).map(esc).join('<br>');

  function Image(img, { eager = false, alt = '' } = {}) {
    return `
      <div class="media" style="--ratio:${esc(img.ratio || '16 / 9')}" data-label="${esc(img.title)}" data-path="${esc(img.src)}">
        <img src="${esc(img.src)}" alt="${esc(alt || img.title)}"
             ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
      </div>`;
  }

  function Caption(item) {
    if (!item.caption) return '';
    const text = esc(item.caption);
    return `<figcaption class="caption">${
      item.url
        ? `<a href="${esc(item.url)}" target="_blank" rel="noopener">${text}<span class="arrow" aria-hidden="true">↗</span></a>`
        : text
    }</figcaption>`;
  }

  function Intro(site) {
    const i = site.intro;
    return Panel(
      `<div class="intro">
        <figure class="intro-photo" data-intro="3">
          ${Image({ src: i.photo, ratio: '3 / 4' }, { eager: true, alt: i.photoAlt })}
        </figure>
        <div class="intro-text">
          <p class="intro-greeting" data-intro="0">${esc(i.greeting)}</p>
          <h1 class="intro-title" data-intro="1">${esc(i.title).split('\n').join('<br>')}</h1>
          <p class="intro-thanks" data-intro="2">${esc(i.thanks)}</p>
        </div>
      </div>`,
      { id: 'top', cls: 'panel-intro', label: '인사', nav: '처음' }
    );
  }

  function Works(site) {
    const { videos, thumbnails, shorts = [] } = site.works;
    const videoItems = videos.map((v) => `<figure class="work">${Video(v)}${Caption(v)}</figure>`).join('');
    const thumbItems = thumbnails
      .map((t) => `<figure class="work thumb">${Image(t)}${Caption(t)}</figure>`)
      .join('');
    const grid = thumbnails.length > 2;
    const shortItems = shorts.map((v) => `<figure class="work">${Video(v)}${Caption(v)}</figure>`).join('');

    return (
      Panel(
        `${SectionHead(site, 'works')}
         <h3 class="subhead">영상</h3>
         <div class="works-row">${videoItems}</div>`,
        { id: 'works', fit: '50vh', nav: '작업물 · 영상', group: 'works' }
      ) +
      (shorts.length
        ? Panel(
            `<div class="shorts">
               <h3 class="subhead">쇼츠</h3>
               <div class="shorts-row">${shortItems}</div>
             </div>`,
            { cls: 'panel-shorts', label: '쇼츠', nav: '작업물 · 쇼츠', group: 'works' }
          )
        : '') +
      Panel(
        `<div class="works-grid ${grid ? 'is-grid' : ''}">
           <h3 class="subhead">썸네일</h3>
           <div class="works-row">${thumbItems}</div>
         </div>`,
        { cls: 'panel-thumbs', label: '썸네일', fit: grid ? 'var(--thumb-h)' : '56vh', nav: '작업물 · 썸네일', group: 'works' }
      )
    );
  }

  function Services(site) {
    const rows = site.services
      .map((s) => {
        return `<li class="service"><h3>${esc(s.title)}</h3><p>${lines(s.desc)}</p></li>`;
      })
      .join('');
    return Panel(`${SectionHead(site, 'services')}<ul class="services">${rows}</ul>`, { id: 'what-i-do', cls: 'panel-services', nav: site.sections.services.title });
  }

  function Step(no, step, extra = '') {
    return `
      <div class="split step">
        <div class="step-meta">
          <span class="tc">${no}</span>
          <h3>${esc(step.title)}</h3>
          <p>${esc(step.text)}</p>
        </div>
        <div class="step-body">${Video(step)}${extra}</div>
      </div>`;
  }

  function Process(site) {
    const p = site.process;
    const notes = (p.notes || [])
      .map(
        (n) => `
        <li class="note">
          <span class="note-tc">${esc(n.tc)}</span>
          <span class="note-tag">${esc(n.tag)}</span>
          <span class="note-why">${esc(n.why)}</span>
        </li>`
      )
      .join('');

    return (
      Panel(
        `${SectionHead(site, 'process')}
         ${p.lead ? `<p class="process-lead">${esc(p.lead)}</p>` : ''}
         ${Step('01', p.original)}`,
        { id: 'how-i-edit', cls: 'panel-process', vr: p.original.ratio, nav: `${site.sections.process.title} · ${p.original.title}`, group: 'process' }
      ) +
      Panel(Step('02', p.timeline, notes ? `<ul class="notes">${notes}</ul>` : ''), {
        cls: 'panel-process',
        label: p.timeline.title,
        vr: p.timeline.ratio,
        nav: `${site.sections.process.title} · ${p.timeline.title}`,
        group: 'process',
      }) +
      Panel(Step('03', p.final), { cls: 'panel-process', label: p.final.title, vr: p.final.ratio, nav: `${site.sections.process.title} · ${p.final.title}`, group: 'process' })
    );
  }

  function About(site) {
    const a = site.about;
    return Panel(
      `${SectionHead(site, 'about')}
       <div class="split about">
         <div class="about-tools">
           <span class="label">사용 툴</span>
           <ul>${a.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
         </div>
         <div class="about-text">${a.paragraphs.map((p) => `<p>${lines(p)}</p>`).join('')}</div>
       </div>`,
      { id: 'about', cls: 'panel-about', nav: site.sections.about.title }
    );
  }

  function Contact(site) {
    const c = site.contact;
    const links = (c.links || []).filter((l) => l && l.url);
    const rows = [];
    if (c.phone) {
      rows.push(`
        <li class="contact-row">
          <span class="contact-label">전화</span>
          <a class="contact-value contact-phone" href="tel:${esc(c.phone.replace(/[^0-9+]/g, ''))}">${esc(c.phone)}</a>
        </li>`);
    }
    if (c.email) {
      rows.push(`
        <li class="contact-row">
          <span class="contact-label">이메일</span>
          <button type="button" class="contact-value" data-copy="${esc(c.email)}" aria-label="${esc(c.email)} 복사">${esc(c.email)}<span class="arrow" aria-hidden="true">↗</span></button>
        </li>`);
    }
    return (
      Panel(
        `${SectionHead(site, 'contact')}
         <ul class="contact-list">${rows.join('')}</ul>
         ${
           links.length
             ? `<div class="contact-links">${links
                 .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
                 .join('')}</div>`
             : ''
         }
         <footer class="foot">
           <span>${esc(site.footer)}</span>
           <a href="#top" data-go="0">처음으로</a>
         </footer>`,
        { id: 'contact', cls: 'panel-contact', nav: site.sections.contact.title }
      ) +
      `<div class="toast" role="status" aria-live="polite" data-msg="${esc(c.copied || '복사되었습니다.')}"></div>`
    );
  }

  window.Components = { Intro, Works, Services, Process, About, Contact };
})();
