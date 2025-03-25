import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const userAgent = navigator?.userAgent || navigator?.vendor;
            setIsMobile(/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
        };

        checkIsMobile();
    }, []);

    return isMobile;
};
