import Image from "next/image";
import { redirect } from "next/navigation";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getRegisteredUser } from "@/lib/actions/user.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const registeredUser = await getRegisteredUser(userId);

  if (!registeredUser) redirect(`/patients/${userId}/register`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[700px] flex-1 justify-between">
          <Image
            src="/assets/icons/logokhome.png"
            height={400}
            width={400}
            alt="logo"
            className="mb-12 h-32 flex-1 flex "
          />

          <AppointmentForm
            registeredUserId={registeredUser?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2026 K Home Services</p>
        </div>
      </section>

      <Image
        src="/assets/images/bookingcalender2.jpg"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[50%] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
