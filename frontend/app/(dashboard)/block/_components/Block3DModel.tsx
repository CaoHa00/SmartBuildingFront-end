"use client";
export function BlockModel3D() {
  return (
    <>
      <div className="flex gap-4 h-[22rem]">
        <div className="flex-1 bg-white/90 rounded-xl p-4">
          {/* Building Image Container */}
          <div className="relative w-full h-full">
            <img
              src="/img/IIC.png"
              alt="Building Plan"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Optional: Add zoom controls or interactive elements here */}
          </div>
        </div>
      </div>
    </>
  );
}
