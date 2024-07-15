"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [pressButton, setPressButton] = useState(false);

  const sendPrompt = async () => {
    let txt:any = output;
    if (input != "") {
      txt.push({
        user: "Tú:",
        msg: input
      });
      setOutput(txt);

      const ftch = await fetch(`${location.origin}/api/generate-text?prompt=${input}`);
      const res = await ftch.json();

      txt.push({
        user: "Bot:",
        msg: res.message
      });
    }
    else {
      txt.push({
        user: "Bot:",
        msg: "No puedes enviar un mensaje que este vacio"
      });
      setOutput(txt);
    }
    setInput("");

    setPressButton(false);
  }

  useEffect(() => {

  }, [input, output, pressButton]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div id="container--Layout" className="flex flex-col justify-between">
          <div id="display--text">
            {
              output.map((message: any) => {
                return (
                  <>
                    <div>{message.user}</div>
                    <div id="message--display">{message.msg}</div>
                  </>
                )
              })
            }
          </div>
          <div className="flex justify-around" id="input--text">
            <div>
              <input type="text" value={input} onChange={(e) => {
                setInput(e.target.value);
              }} className="text-black" />
            </div>
            <div>
              <button disabled={pressButton} onClick={() => {
                setPressButton(true);
                sendPrompt();
              }}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
