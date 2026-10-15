import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

// 2026-10-16부터 몇 달간 메인페이지를 흰 화면으로 둔다. Home.tsx는 그대로 남아 있다.
// 복구: 이 커밋을 git revert 하거나, styles.css/Home import와 <Home />을 다시 넣는다.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics />
  </StrictMode>,
);
