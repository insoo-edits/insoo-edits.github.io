# 김인수 포트폴리오

HTML, CSS, JS만으로 된 정적 사이트입니다.

## 미리보기

`index.html`을 브라우저로 열면 됩니다. 영상까지 정확히 보려면 폴더 안에서 로컬 서버로 엽니다.

```bash
python3 -m http.server 8000
```

## 배포

폴더를 통째로 Netlify, Vercel, GitHub Pages 등에 올리면 됩니다.

## 수정

- 문구, 링크, 영상 경로: `js/config.js`
- 색, 글씨 크기, 여백: `css/style.css` 맨 위
- 섹션 순서: `js/main.js`

## 파일

```
assets/
  profile.jpg
  works/      video-01.mp4, video-02.mp4, shorts-01.mp4, shorts-02.mp4 (+ poster), thumbnail-01~04.jpg
  process/    process-original.mp4, process-timeline.mp4 (+ poster)
```

완성본(FINAL)은 `works/video-01.mp4`를 같이 씁니다.
