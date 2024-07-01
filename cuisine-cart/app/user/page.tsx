import { getSession } from '@auth0/nextjs-auth0';

export default async function UserPage() {
  const session = await getSession()
  const user = await session?.user

  return (
    user && (
      <div>
        <p>Welcome {user.email}!</p>
      </div>
    )
  );
}
