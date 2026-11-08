# Changelog

All notable changes to the Lectern app. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/). How a release is made: [docs/RELEASING.md](docs/RELEASING.md).

## [Unreleased]

## [0.4.0] - 2026-11-08

A key works on up to 3 Macs: it is activated on this Mac when it is entered, Settings lists the Macs it is active on and can free one, and a key saved by an earlier version is activated by itself when Lectern opens.

### Added
- A key works on up to 3 Macs. Entering a key activates it on this Mac once, online, and only then is it saved; after that it works offline as before. A key already on 3 Macs is refused with how to free one (remove the key in Settings, Licence, on that Mac), a revoked key is refused, and without a connection Lectern says that activating needs the internet once. Removing the key frees this Mac, and is done even offline. Only the licence id and a random id for this Mac, kept in the Keychain, are sent.
- Your Macs in Settings, Licence, under the key: the Macs the key is active on with their activation dates and this Mac marked, a Free button with a confirm step for another Mac (up to 3 frees a year, the same as the website's Your Macs page), how many frees are left, and Refresh. Removing the key still frees this Mac without counting. This sends the saved key itself to the licence service, which keeps nothing of it.
- A key saved before activation existed (0.3.0 and earlier) is activated on this Mac by itself, once, in the background when Lectern opens, so Your Macs counts it. Offline or with the licence service down, nothing shows and Lectern tries again at the next start; the key keeps working. If the key is already on all its Macs or was revoked, the key is kept and the main screen says so: free a Mac on Your Macs in Settings, Licence, or on the website, or write to support. A Mac that is activated keeps a note of it in the Keychain and asks no more.

### Changed
- A renewal refused because the licence was revoked says the plan was not renewed.

## [0.3.0] - 2026-11-06

The screens as the design draws them: Your plan on the Plans screen, a line under each Progress step, the plans as rows in a small window, the design's wording, no text smaller than 13px, the design's Safari permission step, and screens that fit the smallest window.

### Added
- Your plan says when a Monthly or Yearly plan will not renew: "Your plan will not renew: it was cancelled, or a payment failed. It keeps working until the end date. To keep it, open Manage your plan." When Lectern could not renew it, it says so and gives the support address to write to.

### Changed
- While a plan is active, the Plans screen is "Your plan": the plan with "Active", until when it is active (or "No end date." for Lifetime) and how it goes on, "Manage your plan" for Monthly and Yearly, which opens the billing page in the browser, where to write about a payment, and the way to the key in Settings, Licence. Nothing is offered to buy. Without a key, or once a plan ended, it shows the three plans as before.
- Plans stays in the sidebar with a Lifetime licence too, since it leads to Your plan.
- In a small window (under 860px wide), the plans are rows: the name (Yearly with "Best value"), a short note, the price and how often, and a small Buy. The line under them reads "Buy opens your browser. Pay there, then paste your key here." at every size.
- The Progress steps carry the design's lines: Checking your login names the browser and the site ("Dia, mediaserver.unige.ch"), or the dropped cookies.txt, and each finished step says how long it took: "1.1 GB, 38 s" for the download instead of "1.1 GB of 1.1 GB", and "Done in 6 s" for the audio instead of "105 of 105 min".
- Wording and spacing as the design draws them: text that is not a web address says "This is not a link." (other refused links keep their reason), plan dates write the month in full ("12 March 2027") while transcript dates keep "6 Oct 2026", Settings says "and they are used" (or how many are left) after a plan ended, the Keychain drawing's note explains the number 2, and the first run's columns have the same 16px gap.
- No text is smaller than 13px (labels, captions, chips, step states, timestamps, the step numbers and the Keychain drawing were 12px). The Safari permission step uses the design's words: a "What this allows" note, shorter steps, and "Another browser is the simpler choice." It has Back, Choose another browser and Continue, and keeps Open System Settings and the note for when Lectern is not in the list.

### Fixed
- After you choose a browser that needs the Keychain or Full Disk Access, the first run shows the permission step instead of skipping it, and the speech model step after it says "Step 4 of 4".
- Settings, General shows the whole output folder in the smallest window: the folder wraps onto a second line and Change goes under it.
- History shows a title such as "Macroeconomics II, Lecture 7" whole in the smallest window (720 x 520): the date and duration columns and the margins beside the list are narrower there.
- In the smallest window (720 x 520), the Keychain permission step and the one that needs both permissions (Google Chrome) are no longer cut off on the left, History's titles show about 20 characters instead of one letter (the Language column is hidden), Welcome's "Step 1 of 4" no longer wraps and Continue is no longer cut off, and in Settings, General the "Installed" chip goes under the speech model's title instead of past the card. A first-run page taller than the window can be scrolled to its top.
- A recording shorter than a minute shows its length in seconds ("20 s") instead of "0 min" or "1 min".

## [0.2.0] - 2026-10-29

The first paid version for macOS (Apple Silicon, macOS 13 or later). The first 3 lectures are free; after that, a plan: Monthly (€15 a month), Yearly (€100 a year) or Lifetime (€200 once).

### Added
- 3 free lectures. A lecture counts as soon as its transcript is saved, and only when no plan covers it. The main screen says how many are left; when they are used, it offers the plans in place of Transcribe. Everything already transcribed stays open.
- Plans screen: Monthly, Yearly and Lifetime, each with a Buy button that opens the payment page in the browser.
- Settings, Licence: paste the licence key from the thank-you page, see the plan, its end date and the email it was bought with, open Manage or cancel, and remove the key (asks first).
- Licence keys are checked on the computer, with no account and no sign-in. Monthly and Yearly plans renew by themselves: from 7 days before the end date, Lectern sends the licence number, and nothing else, to the licence service. The main screen says when a plan was not renewed, or when Lectern needs to go online once to renew it.
- Free lectures stay counted after the settings are deleted or the app is reinstalled.
- Open System Settings: where Lectern says it needs Full Disk Access (the first run's access step and the failure for a protected browser), a button opens System Settings on Privacy & Security, Full Disk Access. The steps also say what to do when Lectern is not in the list.
- Plans in the sidebar, between History and Settings: it opens the Plans screen, which the free lectures line and Settings, Licence still lead to.
- After you stop a transcription, a banner says so: "Transcription cancelled. You stopped the transcription."

### Changed
- Licence keys are version 2: they say whether they were bought in Stripe's live mode and when they were issued. Release builds refuse test-mode keys and version 1 keys; debug builds still read both.
- The licence record in the Keychain also keeps the newest key used. A key issued before it is refused, unless it is for the same licence and ends no earlier. A key just sent by the licence service also corrects the time, so a clock once set ahead no longer ends a paid plan.
- The Plans screen looks as the design draws it: a larger title, the plans side by side under a line, the best value marked in the accent, and Buy marked as opening the browser. It has no Back link now that the sidebar leads to it.
- With a Lifetime licence, the sidebar has no Plans entry: there is nothing left to buy.
- When no plan covers a lecture, Lectern says the same thing before and after it has read the licence: "To transcribe this lecture, pick a plan. Everything you have already transcribed stays here, and you can open it any time."
- The app opens on its main screen at once, instead of after about five seconds: the speech model's size is checked at start, and its SHA-256 in the background, with the processor's SHA instructions (under a second instead of five). A job still checks the model in full before using it, and a model found damaged is offered for download again. History and the General settings are read off the window's thread.

### Fixed
- A licence record in the Keychain that cannot be read counts every free lecture as used, instead of none.
- A renewal answered with a 403, or with a refusal that is not the licence service's own (such as a page from a network in between), is asked again later instead of saying the plan was not renewed.
- Export saves straight into Downloads, with a name not taken there. Before, saving over the transcript itself emptied it; the copy is now written to a new file first, so the transcript stays as it was.
- The bundled yt-dlp comes with the GPLv3 text and a link to its source. Its macOS build includes GPLv3+ code, so it is under that licence as a whole, not only yt-dlp's own Unlicense.
- Cancel and Quit stop the bundled tool and every program it started, so a cancelled download ends at once and leaves no temporary files behind.
- When a recording is kept and one with the same name is already in the output folder, the new transcript gets a name of its own. A recording that cannot be kept is shown as a warning; the transcript is saved either way.
- The Plans screen shows the active plan: the line under the title says it is active and until when, in the words of Settings, Licence, and its card says "Your plan" without Buy. With Lifetime, no plan is offered; with Monthly or Yearly, the other two still are. "Already bought? Enter your key" is hidden while a plan is active.
- Settings, Updates names the installed version, shows "Checking for updates..." while it checks, then says the version is up to date with the time of the check, names the newer version, or says the check failed, with Retry.
- The icon buttons of History's rows show a tooltip: Open, Copy, Download, Delete.

### Security
These come from a security review of the app in October 2026.
- Cookie files that a crash left behind are removed as soon as Lectern starts, not at the next download, and they are also removed when the system ends Lectern.
- Login cookies are sent to the lecture site over HTTPS only. yt-dlp runs no helper program found elsewhere on the computer and keeps no cache outside the job's private folder.
- The bundled tools start with only a short, fixed list of settings, in the job's private folder, so settings from outside the app cannot change what they load or where they write.
- Lectern never writes through a link: not in the output folder, not when exporting, and not when it moves an older History into place.
- An update is installed only if its signature names the version the update feed announces.
- The update signing key is used only to sign the finished update, never while the app and its tools are built.
- Before Lectern empties its work folder or tidies its models folder, it checks that the folder is a real folder of the user's own, and it deletes only inside that folder, even if the folder is moved meanwhile. Anything else in its place, such as a link, is replaced by a new private folder and nothing it points to is touched; a models folder linked to another disk is therefore replaced, and the models are downloaded again. If the work folder belongs to another account, Lectern still opens and says so when a lecture is started.
- Each speech model is checked by its SHA-256, not only its size, before it is used or counted as installed; a model that does not match, or anything other than a plain file in its place, is downloaded again. The check reads the file once per run.
- A recording that says it lasts more than 6 hours, or whose audio would not fit on the disk, is refused before its audio is converted, and the converted audio never grows past that length or the free space. A download larger than 12 GB is refused, and so is a recording the site sends in a form only ffmpeg could download. Each refusal has its own message: too long, too large, or not supported.
- A job keeps its work folder to itself until it ends: if a second copy of Lectern starts while a lecture is being transcribed, it leaves the files of that job alone and does not start a job of its own.
- Lectern and every tool it bundles load only libraries signed by Apple or by Lectern's own developer. yt-dlp now ships as a folder of signed files, so it no longer unpacks a copy of Python each time it runs.
- Browser logins: Lectern reads only the lecture site's own cookies from Chromium browsers, not cookies the site set while embedded in another site's page, and only the newest copy of each cookie (lectern-cookie-reader 0.5.1).

## [0.1.0] - 2026-10-22

The first beta for macOS (Apple Silicon, macOS 13 or later).

### Added
- Transcribe a lecture from its link: Lectern uses the login the user already has in their browser, downloads the recording, skips the break and saves the transcript as `.txt`, `.srt`, `.vtt` and `.json`.
- First run: welcome, choosing the browser lectures are watched in, what macOS will ask before Lectern reads that browser's login, and the speech model download (about 1.6 GB, once, resumable).
- Progress for each step, with Cancel; the transcription shows its percent and the minutes left.
- Clear messages for each reason a job stops, and what to do: no login, an expired login (at any university's sign-in), a browser that keeps its login locked, a protected recording, a full disk.
- Before every download Lectern asks whether the teacher allows it, and refuses the lecture if not.
- Log in by dropping a `cookies.txt` on the window, for browsers Lectern cannot read; only the lecture site's cookies are read, and the file can be deleted after use.
- Transcript view: paragraphs with their start time, the skipped break, search, Copy all, Export as `.txt`, `.srt` or `.vtt`, Show in Finder.
- History: the transcripts made before, newest first, with their date, language and length; search by title, open, copy, export, and delete (asks first; a kept recording stays). The main screen lists the three latest under Recent, with See all.
- Automatic updates: at each start Lectern checks for a newer signed version and offers Install and restart.
- Main screen: "Using your Dia login" with Change before a link is pasted, and on a first visit, "No transcripts yet" with where to copy the link from.
- Settings: the browser used for logins (with which ones have a login for the last site), the default transcript language, the output folder, keeping the downloaded recording, deleting a dropped `cookies.txt`, and a Privacy tab.
- Closing the window keeps Lectern running on macOS; Quit asks first while work runs; only one copy of the app runs.
- A new look: two typefaces (Bricolage Grotesque and Newsreader, OFL) ship with the app, so nothing is loaded from the network; problems the user cannot fix are shown as errors, the others as warnings.

### Security
- Only the lecture's site's cookies are read, written to a private file for one download and deleted after it; nothing about lectures, logins or transcripts leaves the computer.
- The window has no permissions of its own: the app's core runs every tool, reads every file and opens every dialog.
- The bundled tools are pinned and checked: yt-dlp's signature, the built ffmpeg (LGPL) and whisper.cpp; every binary is signed with the hardened runtime.

[Unreleased]: https://github.com/Lectern-HQ/lectern/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/Lectern-HQ/lectern/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Lectern-HQ/lectern/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Lectern-HQ/lectern/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Lectern-HQ/lectern/releases/tag/v0.1.0
