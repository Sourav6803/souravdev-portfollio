

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { server } from "../server";

// const useTrackRouteDuration = ({ projectId, blogPostId }) => {
//   const location = useLocation();
//   const startTime = useRef(Date.now());
//   const previousPath = useRef(location.pathname);

//   useEffect(() => {
//     const sendDuration = () => {
//       const duration = Math.floor((Date.now() - startTime.current) / 1000);
//       const payload = {
//         path: previousPath.current,
//         duration,
//       };

//       console.log("projectId========>", projectId)

//       if (projectId) payload.projectId = projectId;
//       if (blogPostId) payload.blogPostId = blogPostId;

//       console.log("payload->", payload)

//       navigator.sendBeacon(
//         `${server}/analytics/duration`,
//         new Blob([JSON.stringify(payload)], { type: "application/json" })
//       );
//     };

//     // When location changes, send previous page's duration
//     if (location.pathname !== previousPath.current) {
//       sendDuration();
//       startTime.current = Date.now(); // reset for new page
//       previousPath.current = location.pathname;
//     }

//     // When user closes tab or reloads
//     const handleBeforeUnload = () => {
//       sendDuration();
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       sendDuration(); // cleanup before unmount (rarely hit in SPA)
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [location]);
// };

const useTrackRouteDuration = ({ projectId, blogPostId }) => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const previousPath = useRef(location.pathname);

  console.log("projectId00=", projectId)

  useEffect(() => {
    if (!projectId && !blogPostId) return; // ✅ Skip if nothing to track

    const sendDuration = () => {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      const payload = {
        path: previousPath.current,
        duration,
      };

      if (projectId) payload.projectId = projectId;
      if (blogPostId) payload.blogPostId = blogPostId;

      console.log("payload->", payload);

      navigator.sendBeacon(
        `${server}/analytics/duration`,
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
    };

    if (location.pathname !== previousPath.current) {
      sendDuration();
      startTime.current = Date.now();
      previousPath.current = location.pathname;
    }

    const handleBeforeUnload = () => {
      sendDuration();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      sendDuration();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname, projectId, blogPostId]); // ✅ re-run when data is ready
};


export default useTrackRouteDuration;


