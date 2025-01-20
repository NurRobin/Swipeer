// src/app/group/[groupId]/layout.tsx
import React, { PropsWithChildren } from 'react';

const GroupLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div>
    <nav>
      {/* Navigation specific to group */}
    </nav>
    {children}
  </div>
);

export default GroupLayout;
