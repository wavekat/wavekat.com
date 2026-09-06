import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      '무료 오픈소스 SIP 클라이언트. 다재다능하고 크로스플랫폼이지만, WaveKat Voice는 넓이 대신 집중을 택해 모든 통화를 녹음하고, 받지 못한 전화를 대신 받고, 통화를 CRM에 남기는 데스크톱 업무용 전화를 제공합니다.',
    seoTitle: 'Linphone 대안: Mac/Win/Linux',
    seoDescription:
      'Linphone 대안 WaveKat Voice: Mac·Windows·Linux SIP 소프트폰. 통화 녹음·전사, 부재 시 응답, HubSpot 기록.',
    heading: 'Mac, Windows, Linux용 Linphone 대안',
    intro:
      'WaveKat Voice는 Mac, Windows, Linux용 데스크톱 업무용 전화로 Linphone을 대체할 수 있습니다. 똑같이 SIP로 자신의 번호에 연결하지만, 모든 통화를 자동으로 녹음하고 실시간으로 받아 적어 검색 가능한 하나의 기록에 모아 둡니다. 받지 못한 전화는 통화 흐름이 인사말과 음성사서함으로 대신 받아 주고, 통화는 그대로 HubSpot CRM에 기록할 수 있습니다. Linphone은 거의 모든 플랫폼에서 실행되는 무료 오픈소스 범용 SIP 클라이언트입니다. 범용 VoIP 도구가 아니라 바로 쓸 수 있는 업무용 전화를 원한다면, 두 제품의 항목별 비교는 다음과 같습니다.',
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
        label: '자동 응답과 음성사서함',
        wavekat:
          '통화 흐름이 대신 받습니다 — 인사말, 영업시간, 전화 메뉴, 음성사서함, 전달. 상대가 메시지를 남기는 중에 직접 받을 수도 있습니다.',
        them: '자체 자동 응답 기능은 없음. 음성사서함은 통신사 사서함이며 Linphone에서 걸 수 있음.',
      },
      {
        label: 'CRM에 통화 기록',
        wavekat:
          'HubSpot을 한 번 연결하면 이후 모든 통화가 일치하는 연락처에 자동으로 기록됩니다. 전사본과 HubSpot 안에서 재생되는 녹음 포함. Pro 기능이며 얼리 액세스 기간에는 무료.',
        them: 'CRM 연동 없음. 통화는 앱 자체 기록에만 남음.',
      },
      {
        label: '번호 설정',
        wavekat: '목록에서 통신사(Twilio, Telnyx, 2talk 등)를 선택하면 설정이 자동으로 입력됩니다.',
        them: '직접 구성해야 하는 범용 SIP 필드.',
      },
      {
        label: '데이터 저장 위치',
        wavekat: '기본적으로 사용자의 컴퓨터에 저장; 선택적으로 로그인해 웹과 동기화 가능.',
        them: '사용자의 기기에 저장 — 클라이언트일 뿐, 무엇도 대신 호스팅하지 않음.',
      },
      {
        label: '지원 플랫폼',
        wavekat: 'Mac, Windows, Linux (Windows 빌드는 Microsoft Store에서 제공).',
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
      '휴대폰이나 태블릿에서도 컴퓨터와 같은 앱이 필요한 경우',
      '음성과 같은 곳에서 영상 통화와 채팅을 원하는 경우',
      'SIP 설정을 직접 구성하는 것이 편한 경우',
    ],
    chooseWavekat: [
      '아무것도 켤 필요 없이 모든 통화가 자동으로 녹음되고 기록되기를 원하는 경우',
      '통화, 녹음, 전사본을 하나의 검색 가능한 기록으로 원하는 경우',
      'SIP 필드를 입력하기보다 목록에서 통신사를 고르고 싶은 경우',
      '받지 못한 전화도 응답되기를 원하는 경우 — 인사말, 영업시간, 그리고 메시지를 받아 적는 음성사서함',
      '누가 따로 입력하지 않아도 모든 통화가 HubSpot CRM에 남기를 원하는 경우',
      '범용 VoIP 도구가 아니라 집중형 데스크톱 업무용 전화를 원하는 경우',
    ],
    faqs: [
      {
        q: 'WaveKat Voice는 Linphone과 같은 SIP 통신사에 연결할 수 있나요?',
        a: '네. 둘 다 SIP 소프트폰이므로 Linphone에서 작동하는 통신사라면 WaveKat Voice에서도 작동합니다. 차이는 설정에 있습니다. WaveKat Voice는 Twilio, Telnyx, 2talk 같은 일반적인 통신사의 설정을 자동으로 입력해 주며, 그 외의 경우에는 세부 정보를 직접 입력할 수 있습니다.',
      },
      {
        q: 'WaveKat Voice는 Windows에서 실행되나요?',
        a: '네. WaveKat Voice는 Windows 10과 11용으로 Microsoft Store에 있으며, 하나의 스토어 페이지에 Intel/AMD(x64)와 ARM64 패키지가 모두 들어 있습니다. Mac과 Linux 빌드도 같이 배포됩니다. .exe 직접 설치 파일도 있지만 아직 코드 서명이 되어 있지 않아 첫 실행 시 Windows가 알 수 없는 게시자라고 경고합니다. 스토어 패키지는 Microsoft가 서명합니다. Linphone에도 Windows 버전이 있습니다.',
      },
      {
        q: 'Linphone도 WaveKat Voice처럼 통화를 녹음하고 전사하나요?',
        a: 'Linphone은 수동으로 시작하면 개별 통화를 녹음할 수 있지만, 통화를 전사하거나 녹음 및 전사본의 탐색 가능한 기록을 보관하지는 않습니다. WaveKat Voice는 모든 통화를 자동으로 녹음하고, 옆에 실시간 전사본을 작성하며, 별도의 설정 없이 둘 다 통화 기록에 저장합니다.',
      },
      {
        q: 'WaveKat Voice에 음성사서함이 있나요? 전화를 받지 못할 때 대신 받아 주나요?',
        a: '네, 그것이 통화 흐름의 역할입니다. 흐름을 회선에 지정하면 WaveKat Voice가 인사말로 응답하고, 영업시간을 확인하고, 전화 메뉴를 들려주고, 메시지를 녹음하거나 통화를 전달합니다. 메시지도 일반 통화와 똑같이 녹음·전사되며, 상대가 메시지를 남기는 중에 직접 받을 수 있습니다. 인사말, 메시지 녹음, 본인 호출은 무료이고, 전화 메뉴·영업시간·전달은 Pro 기능입니다(얼리 액세스 기간에는 1년 무료). 흐름은 본인 컴퓨터에서 실행되므로 응답하려면 앱이 켜져 있어야 합니다. Linphone에는 자체 자동 응답 기능이 없어, 음성사서함은 통신사 사서함에 달려 있습니다.',
      },
      {
        q: 'WaveKat Voice는 통화를 HubSpot에 기록할 수 있나요?',
        a: '네. HubSpot 계정을 한 번 연결하면 이후 걸고 받는 모든 통화가 번호가 일치하는 연락처에 자동으로 기록됩니다. 시간, 수·발신 방향, 결과, 통화 시간, 전사본, 그리고 HubSpot 안에서 바로 재생할 수 있는 녹음이 함께 남습니다. Pro 기능이며 얼리 액세스 기간에는 무료이고, 다른 CRM은 웹훅으로 연동할 수 있습니다. Linphone에는 CRM 연동이 없습니다.',
      },
      {
        q: 'WaveKat Voice에 한국어가 있나요?',
        a: '네. 앱은 아홉 개 언어(한국어, 영어, 중국어 간체·번체, 일본어, 독일어, 스페인어, 프랑스어, 이탈리아어)를 지원하며 설정에서 바꿀 수 있습니다.',
      },
      {
        q: 'WaveKat Voice도 Linphone처럼 오픈소스인가요?',
        a: '아닙니다 — WaveKat Voice는 상용 제품이며, 공개 베타 기간 동안 무료입니다. 그 아래의 여러 구성 요소는 저희 GitHub에서 오픈소스로 공개되어 있지만, Voice 앱 자체는 오픈소스가 아닙니다.',
      },
    ],
  },
];
