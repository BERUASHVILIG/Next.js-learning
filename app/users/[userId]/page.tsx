import getSingleUser from "@/lib/getSingleUser";
import getUserPosts from "@/lib/getUserPost";
import { Suspense } from "react";
import UserPosts from "../components/userPosts";
import { Metadata } from "next";

type Params = {
  params: { userId: string };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getSingleUser(userId);
  const user: User = await userData;
  return {
    title: user.name,
    description: `this is a page of ${user.name}`,
  };
}
export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getSingleUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //   const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;
  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </div>
  );
}
