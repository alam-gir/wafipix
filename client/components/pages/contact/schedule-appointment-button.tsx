import Button2 from "@/components/global/buttons/button2";
import { TEXTS } from "@/data";
import { Calendar } from "lucide-react";

const ScheduleApointMentButton =  () => {
    return (
        <Button2 href={TEXTS.url.meetingUrl} variant={"accent"} title="Schedule an appointment" icon={<Calendar className="h-6"/>} size={"lg"}  className="text-xl" />
    );
  }


  export default ScheduleApointMentButton;