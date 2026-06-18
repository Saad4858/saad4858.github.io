import { PageNav } from '../_components/PageNav';
import { Projects } from '../_components/Projects';

export default function ProjectsPage() {
  return (
    <>
      <PageNav active="/projects" />
      <main id="main-content" className="min-h-screen">
        <Projects />
      </main>
    </>
  );
}
