// 사이트 문구, 파일 경로, 링크는 여기서 수정

window.SITE = {
  name: '김인수',

  intro: {
    greeting: '안녕하세요.',
    title: '영상 편집자\n김인수입니다.', // \n 에서 줄바꿈
    thanks: '시간 내주셔서 감사합니다.',
    photo: 'assets/profile.jpg',
    photoAlt: '김인수 프로필 사진',
  },

  sections: {
    works:    { title: '작업물' },
    services: { title: '맡길 수 있는 일' },
    process:  { title: '편집 과정' },
    about:    { title: '소개' },
    contact:  { title: '연락처' },
  },

  works: {
    // start, end: 반복할 구간(초). end 가 0 이면 전체 반복
    videos: [
      {
        title: '반건조 리신 팝니다',
        caption: '유튜브 이석희 - 반건조 리신 팝니다',
        url: 'https://youtu.be/-bbIcQPP2Ho',
        src: 'assets/works/video-01.mp4',
        poster: 'assets/works/video-01-poster.jpg',
        sound: true,
        start: 0,
        end: 10,
        ratio: '16 / 9',
      },
      {
        title: '나비아 성우님 팬사인회?!',
        caption: '유튜브 주노 - 나비아 성우님 팬사인회?!',
        url: 'https://youtu.be/MczkKFS4aOQ',
        src: 'assets/works/video-02.mp4',
        sound: true,
        poster: 'assets/works/video-02-poster.jpg',
        start: 0,
        end: 10,
        ratio: '16 / 9',
      },
    ],
    shorts: [
      {
        title: '탑 바루스 참교육',
        caption: '유튜브 이석희 - 탑 바루스 참교육',
        url: 'https://youtube.com/shorts/NhAg2hdR6X0',
        src: 'assets/works/shorts-01.mp4',
        poster: 'assets/works/shorts-01-poster.jpg',
        sound: true,
        start: 0,
        end: 0,
        ratio: '9 / 16',
      },
      {
        title: '레전드 정병 카르마',
        caption: '유튜브 이석희 - 레전드 정병 카르마',
        url: 'https://youtube.com/shorts/cftk6X9_SOE',
        src: 'assets/works/shorts-02.mp4',
        poster: 'assets/works/shorts-02-poster.jpg',
        sound: true,
        start: 0,
        end: 0,
        ratio: '9 / 16',
      },
    ],
    thumbnails: [
      {
        title: '정글 봉인 해제.',
        caption: '유튜브 이석희 - 정글 봉인 해제.',
        url: 'https://youtu.be/4SHq8pS40Z0',
        src: 'assets/works/thumbnail-01.jpg',
        ratio: '16 / 9',
      },
      {
        title: '그 아이템을 사자 정글이 탑으로 뛰었다.',
        caption: '유튜브 이석희 - 그 아이템을 사자 정글이 탑으로 뛰었다.',
        url: 'https://youtu.be/Na4vAPSsgA4',
        src: 'assets/works/thumbnail-02.jpg',
        ratio: '16 / 9',
      },
      {
        title: '라인 가챠의 사나이',
        caption: '유튜브 이석희 - 라인 가챠의 사나이',
        url: 'https://youtu.be/RPc9IFOwRrg',
        src: 'assets/works/thumbnail-03.jpg',
        ratio: '16 / 9',
      },
      {
        title: '펜타 킬을 밥 먹듯이 하는 남자',
        caption: '유튜브 이석희 - 펜타 킬을 밥 먹듯이 하는 남자',
        url: 'https://youtu.be/Jj1ZFH5a1Zc',
        src: 'assets/works/thumbnail-04.jpg',
        ratio: '16 / 9',
      },
    ],
  },

  services: [
    { title: '영상 편집', desc: '게임 하이라이트부터 브이로그까지, 원본 컷 편집부터 완성본까지 맡습니다.' },
    { title: '쇼츠',      desc: '본편 장면을 쇼츠에 맞게 재가공합니다. 구독자 7.5만 채널에서 조회수 50만을 기록했습니다.' },
    { title: '썸네일',    desc: '핵심 장면을 이용해 최적의 썸네일을 만듭니다. 지금까지 700개 이상 제작했습니다.' },
    { title: '채널 운영', desc: '업로드 예약, 제목·설명·태그 설정, 댓글 관리까지 담당할 수 있습니다.' },
    { title: '반응 분석', desc: '조회수, 댓글, 시청 지속 시간을 점검한 뒤 개선점을 찾아 보고드립니다.' },
  ],

  process: {
    lead: '앞에서 본 ‘반건조 리신 팝니다’ 영상이 만들어진 과정입니다.',
    original: {
      title: '원본',
      text: '원본을 끝까지 보며 효과가 들어가야 할 편집점을 하나하나 찾습니다.',
      src: 'assets/process/process-original.mp4',
      poster: 'assets/process/process-original-poster.jpg',
      start: 0,
      end: 0,
      ratio: '1280 / 1106',
    },
    timeline: {
      title: '편집',
      text: '슬로우 모션과 색감 보정을 적용하고, 이펙트와 효과음을 더합니다.',
      src: 'assets/process/process-timeline.mp4',
      poster: 'assets/process/process-timeline-poster.jpg',
      start: 0,
      end: 0,
      ratio: '1280 / 1106',
    },
    notes: [],
    final: {
      title: '완성',
      text: '모든 효과를 하나로 합친 뒤, 프레임 단위로 다듬어 마무리합니다.',
      src: 'assets/works/video-01.mp4',
      sound: true,
      poster: 'assets/works/video-01-poster.jpg',
      start: 0,
      end: 0,
      ratio: '16 / 9',
    },
  },

  about: {
    // 배열 하나가 한 문단, 마침표마다 줄이 바뀜
    paragraphs: [
      '게임과 유튜브 콘텐츠를 즐겨 보던 시청자에서, 직접 영상을 만드는 편집자가 되었습니다. 지금까지 4년 동안 4개 채널에서 682편의 영상을 제작했습니다.',
      '함께 일하는 동안에는 제 채널이라고 생각하고 작업합니다. 제가 보다가 넘기고 싶은 장면은 시청자도 넘깁니다. 그런 구간은 남겨두지 않습니다.',
      '마감은 꼭 지킵니다. 그동안 코로나에 걸렸던 한 번을 빼고는 마감을 넘긴 적이 없습니다.',
      '반응이 좋으면 같이 웃고, 아쉬우면 왜 그랬는지 다시 돌려 보며 다음 영상에서 고칩니다.',
    ],
    tools: ['Premiere Pro', 'Photoshop', 'Final Cut Pro', 'Motion', 'Cutback'],
  },

  contact: {
    phone: '010-6504-3244',
    email: 'dlstn9344@naver.com',
    copied: '복사되었습니다.',
    // { label: 'YouTube', url: 'https://...' } 형태로 추가
    links: [],
  },

  footer: '© 2026 김인수',
};

// 애니메이션 (ms / px)
window.MOTION = {
  ease: 'cubic-bezier(.22, .61, .36, 1)',

  intro: {
    delay: 250,
    stagger: 550,
    duration: 750,
    blur: 8,
    distance: 8,
    revisitHours: 0,    // 0 이면 들어올 때마다 재생
  },

  pager: {
    threshold: 30,
    gestureGap: 180,
    swipe: 50,
    outDuration: 520,
    inDuration: 820,
    inDelay: 220,
    blur: 16,
    distance: 56,
  },
};
