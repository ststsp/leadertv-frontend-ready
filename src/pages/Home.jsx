import { useEffect } from "react";
import HeroFlagsScatter from "../components/HeroFlagsScatter";

export default function Home() {
  useEffect(() => {
    document.title = "LeaderTV – Начало";
  }, []);

  return (
    <>
      <HeroFlagsScatter />

      <main className="page">
        <div className="grid-2">
          <div className="card">
            <h2 style={{marginTop:0}}>Последни новини</h2>
            <p className="muted">Тук си остава твоят списък с новини.</p>
            {/* <NewsList /> */}
          </div>

          <div className="card">
            <h2 style={{marginTop:0}}>Предстоящи събития</h2>
            <p className="muted">Тук си остава твоят списък със събития.</p>
            {/* <EventsList /> */}
          </div>
        </div>

        <p className="muted" style={{textAlign:"center", marginTop: 24}}>
          © 2025 LeaderTV. Всички права запазени.
        </p>
      </main>
    </>
  );
}
