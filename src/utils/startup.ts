import localforage from 'localforage';
import { refreshMutation, RefreshArguments } from 'requests/auth';
import { client, setAuthorizationBearer } from 'requests/client';
import { User, Token } from 'requests/types';

export default async function startup(): Promise<User | null> {
  try {
    const authString = await localforage.getItem<string | null>('auth');

    if (authString) {
      // eslint-disable-next-line
      const { user, token }: { user: User; token: Token } = JSON.parse(authString);

      const nextToken = await client.mutate<{ refresh: Token }, RefreshArguments>({
        mutation: refreshMutation,
        variables: { email: user.email, refreshToken: token.refreshToken },
      });
      if (nextToken.data) {
        setAuthorizationBearer(nextToken.data.refresh.accessToken);
        localforage.setItem('auth', JSON.stringify({ user, token: nextToken.data.refresh }));
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}
