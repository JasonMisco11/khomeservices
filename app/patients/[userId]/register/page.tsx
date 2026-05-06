import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getRegisteredUser, getUser } from "@/lib/actions/user.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const registeredUser = await getRegisteredUser(userId);

  if (registeredUser) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logokhome.png"
            height={1000}
            width={1000}
            alt="user"
            className="mb-12 mx-auto h-32 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2026 K Home Services</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="user"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
