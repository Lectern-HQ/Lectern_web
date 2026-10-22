# Changelog

All notable changes to the Lectern app. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/). How a release is made: [docs/RELEASING.md](docs/RELEASING.md).

## [Unreleased]

### Fixed
- Export's save dialog opens in Downloads, with a name not taken there. Saving over the transcript itself emptied it; the copy is now written to a new file first, so the transcript stays as it was.

## [0.1.0] - 2026-10-22

The first beta for macOS (Apple Silicon, macOS 13 or later).

### Added
- Transcribe a lecture from its link: Lectern uses the login the user already has in their browser, downloads the recording, skips the break and saves the transcript as `.txt`, `.srt`, `.vtt` and `.json`.
- First run: welcome, choosing the browser lectures are watched in, what macOS will ask before Lectern reads that browser's login, and the speech model download (about 1.6 GB, once, resumable).
- Progress for each step, with Cancel; the transcription shows its percent and the minutes left.
- Clear messages for each reason a job stops, and what to do: no login, an expired login (at any university's sign-in), a browser that keeps its login locked, a protected recording, a full disk.
- Before every download Lectern asks whether the teacher allows it, and refuses the lecture if not (decision 10).
- Log in by dropping a `cookies.txt` on the window, for browsers Lectern cannot read; only the lecture site's cookies are read, and the file can be deleted after use.
- Transcript view: paragraphs with their start time, the skipped break, search, Copy all, Export as `.txt`, `.srt` or `.vtt`, Show in Finder.
- History: the transcripts made before, newest first, with their date, language and length; search by title, open, copy, export, and delete (asks first; a kept recording stays). The main screen lists the three latest under Recent, with See all.
- Automatic updates: at each start Lectern checks for a newer signed version and offers Install and restart. Off until the update feed's address and key are set (the website).
- Main screen: "Using your Dia login" with Change before a link is pasted, and on a first visit, "No transcripts yet" with where to copy the link from.
- Settings: the browser used for logins (with which ones have a login for the last site), the default transcript language, the output folder, keeping the downloaded recording, deleting a dropped `cookies.txt`, and a Privacy tab.
- Closing the window keeps Lectern running on macOS; Quit asks first while work runs; only one copy of the app runs.
- The look of the design canvas: its two typefaces (Bricolage Grotesque and Newsreader, OFL) ship with the app, so nothing is loaded from the network; problems the user cannot fix are shown as errors, the others as warnings.

### Security
- Only the lecture's site's cookies are read, written to a private file for one download and deleted after it; nothing about lectures, logins or transcripts leaves the computer.
- The window has no permissions of its own: Rust runs every tool, reads every file and opens every dialog.
- The bundled tools are pinned and checked: yt-dlp's signature, the built ffmpeg (LGPL) and whisper.cpp; every binary is signed with the hardened runtime.

[Unreleased]: https://github.com/Lectern-HQ/lectern/compare/v0.1.0...dev
[0.1.0]: https://github.com/Lectern-HQ/lectern/releases/tag/v0.1.0
