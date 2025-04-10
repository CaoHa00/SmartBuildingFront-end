import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
  roomName: string;
  status: "available" | "occupied" | "maintenance";
}

export function RoomCard({ roomName, status }: RoomCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800",
    occupied: "bg-red-100 text-red-800",
    maintenance: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{roomName}</h3>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {/* Add more room details here if needed */}
      </CardContent>
    </Card>
  );
}
