/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import IllusionSlotMachine from "./Component/SlotMachine";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const App = () => {
  const vd = useRef();
  const cd = useRef();
  const dd = useRef();
  const ding = useRef();
  const boom = useRef();
  const dj = useRef();
  const imgs = useRef([]);

  const values = [
    { y: 0, x: 200, delay: 0.5 },
    { y: 200, x: -50, delay: 0.5 },
    { y: -200, x: 80, delay: 0.5 },
    { y: -50, x: -250, delay: 0.5 },
  ];

  // const num = Math.floor(Math.random() * 100);
  // console.log(num);

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 2.5,
      lerp: 0.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.to("#king", {
      scale: 3,
      duration: 1,
      delay: 1,
    });
    gsap.to("#king", {
      // y: 50,
      translateY: -200,
      duration: 1,
      delay: 1,
      scrollTrigger: {
        trigger: "#king",
        start: "top bottom",
        // markers: true,
        scrub: true,
      },
    });

    gsap.from(vd.current, {
      // y: 100,
      // opacity: 0,
      duration: 1,
      delay: 1,
      translateX: "400px",

      scrollTrigger: {
        trigger: vd.current,
        // scroller: "body",
        // markers: true,
        start: "top 100%",
        scrub: 1,
        // end: "top 40%",
        // toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(cd.current, {
      // y: 100,
      // opacity: 0,
      duration: 0.1,
      delay: 1,
      translateX: "-400px",

      scrollTrigger: {
        trigger: cd.current,
        // scroller: "body",
        // markers: true,
        start: "top 100%",
        scrub: 1,
        // end: "top 40%",
        // toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(dd.current, {
      y: 400,
      scale: 10,
      duration: 1,
      delay: 1,
      scrollTrigger: {
        trigger: dd.current,
        // markers: true,
        start: "top 90%",
        scrub: 1,
      },
    });

    gsap.to(ding.current, {
      duration: 1,
      delay: 1,
    });
    gsap.from("#ding", {
      visibility: "hidden",
      display: "none",
      opacity: 0,
      duration: 0.5,
      delay: 2,
    });
    imgs.current.forEach((img, i) => {
      gsap.to(img, {
        translateY: values[i].y,
        translateX: values[i].x,
        duration: 0.1,
        delay: values[i].delay,
        scrollTrigger: { trigger: img, start: "top bottom", scrub: true },
      });
    });
    gsap.from("#isn", {
      translateX: 500,
      duration: 0.1,
      delay: 1,
      scrollTrigger: {
        trigger: "#isn",
        scrub: true,
        start: "top bottom",
      },
    });
  }, []);

  return (
    <div>
      <div ref={boom} className="h-screen place-items-center content-center bg-[url('../public/benjamin-davies-332625-unsplash.jpg')] bg-cover bg-center opacity-80">
        <div id="king" className="pt-24 text-2xl font-bold">
          Life is{" "}
          <span id="ding" className="text-4xl font-bold text-red-600">
            Un
          </span>
          <span ref={ding} className="text-2xl font-bold">
            Fair
          </span>
        </div>
      </div>
      <div className="relative">
        {/* <div ref={vd} className="h-24 w-24 bg-amber-800"></div> */}
        <div className="grid grid-cols-6 grid-rows-3 gap-3 max-md:grid-cols-4">
          <img ref={(el) => (imgs.current[0] = el)} src="https://i.pinimg.com/webp85/1200x/85/a6/99/85a69912405712de7ecd3762c2d860ac.webp" alt="" className="col-start-1 h-full w-full" />

          <img ref={(el) => (imgs.current[1] = el)} src="https://i.pinimg.com/1200x/af/d6/b3/afd6b322606601bf743d27a1e75b9b12.jpg" alt="" className="col-start-4 h-full w-full min-md:col-start-5" />

          <div className="col-start-6 col-end-6 row-span-3 max-md:hidden">
            <div className="sticky top-0 flex h-screen flex-col justify-center p-4 text-4xl font-bold text-wrap">
              "Fair hoti zindagi to sab successful hote. Aur woh <span className="text-red-600">BORING</span> hotta."
              <span className="mt-4">Cheers to dukh dard peeda — but hasne mein hi maza hai.</span>
            </div>
          </div>

          <div className="z-10 col-span-4 col-start-2 row-start-2 overflow-x-clip text-6xl font-bold">
            <h1 className="text-black">The Life is so Unfair</h1>
            <h1 id="isn" className="text-red-600">
              Isn't It ?
            </h1>
          </div>
          <img ref={(el) => (imgs.current[2] = el)} src="https://i.pinimg.com/webp85/736x/7f/b6/05/7fb60538564ceef755080d388a5148ea.webp" className="col-start-1 row-start-3 h-full w-full" alt="" />
          <img ref={(el) => (imgs.current[3] = el)} src="https://i.pinimg.com/736x/21/5f/f4/215ff49d5e0fb8590a7bb975c754ed57.jpg" alt="" className="col-start-4 row-start-3 h-full w-full min-md:col-start-5" />
        </div>
      </div>
      {/* <div className="h-[1000px] place-items-center overflow-x-clip bg-amber-200 opacity-70">
        <div ref={dd} className="h-24 w-24 bg-amber-400 opacity-100"></div>
        <div className="h-24 w-24 bg-amber-700"></div>
      </div> */}
      <div className="place-items-center content-center overflow-x-clip">
        {/* <IllusionSlotMachine /> */}
        <h1 ref={vd} className="text-2xl font-bold text-red-600">
          The king is back Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <h1 ref={cd} className="text-2xl font-bold text-black">
          Get the fuck of Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h1>
      </div>
    </div>
  );
};

export default App;
