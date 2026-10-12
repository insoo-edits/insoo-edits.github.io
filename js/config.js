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
    services: { title: '하는 일' },
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
        start: 0,
        end: 10,
        ratio: '16 / 9',
      },
      {
        title: '나비아 성우님 팬사인회?!',
        caption: '유튜브 주노 - 나비아 성우님 팬사인회?!',
        url: 'https://youtu.be/MczkKFS4aOQ',
        src: 'assets/works/video-02.mp4',
        poster: 'assets/works/video-02-poster.jpg',
        start: 0,
        end: 10,
        ratio: '16 / 9',
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
        title: '합성 아님 주작 아님',
        caption: '유튜브 이석희 - 합성 아님 주작 아님',
        url: 'https://youtu.be/EaukEnj1xzg',
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
    { title: '소스 관리',   desc: '소스와 프로젝트 파일 정리' },
    { title: '영상 편집',   desc: '컷 편집 / 자막 / 사운드 / 모션 그래픽' },
    { title: '썸네일',      desc: '영상에 맞는 썸네일 제작' },
    { title: '채널 관리',   desc: '영상 업로드 / 댓글 관리' },
    { title: '피드백',      desc: '영상 반응을 확인하고 다음 콘텐츠에 반영' },
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
    // 타임라인 아래 메모. { tc: '00:00:02', tag: 'CUT', why: '이유' } 형태. 비워두면 숨김
    notes: [],
    final: {
      title: '완성',
      text: '모든 효과를 하나로 합친 뒤, 프레임 단위로 다듬어 마무리합니다.',
      src: 'assets/works/video-01.mp4',
      poster: 'assets/works/video-01-poster.jpg',
      start: 0,
      end: 0,
      ratio: '16 / 9',
    },
  },

  about: {
    // 배열 하나가 한 문단
    paragraphs: [
      '게임과 유튜브 콘텐츠를 즐겨 보던 시청자에서, 직접 영상을 만드는 편집자가 되었습니다. 지금까지 4년 동안 4개 채널에서 682편의 영상을 제작했습니다.',
      '함께 일하는 동안에는 제 채널이라고 생각하고 작업합니다. 영상의 흐름과 타이밍, 시청자가 지루해지는 순간을 늘 신경 씁니다.',
      '마감은 꼭 지킵니다. 682편을 만드는 동안 코로나에 걸렸던 한 번을 빼고는 마감을 넘긴 적이 없습니다.',
      '반응이 좋으면 같이 웃고, 아쉬우면 왜 그랬는지 다시 돌려 보며 다음 영상에서 고칩니다.',
    ],
    tools: ['Premiere Pro', 'Photoshop', 'Final Cut Pro', 'Motion', 'Cutback'],
  },

  contact: {
    phone: '010-6504-3244',  // 휴대폰에서 누르면 전화 연결
    email: 'dlstn9344@naver.com', // 누르면 복사
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
    stagger: 550,       // 문장 사이 간격
    duration: 750,
    blur: 8,
    distance: 8,
    revisitHours: 0,    // 0 이면 들어올 때마다 재생
  },

  pager: {
    threshold: 30,      // 클수록 스크롤에 둔감
    gestureGap: 180,
    swipe: 50,
    outDuration: 520,
    inDuration: 820,
    inDelay: 220,
    blur: 16,
    distance: 56,
  },
};
