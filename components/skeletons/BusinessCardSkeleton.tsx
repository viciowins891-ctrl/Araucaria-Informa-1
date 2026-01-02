import React from 'react';
import SkeletonBase from './SkeletonBase';

const BusinessCardSkeleton: React.FC = () => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/60 overflow-hidden flex flex-col h-full">
            {/* Banner/Image Area (Matching h-48) */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <SkeletonBase className="w-full h-full" />

                {/* Simulated Tags Overlay (Top-Right) */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                    <SkeletonBase className="w-20 h-6 rounded-full" />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <SkeletonBase className="w-3/4 h-7 mb-2 rounded" />

                {/* Description (2 lines) */}
                <div className="mt-2 space-y-2">
                    <SkeletonBase className="w-full h-4 rounded" />
                    <SkeletonBase className="w-2/3 h-4 rounded" />
                </div>

                {/* Info Rows (Address, Phone, Website) */}
                <div className="space-y-3 mt-4 flex-grow">
                    <div className="flex items-center gap-3">
                        <SkeletonBase className="w-5 h-5 rounded-full" />
                        <SkeletonBase className="w-full h-4 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                        <SkeletonBase className="w-5 h-5 rounded-full" />
                        <SkeletonBase className="w-1/2 h-4 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                        <SkeletonBase className="w-5 h-5 rounded-full" />
                        <SkeletonBase className="w-3/4 h-4 rounded" />
                    </div>
                </div>

                {/* Buttons (Ligar / Visitar) */}
                <div className="pt-6 grid grid-cols-2 gap-3 mt-auto">
                    <SkeletonBase className="h-10 rounded-lg" />
                    <SkeletonBase className="h-10 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default BusinessCardSkeleton;
