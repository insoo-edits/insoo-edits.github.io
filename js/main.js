(function () {
  const { Intro, Works, Services, Process, About, Contact } = window.Components;
  const site = window.SITE;

  document.getElementById('app').innerHTML = [
    Intro(site),
    About(site),
    Works(site),
    Services(site),
    Process(site),
    Contact(site),
  ].join('');

  window.Motion.init();
})();
