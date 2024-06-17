import React from 'react';

const Loader = () => (
<div className="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
</div>
);

export default Loader;