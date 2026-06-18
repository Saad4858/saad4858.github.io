import { PageNav } from '../_components/PageNav';
import { Experience } from '../_components/Experience';

export default function ExperiencePage() {
  return (
    <>
      <PageNav active="/experience" />
      <main id="main-content" className="min-h-screen">
        <Experience />
      </main>
    </>
  );
}
