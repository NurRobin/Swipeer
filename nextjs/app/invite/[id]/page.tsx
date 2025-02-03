'use client';

import { useParams } from 'next/navigation';

const InvitePage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  return <p>Einladungscode: {id}</p>;
};

export default InvitePage;
