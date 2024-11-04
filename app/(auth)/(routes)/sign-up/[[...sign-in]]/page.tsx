"use client";

import Container from "@/components/ui/container/container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <div className="min-h-screen flex justify-center items-center">
        <SignIn />
      </div>
    </Container>
  );
}
