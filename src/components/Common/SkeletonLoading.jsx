import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoading = () => {
  return (
    <div className="bg-black opacity-40 rounded-md content-center p-4">
      <div className="flex flex-col md:flex-row">
        {/* Left Side Skeleton */}
        <div className="flex-1 md:mr-4 mb-4 md:mb-0">
          <Skeleton height={30} width={600} baseColor='gray' style={{ marginBottom: '1px' }} />
        </div>

        {/* Center Side Skeleton */}
        <div className="flex-1 md:mx-2">
          <Skeleton height={30} width={300} baseColor='gray' style={{ marginBottom: '10px' }} />
        </div>

        {/* Right Side Skeleton */}
        <div className="flex-1">
          <Skeleton height={30} width={300} baseColor='gray' style={{ marginBottom: '10px' }} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
