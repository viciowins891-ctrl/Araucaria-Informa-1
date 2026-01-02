import React from 'react';

interface SkeletonBaseProps {
    className?: string;
}

const SkeletonBase: React.FC<SkeletonBaseProps> = ({ className = "" }) => {
    return (
        <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md ${className}`}>
            {/* O conteúdo é vazio, apenas a caixa pulsante */}
        </div>
    );
};

export default SkeletonBase;
