import Container from "@/components/ui/container/container";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Container>
      <div className="min-h-screen flex justify-center items-center">
        <SignUp />
      </div>
    </Container>
  );
}
