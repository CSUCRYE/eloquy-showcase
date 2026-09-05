import { useState } from "react";
import { createRoot } from "react-dom/client";
import linZhixia from "./assets/lin-zhixia.png";
import "./styles.css";

type View = "home" | "interview" | "ielts";
type Part = "Part 1" | "Part 2" | "Part 3";

const interviewTurns = [
  ["interviewer", "你提到过一个跨模块的 AI 应用。为什么要把前端、模型服务与语音会话分开？"],
  ["candidate", "我会把界面交互、业务编排和外部服务拆分。这样语音服务失败时，文本练习与评分仍然可用。"],
  ["interviewer", "很好。那当评分模型输出不完整时，你怎样保证反馈对用户仍然有用？"],
  ["candidate", "先校验结构化输出；失败时重试并修复格式，最终给用户明确、可继续练习的降级提示。"],
] as const;

const prompts: Record<Part, { title: string; question: string; note: string }> = {
  "Part 1": { title: "DAILY LIFE", question: "Do you enjoy cooking? Why or why not?", note: "短回答，重点练习自然展开与一个具体细节。" },
  "Part 2": { title: "LONG TURN", question: "Describe a meal that you remember enjoying.", note: "真实流程提供 1 分钟准备和最多 2 分钟作答。" },
  "Part 3": { title: "DISCUSSION", question: "How do food traditions change when people move to large cities?", note: "考官会围绕观点、比较和原因逐层追问。" },
};

function App() {
  const [view, setView] = useState<View>("home");
  return <main className="shell">
    <header className="site-header"><button className="brand" onClick={() => setView("home")} aria-label="返回 Eloquy 展示首页"><span>E</span> ELOQUY <small>SHOWCASE</small></button><p><i /> 产品流程演示 · 不含真实用户数据或密钥</p></header>
    {view === "home" && <Home onEnter={setView} />}
    {view === "interview" && <Interview onBack={() => setView("home")} />}
    {view === "ielts" && <Ielts onBack={() => setView("home")} />}
    <footer>公开展示项目仅模拟交互；真实语音、评分、账号和用户数据服务均保留在私有实现中。</footer>
  </main>;
}

function Home({ onEnter }: { onEnter: (view: View) => void }) {
  return <>
    <section className="hero"><div><p className="eyebrow">A PRACTICE SYSTEM FOR SPEAKING WELL</p><h1>把想法说清楚，<em>而不是说得更多。</em></h1><p className="lede">Eloquy 将一次练习组织为清晰的节奏：听题、作答、追问、复盘。选择一个场景，亲自走一遍演示流程。</p></div><div className="portrait" aria-label="虚拟面试官形象"><img src={linZhixia} alt="女性虚拟面试官林知夏" /><small>林知夏 · Practice interviewer</small></div></section>
    <section className="paths" aria-label="选择演示流程"><button className="path interview" onClick={() => onEnter("interview")}><span>01 · CAREER</span><strong>面试模拟</strong><p>逐步查看一次技术面试如何从项目经历走到有证据的复盘。</p><b>开始交互演示 →</b></button><button className="path ielts" onClick={() => onEnter("ielts")}><span>02 · ENGLISH</span><strong>IELTS 口语</strong><p>切换 Part 1、2、3，模拟考官提问，再展开可执行的学习报告。</p><b>开始交互演示 →</b></button></section>
    <section className="principles"><p className="eyebrow">WHAT THE PUBLIC REPOSITORY SHOWS</p><div><article><strong>可感知的流程</strong><p>不只展示功能名，而是展示练习如何推进。</p></article><article><strong>能落地的反馈</strong><p>每段反馈都对应下一次可以采取的练习动作。</p></article><article><strong>明确的边界</strong><p>公开仓库使用 mock 数据，不收集简历、音频或密钥。</p></article></div></section>
  </>;
}

