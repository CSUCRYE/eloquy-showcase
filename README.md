# Eloquy Showcase

一个用于展示 Eloquy 产品思路、界面交互与工程边界的静态演示项目。

它刻意不包含真实用户数据、任何 API 密钥、语音 WebSocket、LLM 提示词、生产题库或评分实现。页面中的会话和报告均为 mock 数据，目的是说明产品如何把“练习”组织为一条可理解的反馈链路。

## Demo scope

- 面试模拟：点击逐轮推进对话，展示从项目经历、追问到基于证据复盘的产品流程。
- IELTS 口语：可切换 Part 1/2/3，模拟考官提问，并展开与题型相关的文本反馈。
- 隐私边界：展示仓库不采集简历、JD、音频或练习历史。

All conversations and reports in this repository are mock data. Real-time voice, LLM orchestration, speech-provider credentials, and user data handling are intentionally private.

## README demo media

For the repository page, use two silent 10--15 second GIFs rather than one long recording:

1. **Interview flow**: open the interview scene, advance two follow-up turns, and reveal the evidence-based recap.
2. **IELTS flow**: switch from Part 2 to Part 3, trigger the examiner state, and open the learning report.

Keep the GIFs below 10 MB, crop them to the browser content rather than the full desktop, and place them immediately after this section. The interactive site remains the primary demonstration; GIFs are a fast preview for visitors who do not run the project locally.

## Run locally

```bash
npm install
npm run dev
```

## Architecture idea

```text
Browser UI → session API / WebSocket gateway → orchestration layer
                                      ├── speech recognition and TTS
                                      ├── LLM question / feedback services
                                      └── private, user-scoped persistence
```

The full version is intentionally private. To request an experience of the complete product, please open a GitHub Issue in the project repository.

## Technology choices

React, TypeScript, Vite, FastAPI, WebSocket, LLM-based structured evaluation, and cloud speech services.
