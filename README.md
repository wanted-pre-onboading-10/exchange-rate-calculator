# 환율 계산기

이 프로젝트는 다음 기능들을 지원합니다.

- 미국 달러에서 대한민국 원화, 일본 엔화, 필리핀 페소로 변환 시켜주는 계산기
- 미국 달러, 캐나다 달러, 대한민국 원화, 홍콩 달러, 일본 엔화, 중국 위안화 간 변환 시켜주는 계산기

## 배포

[배포 링크](http://wanted-team-10-calculator.s3-website-us-east-1.amazonaws.com/simple)

## 팀원

- [@2kyung19](https://github.com/2kyung19)
- [@tae100k](https://github.com/tae100k)
- [@wook95](https://github.com/wook95)
- [@hyundonny](https://github.com/hyundonny)

## 계산기별 기능

### 심플 계산기

([@hyundonny](https://github.com/hyundonny), [@tae100k](https://github.com/tae100k))

- 실시간 미 달러 대비 대한민국 원화, 일본 엔화, 필리핀 페소 환율 검색 기능
- 미 달러 송금 시, 대한민국 원화, 일본 엔화, 필리핀 페소 수취 금액 계산 기능
- 수취 금액 및 환율 계산 시 화폐 형식의 숫자 생성

### 탭 계산기

([@2kyung19](https://github.com/2kyung19), [@wook95](https://github.com/wook95))

- 실시간 미국 달러, 캐나다 달러, 대한민국 원화, 홍콩 달러, 일본 엔화, 중국 위안화 간 환율 확인 기능
- 미국 달러, 캐나다 달러, 대한민국 원화, 홍콩 달러, 일본 엔화, 중국 위안화 간 송금 수취 자율 선택
- 사용자가 수치를 입력하거나 통화 변경 시 환율 동기화
- 사용자가 통화 변경 시 탭 메뉴 자동 변경 및 첫 탭으로 이동
- 사용자 입력 키 제어 및 숫자 콤마 생성

## 로컬 환경 구동

프로젝트 클론

```bash
  git clone https://github.com/wanted-pre-onboading-10/exchange-rate-calculator
```

프로젝트 디렉토리 들어가기

```bash
  cd exchange-rate-calculator
```

패키지 설치

```bash
  npm install
```

프로젝트 시작

```bash
  npm run start
```

## 폴더 구조

```bash
exchange-rate-calculator/src
│
├── App.js
├── components
│   ├── converter
│   │   └── index.js
│   └── nav
│       └── index.js
├── index.js
├── pages
│   ├── simple-calc
│   │   └── index.js
│   └── tab-calc
│       ├── InputBox.js
│       ├── TabMenu.js
│       └── index.js
├── styles
│   └── GlobalStyles.js
└── utils
    ├── api.js
    ├── convert.js
    └── currency.js
```

## 배운 점

- 팀으로 일하기 위해서 git을 능숙하게 활용할 줄 알아야 한다.
- 한 가지 문제를 풀기 위해서 여러 방식이 존재하는데, 먼저 소통하며 방식을 통일하는 것이 좋겠다.
- 여러 CSS 선택자를 사용하는 법을 배웠다.

## 시연

https://user-images.githubusercontent.com/32586712/151099493-6f6a45be-954e-4525-9f28-09e0b25032a9.mov
