import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Mac 또는 Linux에서 2talk 번호를 사용하세요 — 구독이 필요 없으며 모든 통화를 자동으로 녹음하고 받아 적는 소프트폰입니다.',
    seoTitle: '2talk 소프트폰 (Mac 및 Linux)',
    seoDescription:
      'WaveKat Voice로 Mac 또는 Linux에서 2talk 번호를 사용하세요 — 구독이 필요 없으며 모든 통화를 녹음하고 받아 적는 SIP 소프트폰입니다. 2talk에서 Bria를 대신하는 무료 대안.',
    heading: 'Mac 및 Linux용 구독이 필요 없는 2talk 소프트폰',
    intro:
      'WaveKat Voice는 SIP로 2talk 계정에 연결해 모든 통화를 자동으로 녹음하고 받아 적는 데스크톱 소프트폰입니다. Mac과 Linux에서 실행되고, 공개 베타 기간 동안 무료이며, 월 구독료가 없습니다 — 따라서 Bria에 비용을 지불하지 않고도 2talk 번호를 컴퓨터에서 사용할 수 있는 방법입니다.',
    setup: {
      heading: '2talk 소프트폰을 설정하는 방법',
      summary:
        '2talk는 WaveKat Voice의 안내형 통신사 목록에 포함되어 있어 SIP 필드를 직접 손볼 필요가 없습니다 — 2talk를 선택하고 번호와 비밀번호만 입력하면 됩니다.',
      steps: [
        'Mac 또는 Linux 컴퓨터에서 WaveKat Voice를 다운로드하고 엽니다.',
        '계정을 추가하고 통신사 목록에서 2talk를 선택합니다.',
        '2talk 전화번호와 해당 SIP 비밀번호를 입력합니다.',
        'WaveKat Voice가 2talk에 등록되면 통화할 준비가 끝납니다 — 그리고 모든 통화가 자동으로 녹음되고 받아 적힙니다.',
      ],
      note: '직접 손으로 입력하시겠어요? 대부분의 뉴질랜드 계정에서 2talk는 도메인, 프록시, 아웃바운드 프록시에 하나의 SIP 서버 — sip.2talk.co.nz — 를 사용합니다. (2talk의 새로운 Lyra 플랫폼은 자체 설정을 사용합니다.) WaveKat Voice에서 2talk를 선택하면 이 값을 대신 입력해 줍니다.',
    },
    comparisonHeading: '2talk 소프트폰 비교',
    columns: ['WaveKat Voice', 'Bria(2talk 통해)', 'MicroSIP'],
    comparison: [
      {
        label: '가격',
        cells: [
          '공개 베타 기간 동안 무료; 이후 유료.',
          '2talk를 통해 월 NZ$5.95 + GST(2026년 7월 기준), 최대 4대 기기.',
          '무료 오픈소스.',
        ],
      },
      {
        label: '지원 플랫폼',
        cells: [
          '현재 Mac과 Linux(수요가 있으면 Windows).',
          'Windows, Mac, iOS, Android.',
          'Windows 전용.',
        ],
      },
      {
        label: '모든 통화 녹음',
        cells: [
          '자동 — 전화를 끊는 순간 모든 통화가 녹음됩니다.',
          '통화마다 수동; 통화 녹음은 유료 등급.',
          '통화마다 수동 녹음.',
        ],
      },
      {
        label: '텍스트 전사',
        cells: ['실시간 전사본이 녹음과 함께 보관됩니다.', '전사 기능 없음.', '전사 기능 없음.'],
      },
      {
        label: '검색 가능한 통화 기록',
        cells: [
          '통화, 녹음, 전사본이 하나의 검색 가능한 기록에 모입니다.',
          '통화 로그; 구독하면 녹음 제공.',
          '통화 로그만 제공.',
        ],
      },
      {
        label: '2talk 설정',
        cells: [
          '목록에서 2talk를 선택하고 번호와 비밀번호를 입력합니다.',
          '2talk에서 구입하면 해당 업체가 대신 설정합니다.',
          '범용 SIP 필드를 직접 입력합니다.',
        ],
      },
      {
        label: '모바일 및 푸시 알림',
        cells: [
          '데스크톱 전용 — 휴대폰 앱이나 모바일 푸시 없음.',
          '푸시 알림을 지원하는 iOS 및 Android 앱.',
          '모바일 앱 없음(Windows 데스크톱 전용).',
        ],
      },
    ],
    whatItIs: {
      heading: '2talk가 통화를 위해 제공하는 것',
      summary:
        '2talk는 전화번호와 SIP 자격 증명을 제공하는 뉴질랜드 VoIP 통신사입니다. 앱과 관련해서는 자사의 2talk Connect 소프트폰을 안내하고, 유료 소프트폰인 Bria를 월 NZ$5.95 + GST에 재판매합니다 — 그리고 계정이 표준 SIP이므로 어떤 SIP 소프트폰이든 등록해 사용할 수 있습니다.',
      strengths: [
        '현지 지원과 청구가 제공되는 뉴질랜드 전화번호',
        'Bria는 하나의 유료 앱으로 iPhone, Android, Mac, Windows를 모두 지원',
        'Bria 또는 Acrobits Groundwire를 통한 안정적인 모바일 푸시 알림',
        '2talk가 추천하는 앱뿐 아니라 어떤 SIP 소프트폰과도 호환',
      ],
    },
    chooseHeading: '어느 쪽이 당신에게 맞을까',
    chooseWavekatLabel: '이런 경우 WaveKat Voice를 선택하세요',
    chooseWavekat: [
      'Mac 또는 Linux 컴퓨터를 사용하며 제대로 된 2talk 데스크톱 소프트폰을 원하는 경우',
      '아무것도 켤 필요 없이 모든 2talk 통화가 자동으로 녹음되고 받아 적히기를 원하는 경우',
      '2talk 번호로 전화를 걸기 위해 월 구독료를 내고 싶지 않은 경우',
      '통화, 녹음, 전사본을 하나의 검색 가능한 기록으로 원하는 경우',
    ],
    chooseOtherLabel: '이런 경우 Bria 또는 MicroSIP를 선택하세요',
    chooseOther: [
      'iPhone이나 Android에서 안정적인 푸시 알림과 함께 2talk가 필요한 경우 — Bria 또는 Groundwire',
      '모바일도 함께 지원하는 단일 앱을 원하고 2talk에서 Bria 비용을 지불해도 괜찮은 경우',
      'Windows를 사용하며 지금 당장 무료의 가벼운 클라이언트를 원하는 경우 — MicroSIP',
      '2talk가 공식적으로 지원하고 대신 설정해 주는 앱을 원하는 경우',
    ],
    faqsHeading: '질문과 답변',
    faqs: [
      {
        q: 'WaveKat Voice는 2talk와 함께 사용할 수 있나요?',
        a: '네. WaveKat Voice는 SIP 소프트폰이고 2talk가 안내형 통신사 목록에 포함되어 있어, 2talk를 선택하고 2talk 번호와 SIP 비밀번호를 입력하면 등록됩니다 — SIP를 직접 구성할 필요가 없습니다. Mac과 Linux에서 작동하며, 모든 통화가 자동으로 녹음되고 받아 적힙니다.',
      },
      {
        q: 'Mac 또는 Linux에서 가장 좋은 2talk 소프트폰은 무엇인가요?',
        a: '구독이 필요 없으면서 모든 통화를 녹음하고 받아 적는 2talk 데스크톱 소프트폰을 원한다면, WaveKat Voice가 바로 그 용도로 Mac과 Linux에서 만들어졌습니다. 2talk 자체의 유료 추천 앱인 Bria는 Windows와 모바일을 지원하고, MicroSIP는 무료이지만 Windows 전용입니다.',
      },
      {
        q: 'Bria 대신 무료 2talk 소프트폰이 있나요?',
        a: '2talk를 통해 구입하는 Bria는 월 NZ$5.95 + GST입니다(2026년 7월 기준). 무료 선택지는 Windows의 MicroSIP와, 공개 베타 기간 동안 무료인 Mac 및 Linux의 WaveKat Voice입니다. 둘 다 SIP로 2talk 번호에 등록됩니다.',
      },
      {
        q: 'Mac에서 2talk 번호를 사용할 수 있나요?',
        a: '네. 어떤 SIP 소프트폰이든 Mac에서 2talk 번호를 등록할 수 있습니다 — 2talk가 재판매하는 Bria 앱과 WaveKat Voice를 포함해서요. WaveKat Voice는 자동 통화 녹음과 전사를 추가로 제공하며, 베타 기간 동안 월 요금을 청구하지 않습니다.',
      },
      {
        q: 'WaveKat Voice가 내 휴대폰에서 2talk 푸시 알림을 처리하나요?',
        a: '아니요 — WaveKat Voice는 Mac과 Linux용 데스크톱 앱이라 휴대폰에서는 실행되지 않으므로 모바일 푸시 알림을 제공할 수 없습니다. iPhone이나 Android에서 2talk로 걸려오는 전화를 안정적으로 받으려면 Bria 또는 Acrobits Groundwire를 사용하세요. 데스크톱에서는 앱이 열려 있는 동안 WaveKat Voice가 등록 상태를 유지하며 벨이 울립니다.',
      },
      {
        q: '2talk 소프트폰은 어떻게 설정하나요?',
        a: 'WaveKat Voice에서 계정을 추가하고, 통신사 목록에서 2talk를 선택한 다음, 2talk 번호와 SIP 비밀번호를 입력하세요 — SIP 설정은 대신 입력됩니다. 대부분의 뉴질랜드 계정에서 2talk는 도메인, 프록시, 아웃바운드 프록시에 하나의 SIP 서버인 sip.2talk.co.nz를 사용합니다. 2talk의 새로운 Lyra 플랫폼은 자체 설정을 사용하므로, 계정이 Lyra에 있다면 2talk가 제공하는 정보를 사용하세요.',
      },
    ],
    whatWavekatDoesLabel: 'WaveKat Voice가 하는 일',
  },
];
