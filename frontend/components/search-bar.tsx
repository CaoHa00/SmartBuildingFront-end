import { Input } from "@/components/ui/input";
import { Mic, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "./ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  const [searchType, setSearchType] = useState("all");

  return (
    <div className="relative flex items-center gap-2 transition-all duration-200 w-full">
      <div
        className="relative flex
         w-full text-blue-800 bg-white border border-blue-300 rounded-lg"
      >
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        <Input
          placeholder={`Search ${
            searchType === "all" ? "everything" : searchType
          }`}
          className="pl-12 pr-4 bg-sky-100"
        />
      </div>

      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Search in..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="blocks">Blocks</SelectItem>
          <SelectItem value="floors">Floors</SelectItem>
          <SelectItem value="rooms">Rooms</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
