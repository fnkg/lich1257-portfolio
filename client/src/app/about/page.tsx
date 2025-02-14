import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "about",
  description: "about page",
};

export default function About() {
  return (
    <>
      {/* Mobile Card */}
      <div className="mobile-card h-full md:hidden block p-4">
        <Image
          src="/assets/avatar.jpg"
          width={150}
          height={150}
          alt="Picture of the author"
          className="mx-auto mb-4"
        />
        <div className="text-section overflow-auto max-h-[400px] p-4 bg-gray-100 rounded-lg">
          <div className="font-bold text-[21px] text-black">
            <p>hello!</p>
            <p>my name is sofy lich and i would glad</p>
            <p>to work with you!</p>
            <p>i am a media artist, and i like to do all kind</p>
            <p>of multimedia stuff.</p>
            <p>the sphere want us</p>
            <p>to know a lot, so i have skills in many visual directions.</p>
            <p>please welcome!</p>
          </div>
          <div className="border-b-2 border-dashed border-black my-4"></div>
          <div className="font-bold text-[21px] text-black">
            <p>
              graduated from «stroganov russian state university of design and
              applied arts (book illustration graphics)
            </p>
            <p>graduated from moscow music school (stage lighting design)</p>
            <p>working as freelancer</p>
            <p>
              and multimedia developer (in{" "}
              <a href="#" target="_blank">
                BOBA production🔗
              </a>
              )
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Card */}
      <div className="hidden h-screen w-screen md:flex items-center justify-center uppercase">
        <div className="relative w-[1192px] h-[745px] bg-cover rounded-[70px] border-t-[10px] border-black bg-none md:bg-[url('/assets/card-large.jpg')]">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              width={107}
              height={102}
              alt="Logo picture"
              className="absolute top-[30px] left-[45px]"
            />
          </Link>
          <Image
            src="/assets/avatar.jpg"
            width={369}
            height={400}
            alt="Picture of the author"
            className="absolute top-[182px] left-[31px]"
          />
          <div className="absolute w-[640px] h-auto top-[182px] left-[494px] leading-[40px] bg-black">
            <h1 className="text-right text-[35px] pr-[10px]">about</h1>
          </div>
          <div>
            <div className="flex flex-nowrap items-end text-black text-[25px]">
              <p className="relative basis-1/2 mt-[650px] left-[310px] text-[30px]">
                documents:
              </p>
              <div className="basis-1/4 mr-[105px] mb-[92px] font-bold text-[21px]">
                <p>hello!</p>
                <p>my name is sofy lich and i would glad</p>
                <p>to work with you!</p>
                <p>i am a media artist, and i like to do all kind</p>
                <p>of multimedia stuff.</p>
                <p>the sphere want us</p>
                <p>
                  to know a lot, so i have skills in many visual directions.
                </p>
                <p>please welcome!</p>
              </div>
              <div className="basis-1/4 mr-[65px] text-[20px] mb-[140px] font-bold">
                <p>
                  graduated from «stroganov russian state university of design
                  and applied arts (book illustration graphics)
                </p>
                <p>
                  graduated from moscow music school (stage lighting design)
                </p>
                <p>working as freelancer</p>
                <p>
                  and multimedia developer (in{" "}
                  <a href="#" target="_blank">
                    BOBA production🔗
                  </a>
                  )
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
