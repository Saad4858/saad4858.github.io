import { PageNav } from '../_components/PageNav';
import { Teaching } from '../_components/Teaching';

export default function TeachingPage() {
  return (
    <>
      <PageNav active="/teaching" />
      <main id="main-content" className="min-h-screen">
        <Teaching />
      </main>
    </>
  );
}
