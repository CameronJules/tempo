# Tempo

The stopwatch that exposes how much you are resting (or working).

I was using 2 different stopwatch apps to track how much I am working each day. Doing this created friction and I wanted a better solution, in a style I liked.
<br><br>
This also gave me the chance to work with some tools that i find interesting (tauri and rust). This project is a learning experience for me and a lot of the comments are for my own reference if i need a refresher later down the line, so hopefully if you are curious they can help you too.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Features

### 1: Basic Stopwatch

### 2: Tempo Bar
To provide a strong visual representation of how your time is being used the tempo bar shows how you have used your time so far. It represents the full elapse time of the stopwatch. Work and rest splits will be displayed in green and red respectively. This bar dynamically updates as you progress through the day so that when your day is done you know very quickly how you have spent your time.

<img width="505" height="418" alt="image" src="https://github.com/user-attachments/assets/96e1c0ed-093c-4c3d-b25e-89ae8302fb09" /><img width="506" height="418" alt="image" src="https://github.com/user-attachments/assets/4714f7cd-163d-4a50-831e-370596d93fb7" />

### 3: Work / Break splits
Instead of numbered laps, the stopwatch splits time up between work and rest. This gives a very clear and simple display to show how much time is spent on each split.

<img width="601" height="161" alt="image" src="https://github.com/user-attachments/assets/4211ca0b-5733-4924-8871-98eaadb5fee3" />

## What's Next?
- Save timers for retrospective reviews.
- Display previous timers on calendar, showing days missed.
- Add notes to laps.
- Analytics, show patterns in working and changes over time.
- Daily summary, sumarise activity for the day and any important notes to review.
- AI summary and suggestions for improvement.
- Integrate daily todos, showing when they are completed on the time bar


