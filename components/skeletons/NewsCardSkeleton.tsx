import React from 'react';
import SkeletonBase from './SkeletonBase';

const NewsCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col h-full">
            {/* Image Placeholder */}
            <SkeletonBase className="w-full h-48 sm:h-56" />

            <div className="p-5 flex flex-col flex-grow">
                {/* Category Badge */}
                <SkeletonBase className="w-24 h-6 rounded-full mb-3" />

                {/* Title (2 lines) */}
                <SkeletonBase className="w-full h-7 mb-2" />
                <SkeletonBase className="w-2/3 h-7 mb-4" />

                {/* Summary (3 lines) */}
                <SkeletonBase className="w-full h-4 mb-2" />
                <SkeletonBase className="w-full h-4 mb-2" />
                <SkeletonBase className="w-4/5 h-4 mb-6" />

                {/* Footer (Date & Share) */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <SkeletonBase className="w-32 h-4" />
                    <SkeletonBase className="w-8 h-8 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default NewsCardSkeleton;
