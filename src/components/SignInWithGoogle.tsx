"use client";

import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';
import Image from 'next/image';

export default function SignInWithGoogle() {
  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="relative w-6 h-6">
        <Image
          src="/google-icon.png"
          alt="Google Sign In"
          fill
          sizes="24px"
        />
      </div>
      <span>Sign in with Google</span>
    </button>
  );
}
