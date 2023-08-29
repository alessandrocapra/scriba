import { MonthComboBox } from "@/components/MonthComboBox";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Journal() {
  const daysCurrentMonth = getDaysInCurrentMonth();
  const supabase = createServerComponentClient({ cookies });

  const { data: entries } = await supabase.from("entries").select();

  return (
    <>
      <MonthComboBox />
      <div className="flex justify-between">
        {Array.from({ length: daysCurrentMonth }, (_, index) => {
          const dayNumber = index + 1;
          const formattedDayNumber =
            dayNumber < 10 ? `0${dayNumber}` : dayNumber;
          return (
            <Card key={index}>
              <CardHeader className="p-3">
                <CardDescription>{formattedDayNumber}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      {JSON.stringify(entries)}
    </>
  );

  function getDaysInCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextMonth = new Date(year, month + 1, 1); // This gets the first day of the next month
    nextMonth.setDate(0); // This sets the date to the last day of the current month
    return nextMonth.getDate(); // This returns the day number, which is the total number of days in the current month
  }
}
