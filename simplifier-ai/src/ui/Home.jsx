import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useGoogleSignIn } from "../services/apiSignin";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

function Home() {
  // const { mutate: signInWithGoogle, isPending, data: user } = useGoogleSignIn();
  const { mutate: signInWithGoogle, isPending } = useGoogleSignIn();
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/main/explainer");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center">
      <Logo type="home" />
      <p className="mb-12 text-base sm:text-lg">
        Turn Deep Thoughts into Simple Words.
      </p>
      <button
        onClick={signInWithGoogle}
        disabled={isPending}
        className="mb-12 cursor-pointer rounded-3xl bg-indigo-600 px-10 py-3 text-sm font-semibold tracking-wider text-white uppercase hover:bg-indigo-700"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
}

export default Home;
