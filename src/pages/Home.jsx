export default function Home() {
  return (
    <section>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Добре дошли в <span className="underline decoration-white/50">LeaderTV</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Платформа за новини и събития на МИГ и партньорски организации.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="/news" className="rounded-lg bg-white text-green-700 px-4 py-2 font-medium shadow hover:bg-white/90">
              Виж новините
            </a>
            <a href="/events" className="rounded-lg border border-white/30 px-4 py-2 font-medium hover:bg-white/10">
              Календар на събитията
            </a>
          </div>
        </div>
      </div>

      {/* Две секции – последни новини / предстоящи събития */}
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Последни новини</h2>
            <a href="/news" className="text-sm text-green-700 hover:underline">Всички →</a>
          </div>
          <ul className="p-5 space-y-4">
            <li className="group">
              <a className="block">
                <div className="text-sm text-gray-400">14.08.2025</div>
                <div className="font-medium group-hover:text-green-700">
                  Стартира платформа LeaderTV
                </div>
                <div className="text-sm text-gray-500">
                  Онлайн пространство за обмен между МИГ от ЕС и съседни държави.
                </div>
              </a>
            </li>
            <li className="group">
              <a className="block">
                <div className="text-sm text-gray-400">05.09.2025</div>
                <div className="font-medium group-hover:text-green-700">
                  Уебинар: Добри практики по Leader
                </div>
                <div className="text-sm text-gray-500">
                  Присъединете се към експерти и МИГ-и за споделяне на опит.
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Предстоящи събития</h2>
            <a href="/events" className="text-sm text-green-700 hover:underline">Всички →</a>
          </div>
          <ul className="p-5 space-y-4">
            <li>
              <div className="text-sm text-gray-400">10.09.2025 • 10:00</div>
              <div className="font-medium">Онлайн среща на МИГ</div>
              <div className="text-sm text-gray-500">Онлайн</div>
            </li>
            <li>
              <div className="text-sm text-gray-400">24.09.2025 • 14:00</div>
              <div className="font-medium">Регионална конференция на МИГ</div>
              <div className="text-sm text-gray-500">София</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
