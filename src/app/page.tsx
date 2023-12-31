'use client'

import { lines } from "./problem";
import React, { useEffect } from "react";

export default function Home() {
  const start = new Date().getTime();;

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@shopify/draggable").then((draggableModule) => {
        const Sortable = draggableModule.Sortable;

        const sortable = new Sortable(
          document.querySelectorAll("#parentDiv"),
          {
            draggable: "p",
            handle: ".handle",
          }
        );

        sortable.on("sortable:stop", () => {
          checkCorrectness();
        });
      });
    }
  }, []);

  function checkCorrectness() {
    const parentDivs = document.querySelectorAll('#parentDiv');
    const solution = `count = N 
while count < N : 
\\t print ( N ) 
\\t count = count + N 
`;

    let currentSolution = "";
    parentDivs.forEach(row => {
      Array.from(row.children).forEach(cell => {
        if (!(cell.classList.contains("draggable-mirror") || cell.classList.contains("draggable--original") || cell.classList.contains("solution-ignore"))) {
          currentSolution = currentSolution.concat(cell.textContent || "N", " ")
        }
      })
      currentSolution = currentSolution.concat("\n")
    })

    const successBanner = document.querySelector('#successBanner');
    if (currentSolution == solution) {
      successBanner?.classList.remove("invisible");
      setTimeTaken();
    } else if (!successBanner?.classList.contains("invisible")) {
      successBanner?.classList.add("invisible");
    }
  }

  function toggleIndent(line:number) {
    const indent = document.querySelector(`#indent_${line}`);
    const left_arrow = document.querySelector(`#left_arrow_${line}`);
    const right_arrow = document.querySelector(`#right_arrow_${line}`);

    if (indent?.classList.contains("hidden")) {
      indent?.classList.remove("hidden");
      indent?.classList.remove("solution-ignore");
      left_arrow?.classList.remove("hidden");
      right_arrow?.classList.add("hidden");
    } else {
      indent?.classList.add("hidden");
      indent?.classList.add("solution-ignore");
      left_arrow?.classList.add("hidden");
      right_arrow?.classList.remove("hidden");
    }
    checkCorrectness();
  }

  function setTimeTaken() {
    const timeDisplay = document.querySelector(`#time`);
    const duration = (new Date().getTime() - start)

    const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor(duration / (1000 * 60 * 60));

    if (timeDisplay) {
      timeDisplay.textContent = `${hours}:${minutes}:${seconds}`
    }
  }

  function userInput(index: number) {
    return (
      <p id={`token_${index}`} className="flex flex-row cursor-pointer bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 handle">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <input className="bg-gray-800 text-white border border-gray-600 rounded-lg text-center"></input>
      </p>
    )
  }

  function textInput(index: number, text: string | undefined) {
    return (
      <p id={`token_${index}`} className="handle cursor-pointer bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
        {text}
      </p>
    )
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24 gap-10">
      <h1>Rearrange the following code blocks such that it prints out each number, starting from the initial value assigned.</h1>
      <div id="parsonProblem" className="flex flex-col">
        {lines.map((line, index) => (
          <div id="parentDiv" key={`line ${index}`} className="flex flex-row">
            <button onClick={() => toggleIndent(index)} id={`indent ${index}`} className="cursor-pointer text-white hover:text-slate-500 px-5 py-2.5 mr-2 mb-2 solution-ignore">
              <svg id={`right_arrow_${index}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <svg id={`left_arrow_${index}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
            <a id={`indent_${index}`} className="invisible hidden solution-ignore">\t</a>

            { line.tokens.map((token) => ( token.type == "input" ? userInput(index) : textInput(index, token.text) )) }
          </div>
        ))}
      </div>
      <div id="successBanner" className="bg-green-500 flex rounded-lg p-2 invisible">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Your solution is correct! It took <strong id="time">0:0:0</strong> for you to finish.</span>
      </div>
    </main>
  )
}
