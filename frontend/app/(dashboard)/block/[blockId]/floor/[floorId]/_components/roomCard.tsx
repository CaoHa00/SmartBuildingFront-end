import { Card } from "@/components/ui/card";

interface RoomCardProps {
  roomName: string;
  status: "available" | "occupied";
}

export function RoomCard({ roomName, status }: RoomCardProps) {
  return (
    <Card className="w-[180px] h-[120px] flex flex-col items-center justify-center gap-2 p-4">
      <h3 className="font-semibold text-base">{roomName}</h3>
      <p className={`text-sm ${status === "available" ? "text-green-600" : "text-red-600"}`}>
        {status}
      </p>
    </Card>
  );
}
