
import React, { Suspense, lazy } from 'react';

// Lazy load the heavy analytics libraries
const VercelAnalytics = lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })));
const VercelSpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(module => ({ default: module.SpeedInsights })));

const AnalyticsWrapper: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <VercelAnalytics />
            <VercelSpeedInsights />
        </Suspense>
    );
};

export default AnalyticsWrapper;
