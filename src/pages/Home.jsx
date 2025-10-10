import { useEffect } from "react";
import FlagsMosaic from "../components/FlagsMosaic";
import { countries } from "../data/countries";

export default function Home() {
  useEffect(() => {
    document.title = "LeaderTV – Начало";
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Добре дошли в LeaderTV</h1>
          <p>Платформа за новини и събития на МИГ и партньорски организации.</p>

          {/* Мозайка със знамена – бутон към /country/:code */}
          <FlagsMosaic countries={countries} />
        </div>
      </section>

      <main className="page">
        <div className="grid-2">
          <div className="card">
            <h2 style={{marginTop:0}}>Последни новини</h2>
            <p className="muted">Тук си остава твоят списък с новини.</p>
            {/* Ако имаш компонент за новини — сложи го тук */}
            {/* <NewsList /> */}
          </div>

          <div className="card">
            <h2 style={{marginTop:0}}>Предстоящи събития</h2>
            <p className="muted">Тук си остава твоят списък със събития.</p>
            {/* Ако имаш компонент за събития — сложи го тук */}
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
