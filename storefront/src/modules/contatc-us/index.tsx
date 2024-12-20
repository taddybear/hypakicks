import Faq from "@modules/home/components/faq"
import StayUpdated from "@modules/home/stay-updated"
import ContactForm from "./contact-form"

export default function Contactus() {
  const supportDetails = [
    {
      id: 1,
      title: "Customer Support Germany",
      schedules: [
        "Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon", // Second schedule
        "Email: help@hypa-kicks.de",
      ],
    },
    {
      id: 2,
      title: "Customer Support Poland",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.pl",
      ],
    },
    {
      id: 3,
      title: "Customer Support Netherlands",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.nl",
      ],
    },
    {
      id: 4,
      title: "Customer Support Sweden",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.se",
      ],
    },
    {
      id: 5,
      title: "Customer Support France",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.fr",
      ],
    },
    {
      id: 6,
      title: "Customer Support USA",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.com",
      ],
    },
    {
      id: 7,
      title: "Customer Support Denmark",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.dk",
      ],
    },
    {
      id: 8,
      title: "Customer Support UK",
      schedules: [
        "Schedule: Mon - Fri (9:00 AM to 6:00 PM)",
        "Contact: Coming soon",
        "Email: help@hypa-kicks.co.uk",
      ],
    },
  ]
  return (
    <div className="overflow-hidden space-y-12 mb-12">
      <section className="container px-3 lg:px-0">
        <h1 className="text-center uppercase my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
          Contact us
        </h1>

        <div>
          <ul className="lg:grid grid-cols-2 ">
            {supportDetails.map((support) => (
              <li key={support.id} className="">
                <h1 className="pb-2 text-lg text-[#404040] Poppins700">
                  {support.title}
                </h1>
                <ul className="pb-[1.5em]">
                  {support.schedules.map((schedule, index) => (
                    <li
                      key={index}
                      className="py-[0.313rem] text-[#404040] list-disc	ml-5 Poppins400"
                    >
                      {schedule}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactForm />
      <Faq />
      <StayUpdated />
    </div>
  )
}
