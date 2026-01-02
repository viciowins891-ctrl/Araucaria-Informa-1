import React from 'react';
import SkeletonBase from './SkeletonBase';

const EventCardSkeleton: React.FC = () => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700">
            <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700">
                {/* Image Placeholder */}
                <SkeletonBase className="w-full h-full" />

                {/* Date Badge Placeholder (Overlay) */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <SkeletonBase className="w-16 h-4" />
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Title Placeholder */}
                <SkeletonBase className="w-3/4 h-7 mb-2 rounded" />
                <SkeletonBase className="w-1/2 h-7 mb-4 rounded" />

                {/* Description Placeholder (multi-line) */}
                <div className="mb-4 flex-grow space-y-2">
                    <SkeletonBase className="w-full h-4 rounded" />
                    <SkeletonBase className="w-full h-4 rounded" />
                    <SkeletonBase className="w-2/3 h-4 rounded" />
                </div>

                {/* Info Rows (Time & Location) */}
                <div className="space-y-3 mt-auto">
                    <div className="flex items-center">
                        <SkeletonBase className="w-5 h-5 mr-3 rounded-full" />
                        <SkeletonBase className="w-24 h-4 rounded" />
                    </div>
                    <div className="flex items-center">
                        <SkeletonBase className="w-5 h-5 mr-3 rounded-full" />
                        <SkeletonBase className="w-2/3 h-4 rounded" />
                    </div>
                </div>

                {/* Button Placeholder */}
                <div className="mt-6">
                    <SkeletonBase className="w-full h-10 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
