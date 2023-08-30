'use client'

import { lines } from "./problem";
import { Sortable } from '@shopify/draggable';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const sortable = new Sortable(
    document.querySelectorAll('#parentDiv'), {
      draggable: 'p',
    })

    sortable.on('sortable:stop', () => {
      checkCorrectness()
    })
  })

  function checkCorrectness() {
    const parentDivs = document.querySelectorAll('#parentDiv');
    const solution = `count = N 
while count < N : 
print ( N ) 
count = count + N 
`;

    let currentSolution = "";
    parentDivs.forEach(row => {
      row.childNodes.forEach(cell => {
        if (!(cell.classList.contains("draggable-mirror") || cell.classList.contains("draggable--original"))) {
          currentSolution = currentSolution.concat(cell.textContent || "N", " ")
        }
      })
      currentSolution = currentSolution.concat("\n")
    })

    const successBanner = document.querySelector('#successBanner');
    if (currentSolution == solution) {
      successBanner?.classList.remove("invisible");
    } else if (!successBanner?.classList.contains("invisible")) {
      successBanner?.classList.add("invisible");
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24 gap-10">
      <h1>Rearrange the following code blocks such that it prints out each number, starting from the initial assignment.</h1>
      <div className="flex flex-col">
        {lines.map((line, index) => (
          <div id="parentDiv" key={`line ${index}`} className="flex flex-row">
            {line.tokens.map((token, index) => (
              <p key={`token ${index}`} className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                {
                  token.type == "input" ?
                    <input className="bg-gray-800 text-white border border-gray-600 rounded-lg text-center"></input>
                    :
                    token.text
                }
              </p>
            ))}
          </div>
        ))}
      </div>
      <div id="successBanner" className="bg-green-500 flex rounded-lg p-2 invisible">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Your solution is correct!</span>
      </div>
    </main>
  )
}
