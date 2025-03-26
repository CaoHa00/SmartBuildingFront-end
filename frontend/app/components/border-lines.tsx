export default function BorderLines() {
  return (
    <>
      <div className="absolute top-0 w-screen h-screen z-50">
        <div className="flex">
          <div className="w-[220px] ml-[12px] mt-1 rounded-t-xl border-l-2 border-t-2 border-r-2 border-white h-[36px]"></div>
          <div className="w-[268px] h-[36px]"></div>
          <div className="w-[210px] mt-1 rounded-t-xl border-r-2 border-t-2 border-l-2 border-white h-[36px]"></div>
        </div>
        <div className="flex">
          <div className="w-[218px] ml-[12px] border-l-2 border-white"></div>
          <div className="w-[272px] rounded-b-xl border-b-2 border-r-2 border-l-2 border-white h-[30px]"></div>
          <div className="w-[208px] border-r-2 border-white"></div>
        </div>
        <div className="h-[1124px] ml-[12px] mr-[10px] border-r-2 border-l-2 border-b-2 rounded-b-xl border-white"></div>
      </div>
      <div className="absolute top-0 w-full h-full z-50 flex"></div>
    </>
  );
}
