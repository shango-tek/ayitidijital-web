import { Kicker } from '../ui/Kicker'

export interface HubDefinition {
  word: string
  pron: string
  body: string
  tr: string
  trLang?: string
}

export interface HubProgram {
  title: string
  kr: string
  en: string
}

export interface HubProgramsProps {
  id?: string
  kicker: string
  title: string
  sub: string
  subLang?: string
  definition: HubDefinition
  programs: HubProgram[]
}

/** Virtual-hub section: narrative + konbit definition card on the left, program list on the right. */
export function HubPrograms({ id, kicker, title, sub, subLang, definition, programs }: HubProgramsProps) {
  return (
    <section className="hub" id={id}>
      <div className="container hub-grid">
        <div>
          <Kicker label={kicker} red />
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            {title}
          </h2>
          <p className="section-sub" style={{ marginTop: '1rem' }} lang={subLang}>
            {sub}
          </p>
          <div className="def-card">
            <p className="def-word">
              {definition.word} <span>{definition.pron}</span>
            </p>
            <p>{definition.body}</p>
            <p className="def-tr" lang={definition.trLang}>
              {definition.tr}
            </p>
          </div>
        </div>
        <div>
          {programs.map((program) => (
            <div className="program" key={program.title}>
              <span className="bullet" aria-hidden="true" />
              <div>
                <h3>{program.title}</h3>
                <p>{program.kr}</p>
                <p className="en" lang="en">
                  {program.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
