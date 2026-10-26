import { STORY } from '../../content/home'
import { SECTION_IDS } from '../../routes'
import { LinkScreen } from '../mockup/LinkScreen'
import { ModelDownloadScreen } from '../mockup/ModelDownloadScreen'
import { ProgressScreen } from '../mockup/ProgressScreen'
import { TranscriptScreen } from '../mockup/TranscriptScreen'
import './story.css'
import { NotesSheet } from './NotesSheet'
import { StoryScene } from './StoryScene'

/** "How it works": the screen stays while the scenes change. Without scroll-driven animation they simply stack. */
export function ScrollStory() {
  return (
    <section id={SECTION_IDS.how} className="story-stage relative bg-paper">
      <div className="story-pin bg-paper">
        <StoryScene index={0} titleSize="large" {...STORY.notes} picture={<NotesSheet />}>
          <div aria-hidden="true" className="story-hint absolute inset-x-0 bottom-7 text-sm text-muted">
            Keep scrolling
          </div>
        </StoryScene>
        <StoryScene index={1} titleSize="medium" reversed {...STORY.link} picture={<LinkScreen />} />
        <StoryScene index={2} titleSize="medium" {...STORY.model} picture={<ModelDownloadScreen />} />
        <StoryScene index={3} titleSize="medium" reversed {...STORY.progress} picture={<ProgressScreen />} />
        <StoryScene
          index={4}
          titleSize="large"
          {...STORY.search}
          picture={
            <div className="relative w-full pt-9 pl-7">
              <div
                aria-hidden="true"
                className="absolute top-0 -right-6 -bottom-7 left-0 bg-accent [clip-path:polygon(0_0,100%_14%,100%_100%,0_100%)]"
              />
              <TranscriptScreen />
            </div>
          }
        />
      </div>
    </section>
  )
}
