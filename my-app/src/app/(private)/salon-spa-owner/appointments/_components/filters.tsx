import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appointmentStatuses } from "@/constants";
import { ISalon_Spa } from "@/interfaces";
import React from "react";

function Filters({
  salonsSpas,
  selectedSalon,
  setSelectedSalon,
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
  onFilter,
  onClearFilter,
}: {
  salonsSpas: ISalon_Spa[];
  selectedSalon: number | null;
  setSelectedSalon: React.Dispatch<React.SetStateAction<number | null>>;
  selectedStatus: string | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  onFilter: () => void;
  onClearFilter: () => void;
}) {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 my-5 gap-5 items-end">
      <div>
        <h1 className="text-sm">Salon/Spa</h1>
        <select
          value={selectedSalon || ""}
          onChange={(e) => setSelectedSalon(Number(e.target.value))}
          className="border border-gray-400 rounded-md p-1 text-sm w-full h-9"
        >
          <option value="">All</option>
          {salonsSpas.map((salon) => (
            <option key={salon.id} value={salon.id} className="text-sm">
              {salon.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h1 className="text-sm">Date</h1>

        <Input
          type="date"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div>
        <h1 className="text-sm">Status</h1>
        <select
          value={selectedStatus || ""}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-400 rounded-md p-1 text-sm w-full h-9"
        >
          <option value="">All</option>
          {appointmentStatuses.map((status) => (
            <option key={status.value} value={status.value} className="text-sm">
              {status.label}
            </option>
          ))}

          <option value="completed" className="text-sm">
            Completed
          </option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Button variant={"outline"} onClick={onClearFilter}>
          Clear Filters
        </Button>
        <Button onClick={onFilter}>Apply Filters</Button>
      </div>
    </div>
  );
}

export default Filters;