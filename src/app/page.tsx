"use client";
import DateTime_Picker from "@/components/date-time-picker";
import { Button } from "@/components/ui/button";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function Home() {
  const [dueTime, setdueTime] = useState<Dayjs | null>(null);

  const handleNewDueTime = async () => {
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(dueTime?.toISOString()),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("dueTime created successfully");
      }
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  return (
    <div className="grid grid-rows-8 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="font-semibold text-sm">
        {dueTime
          ? `The task expire at: ${dueTime.toDate()}`
          : "nothing to send"}
      </div>
      <div>
        <DateTime_Picker date={dueTime} setDate={setdueTime} />
      </div>
      <div>
        <Button onClick={handleNewDueTime}> send</Button>
      </div>
    </div>
  );
}
