// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { counterItems } from "./constsants";
// import CountUp from "react-countup"

// // import { counterItems } from "./constsants/index";

// gsap.registerPlugin(ScrollTrigger);

// const AnimatedCounter = () => {
//   const counterRef = useRef(null);
//   const countersRef = useRef([]);

//   // useGSAP(() => {
//   //   countersRef.current.forEach((counter, index) => {
//   //     const numberElement = counter.querySelector(".counter-number");
//   //     const item = counterItems[index];

//   //     // Set initial value to 0
//   //     gsap.set(numberElement, { innerText: "0" });

//   //     // Create the counting animation
//   //     gsap.to(numberElement, {
//   //       innerText: item.value,
//   //       duration: 2.5,
//   //       ease: "power2.out",
//   //       snap: { innerText: 1 }, // Ensures whole numbers
//   //       scrollTrigger: {
//   //         trigger: "#counter",
//   //         start: "top center",
//   //       },
//   //       // Add the suffix after counting is complete
//   //       onComplete: () => {
//   //         numberElement.textContent = `${item.value}${item.suffix}`;
//   //       },
//   //     });
//   //   }, counterRef);
//   // }, []);

//  useGSAP(() => {
//   const counterTrigger = document.getElementById("counter");
//   if (!counterTrigger) return;

//   countersRef.current.forEach((counter, index) => {
//     if (!counter) return;

//     const numberElement = counter.querySelector(".counter-number");
//     const item = counterItems[index];

//     if (!numberElement) return;

//     gsap.set(numberElement, { innerText: "0" });

//     gsap.to(numberElement, {
//       innerText: item.value,
//       duration: 2.5,
//       ease: "power2.out",
//       snap: { innerText: 1 },
//       scrollTrigger: {
//         trigger: counterTrigger, // 👈 use the safe reference
//         start: "top center",
//       },
//       onComplete: () => {
//         numberElement.textContent = `${item.value}${item.suffix}`;
//       },
//     });
//   });
// }, []);


//   return (
//     <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
//       <div className="mx-auto grid-4-cols">
//         {counterItems.map((item, index) => (
//           <div
//             key={index}
//             ref={(el) => el && (countersRef.current[index] = el)}
//             className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
//           >
//             <div className="counter-number text-white-50 text-5xl font-bold mb-2">
//               0 {item.suffix}
//               <CountUp suffix={item.suffix} end={item.value} />
//             </div>
//             <div className="text-white-50 text-lg">{item.label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnimatedCounter;



import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "./constsants";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    const counterTrigger = counterRef.current;
    if (!counterTrigger) return;

    // Create a single ScrollTrigger for the entire component
    ScrollTrigger.create({
      trigger: counterTrigger,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        countersRef.current.forEach((counter, index) => {
          if (!counter) return;
          
          const numberElement = counter.querySelector(".counter-number");
          const item = counterItems[index];
          
          if (!numberElement) return;
          
          // Animate just the CountUp component
          gsap.fromTo(numberElement, 
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: index * 0.1
            }
          );
        });
      },
      // Markers can help with debugging (remove in production)
      markers: false
    });

    // Kill the ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="counter-number text-white-50 text-5xl font-bold mb-2">
              <CountUp 
                suffix={item.suffix} 
                end={item.value} 
                duration={2.5}
                delay={index * 0.1}
              />
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;