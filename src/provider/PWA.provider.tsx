'use client';
// import InstallPromptOverlay from '@/components/InstallPromptOverlay';
// import { useIsMobile } from '@/hooks';
// import { isInStandaloneMode } from '@/utils/common';

export default function PWAProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const iseMobile = useIsMobile();
  return (
    <>
      {/* {iseMobile && !isInStandaloneMode() ? <InstallPromptOverlay /> : children} */}
      {children}
    </>
  );
}
