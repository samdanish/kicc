"use client";

import { useEffect } from "react";
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../lib/firebase";

export default function VisitorTracker() {
  useEffect(() => {
    // Check if we already counted this person in their current browser session
    const hasVisited = sessionStorage.getItem("has_visited_kicc");

    if (!hasVisited) {
      try {
        // Ping Firebase to record a new unique visit
        const visitsRef = ref(database, "visits");
        push(visitsRef, {
          createdAt: serverTimestamp(),
          path: window.location.pathname,
        });

        // Mark this session as counted so we don't spam the database on refreshes
        sessionStorage.setItem("has_visited_kicc", "true");
      } catch (error) {
        console.error("Failed to log visit:", error);
      }
    }
  }, []);

  return null; // This component is completely invisible on the screen
}