import Faq from "@modules/home/components/faq"
import StayUpdated from "@modules/home/stay-updated"
import Image from "next/image"
import Member from "../../../public/about/memberOne.webp"
import MemberTwo from "../../../public/about/memberTwo.webp"
import MemberThree from "../../../public/about/memberThree.webp"
import MemberFour from "../../../public/about/memberFour.webp"

import Shoe from "../../../public/about/shoe.webp"

const Aboutus = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Mark Jance",
      position: "CEO / FOUNDER",
      imageSrc: Member, // Replace with the actual image import or path
    },
    {
      id: 2,
      name: "Aviana Plummer",
      position: "PROJECT MANAGER",
      imageSrc: MemberTwo, // Replace with the actual image import or path
    },
    {
      id: 3,
      name: "Braydon Wilkerson",
      position: "PRODUCT DESIGNER",
      imageSrc: MemberThree, // Replace with the actual image import or path
    },
    {
      id: 4,
      name: "Kristin Watson",
      position: "SUPPORT MANAGER",
      imageSrc: MemberFour, // Replace with the actual image import or path
    },
  ]

  return (
    <section className="container px-3">
      <div className="lg:px-3">
        <h1 className="text-center uppercase my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
          ABout us
        </h1>
        <p className="text-sm lg:text-base text-center text-[#4D4D4D] lg:w-[70%] Poppins400 lg:m-auto lg:pb-8">
          Welcome to Hypa Kicks, where we live and breathe sneakers and
          streetwear. Our journey began with an Instagram page, but it quickly
          transformed into something much bigger.
        </p>

        <div className="mt-[2.5rem] lg:flex items-center">
          <div className="lg:w-1/2">
            <Image
              src={Shoe}
              alt=""
              width={534}
              height={448}
              className="w-full"
            />
          </div>
          <div className="lg:pl-6 lg:w-1/2">
            <h1 className="text-center mb-2 text-[1.446rem] lg:text-[1.75rem] text-[#4D4D4D] Poppins500">
              Our Vision
            </h1>
            <p className="text-center mb-[1.5em] text-[#4D4D4D] Poppins400 ">
              To become a globally recognized brand synonymous with sneakers
              that inspire self-expression, creativity and individuality.
            </p>
            <h1 className="text-center mb-2 text-[1.446rem] lg:text-[1.75rem] text-[#4D4D4D] Poppins500">
              Our Task
            </h1>
            <p className="text-center text-[#4D4D4D] Poppins400 ">
              Our goal is to provide an unparalleled shopping experience where
              customers can discover and design sneakers that celebrate their
              unique identity and style.
            </p>
            <p className="text-center text-[#4D4D4D] Poppins400 ">
              We value sustainability and ethical practices and work closely
              with local suppliers and artisans to minimize our impact on the
              environment and support our community.
            </p>
            <p className="text-center text-[#4D4D4D] Poppins400 mb-[1.5em]">
              We want to give our customers the opportunity to step into a world
              of endless possibilities with confidence, elegance and flair.
            </p>
          </div>
        </div>

        <div>
          <h1 className=" my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
            Meet Our Team
          </h1>
          <div className="lg:grid grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="my-5 lg:my-[0.625rem] mx-2 rounded-[0.5rem] border-[1px] border-[#efefef]"
              >
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  width={253}
                  height={407}
                  className="rounded-[0.5rem] w-full"
                />
                <div className="p-4">
                  <p className="pb-2 text-[#212529] Poppins500 text-[1.25rem]">
                    {member.name}
                  </p>
                  <p className="text-[#212529] Poppins400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Faq />
      <StayUpdated />
    </section>
  )
}

export default Aboutus
