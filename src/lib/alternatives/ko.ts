import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      '무료 오픈소스 SIP 클라이언트. 다재다능하고 크로스플랫폼이지만, WaveKat Voice는 넓이 대신 집중을 택해 모든 통화를 녹음하고 받아 적는 데스크톱 업무용 전화를 제공합니다.',
    seoTitle: 'Linphone 대안 (Mac·Linux)',
    seoDescription:
      'WaveKat Voice와 Linphone을 Mac 및 Linux에서 비교합니다. 모든 통화를 자동으로 녹음·전사하는 업무용 전화입니다.',
    heading: 'Mac 및 Linux용 Linphone 대안',
    intro:
      'Linphone은 거의 모든 곳에서 실행되는 다재다능하고 무료인 SIP 클라이언트입니다. 만약 정말로 원하는 것이 모든 통화를 녹음하고 받아 적으며, SIP 필드를 직접 손볼 필요 없이 설정되는 데스크톱 업무용 전화라면, Mac과 Linux에서 두 제품이 어떻게 비교되는지 살펴보십시오.',
    whatItIs: {
      summary:
        'Linphone은 Belledonne Communications에서 만든 오래된 오픈소스 SIP 소프트폰입니다. Mac, Windows, Linux, iOS, Android에서 실행되며, 음성 및 영상 통화, 인스턴트 메시징, 종단 간 암호화에 이르기까지 폭넓은 영역을 무료로 다룹니다.',
      strengths: [
        '무료 오픈소스이며, 사용에 계정이 필요 없음',
        '모바일을 포함해 사실상 모든 플랫폼에서 실행됨',
        '음성, 영상, 채팅을 하나의 클라이언트에서 제공',
        '기술에 익숙한 사용자를 위한 종단 간 암호화(ZRTP/SRTP)',
      ],
    },
    comparison: [
      {
        label: '모든 통화 녹음',
        wavekat: '자동 — 모든 통화가 녹음되며, 전화를 끊는 순간 저장됩니다.',
        them: '통화마다 수동으로 녹음; 기본적으로 저장된 탐색 가능한 기록은 제공하지 않음.',
      },
      {
        label: '텍스트 전사',
        wavekat: '통화 옆에 실시간 전사본이 표시되며, 녹음과 함께 보관됩니다.',
        them: '전사 기능 없음.',
      },
      {
        label: '검색 가능한 통화 기록',
        wavekat: '모든 통화가 녹음 및 전사본과 함께 하나의 기록에 모입니다.',
        them: '통화 로그만 제공 — 녹음이나 전사본은 첨부되지 않음.',
      },
      {
        label: '번호 설정',
        wavekat: '목록에서 통신사를 선택하면 설정이 자동으로 입력됩니다.',
        them: '직접 구성해야 하는 범용 SIP 필드.',
      },
      {
        label: '데이터 저장 위치',
        wavekat: '기본적으로 사용자의 컴퓨터에 저장; 선택적으로 로그인해 웹과 동기화 가능.',
        them: '사용자의 기기에 저장 — 클라이언트일 뿐, 무엇도 대신 호스팅하지 않음.',
      },
      {
        label: '지원 플랫폼',
        wavekat: '현재 Mac과 Linux(수요가 있으면 Windows).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: '영상 및 채팅',
        wavekat: '통화에 집중 — 영상이나 메시징 없음.',
        them: '음성, 영상, 인스턴트 메시징.',
      },
      {
        label: '가격',
        wavekat: '공개 베타 기간 동안 무료; 이후 유료.',
        them: '무료 오픈소스.',
      },
    ],
    chooseThem: [
      '소스가 공개된 무료 오픈소스 클라이언트를 원하는 경우',
      'Mac, Windows, Linux, 모바일에서 동일한 앱이 필요한 경우',
      '음성과 같은 곳에서 영상 통화와 채팅을 원하는 경우',
      'SIP 설정을 직접 구성하는 것이 편한 경우',
    ],
    chooseWavekat: [
      '아무것도 켤 필요 없이 모든 통화가 자동으로 녹음되고 기록되기를 원하는 경우',
      '통화, 녹음, 전사본을 하나의 검색 가능한 기록으로 원하는 경우',
      'SIP 필드를 입력하기보다 목록에서 통신사를 고르고 싶은 경우',
      '범용 VoIP 도구가 아니라 집중형 데스크톱 업무용 전화를 원하는 경우',
    ],
    faqs: [
      {
        q: 'WaveKat Voice는 Linphone과 같은 SIP 통신사에 연결할 수 있나요?',
        a: '네. 둘 다 SIP 소프트폰이므로 Linphone에서 작동하는 통신사라면 WaveKat Voice에서도 작동합니다. 차이는 설정에 있습니다. WaveKat Voice는 Twilio, Telnyx, 2talk 같은 일반적인 통신사의 설정을 자동으로 입력해 주며, 그 외의 경우에는 세부 정보를 직접 입력할 수 있습니다.',
      },
      {
        q: 'Linphone도 WaveKat Voice처럼 통화를 녹음하고 전사하나요?',
        a: 'Linphone은 수동으로 시작하면 개별 통화를 녹음할 수 있지만, 통화를 전사하거나 녹음 및 전사본의 탐색 가능한 기록을 보관하지는 않습니다. WaveKat Voice는 모든 통화를 자동으로 녹음하고, 옆에 실시간 전사본을 작성하며, 별도의 설정 없이 둘 다 통화 기록에 저장합니다.',
      },
      {
        q: 'WaveKat Voice도 Linphone처럼 오픈소스인가요?',
        a: '아닙니다 — WaveKat Voice는 상용 제품이며, 공개 베타 기간 동안 무료입니다. 그 아래의 여러 구성 요소는 저희 GitHub에서 오픈소스로 공개되어 있지만, Voice 앱 자체는 오픈소스가 아닙니다.',
      },
    ],
  },
];