function Interview({ onBack }: { onBack: () => void }) {
  const [turnCount, setTurnCount] = useState(0);
  const completed = turnCount === interviewTurns.length;
  return <section className="studio"><button className="back" onClick={onBack}>← 返回练习选择</button><p className="eyebrow">INTERVIEW FLOW · MOCK DATA</p><h2>不是问答堆叠，<br />而是有依据的追问。</h2><div className="session-layout"><aside className="examiner-card"><img src={linZhixia} alt="林知夏" /><strong>林知夏</strong><span>技术面试官</span><p><i /> {turnCount === 0 ? "等待开始" : completed ? "正在复盘" : "正在追问"}</p></aside><section className="conversation" aria-live="polite" aria-label="模拟面试对话">{turnCount === 0 && <div className="empty-state">准备好后，面试官会从你的项目经历开始追问。</div>}{interviewTurns.slice(0, turnCount).map(([role, content], index) => <p className={`bubble ${role}`} key={index}><small>{role === "interviewer" ? "林知夏 · 面试官" : "你 · 候选人"}</small>{content}</p>)}{completed && <div className="interview-summary"><span>INTERVIEW SIGNALS</span><strong>系统设计 · 异常降级 · 结构化输出</strong><p>演示中的复盘依据对话里的具体表述，而非只给出笼统评价。</p></div>}<button className="primary" onClick={() => setTurnCount((count) => Math.min(count + 1, interviewTurns.length))} disabled={completed}>{turnCount === 0 ? "开始模拟 →" : completed ? "本轮已完成" : "继续下一轮追问 →"}</button></section></div><div className="outline"><span>01 项目输入</span><span>02 逐层追问</span><span>03 证据化复盘</span></div></section>;
}

function Ielts({ onBack }: { onBack: () => void }) {
  const [part, setPart] = useState<Part>("Part 3");
  const [speaking, setSpeaking] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const active = prompts[part];
  const playPrompt = () => { setSpeaking(true); window.setTimeout(() => setSpeaking(false), 1400); };
  return <section className="studio"><button className="back" onClick={onBack}>← 返回练习选择</button><p className="eyebrow">IELTS SPEAKING · MOCK DATA</p><h2>先表达，再把表达练得更准确。</h2><div className="part-switcher" role="tablist" aria-label="选择 IELTS 口语部分">{(Object.keys(prompts) as Part[]).map((item) => <button role="tab" aria-selected={item === part} className={item === part ? "is-active" : ""} key={item} onClick={() => { setPart(item); setShowReport(false); }}>{item}</button>)}</div><section className="ielts-demo"><div className="prompt-panel"><span>{part.toUpperCase()} · {active.title}</span><h3>{active.question}</h3><p>{active.note}</p><button className="listen-button" onClick={playPrompt}><i className={speaking ? "is-speaking" : ""} />{speaking ? "考官正在提问…" : "模拟播放考官提问"}</button></div><aside className="practice-panel"><span>DEMO RESPONSE</span><p>“In large cities, food traditions often become more diverse. People adapt familiar recipes to local ingredients, but they also try food from other cultures.”</p><button className="secondary" onClick={() => setShowReport(true)}>查看学习报告</button></aside></section>{showReport && <IeltsReport part={part} />}</section>;
}

function IeltsReport({ part }: { part: Part }) {
  const note = part === "Part 3" ? "讨论题反馈会额外关注论证链、比较与回应追问。" : "这是基于文本的练习预估；发音维度在真实语音服务中单独评估。";
  return <section className="report" aria-live="polite"><header><div><span>TEXT ESTIMATE</span><strong>Band 6.5</strong></div><p>{note}</p></header><div className="report-dimensions"><article><span>Fluency</span><strong>6.5</strong><p>观点推进自然，能回答问题。</p></article><article><span>Vocabulary</span><strong>6.0</strong><p>表达准确，但可加入更具体的主题词。</p></article><article><span>Grammar</span><strong>6.5</strong><p>句式稳定；可练习让步和条件表达。</p></article></div><section className="report-next"><div><span>NEXT REP</span><h3>下一次这样练</h3><p>先明确立场，再给一个城市生活中的例子，最后说明这种变化带来的影响。</p></div><button className="secondary" onClick={() => window.alert("Showcase 中仅演示交互。完整版可通过 GitHub Issue 联系体验。")}>了解完整版</button></section></section>;
}

createRoot(document.getElementById("root")!).render(<App />);
