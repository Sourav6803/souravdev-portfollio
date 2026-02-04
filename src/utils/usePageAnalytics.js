


// ============================
// 🌐 FRONTEND - React (TS) Hook
// ============================

// usePageAnalytics.ts
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { server } from '../server';

export const usePageAnalytics = (path) => {
  const activityIdRef = useRef();
  const startTime = useRef(Date.now());

  useEffect(() => {
    const anonymousId = localStorage.getItem('anon_id') || crypto.randomUUID();
    localStorage.setItem('anon_id', anonymousId);

    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) return 'mobile';
      if (/tablet/i.test(ua)) return 'tablet';
      return 'desktop';
    };

    const fetchGeo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const loc = await res.json();
        return { country: loc.country_name, city: loc.city, code: loc.country_code };
      } catch (e) {
        return { country: 'Unknown', city: 'Unknown', code: 'XX' };
      }
    };

    const track = async () => {
      const location = await fetchGeo();
      const device = getDeviceType();
      const referrer = document.referrer || undefined;

      console.log("location-->", location)
      console.log("device-->",device)
      console.log("referer-->", referrer)
      console.log("aann_id", anonymousId)

      const { data } = await axios.post(`${server}/analytics/track-visit`, {
        path,
        anonymousId,
        device,
        location,
        referrer,
      });
      console.log("data-->", data)
      activityIdRef.current = data.activityId;
    };
    

    track();

    

    const handleUnload = () => {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      console.log("activityIdRef-->",activityIdRef.current )
      if (activityIdRef.current && duration > 0) {
        navigator.sendBeacon(
          `${server}/analytics/update-duration`,
          JSON.stringify({ activityId: activityIdRef.current, duration })
        );
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [path]);
};
