(function () {
  const { Intro, Works, Services, Process, About, Contact } = window.Components;
  const site = window.SITE;

  document.getElementById('app').innerHTML = [
    Intro(site),
    Works(site),
    Services(site),
    Process(site),
    About(site),
    Contact(site),
  ].join('');

  window.Motion.init();
})();
