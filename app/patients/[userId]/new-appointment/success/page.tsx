import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  if (!appointment) {
    return (
      <div className="flex h-screen items-center justify-center px-[5%]">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="header">Service request not found</h1>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Service Request
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logokhome.png"
            height={1500}
            width={1500}
            alt="logo"
            className="h-32 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">service request</span> has
            been submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested service details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image ?? "/assets/icons/appointments.svg"}
              alt="provider"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">
              {doctor?.name ?? appointment.primaryPhysician}
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Service Request
          </Link>
        </Button>

        <p className="copyright">© 2026 K Home Services</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
