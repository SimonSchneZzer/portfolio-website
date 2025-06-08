import { Suspense } from 'react';

const SectionLoader = () => (
  <div className="section-loader">
    <div className="loader-spinner"></div>
  </div>
);

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<SectionLoader />}>
    {children}
  </Suspense>
);

export default SuspenseWrapper; 