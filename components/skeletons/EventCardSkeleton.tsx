import React from 'react';
import SkeletonBase from './SkeletonBase';

const EventCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 flex flex-col h-full">
            <div className="relative">
                {/* Image Placeholder */}
                <SkeletonBase className="w-full h-48 object-cover" />

                {/* Date Badge Placeholder (Overlay) */}
                <div className="absolute top-4 right-4 bg-white dark:bg-zinc-800 rounded-lg p-2 shadow-md">
                    <SkeletonBase className="w-8 h-8" />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Category & Status */}
                <div className="flex gap-2 mb-3">
                    <SkeletonBase className="w-20 h-5 rounded-full" />
                    <SkeletonBase className="w-16 h-5 rounded-full" />
                </div>

                {/* Title */}
                <SkeletonBase className="w-full h-8 mb-4" />

                {/* Info Rows */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <SkeletonBase className="w-5 h-5 rounded-full" />
                        <SkeletonBase className="w-3/4 h-4" />
                    </div>
                    <div className="flex items-center gap-3">
                        <SkeletonBase className="w-5 h-5 rounded-full" />
                        <SkeletonBase className="w-1/2 h-4" />
                    </div>
                </div>

                {/* Button */}
                <div className="mt-auto">
                    <SkeletonBase className="w-full h-12 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
