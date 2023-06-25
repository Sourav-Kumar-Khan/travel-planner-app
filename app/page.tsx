"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function Home() {
  const llm = useLLM();
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");

  async function handleClick() {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: `You're an AI interviewer bot. You have to generate relevant question given for a job description.`,
          },
          { role: "user", content: `Job Description: ${location}` },
        ],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  return (
    <div className="min-h-screen mx-auto my-8 max-w-4xl">
      <h1 className="text-center mb-4 text-2xl">AI Interviewer</h1>
      <div className="flex">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter the job position"
          className="rounded border p-2 mr-2 text-black"
        />
        <button
          className="rounded border border-black dark:border-white p-2"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap">{result}</div>
    </div>
  );
}
