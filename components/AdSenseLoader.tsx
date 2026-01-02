
import React, { useEffect, useState } from 'react';

const AdSenseLoader: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // PERFORMANCE OPTIMIZATION:
        // The AdSense script is now handled in `index.html` with a lazy-loading strategy 
        // (waiting for user interaction or delay). This prevents TBT (Total Blocking Time)
        // penalties in Lighthouse/PageSpeed Insights.
        // This component is kept to avoid breaking imports but performs no logic.
    }, []);

    return null; // This component renders nothing
};

export default AdSenseLoader;
