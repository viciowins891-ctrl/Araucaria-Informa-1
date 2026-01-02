import React from 'react';
import SkeletonBase from './SkeletonBase';

const JobCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full relative overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="w-full">
                    <SkeletonBase className="w-3/4 h-6 mb-2" />
                    <SkeletonBase className="w-1/2 h-4" />
                </div>
                <SkeletonBase className="w-16 h-6 rounded-md" />
            </div>

            {/* Description Lines */}
            <div className="space-y-2 mb-6 flex-grow">
                <SkeletonBase className="w-full h-3" />
                <SkeletonBase className="w-full h-3" />
                <SkeletonBase className="w-2/3 h-3" />
            </div>

            {/* Icons Info */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                    <SkeletonBase className="w-4 h-4 rounded-full" />
                    <SkeletonBase className="w-1/3 h-3" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonBase className="w-4 h-4 rounded-full" />
                    <SkeletonBase className="w-1/2 h-3" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonBase className="w-4 h-4 rounded-full" />
                    <SkeletonBase className="w-1/4 h-3" />
                </div>
            </div>

            {/* Button */}
            <SkeletonBase className="w-full h-12 rounded-lg" />
        </div>
    );
};

export default JobCardSkeleton;
