import { PageNav } from '../_components/PageNav';
import { Publications } from '../_components/Publications';

export default function PublicationsPage() {
  return (
    <>
      <PageNav active="/publications" />
      <main id="main-content" className="min-h-screen">
        <Publications />
      </main>
    </>
  );
}
