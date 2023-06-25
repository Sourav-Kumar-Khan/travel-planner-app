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
            content: `As an AI interview bot, your task is to interviewing a candidate by asking questions based on a given job requirement. You will receive a detailed job description, your task is to formulate the most appropriate questions that aligns with the job's requirements.`,
          },
          { role: "user", content: `Destination: ${location}` },
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
      <h1 className="text-center mb-4 text-2xl">AI Bot Interview</h1>
      <p className = "text-center mb-3">This is an Interview session with an Generative Model </p>
      <div className="flex">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a job postion"
          className="p-2 border rounded mr-3 w-full block dark:bg-gray-900 dark:text-white"
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
