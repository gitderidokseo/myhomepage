import { useEffect, useState } from "react";
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
  CheckCircle2,
  Sparkles,
  Mail,
  Building2,
  LayoutDashboard,
  Users,
  Cloud,
  Smartphone,
  MessageCircle,
} from "lucide-react";

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.drivelog2.drivelog&hl=ko";
const APP_STORE_URL =
  "https://apps.apple.com/app/%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%A1%9C%EA%B7%B8/id6777998742";
const CONTACT_EMAIL = "support@lalacatsoft.com";

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

const nav = [
  { id: "product", label: "드라이브로그" },
  { id: "pricing", label: "요금제" },
  { id: "partners", label: "세무사님께" },
  { id: "guide", label: "사용 가이드" },
  { id: "blog", label: "운행기록부 가이드", href: "/drivelog/blog/" },
  { id: "contact", label: "도입 문의" },
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
        <AdminApp />
        <Pricing />
        <Partners />
        <Contact />
        <Guide />
        <Templates />
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
          href="#contact"
          className="hidden md:inline-flex btn-primary !py-2 !px-4 text-xs"
        >
          도입 문의 <ArrowRight className="w-4 h-4" />
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
          <span className="eyebrow mb-6">법인 업무용 차량 운행기록부 자동화</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] mt-6">
            운행기록부 없으면
            <br />
            <span className="gradient-text">세금</span>이 늘어납니다
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            운행기록부를 작성하지 않으면 업무용 승용차 경비는{" "}
            <strong className="text-foreground">연 1,500만원까지만</strong>{" "}
            인정됩니다. 드라이브로그로 GPS 주행을 자동 기록하고, 국세청 양식
            운행기록부를 한 번에 출력해 차량 경비를 빠짐없이 비용 처리하세요.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              도입 문의하기 <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Download className="w-4 h-4" /> Google Play 다운로드
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Download className="w-4 h-4" /> App Store 다운로드
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Android · iOS 모두 지원 · 개인/운전자 단독 사용은 무료
          </p>

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
  const rows = [
    { date: "1.5.(월)", note: "출근", km: 35 },
    { date: "1.7.(수)", note: "강남 본사 → 분당 지사", km: 45 },
    { date: "1.13.(화)", note: "판교 고객사 방문", km: 50 },
    { date: "1.20.(화)", note: "세무사 사무실 방문", km: 45 },
  ];

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
            <span className="flex items-center gap-1.5 truncate">
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan shrink-0" />
              운행기록부_2026_상반기.xlsx
            </span>
            <span className="flex items-center gap-1 text-cyan shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-ring" />
              생성 완료
            </span>
          </div>

          <div className="mt-6">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
              업무사용비율 (⑫/⑪)
            </div>
            <div className="mt-2 font-mono font-bold text-5xl gradient-text">
              91.9
              <span className="text-xl text-muted-foreground ml-1">%</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              국세청 양식 · 2026.1.1. ~ 2026.6.30.
            </div>
          </div>

          <div className="flex-1 mt-6 rounded-2xl border border-border overflow-hidden bg-surface/60 flex flex-col">
            <div className="grid grid-cols-[3.2rem_1fr_3rem] gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border">
              <span>날짜</span>
              <span>비고</span>
              <span className="text-right">거리</span>
            </div>
            <div className="flex-1 divide-y divide-border/60">
              {rows.map((r) => (
                <div
                  key={r.date}
                  className="grid grid-cols-[3.2rem_1fr_3rem] gap-2 px-3 py-2.5 text-xs items-center"
                >
                  <span className="font-mono text-muted-foreground">
                    {r.date}
                  </span>
                  <span className="truncate">{r.note}</span>
                  <span className="text-right font-mono text-cyan">
                    {r.km}km
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl p-3 border border-border bg-surface">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">
                총주행거리
              </div>
              <div className="text-sm font-medium mt-1 font-mono">495km</div>
            </div>
            <div className="rounded-xl p-3 border border-border bg-surface">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">
                업무사용거리
              </div>
              <div className="text-sm font-medium mt-1 font-mono">455km</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 -top-5 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-lg">
        <Crosshair className="w-4 h-4 text-cyan" />
        <span className="text-xs">GPS Locked</span>
      </div>
      <div
        className="absolute -right-4 bottom-16 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-lg"
        style={{ animationDelay: "1s" }}
      >
        <ShieldCheck className="w-4 h-4 text-cyan" />
        <span className="text-xs">별지 제65호 서식</span>
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
        "개인 모드: 코드 없이 차량·운행 단독 관리 (무료)",
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

function AdminApp() {
  const features = [
    {
      icon: Cloud,
      title: "회사 저장소 자동 동기화",
      desc: "운전자 운행이 종료되면 회사가 지정한 저장소로 기록이 즉시 전송됩니다. 네트워크가 끊겨도 누락 없이 자동 재전송됩니다.",
    },
    {
      icon: LayoutDashboard,
      title: "관리자 대시보드",
      desc: "차량별·운전자별 운행 현황을 한 화면에서 확인하고, 과세기간 단위 운행기록부를 원클릭으로 생성합니다.",
    },
    {
      icon: Users,
      title: "운전자 무제한 등록",
      desc: "회사 코드 한 개로 여러 운전자를 등록·승인하고, 차량을 공유해도 운행 기록이 운전자별로 분리 취합됩니다.",
    },
  ];

  return (
    <section
      id="admin"
      className="py-32 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.14 0.03 250 / 0.4), transparent)",
      }}
    >
      <div className="container-wide">
        <SectionHeader
          eyebrow="For Companies · 관리자 앱"
          title="흩어진 운행기록을 회사가 한 번에 관리"
          desc="운전자 앱이 기록한 데이터를 관리자 앱으로 자동 취합합니다. 경리·총무 담당자가 직원들의 운행기록부를 일일이 모을 필요가 없습니다."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-surface p-8 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl grid place-items-center border border-border"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
                }}
              >
                <f.icon className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="font-display text-lg font-bold mt-5">{f.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <a
            href="/drivelog/downloads/DriveLogAdmin_Setup.exe"
            download
            className="btn-primary !py-2 !px-5 text-sm"
          >
            <Download className="w-4 h-4" /> 관리자 프로그램 다운로드 (Windows)
          </a>
          <a href="#contact" className="btn-ghost !py-2 !px-5 text-sm">
            관리자 연동 도입 문의 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground reveal">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan" />
            Windows 10 이상 · 설치 후 회사 코드로 로그인하면 운전자 운행기록이
            자동으로 취합됩니다.
          </span>
        </p>
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
      price: "3,300",
      features: [
        "GPS 자동 운행 기록",
        "세무용 운행기록부 엑셀 출력",
        "회사 저장소 자동 동기화",
        "운행기록 저장 무제한",
      ],
    },
    {
      badge: "10대 이상",
      name: "비즈니스",
      target: "10대 이상 운영 차량",
      price: "3,000",
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
      price: "2,500",
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
          eyebrow="Pricing"
          title="요금제"
          desc="운전자 단독 사용은 무료입니다. 회사가 운행기록을 한곳에 모아 관리하는 관리자 연동 기능부터 유료로 제공됩니다."
        />

        {/* 오픈 기념 이벤트 — 선착순 100대 1년 무료 */}
        <div className="mt-12 reveal">
          <div
            className="mx-auto max-w-3xl rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            style={{
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(oklch(0.20 0.035 252), oklch(0.18 0.035 252)), var(--gradient-accent)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
              style={{ background: "var(--gradient-accent)" }}
            >
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full text-primary-foreground"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  오픈 기념 이벤트
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold mt-3">
                선착순 100대 · 1년간 무료
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                관리자 연동(법인) 플랜을 지금 도입하시면{" "}
                <strong className="text-foreground">선착순 100대</strong>에 한해{" "}
                <strong className="text-foreground">1년간 무료</strong>로
                이용하실 수 있습니다. 조기 마감될 수 있으니 서둘러 신청하세요.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-primary !py-2 !px-5 text-sm shrink-0"
            >
              지금 신청 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 무료 플랜 */}
        <div className="mt-16 reveal">
          <div className="card-surface p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:flex-1">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-cyan" />
                <h3 className="font-display text-2xl font-bold">
                  개인 / 운전자 단독
                </h3>
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full text-cyan border border-border">
                  무료
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                회원가입 없이 바로 시작. 운행 기록을{" "}
                <strong className="text-foreground">휴대폰에만 저장</strong>하고,
                국세청 양식 운행기록부를 직접 엑셀로 추출할 수 있습니다.
                개인사업자·1인 사업자에게 적합합니다.
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 text-sm">
                {[
                  "GPS 자동 운행 기록",
                  "국세청 양식 엑셀 추출",
                  "다중 차량 관리",
                  "회원가입 불필요",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 items-start text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:text-right">
              <div className="font-mono font-bold text-5xl gradient-text">0</div>
              <div className="text-sm text-muted-foreground mt-1">원</div>
              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <a
                  href={PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex"
                >
                  <Download className="w-4 h-4" /> Google Play
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex"
                >
                  <Download className="w-4 h-4" /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 관리자 연동 유료 플랜 */}
        <div className="mt-16 text-center reveal">
          <h3 className="font-display text-2xl font-bold">
            관리자 연동 (법인)
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            운행기록을 회사 저장소로 모아 관리자가 일괄 관리하는 유료 플랜입니다.
          </p>
        </div>

        <div className="mt-8 flex justify-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm">
            <Database className="w-4 h-4 text-cyan" />
            운행 데이터가{" "}
            <strong className="text-foreground">우리 회사에 저장</strong>됩니다.
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`card-surface p-8 reveal relative flex flex-col ${
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

              <a
                href="#contact"
                className={`mt-8 inline-flex justify-center ${
                  p.featured ? "btn-primary" : "btn-ghost"
                }`}
              >
                도입 문의 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground reveal">
          * 표시 금액은 차량 1대 기준 월 요금이며, VAT 별도입니다. 정확한 견적과
          도입 절차는{" "}
          <a href="#contact" className="text-cyan hover:underline">
            도입 문의
          </a>
          를 통해 안내드립니다.
        </p>
      </div>
    </section>
  );
}

function Partners() {
  const points = [
    {
      icon: FileSpreadsheet,
      title: "국세청 양식 그대로, 깔끔한 자료",
      desc: "고객사가 GPS로 자동 기록하고 앱에서 바로 출력하므로, 양식이 안 맞거나 빠진 자료를 주고받는 수고가 줄어듭니다.",
    },
    {
      icon: ShieldCheck,
      title: "운행기록부 미작성 리스크 예방",
      desc: "고객이 평소에 자동으로 기록을 남기게 되어, 신고철에 급하게 소급 작성을 요청받는 상황을 줄일 수 있습니다.",
    },
    {
      icon: Smartphone,
      title: "부담 없이 먼저 권해보세요",
      desc: "개인/운전자 단독 사용은 무료입니다. 고객사에 가볍게 소개해보시고, 필요하면 법인 도입까지 안내해 드립니다.",
    },
  ];

  return (
    <section id="partners" className="py-32">
      <div className="container-wide">
        <SectionHeader
          eyebrow="For Tax Accountants · 세무사님께"
          title="고객사의 운행기록부, 더 깔끔하게 받아보세요"
          desc="업무용 승용차 운행기록부는 세무사님이 매년 가장 많이 챙기는 항목 중 하나입니다. 고객사에 드라이브로그를 알려주시면, GPS로 자동 기록된 국세청 양식 운행기록부를 받아보실 수 있어 자료를 주고받는 시간을 줄일 수 있습니다."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="card-surface p-8 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl grid place-items-center border border-border"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
                }}
              >
                <p.icon className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="font-display text-lg font-bold mt-5">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "[세무사님 문의] 드라이브로그",
            )}`}
            className="btn-primary inline-flex"
          >
            <Mail className="w-4 h-4" /> 세무사님, 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-32 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.14 0.03 250 / 0.5), transparent)",
      }}
    >
      <div className="container-wide">
        <SectionHeader
          eyebrow="Contact · 도입 문의"
          title="도입을 검토 중이신가요?"
          desc="차량 대수·운영 방식에 맞는 요금과 도입 절차를 안내해 드립니다. 아래 채널로 편하게 문의해 주세요. 영업일 기준 1일 이내 회신드립니다."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="card-surface p-8 reveal flex flex-col items-start">
            <div
              className="w-12 h-12 rounded-xl grid place-items-center border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
              }}
            >
              <Download className="w-6 h-6 text-cyan" />
            </div>
            <h3 className="font-display text-lg font-bold mt-5">
              먼저 무료로 사용해보기
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Android · iOS 모두에서 운전자 앱 설치 가능
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan hover:underline"
              >
                Google Play <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan hover:underline"
              >
                App Store <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <a
            href="/drivelog/downloads/DriveLogAdmin_Setup.exe"
            download
            className="card-surface p-8 reveal flex flex-col items-start hover:border-cyan transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl grid place-items-center border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
              }}
            >
              <LayoutDashboard className="w-6 h-6 text-cyan" />
            </div>
            <h3 className="font-display text-lg font-bold mt-5">
              관리자 윈도우 프로그램
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              운행기록을 한곳에 취합·관리하는 Windows 관리자 앱
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-cyan">
              셋업 파일 다운로드 <Download className="w-4 h-4" />
            </span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "[드라이브로그 도입 문의]",
            )}`}
            className="card-surface p-8 reveal flex flex-col items-start hover:border-cyan transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl grid place-items-center border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.82 0.16 205 / 0.15))",
              }}
            >
              <Mail className="w-6 h-6 text-cyan" />
            </div>
            <h3 className="font-display text-lg font-bold mt-5">이메일 문의</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              추가 문의 하실 분
            </p>
            <span className="mt-4 font-mono text-cyan">{CONTACT_EMAIL}</span>
          </a>
        </div>

        <div className="mt-8 text-center reveal">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4 text-cyan" />
            카카오톡 상담 채널은 준비 중입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function Guide() {
  const steps = [
    {
      icon: Download,
      title: "앱 설치 및 권한 허용",
      desc: "드라이브로그 앱 설치 후 위치(항상 허용)·알림 권한을 허용합니다. 배터리 최적화 예외를 설정하면 화면을 꺼도 정확히 측정됩니다.",
    },
    {
      icon: IdCard,
      title: "운전자 등록",
      desc: "회사 코드로 법인 모드 가입(관리자 승인) 또는 코드 없이 개인 모드로 바로 시작합니다.",
    },
    {
      icon: Car,
      title: "차량 등록",
      desc: "차량번호·모델명·현재 누적 주행거리를 등록합니다. 한 계정에 여러 대 등록 가능합니다.",
    },
    {
      icon: PlayCircle,
      title: "운행 시작 / 종료",
      desc: "목적(업무/출퇴근/기타)을 고르고 시작을 누르면 GPS 측정이 자동 진행, 종료 시 도착 시각·거리가 저장됩니다.",
    },
    {
      icon: FileOutput,
      title: "운행기록부 엑셀 출력",
      desc: "리포트에서 과세기간을 설정하고 생성을 누르면 국세청 양식 운행기록부가 만들어져 즉시 공유됩니다.",
    },
  ];

  return (
    <section id="guide" className="py-32 relative">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Guide · 5 Steps"
          title="사용 가이드"
          desc="설치부터 운행기록부 출력까지, 5단계로 끝나는 드라이브로그 사용 방법입니다."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="card-surface p-6 reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="w-10 h-10 rounded-xl grid place-items-center border border-border bg-surface">
                  <s.icon className="w-5 h-5 text-cyan" />
                </div>
              </div>
              <h3 className="font-display text-base font-bold mt-4">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 card-surface p-8 reveal">
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

function About() {
  const facts = [
    { v: "별지 제65호", k: "국세청 서식 준수" },
    { v: "5년", k: "보관 요건 충족" },
    { v: "GPS", k: "자동 거리 측정" },
  ];

  return (
    <section
      id="about"
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
            {facts.map((s) => (
              <div key={s.k}>
                <div className="font-mono font-bold text-2xl gradient-text">
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
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan hover:underline"
              >
                <Download className="w-4 h-4" /> Google Play에서 다운로드
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan hover:underline"
              >
                <Download className="w-4 h-4" /> App Store에서 다운로드
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">바로가기</span>
            <a href="#pricing" className="hover:text-cyan transition-colors">
              요금제
            </a>
            <a href="#partners" className="hover:text-cyan transition-colors">
              세무사님께
            </a>
            <a
              href="/drivelog/blog/"
              className="hover:text-cyan transition-colors"
            >
              운행기록부 가이드
            </a>
            <a
              href="/drivelog/privacy"
              className="hover:text-cyan transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-cyan transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="text-xs text-muted-foreground leading-relaxed md:text-right">
            <span className="text-foreground font-medium block mb-2">
              사업자 정보
            </span>
            <p>상호: 라라캣소프트 (LalaCatSoft)</p>
            <p>사업자등록번호: 552-26-01970</p>
            <p>통신판매업 신고: 제 2026-고양일산서-0191 호</p>
            <p>
              서울시 마포구 독막로 28길 10,
              <br className="hidden md:block" /> 109동 상가 b101-585호
            </p>
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
