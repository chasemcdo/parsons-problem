import { lines } from "./problem"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        {lines.map(line => (
          <div className="flex flex-row">
            {line.tokens.map(token => (
              <div className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                {
                  token.type == "input" ? 
                    <input className="bg-gray-800 text-white border border-gray-600 rounded-lg text-center"></input>
                    :
                    token.text
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
