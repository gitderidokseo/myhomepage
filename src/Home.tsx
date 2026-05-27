import { useEffect, useRef, useState } from "react";
import {
  Crosshair,
  FileSpreadsheet,
  ShieldCheck,
  Download,
  IdCard,
  Car,
  PlayCircle,
  FileOutput,
  Lightbulb,
  Database,
  Route as RouteIcon,
  Menu,
  X,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, start: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return v;
}

const nav = [
  { id: "home", label: "Home" },
  { id: "product", label: "드라이브로그" },
  { id: "guide", label: "사용 가이드" },
  { id: "pricing", label: "요금제" },
  { id: "about", label: "About" },
  { id: "blog", label: "운행기록부 가이드", href: "/drivelog/blog/" },
];

export default function Home() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      <Header open={open} setOpen={setOpen} scrolled={scrolled} />
      <main>
        <Hero />
        <Product />
        <Guide />
        <Templates />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  open,
  setOpen,
  scrolled,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  scrolled: boolean;
}) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-background/70 border-b border-border"
          : "py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div
            className="relative w-9 h-9 rounded-lg grid place-items-center"
            style={{ background: "var(--gradient-accent)" }}
          >
            <RouteIcon className="w-5 h-5 text-primary-foreground" />
            <span
              className="absolute inset-0 rounded-lg blur-md opacity-50"
              style={{ background: "var(--gradient-accent)" }}
            />
          </div>
          <span className="font-display font-bold tracking-tight text-lg">
            LalaCatSoft
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a
              key={n.id}
              href={"href" in n ? n.href : `#${n.id}`}
              className="text-sm text-muted-foreground hover:text-cyan transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#product"
          className="hidden md:inline-flex btn-primary !py-2 !px-4 text-xs"
        >
          시작하기 <ArrowRight className="w-4 h-4" />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-wide py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <a
                key={n.id}
                href={"href" in n ? n.href : `#${n.id}`}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-cyan"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 opacity-40">
        <div
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl animate-float"
          style={{ background: "oklch(0.45 0.18 230 / 0.35)" }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{
            background: "oklch(0.55 0.18 200 / 0.3)",
            animationDelay: "1.5s",
          }}
        />
      </div>

      <div className="container-wide grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="eyebrow mb-6">LalaCatSoft · Mobile Solutions</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] mt-6">
            법인차량 운행기록,
            <br />
            이제 <span className="gradient-text">자동으로</span>
            <br />
            기록하세요
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            GPS 기반 자동 거리 측정부터 세무용 운행기록부 엑셀 출력까지,
            LalaCatSoft의{" "}
            <strong className="text-foreground">드라이브로그</strong>가 한 번에
            해결합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#product" className="btn-primary">
              드라이브로그 알아보기 <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#guide" className="btn-ghost">
              사용 방법 보기
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "GPS", v: "자동 측정" },
              { k: "XLSX", v: "국세청 양식" },
              { k: "24/7", v: "백그라운드" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-mono text-xl gradient-text font-bold">
                  {s.k}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] max-w-md mx-auto w-full">
      <div
        className="absolute inset-0 rounded-[2.5rem] p-2 glass shadow-2xl"
        style={{ boxShadow: "var(--shadow-card), var(--shadow-glow)" }}
      >
        <div
          className="w-full h-full rounded-[2rem] p-5 flex flex-col overflow-hidden relative"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.04 252), oklch(0.14 0.03 250))",
          }}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>09:41</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-ring" />
              REC
            </span>
          </div>

          <div className="mt-6">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
              Live Distance
            </div>
            <div className="mt-2 font-mono font-bold text-5xl gradient-text">
              42.8
              <span className="text-xl text-muted-foreground ml-1">km</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              서울 강남 → 분당 사무소
            </div>
          </div>

          <div
            className="flex-1 mt-6 relative rounded-2xl overflow-hidden border border-border"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.28 0.06 230 / 0.5), oklch(0.16 0.03 250))",
            }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full">
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 230)" />
                  <stop offset="100%" stopColor="oklch(0.82 0.16 205)" />
                </linearGradient>
              </defs>
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={i}>
                  <line
                    x1={i * 50}
                    y1={0}
                    x2={i * 50}
                    y2={300}
                    stroke="oklch(0.30 0.04 254 / 0.3)"
                  />
                  <line
                    x1={0}
                    y1={i * 50}
                    x2={300}
                    y2={i * 50}
                    stroke="oklch(0.30 0.04 254 / 0.3)"
                  />
                </g>
              ))}
              <path
                d="M30 250 Q 80 200, 120 180 T 200 100 T 270 40"
                fill="none"
                stroke="url(#rg)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="30" cy="250" r="6" fill="oklch(0.82 0.16 205)" />
              <circle cx="270" cy="40" r="6" fill="oklch(0.72 0.18 230)">
                <animate
                  attributeName="r"
                  values="6;10;6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl p-3 border border-border bg-surface">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">
                목적
              </div>
              <div className="text-sm font-medium mt-1">업무</div>
            </div>
            <div className="rounded-xl p-3 border border-border bg-surface">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">
                시간
              </div>
              <div className="text-sm font-medium mt-1 font-mono">00:48:12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 top-1/3 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-lg">
        <Crosshair className="w-4 h-4 text-cyan" />
        <span className="text-xs">GPS Locked</span>
      </div>
      <div
        className="absolute -right-4 bottom-16 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-lg"
        style={{ animationDelay: "1s" }}
      >
        <FileSpreadsheet className="w-4 h-4 text-cyan" />
        <span className="text-xs">XLSX Ready</span>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">
        {title}
      </h2>
      <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function Product() {
  const items = [
    {
      icon: Crosshair,
      title: "GPS 자동 운행 기록",
      desc: "포그라운드 서비스 기반으로 화면을 꺼도 안정적으로 GPS 거리를 측정합니다. 출발·도착 시각, 이동 거리, 경로가 자동으로 기록됩니다.",
      list: [
        "포그라운드 서비스로 백그라운드에서도 끊김 없는 측정",
        "업무 / 출퇴근 / 기타 운행 목적 분류",
        "차계부(주행거리계) 보정 기능",
        "운행별 메모 기록",
      ],
    },
    {
      icon: FileSpreadsheet,
      title: "세무용 운행기록부 자동 생성",
      desc: "국세청 양식에 맞춘 운행기록부 엑셀 파일을 단 한 번의 탭으로 생성합니다. 과세기간 단위로 추출해 공유 및 제출까지 한 번에.",
      list: [
        "국세청 운행기록부 양식 자동 작성",
        "과세기간(월 단위) 자유 설정",
        "엑셀(xlsx) 파일 즉시 공유",
        "차량·운전자 정보 자동 반영",
      ],
    },
    {
      icon: ShieldCheck,
      title: "법인 / 개인 모드 지원",
      desc: "회사 코드 등록을 통한 법인 단체 관리 모드와, 코드 없이 단독 사용 가능한 개인 모드를 모두 지원합니다.",
      list: [
        "법인 모드: 회사 코드 등록 → 관리자 승인 → 데이터 동기화",
        "개인 모드: 코드 없이 차량·운행 단독 관리",
        "Firebase 기반 실시간 동기화(법인 모드)",
        "FCM 푸시로 등록 승인 알림 수신",
      ],
    },
  ];

  return (
    <section id="product" className="py-32 relative">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Product · 드라이브로그"
          title="드라이브로그"
          desc="법인 업무용 차량의 운행기록을 자동으로 측정·저장·관리하는 모바일 앱입니다. 운전자는 시작·종료 버튼만, 나머지는 앱이 알아서 처리합니다."
        />

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="card-surface p-8 reveal flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-14 h-14 rounded-xl grid place-items-center border border-border"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
                  }}
                >
                  <it.icon className="w-6 h-6 text-cyan" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mt-6">
                {it.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {it.desc}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {it.list.map((l) => (
                  <li
                    key={l}
                    className="flex gap-2 items-start text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guide() {
  const steps = [
    {
      icon: Download,
      title: "앱 설치 및 실행",
      desc: "Android 기기에 드라이브로그 앱을 설치하고 실행합니다. 최초 실행 시 위치(GPS), 알림 권한을 허용해 주세요. 백그라운드 위치 권한도 함께 허용해야 화면이 꺼진 상태에서도 정확한 거리 측정이 가능합니다.",
      list: [
        "위치 권한: 항상 허용 선택",
        "알림 권한 허용 (운행 중 상태 표시)",
        "배터리 최적화 예외 설정 권장",
      ],
    },
    {
      icon: IdCard,
      title: "운전자 등록 (법인 / 개인 모드 선택)",
      desc: "회사에서 발급받은 회사 코드를 사용해 법인 모드로 가입하거나, 코드 없이 개인 모드로 바로 시작할 수 있습니다.",
      list: [
        "법인 모드: 회사 코드 · 이름 · 부서 입력 → 관리자 승인 후 사용 가능",
        "개인 모드: 회사 코드 없이 차량·운행 단독 관리",
        "법인 모드 승인 완료 시 FCM 푸시 알림 수신",
      ],
    },
    {
      icon: Car,
      title: "차량 등록",
      desc: "운행할 차량의 정보를 등록합니다. 한 계정에 여러 대를 등록할 수 있으며, 운행 시 차량을 선택해 기록을 시작합니다.",
      list: [
        "차량번호 (예: 12가 3456)",
        "차량 모델명",
        "현재 누적 주행거리(km) — 이후 차계부 보정에 사용",
      ],
    },
    {
      icon: PlayCircle,
      title: "운행 시작 / 종료",
      desc: "차량을 선택하고 운행 시작 버튼을 누르면 GPS 기반 거리 측정이 자동으로 시작됩니다. 운행 목적(업무 / 출퇴근 / 기타)과 메모를 입력한 뒤, 도착하면 운행 종료를 누르세요.",
      list: [
        "운행 시작 전 운행 목적 선택 (업무 / 출퇴근 / 기타)",
        "화면이 꺼져도 백그라운드에서 안정적으로 거리 측정",
        "운행 종료 시 자동으로 도착 시각·이동 거리 저장",
        "필요 시 차계부(주행거리계) 보정 가능",
      ],
    },
    {
      icon: FileOutput,
      title: "운행기록부 엑셀 출력",
      desc: "리포트 화면에서 과세기간(시작 연·월 ~ 종료 연·월)을 설정하고, 엑셀 생성 버튼을 누르면 국세청 양식의 운행기록부가 자동 생성됩니다. 생성된 파일은 이메일·메신저 등으로 즉시 공유 가능합니다.",
      list: [
        "월 단위로 자유롭게 과세기간 지정",
        "운전자·차량 정보 자동 반영",
        "xlsx 파일 즉시 공유 (이메일, 메신저, 클라우드)",
      ],
    },
  ];

  return (
    <section
      id="guide"
      className="py-32 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.14 0.03 250 / 0.5), transparent)",
      }}
    >
      <div className="container-wide">
        <SectionHeader
          eyebrow="Guide · 5 Steps"
          title="사용 가이드"
          desc="설치부터 운행기록부 출력까지, 5단계로 끝나는 드라이브로그 사용 방법입니다."
        />

        <div className="mt-20 relative">
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--cyan), transparent)",
            }}
          />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`reveal md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div
                  className={`${
                    i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-3 ${
                      i % 2 ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="step-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="w-12 h-12 rounded-xl grid place-items-center border border-border bg-surface">
                      <s.icon className="w-5 h-5 text-cyan" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-4">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="card-surface p-6 mt-6 md:mt-0">
                  <ul className="space-y-3 text-sm">
                    {s.list.map((l) => (
                      <li key={l} className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 card-surface p-8 reveal">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg grid place-items-center"
              style={{ background: "var(--gradient-accent)" }}
            >
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold">사용 팁</h3>
          </div>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            {[
              [
                "배터리 최적화 예외",
                "시스템이 앱을 강제 종료하지 않도록 설정 → 권장",
              ],
              [
                "블루투스 연동",
                "차량 블루투스 연결 시 운행 시작을 사전 알림으로 안내",
              ],
              [
                "오프라인 사용",
                "네트워크가 없어도 운행 기록은 로컬에 저장되며, 이후 자동 동기화됩니다 (법인 모드)",
              ],
              [
                "데이터 정확성",
                "운행 종료 직후 차량 계기판 누적 km로 차계부 보정 시, 세무 신고 정확도가 높아집니다",
              ],
            ].map(([k, v]) => (
              <li
                key={k}
                className="p-4 rounded-xl border border-border bg-surface"
              >
                <div className="text-cyan font-medium text-sm">{k}</div>
                <div className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                  {v}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Templates() {
  return (
    <section
      id="templates"
      className="py-32 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.14 0.03 250 / 0.3), transparent)",
      }}
    >
      <div className="container-wide">
        <SectionHeader
          eyebrow="Resources"
          title="운행기록부 템플릿"
          desc="국세청 양식으로 미리 만들어진 엑셀 템플릿을 다운로드하세요. 드라이브로그 앱 없이도 수동 기록에 사용할 수 있습니다."
        />

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-display font-bold">
                즉시 사용 가능한 양식
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                국세청에서 지정한 공식 운행기록부 양식으로 미리 만들어진
                템플릿입니다. 차량정보, 운전자 정보를 입력하고 운행 기록을
                추가하면 언제든지 세무 신고에 제출할 수 있습니다.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "국세청 공식 양식 준수",
                "월별/일별 구분 자동 계산",
                "업무용·출퇴근 분류 지원",
                "라라캣소프트 공식 템플릿",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a
                href="/drivelog/templates/%EC%97%85%EB%AC%B4%EC%9A%A9%EC%8A%B9%EC%9A%A9%EC%B0%A8-%EC%9A%B4%ED%96%89%EA%B8%B0%EB%A1%9D%EB%B6%80-%EC%96%91%EC%8B%9D(%EB%9D%BC%EB%9D%BC%EC%BA%A3%EC%86%8C%ED%94%84%ED%8A%B8).xlsx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan text-background font-semibold hover:bg-cyan/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                템플릿 다운로드
              </a>
            </div>
          </div>

          <div className="reveal">
            <div
              className="rounded-2xl glass p-8 border border-cyan/20"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FileSpreadsheet className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Excel (.xlsx)</strong> 형식
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Download className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span className="text-muted-foreground">
                    즉시 다운로드 가능
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span className="text-muted-foreground">
                    국세청 양식 <strong className="text-foreground">100% 준수</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Lightbulb className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span className="text-muted-foreground">
                    모든 기기에서 사용 가능
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      badge: "기본",
      name: "스타터",
      target: "10대 미만",
      price: "4,500",
      features: [
        "GPS 자동 운행 기록",
        "세무용 운행기록부 엑셀 출력",
        "법인 / 개인 모드 지원",
        "운행기록 저장 무제한",
      ],
    },
    {
      badge: "10대 이상",
      name: "비즈니스",
      target: "10대 이상 운영 차량",
      price: "4,000",
      featured: true,
      features: [
        "스타터의 모든 기능",
        "대수 증가에 따른 자동 할인 적용",
        "법인 관리자 대시보드",
        "운행기록 저장 무제한",
      ],
    },
    {
      badge: "최대 할인",
      name: "엔터프라이즈",
      target: "연납 또는 30대 이상",
      price: "3,500",
      features: [
        "비즈니스의 모든 기능",
        "연납 시 모든 대수 동일 할인",
        "30대 이상 대규모 운영 최적화",
        "운행기록 저장 무제한",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-32">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Pricing · 월 구독"
          title="요금제"
          desc="차량 대수에 따라 합리적으로 적용되는 월 구독 요금제입니다. 모든 요금제는 운행기록 저장 기간 무제한으로 제공됩니다."
        />

        <div className="mt-8 flex justify-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm">
            <Database className="w-4 h-4 text-cyan" />
            운행 데이터가{" "}
            <strong className="text-foreground">우리 회사에 저장</strong>됩니다.
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`card-surface p-8 reveal relative ${
                p.featured ? "md:-translate-y-4" : ""
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                ...(p.featured
                  ? {
                      border: "1px solid transparent",
                      backgroundImage:
                        "linear-gradient(oklch(0.20 0.035 252), oklch(0.18 0.035 252)), var(--gradient-accent)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      boxShadow: "var(--shadow-glow)",
                    }
                  : {}),
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full ${
                    p.featured
                      ? "text-primary-foreground"
                      : "text-cyan border border-border"
                  }`}
                  style={
                    p.featured ? { background: "var(--gradient-accent)" } : {}
                  }
                >
                  {p.badge}
                </span>
                {p.featured && <Sparkles className="w-4 h-4 text-cyan" />}
              </div>
              <h3 className="font-display text-2xl font-bold mt-6">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.target}</p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-mono font-bold text-5xl gradient-text">
                  {p.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  원 / 월 · 대
                </span>
              </div>

              <div className="hairline my-8" />

              <ul className="space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground reveal">
          * 표시 금액은 차량 1대 기준 월 요금이며, VAT 별도입니다. 도입 문의는
          별도 채널로 안내드립니다.
        </p>
      </div>
    </section>
  );
}

function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!aboutRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.4 },
    );
    io.observe(aboutRef.current);
    return () => io.disconnect();
  }, []);

  const v1 = useCounter(99, inView);
  const v2 = useCounter(24, inView);
  const v3 = useCounter(100, inView);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-32 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.14 0.03 250 / 0.6))",
      }}
    >
      <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <span className="eyebrow">About · LalaCatSoft</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">
            About <span className="gradient-text">LalaCatSoft</span>
          </h2>
          <h3 className="mt-6 text-xl text-foreground/90 font-display">
            현장의 불편을 코드로 해결하는 모바일 솔루션 회사
          </h3>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            LalaCatSoft는{" "}
            <strong className="text-foreground">드라이브로그</strong>를 비롯한
            업무용 모바일 앱을 개발·서비스하는 기업입니다. 법인차량 운행기록
            자동화처럼 현장의 반복 업무를 줄이는 데 집중합니다.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { v: `${v1}.9%`, k: "Uptime" },
              { v: `${v2}/7`, k: "자동 측정" },
              { v: `${v3}%`, k: "국세청 양식" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-mono font-bold text-3xl gradient-text">
                  {s.v}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal relative aspect-square max-w-lg mx-auto w-full">
          <div
            className="absolute inset-0 rounded-3xl glass grid place-items-center overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 230)" />
                  <stop offset="100%" stopColor="oklch(0.82 0.16 205)" />
                </linearGradient>
                <radialGradient id="ag2">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 230 / 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="180" fill="url(#ag2)" />
              {[60, 110, 160].map((r) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke="oklch(0.45 0.06 240 / 0.3)"
                  strokeDasharray="2 4"
                />
              ))}
              <path
                d="M60 320 Q 140 280, 180 220 T 280 140 T 350 80"
                fill="none"
                stroke="url(#ag)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="60" cy="320" r="8" fill="oklch(0.82 0.16 205)" />
              <circle cx="180" cy="220" r="6" fill="oklch(0.72 0.18 230)" />
              <circle cx="280" cy="140" r="6" fill="oklch(0.72 0.18 230)" />
              <circle cx="350" cy="80" r="10" fill="oklch(0.72 0.18 230)">
                <animate
                  attributeName="r"
                  values="10;14;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <g transform="translate(170, 170)">
                <rect
                  width="60"
                  height="60"
                  rx="14"
                  fill="oklch(0.20 0.04 254)"
                  stroke="url(#ag)"
                  strokeWidth="2"
                />
                <path d="M30 18 L 42 30 L 30 42 L 18 30 Z" fill="url(#ag)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 relative">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg grid place-items-center"
                style={{ background: "var(--gradient-accent)" }}
              >
                <RouteIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                LalaCatSoft
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              현장의 불편을 코드로 해결하는 모바일 솔루션 회사.
            </p>
          </div>
          <div className="flex md:justify-center gap-6 text-sm text-muted-foreground">
            <a href="/drivelog/blog/" className="hover:text-cyan transition-colors">
              운행기록부 가이드
            </a>
            <a href="/drivelog/privacy" className="hover:text-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan transition-colors">
              Terms of Service
            </a>
          </div>
          <div className="flex md:justify-end gap-3">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-border grid place-items-center hover:border-cyan hover:text-cyan transition-colors"
                aria-label="social"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="hairline mt-12" />
        <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
          © 2026 LalaCatSoft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
