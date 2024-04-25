import React, { useState } from 'react'; // Import React and useState
import { auth, googleProvider } from '../configs/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL)

    //Async is pareha ra sya og then.catch but ang async is mao na siyay latest version mas nindot pa gamiton sa then and catch
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err)
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            <input
                placeholder="Email..."
                value={email} // Add value attribute to input
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password..."
                type='password' //hide na sya pareha sa mga password like ******
                value={password} // Add value attribute to input
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button> {/* Fix typo here */}

            <button onClick={signInWithGoogle}>Sign In With Google</button>

            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Auth;
