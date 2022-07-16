import {
  FC,
  FormEvent,
  useEffect,
  useState,
} from 'react';

import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';
import { supabase } from '../supabaseClient';

export const Account: FC = () => {
  const { service } = useFabbleMachine();
  const isAccount = useSelector(service, (state) => state.matches('profile.account'));
  const session = useSelector(service, (state) => state.context.session);
  const profile = useSelector(service, ({ context }) => context.profile);
  if (!isAccount) {
    return null;
  }
  console.log('profile', profile);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [avatar_url, setAvatarUrl] = useState<string>();


  // @TODO move to machine
  // const getProfile = async () => {
  //   try {
  //     setLoading(true)
  //     const user = supabase.auth.user()

  //     let {data, error, status} = await supabase
  //       .from('profiles')
  //       .select(`username, website, avatar_url`)
  //       .eq('id', user?.id)
  //       .single()

  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setUsername(data.username)
  //       setWebsite(data.website)
  //       setAvatarUrl(data.avatar_url)
  //     }
  //   } catch (error: any) {
  //     alert(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const updateProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <div>Email: {session?.user?.email}</div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button className="button block primary" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}
      <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
};
