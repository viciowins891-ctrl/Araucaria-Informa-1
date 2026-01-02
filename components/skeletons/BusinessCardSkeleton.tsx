import React from 'react';
import SkeletonBase from './SkeletonBase';

const BusinessCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700/50 overflow-hidden flex flex-col h-full">
            {/* Banner/Image */}
            <div className="relative h-32 bg-gray-100 dark:bg-zinc-700">
                <SkeletonBase className="w-full h-full" />
                {/* Logo Overlay */}
                <div className="absolute -bottom-10 left-6">
                    <SkeletonBase className="w-20 h-20 rounded-xl border-4 border-white dark:border-zinc-800" />
                </div>
            </div>

            <div className="pt-12 px-6 pb-6 flex flex-col flex-grow">
                {/* Header: Title & Verified Badge */}
                <div className="flex justify-between items-start mb-2">
                    <SkeletonBase className="w-3/4 h-6 mb-1" />
                    <SkeletonBase className="w-5 h-5 rounded-full" />
                </div>

                {/* Category */}
                <SkeletonBase className="w-1/3 h-4 mb-4" />

                {/* Ratings & Status */}
                <div className="flex items-center gap-4 mb-6">
                    <SkeletonBase className="w-24 h-5" />
                    <SkeletonBase className="w-16 h-5" />
                </div>

                {/* Address & Phone */}
                <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                        <SkeletonBase className="w-4 h-4" />
                        <SkeletonBase className="w-full h-4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <SkeletonBase className="w-4 h-4" />
                        <SkeletonBase className="w-2/3 h-4" />
                    </div>
                </div>

                {/* Buttons placeholder */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <SkeletonBase className="h-10 rounded-lg" />
                    <SkeletonBase className="h-10 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default BusinessCardSkeleton;
