/* Research topics describe these works, rather than assigning a permanent camp to a person. */
window.ATLAS_TURING_PROFILE = {
  id: 'alan-turing',
  name: 'Alan Turing',
  nameKo: '앨런 튜링',
  tagline: '계산의 절차에서 학습하는 기계의 가능성까지',
  tags: ['foundations', 'neural'],
  intro: '튜링은 계산을 수행하는 추상 기계, 실제 전자계산기의 설계, 기계 지능을 논의하는 방법을 연구했다. 신경세포의 연결에서 착안한 기계도 검토했다. 아래 연표는 연구가 작성되거나 제출된 때와 나중의 출판 기록을 구분하며, 형태형성 연구는 AI와 다른 연구 분야로 함께 소개한다.',
  works: [
    {
      id: 'turing-computable-numbers',
      year: 1936,
      dateLabel: '1936년 제출·발표 · 출판사 서지 1937년',
      title: 'On Computable Numbers, with an Application to the Entscheidungsproblem',
      summary: '테이프의 기호와 유한한 상태를 따라 계산하는 추상 기계를 정의했다. 다른 기계의 기술을 읽어 그 계산을 수행하는 보편 기계를 설명하고, 모든 판정 문제를 하나의 일반 절차로 해결할 수 있는지 검토했다.',
      type: '논문',
      track: 'foundations',
      people: ['Alan M. Turing'],
      sources: [
        { title: "King's College Cambridge · AMT/B/12", url: 'https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-12' },
        { title: 'London Mathematical Society · 논문 서지', url: 'https://londmathsoc.onlinelibrary.wiley.com/doi/10.1112/plms/s2-42.1.230' },
        { title: '1936년 접수·발표일이 적힌 원문 · MIT 보관본', url: 'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf' }
      ],
      caveat: '첫 쪽에는 1936년 5월 28일 접수와 11월 12일 발표가 적혀 있고, 출판사와 공식 아카이브는 1937년 권호로 분류한다. 계산 가능성에 관한 연구이며, 이 연도가 심볼릭 AI라는 분야의 창립 연도를 뜻하지는 않는다.'
    },
    {
      id: 'turing-ace-proposal',
      year: 1945,
      dateLabel: '1945년 작성 · 1946년 2월 NPL 제출',
      title: 'Proposed Electronic Calculator',
      summary: '범용 전자계산기 ACE의 설계를 제안했다. 계산 장치의 구성과 명령표를 작성해 여러 계산을 수행하는 방법을 다뤘다.',
      type: '설계제안',
      track: 'foundations',
      people: ['Alan M. Turing'],
      sources: [
        { title: 'NPL · 튜링과 ACE 원본 보고서 안내', url: 'https://www.npl.co.uk/about-us/history/famous/alan-turing' },
        { title: 'Oxford University Press · Proposed electronic calculator (1945)', url: 'https://academic.oup.com/book/32836/chapter-abstract/275289623' }
      ],
      caveat: '작성 시점과 NPL 집행위원회 제출 시점을 구분한다. 설계 제안의 존재가 그때 완성된 컴퓨터의 작동이나 AI 성능을 입증하는 것은 아니다.'
    },
    {
      id: 'turing-intelligent-machinery',
      year: 1948,
      dateLabel: '1948년 NPL 보고서 · 당시 미출판',
      title: 'Intelligent Machinery',
      summary: '신경세포 연결에서 착안한 비조직 기계(unorganised machines)를 검토하고, 기계를 교육하고 바꾸어 지능적인 행동을 형성할 가능성을 논의했다.',
      type: '보고서',
      track: 'neural',
      people: ['Alan M. Turing'],
      sources: [
        { title: 'NPL · 보고서와 원본 자료 안내', url: 'https://www.npl.co.uk/about-us/history/famous/alan-turing' },
        { title: "King's College Cambridge · Intelligent machinery 초고 AMT/C/11", url: 'https://turingarchive.kings.cam.ac.uk/unpublished-manuscripts-and-drafts-amtc/amt-c-11' },
        { title: 'Oxford University Press · Intelligent Machinery (1948) 재수록', url: 'https://academic.oup.com/book/42030/chapter/355746030' }
      ],
      caveat: '1948년은 NPL 보고서의 작성 시점이다. 공식 아카이브의 이 초고 자체는 무연대 자료로 분류된다. 별도 강연 Intelligent Machinery, a Heretical Theory와 구분하며, 현대 신경망 학습법 전체를 이 보고서의 성과로 돌리지 않는다.'
    },
    {
      id: 'turing-computing-machinery-intelligence',
      year: 1950,
      dateLabel: '1950년 10월 · Mind 출판',
      title: 'Computing Machinery and Intelligence',
      summary: '기계가 생각할 수 있는지라는 질문을 모방 게임에서의 행동을 묻는 문제로 바꾸어 논의했다. 후반부에서는 처음부터 성인의 능력을 모두 프로그램하기보다 학습하는 기계를 교육하는 방향도 검토했다.',
      type: '논문',
      track: 'foundations',
      people: ['Alan M. Turing'],
      sources: [
        { title: 'Oxford University Press · Mind 논문 서지', url: 'https://academic.oup.com/mind/article/LIX/236/433/986238' },
        { title: "King's College Cambridge · AMT/B/19", url: 'https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-19' },
        { title: '논문 본문 전사본 · University of Miami 보관', url: 'https://www.psy.miami.edu/_assets/pdf/rpo-articles/turing-1950.pdf' }
      ],
      caveat: '모방 게임은 지능을 논의하기 위한 제안이다. 이 논문이 현대 언어 모델의 지능이나 의식을 실험으로 입증한 것은 아니다. 원문의 제1절과 제7절을 함께 읽는다.'
    },
    {
      id: 'turing-morphogenesis',
      year: 1952,
      dateLabel: '1952년 8월 14일 · 생물학 논문',
      title: 'The Chemical Basis of Morphogenesis',
      summary: '화학 물질의 반응과 확산으로 균일한 상태가 불안정해지고 공간적 무늬가 생길 수 있는 조건을 수학적으로 연구했다.',
      type: '논문',
      track: 'foundations',
      people: ['Alan M. Turing'],
      sources: [
        { title: "King's College Cambridge · AMT/B/22", url: 'https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-22' },
        { title: 'Royal Society · 원논문 DOI', url: 'https://doi.org/10.1098/rstb.1952.0012' },
        { title: '원논문 · University of Cambridge 보관본', url: 'https://www.damtp.cam.ac.uk/user/gold/pdfs/teaching/old_literature/Turing1952.pdf' }
      ],
      caveat: '이 항목은 튜링의 다른 연구 분야를 보여준다. 생물의 형태 형성을 설명하는 수학적 모형으로, AI 알고리즘의 발명이나 신경망 성능 연구로 분류하지 않는다.'
    }
  ]
};
