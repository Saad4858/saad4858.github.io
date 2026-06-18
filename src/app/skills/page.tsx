import { PageNav } from '../_components/PageNav';
import { Skills } from '../_components/Skills';

export default function SkillsPage() {
  return (
    <>
      <PageNav active="/skills" />
      <main id="main-content" className="min-h-screen">
        <Skills />
      </main>
    </>
  );
}
