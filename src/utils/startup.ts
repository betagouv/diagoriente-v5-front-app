import localforage from 'localforage';
import { refreshMutation, RefreshArguments } from 'requests/auth';
import { client, setAuthorizationBearer } from 'requests/client';
import { User, Token, UserParcour } from 'requests/types';
import { getUserParcourQuery } from 'requests/parcours';

export default async function startup(): Promise<{ user: User; parcours: UserParcour } | null> {
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
        const parcours = await client.query({ query: getUserParcourQuery });
        if (parcours.data) {
          return { user, parcours: parcours.data.userParcour };
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}
