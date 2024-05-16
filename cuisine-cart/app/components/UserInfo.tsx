'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function UserInfo() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <p>Welcome {user.email}!</p>
      </div>
    )
  );
}
