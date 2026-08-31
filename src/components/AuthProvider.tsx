'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          // Garante que a foto de perfil do login (Google/Auth) seja sincronizada com a conta
          if (!data.photoUrl && user.photoURL) {
            data.photoUrl = user.photoURL;
            updateDoc(docRef, { photoUrl: user.photoURL }).catch(console.error);
          }
          setUserProfile(data);
          if (data.theme) {
            document.documentElement.setAttribute('data-theme', data.theme);
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
        } else {
          setUserProfile(null);
          document.documentElement.removeAttribute('data-theme');
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserProfile, setLoading]);

  return <>{children}</>;
}
