
import React, { useEffect, useState } from 'react';

const AdSenseLoader: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Prevent loading multiple times
        if (loaded || document.getElementById('adsense-script')) return;

        const loadScript = () => {
            if (document.getElementById('adsense-script')) return;

            const script = document.createElement('script');
            script.id = 'adsense-script';
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1266405844459024";
            script.async = true;
            script.crossOrigin = "anonymous";
            script.onload = () => setLoaded(true);
            document.head.appendChild(script);
        };

        // Delay loading by 4 seconds to prioritizing LCP and TTI
        const timer = setTimeout(() => {
            // Check for scheduler or requestIdleCallback support
            if ('requestIdleCallback' in window) {
                // @ts-ignore
                window.requestIdleCallback(() => loadScript());
            } else {
                loadScript();
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [loaded]);

    return null; // This component renders nothing
};

export default AdSenseLoader;
