export default function TempGauge() {
  return (
    <div className="bg-muted/40 rounded-xl aspect-auto px-3 py-1 md:p-5">
      <p className="italic text-xs md:text-base tracking-widest">Temperature</p>
      <div className="flex justify-between">
        <p className="font-bold text-sm md:text-base">42°</p>
        <div className="w-full text-center h-12 md:h-28">Gauge</div>
      </div>
    </div>
  );
}
