import type { ReactNode } from 'react'
import { SectionHead } from '../ui/SectionHead'

export interface Project {
  icon: ReactNode
  chip: string
  title: string
  kr: string
  tr?: string
  trLang?: string
  link: { label: string; href: string }
}

export interface ProjectsGridProps {
  id?: string
  kicker: string
  title: string
  sub?: string
  subLang?: string
  projects: Project[]
  cut?: boolean
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <div className="card-top">
        <div className="card-icon">{project.icon}</div>
        <span className="chip">{project.chip}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="kr">{project.kr}</p>
      {project.tr && (
        <p className="tr" lang={project.trLang}>
          {project.tr}
        </p>
      )}
      <a className="card-link" href={project.link.href}>
        {project.link.label}{' '}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  )
}

/** Three-up project card grid on sand background. */
export function ProjectsGrid({ id, kicker, title, sub, subLang, projects, cut = true }: ProjectsGridProps) {
  return (
    <section className={cut ? 'projects cut-top' : 'projects'} id={id}>
      <div className="container">
        <SectionHead kicker={kicker} title={title} sub={sub} subLang={subLang} />
        <div className="cards">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
