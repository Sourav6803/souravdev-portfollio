import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../TitleHeader";
import axios from "axios";
import { server } from "../../server";

const AnimatedTechCard = ({ tech }) => (
  <div className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg">
    <div className="tech-card-animated-bg" />
    <div className="tech-card-content">
      {/* Image-based icon */}
      <div className="tech-icon-wrapper p-4 flex justify-center items-center">
        <img
          src={tech.icon.url}
          alt={tech.name}
          className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="px-4 w-full">
        <p className="text-center text-white font-semibold">{tech.name}</p>
        {tech.proficiency !== undefined && (
          <div className="mt-2 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${tech.proficiency}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AnimatedTechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  const[techStack, setTechStack] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/techStack/all-techStack`);
        setTechStack(response.data?.techStacks || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch tech stack');
        console.error('Error fetching tech stack:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []); 

  

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStack?.map((tech) => (
            <AnimatedTechCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTechStack;
