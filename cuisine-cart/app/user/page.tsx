import { getSession } from '@auth0/nextjs-auth0';
import FetchUserInfo from '@/lib/db/fetchUserInfo';

export default async function UserInfo() {
  const user = await FetchUserInfo()

  console.log(user?.savedRecipes)

  return (
    user && (
      <div>
        <p>User ID: {user.userId}</p>
        <p>User Email: {user.email}</p>
        <p className='mt-3'>Saved Recipes</p>
        {user.savedRecipes.length >=1 && user.savedRecipes.map((recipe: string) => (
          <p key={recipe}>{recipe}</p>
        ))}
      </div>
    )
  );
}
