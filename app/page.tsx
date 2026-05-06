import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <div className="flex text-2xl">
        <Image
          src="/assets/icons/logokhome.png"
          height={1000}
          width={1000}
          alt="logo"
          className="h-8 w-fit"
        />
      </div>

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2026 K Home Services
            </p>
            <Link href="/?admin=true" className="text-green-500 hover:scale-95">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/handy.jpg"
        height={1000}
        width={1000}
        alt="image"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
