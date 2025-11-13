import { Button } from "@heroui/button";
import { authText } from "../../auth.text";
import { DiscordIcon } from "@/src/shared/components/icons";

export default function SignInWithGoogle() {
  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => {
        // createClient().auth.signInWithOAuth({
        //   provider: "google",
        //   options: {
        //     redirectTo: `${window.location.origin}/auth/callback`,
        //   },
        // });
      }}
    >
      <DiscordIcon />
      {authText.signInWithGoogle}
    </Button>
  );
}
