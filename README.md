# Tempo

*A minimalist stopwatch that reveals how much time you spend resting — or working.*

## 🚀 Install
1) Clone the git repo `git clone https://github.com/CameronJules/tempo.git`
2) Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) then pmpm if not done already `npm install -g pnpm`
3) cd into the tempo directory `cd tempo`
4) Run `pnpm run tauri dev`
> App store and web download coming soon!

## 📖 About

I used to juggle **two separate stopwatch apps** every day to track my work hours.  
It worked… but it also created friction.

**Tempo** was born from the need for a smoother workflow — in a style I liked — while giving me a chance to explore tools I find exciting: **[Tauri](https://tauri.app/)** and **Rust**.

> 💡 This is also a learning project. Many comments in the code are for my own reference, but if you’re curious, they might help you too.

<div align="center">
  <img width="686" height="621" alt="Tempo screenshot" src="https://github.com/user-attachments/assets/ee3f14ef-ec11-4812-a2ca-fdb02d02a600" />
</div>


## ✨ Features

### 1. Basic Stopwatch
A straightforward stopwatch for tracking elapsed time.

---

### 2. Tempo Bar  
A visual representation of your time usage throughout the day.  
The **Tempo Bar** displays the total elapsed time, split between **work (green)** and **rest (red)**.  
It updates dynamically as your day progresses, letting you instantly see how your time has been spent.

<div align="center">
  <img width="505" height="418" alt="Tempo bar work view" src="https://github.com/user-attachments/assets/96e1c0ed-093c-4c3d-b25e-89ae8302fb09" />
  <img width="506" height="418" alt="Tempo bar rest view" src="https://github.com/user-attachments/assets/4714f7cd-163d-4a50-831e-370596d93fb7" />
</div>

---

### 3. Work / Break Splits  
Instead of numbered laps, **Tempo** automatically splits your time between work and rest, giving you a clear, simple breakdown.

<div align="center">
  <img width="601" height="161" alt="Work/Break splits" src="https://github.com/user-attachments/assets/4211ca0b-5733-4924-8871-98eaadb5fee3" />
</div>



## 🚀 What's Next?

- 🌗 Light/Dark mode matching with system theme  
- 💾 Save timers for retrospective reviews  
- 📅 Calendar view of previous timers, highlighting missed days  
- 📝 Add notes to laps  
- 📊 Analytics to reveal work/rest patterns over time  
- 📋 Daily summaries with key notes for review  
- 🤖 AI-generated summaries and suggestions for improvement  
- ✅ Integration with daily to-dos, showing completion times on the Tempo Bar  

## 🛠 Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)  
- [Tauri VS Code Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)  
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

